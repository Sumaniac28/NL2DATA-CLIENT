import type { FC, ReactElement } from "react";
import { FaTwitter, FaGithub } from "react-icons/fa";

interface IFooter {
  onOpenModal: (type: string) => void;
}

const LandingFooter: FC<IFooter> = ({ onOpenModal }): ReactElement => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-secondary text-base">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl mb-16 border border-white/10 shadow-2xl">
          <div className="absolute inset-0 z-0 animate-gradient bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-indigo-600 to-cyan-500 bg-[length:200%_200%] blur-sm opacity-80" />

          <div className="absolute inset-0 z-0">
            <div className="absolute w-72 h-72 bg-yellow-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 top-[-50px] left-[-50px]" />
            <div className="absolute w-72 h-72 bg-cyan-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 bottom-[-50px] right-[-50px]" />
          </div>

          <div className="relative z-10 px-8 py-24 text-center text-white">
            <h2 className="font-merriweather text-5xl sm:text-6xl font-extrabold drop-shadow-lg">
              Ready to unleash your inner data wizard?
            </h2>
            <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
              Ask questions. Get answers. Visualize insights in real time — no
              code needed.
            </p>
            <div className="mt-10">
              <button
                onClick={() => onOpenModal("signup")}
                className="inline-block bg-white text-black font-bold py-3 px-8 rounded-lg text-lg hover:scale-105 hover:bg-opacity-90 transition transform duration-300 shadow-md cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-400 pt-8 mb-5 md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-end space-x-6 md:order-2">
            <a
              href="#"
              aria-label="Twitter"
              className="text-secondary hover:text-white transition text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="text-secondary hover:text-white transition text-xl"
            >
              <FaGithub />
            </a>
          </div>
          <p className="mt-8 text-center text-sm text-secondary md:mt-0 md:order-1">
            &copy; {year} NL2DATA, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
