import code from '@content/Animations/PixelTransition/PixelTransition.jsx?raw';
import css from '@content/Animations/PixelTransition/PixelTransition.css?raw';
import tailwind from '@tailwind/Animations/PixelTransition/PixelTransition.jsx?raw';

export const pixelTransition = {
  installation: `npm i gsap`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Animations/PixelTransition`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Animations/PixelTransition`,
  usage: `import PixelTransition from './PixelTransition';

<PixelTransition
  firstContent={
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
      alt="default pixel transition content, a cat!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#111"
      }}
    >
      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
    </div>
  }
  gridSize={12}
  pixelColor='#ffffff'
  animationStepDuration={0.4}
  className="custom-pixel-card"
/>`,
  code,
  css,
  tailwind
}