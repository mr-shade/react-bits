import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FeatureCards from "../components/landing/FeatureCards/FeatureCards";
import Testimonials from "../components/landing/Testimonials/Testimonials";
import StartBuilding from "../components/landing/StartBuilding/StartBuilding";
import Footer from "../components/landing/Footer/Footer";
import PlasmaWaveV2 from "../components/landing/PlasmaWave/PlasmaWaveV2";
import Hero from "../components/landing/Hero/Hero";

const LandingPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <section className="landing-wrapper">
      <Helmet>
        <title>React Bits - Animated UI Components For React</title>
      </Helmet>

      <PlasmaWaveV2 yOffset={-300} xOffset={100} rotationDeg={-30} />
      <Hero />
      <FeatureCards />
      <Testimonials />
      <StartBuilding />
      <Footer />
    </section>
  );
};

export default LandingPage;
