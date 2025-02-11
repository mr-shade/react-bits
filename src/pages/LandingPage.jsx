import Header from "../components/navs/Header/Header";
import LandingFooter from "../components/landing/LandingFooter";
import LandingTestimonials from "../components/landing/LandingTestimonials";
import LandingDemo from "../components/landing/LandingDemo";
import LandingStats from "../components/landing/LandingStats";
import LandingHero from "../components/landing/LandingHero";

const LandingPage = () => {
  return (
    <section className="landing-wrapper">
      <Header />
      <LandingHero />
      <LandingStats />
      <LandingDemo />
      <LandingTestimonials />
      <LandingFooter />
    </section>
  );
};

export default LandingPage;
