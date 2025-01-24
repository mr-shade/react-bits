import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useSingleEffect } from "react-haiku";
import { getStarsCount } from "../utils/utils";
import { Link, Spinner } from "@chakra-ui/react";

import starIcon from "../assets/common/icon-star.svg";
import githubIcon from "../assets/common/icon-github.svg";
import docsIcon from "../assets/common/icon-docs.svg";
import Header from "../components/navs/Header/Header";
import FadeContent from "../content/Animations/FadeContent/FadeContent";
import LandingComponentNav from "../components/navs/LandingComponentNav/LandingComponentNav";
import AnimatedContent from "../content/Animations/AnimatedContent/AnimatedContent";
import { HeroType, PerspectiveGrid } from "../components/svg/SvgComponents";

const LandingPage = () => {
  const [stars, setStars] = useState(0);
  const [activeBeams, setActiveBeams] = useState([]);
  const activeBeamsRef = useRef([]);
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width: 1024px)');

  useSingleEffect(() => {
    const fetchStars = async () => {
      const count = await getStarsCount();
      setStars(count);
    };

    fetchStars();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLine = Math.floor(Math.random() * 8);
      if (!activeBeamsRef.current.includes(randomLine)) {
        activeBeamsRef.current = [...activeBeamsRef.current, randomLine];
        setActiveBeams([...activeBeamsRef.current]);

        setTimeout(() => {
          activeBeamsRef.current = activeBeamsRef.current.filter(
            (line) => line !== randomLine
          );
          setActiveBeams([...activeBeamsRef.current]);
        }, 2000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="landing-wrapper">
      <Header />
      <div className="type-logo">
        <AnimatedContent initialOpacity={isMobile ? 0 : 1} scale={0.8} reverse={isMobile}>
          <HeroType />
        </AnimatedContent>
      </div>

      <div className="hero-info">
        <LandingComponentNav />

        <div className="headline">
          <div className="landing-bottom">
            <div className="divider"></div>
            <FadeContent blur duration={1000}>
              <p>
                Handpicked animated components collection for{" "}
                <span>creative developers</span>
              </p>
            </FadeContent>
            <div className="divider"></div>
            <Link
              href="https://github.com/DavidHDev/react-bits"
              target="_blank"
              className="landing-button"
            >
              <img src={githubIcon} alt="GitHub Octocat" />
              Star on GitHub
              <div className="button-divider"></div>
              <img className="star-icon" src={starIcon} alt="Star Icon" />
              {stars ? <FadeContent blur>{stars}</FadeContent> : <Spinner boxSize={3} />}
            </Link>
          </div>

          <div
            className="landing-button docs-button"
            onClick={() => navigate("/text-animations/split-text")}
          >
            <img src={docsIcon} alt="Docs Icon" /> Read Docs
          </div>
        </div>
      </div>

      <div className="perspective-grid">
        <PerspectiveGrid activeBeams={activeBeams} />
      </div>

      <div className="author">
        <FadeContent blur>
          Made with 🤍 by{" "}
          <Link href="https://davidhaz.com/" target="_blank">
            this guy
          </Link>
        </FadeContent>
      </div>
    </section>
  );
};

export default LandingPage;