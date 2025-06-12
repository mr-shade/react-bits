import {
  FC,
  Suspense,
  useRef,
  useLayoutEffect,
  useEffect,
  useMemo,
} from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  invalidate,
} from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useFBX,
  useProgress,
  Html,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

export interface ViewerProps {
  url: string;
  width?: number | string;
  height?: number | string;
  modelXOffset?: number;
  modelYOffset?: number;
  defaultRotationX?: number;
  defaultRotationY?: number;
  defaultZoom?: number;
  minZoomDistance?: number;
  maxZoomDistance?: number;
  enableMouseParallax?: boolean;
  enableManualRotation?: boolean;
  enableHoverRotation?: boolean;
  enableManualZoom?: boolean; // ── NEW
  ambientIntensity?: number;
  keyLightIntensity?: number;
  fillLightIntensity?: number;
  rimLightIntensity?: number;
  environmentPreset?:
    | "city"
    | "sunset"
    | "night"
    | "dawn"
    | "studio"
    | "apartment"
    | "forest"
    | "park"
    | "none";
  autoFrame?: boolean;
  placeholderSrc?: string;
  showScreenshotButton?: boolean;
  fadeIn?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  onModelLoaded?: () => void;
}

const deg2rad = (d: number) => (d * Math.PI) / 180;

const Loader: FC<{ placeholderSrc?: string }> = ({ placeholderSrc }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      {placeholderSrc ? (
        <img
          src={placeholderSrc}
          width={128}
          height={128}
          className="blur-lg rounded-lg"
        />
      ) : (
        `${Math.round(progress)} %`
      )}
    </Html>
  );
};

const AdaptiveControls: FC<{
  pivot: THREE.Vector3;
  minDistance: number;
  maxDistance: number;
  enableManualZoom: boolean;
}> = ({ pivot, minDistance, maxDistance, enableManualZoom }) => {
  const ref = useRef<any>(null);
  useFrame(() => ref.current?.target.copy(pivot));
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableRotate={false}
      enableZoom={enableManualZoom}
      minDistance={minDistance}
      maxDistance={maxDistance}
      touches={{ TWO: THREE.TOUCH.DOLLY_ROTATE }}
    />
  );
};

const ROTATE_SPEED = 0.005;
const INERTIA = 0.925;
const PARALLAX_MAG = 0.05;
const PARALLAX_EASE = 0.12;
const HOVER_MAG = deg2rad(6);
const HOVER_EASE = 0.15;

interface ModelInnerProps {
  url: string;
  xOffset: number;
  yOffset: number;
  pivot: THREE.Vector3;
  initYaw: number;
  initPitch: number;
  enableMouseParallax: boolean;
  enableManualRotation: boolean;
  enableHoverRotation: boolean;
  autoFrame: boolean;
  fadeIn: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
  onLoaded?: () => void;
}

