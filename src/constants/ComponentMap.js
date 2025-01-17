const animations = {
  'blob-cursor': () => import("../demo/Animations/BlobCursorDemo"),
  'animated-content': () => import("../demo/Animations/AnimatedContentDemo"),
  'follow-cursor': () => import("../demo/Animations/FollowCursorDemo"),
  'magnet': () => import("../demo/Animations/MagnetDemo"),
  'fade-content': () => import("../demo/Animations/FadeContentDemo"),
  'crosshair': () => import("../demo/Animations/CrosshairDemo"),
  'star-border': () => import("../demo/Animations/StarBorderDemo"),
  'noise': () => import("../demo/Animations/NoiseDemo"),
  'magnet-lines': () => import("../demo/Animations/MagnetLinesDemo"),
  'splash-cursor': () => import("../demo/Animations/SplashCursorDemo"),
  'click-spark': () => import("../demo/Animations/ClickSparkDemo"),
};

const textAnimations = {
  'split-text': () => import("../demo/TextAnimations/SplitTextDemo"),
  'blur-text': () => import("../demo/TextAnimations/BlurTextDemo"),
  'shiny-text': () => import("../demo/TextAnimations/ShinyTextDemo"),
  'gradient-text': () => import("../demo/TextAnimations/GradientTextDemo"),
  'count-up': () => import("../demo/TextAnimations/CountUpDemo"),
  'decrypted-text': () => import("../demo/TextAnimations/DecryptedTextDemo"),
  'true-focus': () => import("../demo/TextAnimations/TrueFocusDemo"),
  'variable-proximity': () => import("../demo/TextAnimations/VariableProximityDemo"),
  'text-pressure': () => import("../demo/TextAnimations/TextPressureDemo"),
};

const components = {
  'stack': () => import("../demo/Components/StackDemo"),
  'dock': () => import("../demo/Components/DockDemo"),
  'masonry': () => import("../demo/Components/MasonryDemo"),
  'rolling-gallery': () => import("../demo/Components/RollingGalleryDemo"),
  'spotlight-card': () => import("../demo/Components/SpotlightCardDemo"),
  'elastic-slider': () => import("../demo/Components/ElasticSliderDemo"),
  'decay-card': () => import("../demo/Components/DecayCardDemo"),
  'tilted-scroll': () => import("../demo/Components/TiltedScrollDemo"),
  'bounce-cards': () => import("../demo/Components/BounceCardsDemo"),
};

const backgrounds = {
  'squares': () => import("../demo/Backgrounds/SquaresDemo"),
  'hyperspeed': () => import("../demo/Backgrounds/HyperspeedDemo"),
  'grid-motion': () => import("../demo/Backgrounds/GridMotionDemo"),
  'waves': () => import("../demo/Backgrounds/WavesDemo"),
  'ballpit': () => import("../demo/Backgrounds/BallpitDemo"),
  'shape-blur': () => import("../demo/Backgrounds/ShapeBlurDemo"),
};

export const componentMap = {
  ...animations,
  ...textAnimations,
  ...components,
  ...backgrounds,
};
