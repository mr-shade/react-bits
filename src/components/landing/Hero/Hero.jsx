import { Link } from "react-router-dom";
import FadeContent from "../../../content/Animations/FadeContent/FadeContent";
import SplitText from "../../../content/TextAnimations/SplitText/SplitText";
import DotGrid from "../../../content/Backgrounds/DotGrid/DotGrid";
import LetterGlitch from "../../../content/Backgrounds/LetterGlitch/LetterGlitch";
import Squares from "../../../content/Backgrounds/Squares/Squares";

const Hero = () => {
  return (
    <div className="landing-content">
      <div className="hero-main-content">
        <h1 className="landing-title">
          <SplitText
            text="Animated React components"
            className="hero-split"
            splitType="chars"
            delay={30}
            duration={2}
            ease="elastic.out(0.5, 0.3)"
          />
          <br />
          <SplitText
            text="for creative developers"
            className="hero-split"
            splitType="chars"
            delay={30}
            duration={2}
            ease="elastic.out(0.5, 0.3)"
          />
        </h1>

        <SplitText
          className="landing-subtitle"
          splitType="words"
          delay={10}
          duration={1}
          text="Eighty-plus snippets, ready to be dropped into your React projects"
        />

        <FadeContent blur delay={500}>
          <Link to={'/text-animations/split-text'} className="landing-button">
            <span>Browse Components</span>
            <div className="button-arrow-circle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </FadeContent>
      </div>

      <div className="hero-cards-container">
        <div className="hero-card hero-card-1" onClick={() => window.open("https://reactbits.dev/backgrounds/dot-grid")}>
          <DotGrid
            baseColor="#ffffff"
            activeColor="rgba(138, 43, 226, 0.9)"
            dotSize={6}
            gap={16}
            proximity={50}
          />
        </div>

        <div className="hero-cards-row">
          <div className="hero-card hero-card-2" onClick={() => window.open("https://reactbits.dev/backgrounds/letter-glitch")}>
            <LetterGlitch
              className="hero-glitch"
              glitchColors={['#ffffff', '#999999', '#333333']}
            />
          </div>

          <div className="hero-card hero-card-3" onClick={() => window.open("https://reactbits.dev/backgrounds/squares")}>
            <Squares
              borderColor="#fff"
              speed={0.2}
              direction="diagonal"
              hoverFillColor="#fff"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;