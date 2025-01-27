import code from '@content/Components/LogoWall/LogoWall.jsx?raw';
import css from '@content/Components/LogoWall/LogoWall.css?raw';
import tailwind from '@tailwind/Components/LogoWall/LogoWall.jsx?raw';

export const logoWall = {
  cliDefault: `npx jsrepo add https://reactbits.dev/default/Components/LogoWall`,
  cliTailwind: `npx jsrepo add https://reactbits.dev/tailwind/Components/LogoWall`,
  usage: `import LogoWall from './LogoWall';
import reactbits from "../../assets/logos/reactbits-icon.svg";

const logoImgs = [
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" },
  { imgUrl: reactbits, altText: "React Bits Logo" }
];

<div style={{height: '600px', width: '100%', position: 'relative'}}>
  <LogoWall
    items={logoImgs}
    direction='horizontal'
    pauseOnHover={true}
    size='clamp(8rem, 1rem + 20vmin, 25rem)'
    duration='60s'
    bgColor='#060606'
    bgAccentColor='#111111'
  />  
</div>`,
  code,
  css,
  tailwind
}