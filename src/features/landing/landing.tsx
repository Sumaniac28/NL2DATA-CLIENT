import type { FC, ReactElement } from "react";
import { lazy, Suspense, useState } from "react";
import { isMobile } from "react-device-detect";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import LandingCTA from "./components/landing-cta";
import LandingFooter from "./components/footer";
import SplashCursor from "../../ui/SplashCursor/SplashCursor";
import FAQ from "./components/FAQ";

const LoginModal = lazy(() => import("../auth/components/login-modal"));
const SignupModal = lazy(() => import("../auth/components/signup-modal"));
const MobileBlock = lazy(() => import("../../shared/components/Mobile-Block"));

interface LandingType {
  showLoginModal: boolean;
  showSignupModal: boolean;
}

const Landing: FC = (): ReactElement => {
  const [modal, setModal] = useState<LandingType>({
    showLoginModal: false,
    showSignupModal: false,
  });
  const [showMobileBlock, setShowMobileBlock] = useState(false);

  const onOpenModal = (type: string): void => {
    if (isMobile) {
      setShowMobileBlock(true);
      return;
    }
    if (type === "login") {
      setModal({ showLoginModal: true, showSignupModal: false });
    } else {
      setModal({ showLoginModal: false, showSignupModal: true });
    }
  };

  return (
    <>
      {showMobileBlock && (
        <Suspense>
          <MobileBlock onClose={() => setShowMobileBlock(false)} />
        </Suspense>
      )}

      {modal.showLoginModal && (
        <Suspense>
          <LoginModal
            onClose={() => setModal({ ...modal, showLoginModal: false })}
            onOpenModal={onOpenModal}
          />
        </Suspense>
      )}
      {modal.showSignupModal && (
        <Suspense>
          <SignupModal
            onClose={() => setModal({ ...modal, showSignupModal: false })}
            onOpenModal={onOpenModal}
          />
        </Suspense>
      )}
      <div className="min-h-screen flex flex-col">
        <Header onOpenModal={onOpenModal} />
        <Hero onOpenModal={onOpenModal} />
        <Features />
        <LandingCTA />
        <Testimonials />
        <FAQ />
        <LandingFooter onOpenModal={onOpenModal} />
        {/* <SplashCursor /> */}
      </div>
    </>
  );
};

export default Landing;