const ModelInner: FC<ModelInnerProps> = ({
  url,
  xOffset,
  yOffset,
  pivot,
  initYaw,
  initPitch,
  enableMouseParallax,
  enableManualRotation,
  enableHoverRotation,
  autoFrame,
  fadeIn,
  autoRotate,
  autoRotateSpeed,
  onLoaded,
}) => {
  const outer = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const { camera, gl } = useThree();

  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const targetPar = useRef({ x: 0, y: 0 });
  const curPar = useRef({ x: 0, y: 0 });
  const targetHover = useRef({ x: 0, y: 0 });
  const curHover = useRef({ x: 0, y: 0 });

  const ext = useMemo(() => url.split(".").pop()!.toLowerCase(), [url]);
  const content = useMemo<THREE.Object3D | null>(() => {
    if (ext === "glb" || ext === "gltf") return useGLTF(url).scene.clone();
    if (ext === "fbx") return useFBX(url).clone();
    if (ext === "obj") return useLoader(OBJLoader, url).clone();
    console.error("Unsupported format:", ext);
    return null;
  }, [url, ext]);

  const pivotW = useRef(new THREE.Vector3());
  useLayoutEffect(() => {
    if (!content) return;
    const g = inner.current;
    g.updateWorldMatrix(true, true);

    const sphere = new THREE.Box3()
      .setFromObject(g)
      .getBoundingSphere(new THREE.Sphere());
    const scale = 1 / (sphere.radius * 2);
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    g.scale.setScalar(scale);

    g.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (fadeIn) {
          o.material.transparent = true;
          o.material.opacity = 0;
        }
      }
    });

    g.getWorldPosition(pivotW.current);
    pivot.copy(pivotW.current);

    outer.current.rotation.set(initPitch, initYaw, 0);

    if (autoFrame && (camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
      const persp = camera as THREE.PerspectiveCamera;
      const fitR = sphere.radius * scale;
      const dist = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);
      persp.position.set(
        pivotW.current.x,
        pivotW.current.y,
        pivotW.current.z + dist
      );
      persp.near = dist / 10;
      persp.far = dist * 10;
      persp.updateProjectionMatrix();
    }

    if (fadeIn) {
      let t = 0;
      const id = setInterval(() => {
        t += 0.05;
        const v = Math.min(t, 1);
        g.traverse((o: any) => {
          if (o.isMesh) o.material.opacity = v;
        });
        invalidate();
        if (v === 1) {
          clearInterval(id);
          onLoaded?.();
        }
      }, 16);
      return () => clearInterval(id);
    } else {
      onLoaded?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    if (!enableManualRotation) return;
    const elem = gl.domElement;
    const down = (e: PointerEvent) => {
      dragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
      window.addEventListener("pointerup", up);
      invalidate();
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = { x: e.clientX, y: e.clientY };
      outer.current.rotation.y += dx * ROTATE_SPEED;
      outer.current.rotation.x += dy * ROTATE_SPEED;
      velocity.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
      invalidate();
    };
    const up = () => (dragging.current = false);

    elem.addEventListener("pointerdown", down);
    elem.addEventListener("pointermove", move);
    return () => {
      elem.removeEventListener("pointerdown", down);
      elem.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl, enableManualRotation]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      if (enableMouseParallax) {
        targetPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
      }
      if (enableHoverRotation) {
        targetHover.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };
      }
      invalidate();
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [enableMouseParallax, enableHoverRotation]);

  useFrame((_, delta) => {
    let need = false;

    curPar.current.x +=
      (targetPar.current.x - curPar.current.x) * PARALLAX_EASE;
    curPar.current.y +=
      (targetPar.current.y - curPar.current.y) * PARALLAX_EASE;

    const prevHovX = curHover.current.x;
    const prevHovY = curHover.current.y;
    curHover.current.x +=
      (targetHover.current.x - curHover.current.x) * HOVER_EASE;
    curHover.current.y +=
      (targetHover.current.y - curHover.current.y) * HOVER_EASE;

    const ndc = pivotW.current.clone().project(camera);
    ndc.x += xOffset + curPar.current.x;
    ndc.y += yOffset + curPar.current.y;
    outer.current.position.copy(ndc.unproject(camera));

    outer.current.rotation.x += curHover.current.x - prevHovX;
    outer.current.rotation.y += curHover.current.y - prevHovY;

    if (autoRotate && !dragging.current) {
      outer.current.rotation.y += autoRotateSpeed * delta;
      need = true;
    }

    if (!dragging.current) {
      outer.current.rotation.y += velocity.current.x;
      outer.current.rotation.x += velocity.current.y;
      velocity.current.x *= INERTIA;
      velocity.current.y *= INERTIA;
      if (
        Math.abs(velocity.current.x) > 1e-4 ||
        Math.abs(velocity.current.y) > 1e-4
      )
        need = true;
    }

    if (
      Math.abs(curPar.current.x - targetPar.current.x) > 1e-4 ||
      Math.abs(curPar.current.y - targetPar.current.y) > 1e-4 ||
      Math.abs(curHover.current.x - targetHover.current.x) > 1e-4 ||
      Math.abs(curHover.current.y - targetHover.current.y) > 1e-4
    )
      need = true;

    if (need) invalidate();
  });

  if (!content) return null;
  return (
    <group ref={outer}>
      <group ref={inner}>
        <primitive object={content} />
      </group>
    </group>
  );
};

