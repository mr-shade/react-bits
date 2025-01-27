import code from '@content/Components/TiltedCard/TiltedCard.jsx?raw';
import css from '@content/Components/TiltedCard/TiltedCard.css?raw';
import tailwind from '@tailwind/Components/TiltedCard/TiltedCard.jsx?raw';

export const tiltedCard = {
  installation: `npm i framer-motion`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/TiltedCard`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/TiltedCard`,
  usage: `import TiltedCard from './TiltedCard';

<TiltedCard
  imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
  altText="Kendrick Lamar - GNX Album Cover"
  captionText="Kendrick Lamar - GNX"
  containerHeight="300px"
  containerWidth="300px"
  imageHeight="300px"
  imageWidth="300px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={true}
  overlayContent={
    <p className="tilted-card-demo-text">
      Kendrick Lamar - GNX
    </p>
  }
/>
  `,
  code,
  css,
  tailwind
}