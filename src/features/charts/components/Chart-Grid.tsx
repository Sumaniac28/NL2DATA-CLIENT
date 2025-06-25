import { lazy, Suspense, useState } from "react";
import type { FC, ReactElement } from "react";
import type { IChartDataView, IChartInfo } from "../interfaces/chart.interface";
import { useNavigate } from "react-router-dom";

const ChartDataModal = lazy(() => import("./Chart-Modal"));

type IChartGrid = {
  charts: IChartInfo[];
  deleteCreatedChart: (chartId: string) => Promise<void>;
};

const ChartGrid: FC<IChartGrid> = ({
  charts,
  deleteCreatedChart,
}): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedChart, setSelectedChart] = useState<IChartDataView>({
    title: "",
    chartData: [],
  });
  const navigate = useNavigate();

  const chartIcon = (chart: IChartInfo): string => {
    if (chart.chartType === "bar") {
      return "fa fa-chart-column";
    } else if (chart.chartType === "line") {
      return "fa fa-chart-line";
    } else if (chart.chartType === "number") {
      return "fa-brands fa-creative-commons-zero";
    } else if (chart.chartType === "pie") {
      return "fa fa-chart-pie";
    } else {
      return "fa fa-chart-column";
    }
  };

  const openModal = (chart: IChartInfo): void => {
    console.log(chart);
    setSelectedChart({
      title: chart.chartName,
      chartData:
        chart.chartType !== "number"
          ? JSON.parse(chart.chartData)
          : JSON.parse(chart.queryData),
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const updateChart = (chartId: string | undefined): void => {
    navigate(`/charts/edit/${chartId}`);
  };

  const toUpper = (type: string): string => type.toUpperCase();

  return (
    <>
      {showModal && (
        <Suspense
          fallback={<div className="text-center text-white">Loading...</div>}
        >
          <ChartDataModal chartData={selectedChart} onClose={closeModal} />
        </Suspense>
      )}

      <div className="mx-auto w-full h-full flex bg-[#161717]">
        <div className="h-full overflow-y-auto w-full px-4 py-6 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {charts.map((chart: IChartInfo) => (
              <div
                key={chart.id}
                className="relative flex flex-col justify-between p-6 rounded-lg bg-[#262828] border border-[#21C1D6]/10 hover:border-[#21C1D6]/30 shadow-sm group transition-colors duration-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center ">
                    <i className={`${chartIcon(chart)} text-base`} />
                  </div>
                  <div className="flex flex-col truncate">
                    <h3
                      className="text-white text-base font-semibold truncate"
                      title={chart.chartName}
                    >
                      {chart.chartName}
                    </h3>
                    <p
                      className="text-sm text-[#AEB4C0] truncate"
                      title={chart.projectId}
                    >
                      {chart.projectId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#AEB4C0] mt-auto">
                  <span className="bg-[#FEF3C733] text-[#FACC15] px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wide">
                    {toUpper(chart.chartType)}
                  </span>
                  <i
                    onClick={() => openModal(chart)}
                    className="fa fa-eye text-[#21C1D6] text-sm hover:text-[#1AA8BD] cursor-pointer"
                    title="Preview"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => updateChart(chart.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1AA8BD1A] hover:bg-[#21C1D6] transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <i className="fa fa-pen text-[#21C1D6] group-hover:text-white text-sm" />
                  </button>

                  <button
                    onClick={() => deleteCreatedChart(chart.id!)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-red-500/10 hover:bg-red-600 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <i className="fa fa-trash text-red-500 group-hover:text-white text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartGrid;
