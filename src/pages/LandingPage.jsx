import LandingHeader from "../components/landing/LandingHeader/LandingHeader";
import LandingHero from "../components/landing/LandingHero";
import LandingStats from "../components/landing/LandingStats";
import LandingDemo from "../components/landing/LandingDemo";
import LandingTestimonials from "../components/landing/LandingTestimonials";
import LandingFooter from "../components/landing/LandingFooter";

const LandingPage = () => {
  return (
    <section className="landing-wrapper">
      <LandingHeader />
      <LandingHero />
      <LandingStats />
      <LandingDemo />
      <LandingTestimonials />
      <LandingFooter />
    </section>
  );
};

export default LandingPage;
