import Magnet from '../../../content/Animations/Magnet/Magnet';
import arrow from '../../../assets/common/icon-arrow.svg';
import './LandingComponentNav.scss';
import { AnimatedContainer } from '../../../content/Animations/AnimatedContainer/AnimatedContainer';
import Fade from '../../../content/Animations/Fade/Fade';
import Squares from '../../../content/Backgrounds/Squares/Squares';
import Hyperspeed from '../../../content/Backgrounds/Hyperspeed/Hyperspeed';
import ShinyText from '../../../content/TextAnimations/ShinyText/ShinyText';
import GradientText from '../../../content/TextAnimations/GradientText/GradientText';
import { useNavigate } from 'react-router-dom';
import Waves from '../../../content/Backgrounds/Waves/Waves';

const LandingComponentNav = () => {
  const navigate = useNavigate();

  const split = {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'LongRaceDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 5,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 70,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff87b2, 0xff87b2, 0xff87b2],
      rightCars: [0xff87b2, 0xff87b2, 0xff87b2],
      sticks: 0xA4E3E6,
    }
  }

  return (
    <nav className="component-nav-container">
      <AnimatedContainer reverse>
        <div className="circle feat-1" onClick={() => navigate('/backgrounds/hyperspeed')}>
          <Hyperspeed effectOptions={split} />
        </div>
      </AnimatedContainer>
      <AnimatedContainer>
        <div className="square feat-2" onClick={() => navigate('/backgrounds/waves')}>
          <Waves lineColor='#ff9346' xGap={8} yGap={8}/>
        </div>
      </AnimatedContainer>
      <Fade blur>
        <div className="circle link" onClick={() => navigate('/text-animations/split-text')}>
          <Magnet padding={25}>
            <div className="docs-link">
              <img src={arrow} alt="arrow pointing diagonally to the upper right corner" />
              <p>Browse Docs</p>
            </div>
          </Magnet>
        </div>
      </Fade>
      <AnimatedContainer reverse>
        <div className="square feat-3" onClick={() => navigate('/text-animations/shiny-text')}>
          <ShinyText text="Bringing you shine" disabled={false} speed={3} className='shiny-button' />
          <p>&</p>
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} // Custom gradient colors
            animationSpeed={3} // Custom animation speed in seconds
            showBorder={false} // Show or hide border
            className="shiny-button" // Add one or more custom classes
          >
            A splash of color!
          </GradientText>
        </div>
      </AnimatedContainer>
      <AnimatedContainer>
        <div className="circle feat-4" onClick={() => navigate('/backgrounds/squares')}>
          <Squares speed={0.2} borderColor='#ffee51' hoverFillColor='#ffee51' />
        </div>
      </AnimatedContainer>
    </nav>
  );
}

export default LandingComponentNav;