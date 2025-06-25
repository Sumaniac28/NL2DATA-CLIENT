import type { FC, ReactElement, ReactNode } from "react";
import type { IChartDataView } from "../interfaces/chart.interface";

const ChartDataModal: FC<{
  chartData: IChartDataView;
  onClose: () => void;
}> = ({ chartData, onClose }): ReactElement => {
  const keys =
    chartData.chartData.length > 0 ? Object.keys(chartData.chartData[0]) : [];

  return (
    <div className="fixed inset-0 bg-[#161717]/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1f2123] rounded-2xl shadow-xl w-full h-[75%] max-w-2xl border border-[#2c2d2e] text-[#AEB4C0]">
        <div className="flex justify-between items-center p-6 border-b border-[#2c2d2e]">
          <div>
            <h2 className="text-lg font-bold text-white">Chart Data</h2>
            {chartData.title && (
              <p className="text-sm font-medium text-[#21C1D6]">
                {chartData.title}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#AEB4C0] hover:text-white transition cursor-pointer"
          >
            <i className="fa fa-xmark text-lg"></i>
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm mb-4 text-[#AEB4C0]">
            The following chart data is used to render this visualization.
          </p>

          <div className="bg-[#161717] border border-[#2c2d2e] rounded-md py-4 overflow-y-auto max-h-80 text-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#2c2d2e] text-left text-[#FACC15]">
                  {keys.map((key) => (
                    <th
                      key={key}
                      className="pb-2 px-4 whitespace-nowrap font-medium"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chartData.chartData.map(
                  (item: Record<string, unknown>, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-[#2c2d2e] last:border-none"
                    >
                      {keys.map((column) => (
                        <td
                          key={`${index}-${column}`}
                          className="py-3 px-4 whitespace-nowrap text-[#AEB4C0] max-w-xs overflow-hidden text-ellipsis"
                        >
                          {item[column] as ReactNode}
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDataModal;
