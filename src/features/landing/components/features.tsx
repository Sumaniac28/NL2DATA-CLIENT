import type { FC, ReactElement } from "react";

const Features: FC = (): ReactElement => (
  <div id="features" className="relative bg-black px-4 py-12 sm:px-6 lg:px-20">
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="font-merriweather text-4xl sm:text-6xl font-bold mb-5 text-white">
        Transform Your Data
      </h1>
      <p className="mt-4 text-lg sm:text-2xl text-[#AEB4C0]">
        Explore features designed to bring your data to life — visually,
        intelligently, and interactively.
      </p>
    </div>

    <div className="mx-auto grid grid-cols-1 sm:grid-cols-7 sm:grid-rows-6 gap-4 auto-rows-[minmax(120px,_1fr)]">
      <div className="bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1e3a8a] rounded-2xl p-5 sm:col-span-2 sm:row-span-6">
        <h3 className="text-xl font-semibold text-white">
          AI‑Powered Insights
        </h3>
        <p className="mt-2 text-sm text-white/90">
          Reveal hidden trends and automate visual discovery from your data.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#14b8a6] via-[#0d9488] to-[#0f766e] rounded-2xl p-5 sm:col-span-3 sm:row-span-2 sm:col-start-3">
        <h3 className="text-xl font-semibold text-white">
          Database Integration
        </h3>
        <p className="mt-2 text-sm text-white/90">
          Easily connect with PostgreSQL and other data sources securely.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#ec4899] via-[#db2777] to-[#9d174d] rounded-2xl p-5 sm:col-span-2 sm:row-span-4 sm:col-start-3 sm:row-start-3">
        <h3 className="text-xl font-semibold text-white">Beautiful Charts</h3>
        <p className="mt-2 text-sm text-white/90">
          Create responsive, customizable charts that tell your data’s story.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] rounded-2xl p-5 sm:col-span-2 sm:row-span-2 sm:col-start-6 sm:row-start-1">
        <h3 className="text-xl font-semibold text-white">
          Interactive Dashboards
        </h3>
        <p className="mt-2 text-sm text-white/90">
          Drag, filter, and share dynamic dashboards with real-time updates.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#10b981] via-[#059669] to-[#047857] rounded-2xl p-5 sm:col-span-3 sm:row-span-2 sm:col-start-5 sm:row-start-3">
        <h3 className="text-xl font-semibold text-white">
          Smart SQL Generator
        </h3>
        <p className="mt-2 text-sm text-white/90">
          Convert human language into optimized SQL queries instantly.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#f97316] via-[#ea580c] to-[#c2410c] rounded-2xl p-5 sm:col-span-3 sm:row-span-2 sm:col-start-5 sm:row-start-5">
        <h3 className="text-xl font-semibold text-white">Tabular Data View</h3>
        <p className="mt-2 text-sm text-white/90">
          Display and export your results in clear, sortable tables.
        </p>
      </div>
    </div>
  </div>
);

export default Features;
