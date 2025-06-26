import type { FC, ReactElement } from "react";
import HIW from "../../../assets/HIW.png";

const HowItWorks: FC = (): ReactElement => (
  <section className="flex flex-col lg:flex-row items-stretch bg-black text-[#AEB4C0]">
    <div className="flex flex-col gap-y-8 p-4 lg:w-1/2">
      <h2 className="font-merriweather text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
        Turn Natural Language Into Live Data Visualizations — Instantly.
      </h2>

      <div className="flex flex-wrap gap-3">
        {[
          "Ask questions in plain English",
          "Real-time data insights",
          "Smart chart selection",
          "AI-powered query engine",
          "Interactive & responsive UI",
          "Claude AI integration",
          "Supports 10+ chart types",
        ].map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#FEF3C733] border border-[#EAB308] text-[#EAB308] w-fit"
          >
            <i className="fa-solid fa-check" />
            <span className="font-display font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <p className="text-lg font-light">
        “Users simply describe the data they want to see, and the system
        generates optimized SQL queries and the most relevant chart — instantly.
        From time-series trends to multi-variable comparisons, every
        visualization is powered by AI for smarter decision-making.”
      </p>
    </div>

    <div className="w-full lg:w-1/2 h-64 lg:h-auto">
      <img
        src={HIW}
        alt="How It Works"
        className="w-full h-full object-cover"
      />
    </div>
  </section>
);

export default HowItWorks;
