import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../components/common/TabbedLayout";
import { Box, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import { HeroType, PerspectiveGrid } from "../components/svg/SvgComponents";
import { clickSpark } from "../constants/code/Animations/clickSparkCode";
import { useMediaQuery, useSingleEffect } from "react-haiku";
import { getStarsCount } from "../utils/utils";
import { FiHeart } from "react-icons/fi";

import starIcon from "../assets/common/icon-star.svg";
import githubIcon from "../assets/common/icon-github.svg";
import docsIcon from "../assets/common/icon-docs.svg";
import Header from "../components/navs/Header/Header";
import CodeExample from "../components/code/CodeExample";
import CliInstallation from "../components/code/CliInstallation";
import LandingComponentNav from "../components/navs/LandingComponentNav/LandingComponentNav";
import AnimatedContent from "../content/Animations/AnimatedContent/AnimatedContent";
import TwitterMarquee from "../components/landing/TwitterMarquee";
import Squares from "../content/Backgrounds/Squares/Squares";
import Particles from "../content/Backgrounds/Particles/Particles";
import CountUp from "../content/TextAnimations/CountUp/CountUp";
import FadeContent from "../content/Animations/FadeContent/FadeContent";
import ClickSpark from "../ts-default/Animations/ClickSpark/ClickSpark";
import variants from '../assets/common/variants.svg';

const LandingPage = () => {
  const [stars, setStars] = useState(0);
  const [activeBeams, setActiveBeams] = useState([]);
  const activeBeamsRef = useRef([]);
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [isVisible, setIsVisible] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <section className="landing-wrapper">
      <Header />

      <div className="hero-content">
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
                  Hand-picked animated components collection for{" "}
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

        <div className="scroll-indicator" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}></div>
      </div>

      <Box className="stats-content" color="#00d8ff" mb={12}>
        <FadeContent blur>
          <Flex w="100%" justifyContent="center">
            <FadeContent blur>
              <Text textAlign="center" mb={12} maxW='20ch' lineHeight={1.2} color="#fff" fontSize="clamp(2rem, 6vw, 4rem)">
                A hundred percent free, and at least twice as awesome
              </Text>
            </FadeContent>
          </Flex>
          <Flex justifyContent="space-between" gap={6} alignItems="center" mb={6} direction={{ base: 'column', sm: 'row' }}>
            <Flex w={{ base: '100%', sm: '50%' }} h="250px" justifyContent="flex-end" alignItems="flex-start" direction="column" bg="#00d8ff" px={8} py={6} className="stats-first" borderRadius='25px'>
              <Text
                position="relative"
                zIndex={4}
                color="#060606"
                fontSize="clamp(4rem, 14vw, 8rem)"
                fontWeight={900}
                m={0}
                lineHeight={0.9}
              >
                <CountUp to={50} />+
              </Text>
              <Text position="relative" zIndex={2} fontSize='clamp(1rem, 2vw, 1.2rem)' color="#060606" m={0}>Components</Text>
              <Squares className="stats-squares" speed={0.2} borderColor="#060606" direction="diagonal" squareSize={40} />
            </Flex>
            <Flex w={{ base: '100%', sm: '50%' }} h="250px" justifyContent="flex-end" alignItems="flex-start" direction="column" px={8} py={6} className="stats-second" borderRadius='25px'>
              <Text
                position="relative"
                zIndex={2}
                color="#00d8ff"
                fontSize="clamp(4rem, 14vw, 8rem)"
                fontWeight={900}
                m={0}
                lineHeight={0.9}
              >
                <CountUp to={4} />
              </Text>
              <Text position="relative" zIndex={2} fontSize='clamp(1rem, 2vw, 1.2rem)' color="#00d8ff" m={0}>Variants</Text>

              <Particles particleCount={300} className="stats-particles" particleColors={['#00d8ff']} moveParticlesOnHover />
            </Flex>
          </Flex>
        </FadeContent>
      </Box>

      <Flex w="100%" justifyContent="center" alignItems="center" direction="column" mb={12} mt={12}>
        <FadeContent blur>
          <Flex w='100%' justifyContent="center" position="relative" top="1.6em">
            <img src={variants} />
          </Flex>
          <Text textAlign="center" maxW='20ch' mb={6} lineHeight={1} color="#fff" fontSize="clamp(2rem, 6vw, 3rem)">
            Simply copy & paste
          </Text>
        </FadeContent>

        <FadeContent className="fade-full" blur>
          <Flex maxH={300} maxW={1080} overflow='hidden' className="demo-landing">
            <TabbedLayout className='landing-tabs'>
              <PreviewTab>
                <Box position="relative" className="demo-container" h={230} p={0} w='100%' maxW={1080} overflow="hidden">
                  <ClickSpark />
                  <Text position='absolute' fontWeight={900} fontSize='2rem' textAlign='center' color='#222' userSelect='none'>{"Click Around"}</Text>
                </Box>
              </PreviewTab>

              <CodeTab>
                <CodeExample codeObject={clickSpark} />
              </CodeTab>

              <CliTab>
                <CliInstallation {...clickSpark} />
              </CliTab>
            </TabbedLayout>
          </Flex>
        </FadeContent>

      </Flex>


      <FadeContent blur>
        <Flex w="100%" justifyContent="center" alignItems='center' mt='4em' direction="column">
          <Text textAlign="center" lineHeight={1.6} fontSize="clamp(1.2rem, 4vw, 3rem)">Here{"'"}s what others are saying</Text>
          <Text textAlign="center" maxW={{base: '25ch', sm: '100%'}} lineHeight={1.6} fontSize="clamp(1rem, 2vw, 1.2rem)" letterSpacing='-.5px'>They think React Bits is cool, maybe you will too!</Text>
        </Flex>
        <TwitterMarquee />
      </FadeContent>

      <Box mb="8em" mt="4em">
        <FadeContent blur>
          <Flex alignItems="center">
            Made with <Box mx={2}><FiHeart /></Box> by
            <Link ml={1} href="https://davidhaz.com/" target="_blank" color='#999'>
              this guy
            </Link>
          </Flex>

        </FadeContent>
      </Box>
    </section>
  );
};

export default LandingPage;