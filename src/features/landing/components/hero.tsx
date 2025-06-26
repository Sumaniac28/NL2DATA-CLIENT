import type { FC, ReactElement } from "react";
import Squares from "../../../ui/Squares/Squares";

interface IHero {
  onOpenModal: (type: string) => void;
}

const Hero: FC<IHero> = ({ onOpenModal }): ReactElement => (
  <main className="relative h-screen w-full overflow-hidden bg-black text-white">
    <div className="absolute inset-0 z-0">
      <Squares
        speed={0.7}
        squareSize={40}
        direction="down"
        borderColor="#484747"
        hoverFillColor="#636363"
      />
    </div>

    <section className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
      <div className="mb-6 flex items-center gap-2 border border-yellow-400 bg-yellow-100/10 px-3 py-1 rounded-lg shadow hover:shadow-lg transition group">
        <div className="w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600"></div>
        <p className="font-medium text-yellow-300">
          NL2DATA:{" "}
          <span className="text-yellow-200">Natural Language to Data</span>
        </p>
      </div>

      <h1 className="font-merriweather text-4xl sm:text-6xl font-semibold leading-snug max-w-3xl">
        Visualize your data in seconds with AI assistance
      </h1>

      <p className="text-lg sm:text-2xl text-[#AEB4C0] mt-6 max-w-2xl">
        Create beautiful charts and dashboards from your data leveraging the
        power of AI. Connect to your database and start visualizing in seconds.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onOpenModal("signup")}
          className="px-8 py-3 font-semibold rounded-lg text-[#0A0F1C] bg-[#21C1D6] hover:bg-[#1aa8bd] transition cursor-pointer"
        >
          Visualize Now
        </button>
        <a
          href="https://dev.to/sumaniac28/nl2data-3dh7"
          target="_blank"
          rel="noopener"
          className="px-8 py-3 font-semibold rounded-lg border border-[#AEB4C0] text-[#AEB4C0] hover:border-white hover:text-white transition cursor-pointer"
        >
          Learn more
        </a>
      </div>
    </section>
  </main>
);

export default Hero;
