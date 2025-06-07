import { Box, Text } from "@chakra-ui/react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Helmet } from "react-helmet-async";

import FadeContent from "../content/Animations/FadeContent/FadeContent";

import '../css/showcase.css';
import Footer from "../components/landing/Footer/Footer";

const ShowcasePage = () => {
  const showcaseItems = [
    {
      name: 'Devraj',
      url: 'https://devrajchatribin.com/about',
      using: '<CountUp />'
    },
    {
      name: 'Abdullah Shafiq',
      url: 'https://resume-tex.vercel.app',
      using: '<Squares />'
    },
    {
      name: 'Oscar Hernandez',
      url: 'https://oscarhernandez.vercel.app',
      using: '<LetterGlitch />'
    },
    {
      name: 'Afaq Razaq',
      url: 'https://www.evolvion.io/',
      using: '<SpotlightCard />'
    }
  ];

  return (
    <>
      <section className="showcase-wrapper">
        <Helmet>
          <title>React Bits - Showcase 🎉</title>
        </Helmet>

        <FadeContent blur duration={1000} className="fade-grid">
          <div className="grid-container">
            <Box as="a" href='https://docs.google.com/forms/d/e/1FAIpQLSdlzugJovfr5HPon3YAi8YYSSRuackqX8XIXSeeQmSQypNc7w/viewform?usp=dialog' target="_blank" rel='noreferrer' className="grid-item add-yours">
              <AiOutlinePlusCircle className="add-icon" />
              <Text>Submit New Project</Text>
            </Box>

            {showcaseItems.map((item, index) =>
              <Box as="a" href={item.url} rel="noreferrer" target="_blank" className="grid-item" key={item.url}>
                <img className="showcase-img" src={`https://davidhaz.com/react-bits-showcase/showcase-${index + 1}.webp`} alt={`Showcase website submitted by: ${item.name ? item.name : 'Anonymous'}`} />
                <div className="showcase-info">
                  {item.name && <Text className="author">{item.name}</Text>}
                  <Text className="using">Using {item.using}</Text>
                </div>
              </Box>
            )}

            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
            <div className="grid-item"></div>
          </div>
        </FadeContent>

      </section >

      <Footer />
    </>
  );
}

export default ShowcasePage;