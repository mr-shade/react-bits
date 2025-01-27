import code from '@content/TextAnimations/CountUp/CountUp.jsx?raw';

export const countup = {
  installation: `npm i framer-motion`,
  cliDefault: `npx jsrepo add https://reactbits.dev/default/TextAnimations/CountUp`,
  usage: `import CountUp from './CountUp'

<CountUp
  from={0}
  to={100}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>`,
  code
}