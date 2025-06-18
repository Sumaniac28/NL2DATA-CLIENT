import type { FC, ReactElement } from "react";
import { useState } from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import LandingCTA from "./components/landing-cta";
import LandingFooter from "./components/footer";
import SplashCursor from "../../ui/SplashCursor/SplashCursor";
import FAQ from "./components/FAQ";

interface LandingType {
  showLoginModal: boolean;
  showSignupModal: boolean;
}

const Landing: FC = (): ReactElement => {
  const [, setModal] = useState<LandingType>({
    showLoginModal: false,
    showSignupModal: false,
  });

  const onOpenModal = (type: string): void => {
    if (type === "login") {
      setModal({ showLoginModal: true, showSignupModal: false });
    } else {
      setModal({ showLoginModal: false, showSignupModal: true });
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header onOpenModal={onOpenModal} />
        <Hero />
        <Features />
        <LandingCTA />
        <Testimonials />
        <FAQ />
        <LandingFooter />
        <SplashCursor />
      </div>
    </>
  );
};

export default Landing;
