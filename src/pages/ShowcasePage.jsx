import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Header from "../components/navs/Header/Header";
import '../scss/showcase.scss';
import FadeContent from "../content/Animations/FadeContent/FadeContent";
import sad from "../assets/common/icon-sad.svg";
import logo from "../assets/logos/reactbits-logo.svg";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti';

const ShowcasePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000)
  }, [])

  return (
    <section className="showcase-wrapper">
      <Header />
      {isLoaded && <Confetti recycle={false} colors={["#00d8ff"]} gravity={0.5} frameRate={60} numberOfPieces={100} />}

      <Flex>
        <FadeContent blur duration={1000}>
          <Text className="title">Built with</Text>
        </FadeContent>

        <FadeContent blur duration={1000}>
          <Image className="title-logo" src={logo} />
        </FadeContent>
      </Flex>
      <FadeContent blur duration={1000}>
        <Text className="sub-text">Discover how other developers are using React Bits to build awesome user experiences</Text>
      </FadeContent>

      <FadeContent blur duration={1000} className="fade-grid">
        <div className="grid-container">
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>

          <div className="nothing-yet">
            <img src={sad} className="sad-icon" alt="emoji/face displaying a sad expression" />
            <Text className="nothing-yet-title">Nothing here yet!</Text>
            <Text className="nothing-yet-subtitle">Built some cool stuff with the help of React Bits? Be the first to showcase your work!</Text>
            <Button as="a" href='https://form.typeform.com/to/a3uPqXqY' border="1px solid #ffffff1c" rel='noreferrer' target='_blank' fontSize="sm" fontWeight={400} h={10} bg="#080808" color="white" _hover={{ bg: '#111', transform: 'scale(0.95)' }}>
              <Text>Submit My Project</Text>
            </Button>
          </div>
        </div>
      </FadeContent>
    </section >
  );
}

export default ShowcasePage;