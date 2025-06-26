import type { FC, ReactElement } from "react";
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import LandingFooter from "./components/footer";
import FAQ from "./components/FAQ";
import HowItWorks from "./components/landing-cta";

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
      <div className="min-h-screen flex flex-col scroll-smooth">
        <Header onOpenModal={onOpenModal} />
        <Hero onOpenModal={onOpenModal} />

        <motion.div
          id="features"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Features />
        </motion.div>

        <motion.div
          id="how-it-works"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <HowItWorks />
        </motion.div>

        <motion.div
          id="testimonials"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Testimonials />
        </motion.div>

        <motion.div
          id="faq"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FAQ />
        </motion.div>

        <motion.div
          id="footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <LandingFooter onOpenModal={onOpenModal} />
        </motion.div>
      </div>
    </>
  );
};

export default Landing;
