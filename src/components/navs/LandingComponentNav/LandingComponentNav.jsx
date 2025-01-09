import { useNavigate } from 'react-router-dom';
import './LandingComponentNav.scss';

import arrow from '../../../assets/common/icon-arrow.svg';

import Magnet from '../../../content/Animations/Magnet/Magnet';
import AnimatedContent from '../../../content/Animations/AnimatedContent/AnimatedContent';
import Squares from '../../../content/Backgrounds/Squares/Squares';
import Hyperspeed from '../../../content/Backgrounds/Hyperspeed/Hyperspeed';
import ShinyText from '../../../content/TextAnimations/ShinyText/ShinyText';
import GradientText from '../../../content/TextAnimations/GradientText/GradientText';
import Waves from '../../../content/Backgrounds/Waves/Waves';

import { hyperspeedPresets } from '../../../content/Backgrounds/Hyperspeed/HyperSpeedPresets';

const LandingComponentNav = () => {
  const navigate = useNavigate();
  const preset = hyperspeedPresets.four;

  preset.colors = {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xff87b2, 0xff87b2, 0xff87b2],
    rightCars: [0xff87b2, 0xff87b2, 0xff87b2],
    sticks: 0xA4E3E6,
  }

  return (
    <nav className="component-nav-container">
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle feat-1" onClick={() => navigate('/backgrounds/hyperspeed')}>
          <Hyperspeed effectOptions={preset} />
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="square feat-2" onClick={() => navigate('/backgrounds/waves')}>
          <Waves lineColor='#ff9346' xGap={8} yGap={8} />
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle link" onClick={() => navigate('/text-animations/split-text')}>
          <Magnet padding={25}>
            <div className="docs-link">
              <img src={arrow} alt="arrow pointing diagonally to the upper right corner" />
              <p>Browse Docs</p>
            </div>
          </Magnet>
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="square feat-3" onClick={() => navigate('/text-animations/shiny-text')}>
          <ShinyText text="Bringing you shine" disabled={false} speed={3} className='shiny-button' />
          <p>&</p>
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="shiny-button"
          >
            A splash of color!
          </GradientText>
        </div>
      </AnimatedContent>
      <AnimatedContent reverse initialOpacity={0}>
        <div className="circle feat-4" onClick={() => navigate('/backgrounds/squares')}>
          <Squares speed={0.2} borderColor='#ffee51' hoverFillColor='#ffee51' />
        </div>
      </AnimatedContent>
    </nav>
  );
}

export default LandingComponentNav;