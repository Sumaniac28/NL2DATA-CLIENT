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
import LoginModal from "../auth/components/login-modal";
import SignupModal from "../auth/components/signup-modal";

interface LandingType {
  showLoginModal: boolean;
  showSignupModal: boolean;
}

const Landing: FC = (): ReactElement => {
  const [modal, setModal] = useState<LandingType>({
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
      {modal.showLoginModal && (
        <LoginModal
          onClose={() => setModal({ ...modal, showLoginModal: false })}
          onOpenModal={onOpenModal}
        />
      )}
      {modal.showSignupModal && (
        <SignupModal
          onClose={() => setModal({ ...modal, showSignupModal: false })}
          onOpenModal={onOpenModal}
        />
      )}
      <div className="min-h-screen flex flex-col">
        <Header onOpenModal={onOpenModal} />
        <Hero onOpenModal={onOpenModal} />
        <Features />
        <LandingCTA />
        <Testimonials />
        <FAQ />
        <LandingFooter onOpenModal={onOpenModal} />
        <SplashCursor />
      </div>
    </>
  );
};

export default Landing;