const ModelViewer: FC<ViewerProps> = ({
  url,
  width = 400,
  height = 400,
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = -50,
  defaultRotationY = 20,
  defaultZoom = 0.5,
  minZoomDistance = 0.5,
  maxZoomDistance = 10,
  enableMouseParallax = true,
  enableManualRotation = true,
  enableHoverRotation = true,
  enableManualZoom = true,
  ambientIntensity = 0.3,
  keyLightIntensity = 1,
  fillLightIntensity = 0.5,
  rimLightIntensity = 0.8,
  environmentPreset = "forest",
  autoFrame = false,
  placeholderSrc,
  showScreenshotButton = true,
  fadeIn = false,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  onModelLoaded,
}) => {
  useEffect(() => void useGLTF.preload(url), [url]);

  const pivot = useRef(new THREE.Vector3()).current;
  const contactRef = useRef<THREE.Mesh>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const cameraRef = useRef<THREE.Camera>(null);

  const initYaw = deg2rad(defaultRotationX);
  const initPitch = deg2rad(defaultRotationY);
  const camZ = Math.min(
    Math.max(defaultZoom, minZoomDistance),
    maxZoomDistance
  );

  const capturePNG = () => {
    const gl = rendererRef.current;
    const scene = sceneRef.current;
    const cam = cameraRef.current;
    if (!gl || !scene || !cam) return;

    gl.shadowMap.enabled = false;
    const changed: { l: THREE.Light; cast: boolean }[] = [];
    scene.traverse((o: any) => {
      if (o.isLight && "castShadow" in o) {
        changed.push({ l: o, cast: o.castShadow });
        o.castShadow = false;
      }
    });
    if (contactRef.current) contactRef.current.visible = false;

    gl.render(scene, cam);
    const url = gl.domElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "model.png";
    link.href = url;
    link.click();

    gl.shadowMap.enabled = true;
    changed.forEach(({ l, cast }) => (l.castShadow = cast));
    if (contactRef.current) contactRef.current.visible = true;
    invalidate();
  };

  return (
    <div className="relative" style={{ width, height }}>
      {showScreenshotButton && (
        <button
          onClick={capturePNG}
          className="absolute top-4 right-4 z-10 cursor-pointer px-4 py-2 border border-white rounded-xl bg-transparent text-white hover:bg-white hover:text-black transition-colors"
        >
          Take Screenshot
        </button>
      )}

      <Canvas
        shadows
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl, scene, camera }) => {
          rendererRef.current = gl;
          sceneRef.current = scene;
          cameraRef.current = camera;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        camera={{ fov: 50, position: [0, 0, camZ], near: 0.01, far: 100 }}
      >
        {environmentPreset !== "none" && (
          <Environment preset={environmentPreset as any} background={false} />
        )}

        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={keyLightIntensity}
          castShadow
        />
        <directionalLight
          position={[-5, 2, 5]}
          intensity={fillLightIntensity}
        />
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />

        <ContactShadows
          ref={contactRef as any}
          position={[0, -0.5, 0]}
          opacity={0.35}
          scale={10}
          blur={2}
        />

        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            xOffset={modelXOffset}
            yOffset={modelYOffset}
            pivot={pivot}
            initYaw={initYaw}
            initPitch={initPitch}
            enableMouseParallax={enableMouseParallax}
            enableManualRotation={enableManualRotation}
            enableHoverRotation={enableHoverRotation}
            autoFrame={autoFrame}
            fadeIn={fadeIn}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            onLoaded={onModelLoaded}
          />
        </Suspense>

        <AdaptiveControls
          pivot={pivot}
          minDistance={minZoomDistance}
          maxDistance={maxZoomDistance}
          enableManualZoom={enableManualZoom}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
