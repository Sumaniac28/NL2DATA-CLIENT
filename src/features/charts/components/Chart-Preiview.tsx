import { lazy, Suspense, useEffect, useRef } from "react";
import type { FC, ReactElement } from "react";
import type { IChartInfo, IChartResult } from "../interfaces/chart.interface";
import hljs from "highlight.js";
import { eventBus } from "../../../shared/events";
import { EventType } from "../../../shared/events/types";

const NumberCanvas = lazy(() => import("./charts/NumberChart"));
const BarChart = lazy(() => import("./charts/BarChart"));
const LineChart = lazy(() => import("./charts/LineChart"));
const PieChart = lazy(() => import("./charts/PieChart"));

interface IChartPreview {
  sqlQuery: string;
  chartConfig: IChartResult | null;
}

const ChartPreview: FC<IChartPreview> = ({
  sqlQuery,
  chartConfig,
}): ReactElement => {
  const number = useRef<number>(0);
  const codePreRef = useRef<HTMLPreElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewWidth = useRef<number>(0);
  if (chartConfig && chartConfig.type === "number") {
    const { data } = chartConfig as IChartResult;
    number.current = data as number;
  }

  const saveChart = (): void => {
    const { data, title, xAxis, yAxis, type } = chartConfig as IChartResult;
    const info: IChartInfo = {
      datasourceId: "",
      userId: "",
      chartName: title,
      chartType: type,
      xAxis,
      yAxis,
      queryData: "",
      chartData: JSON.stringify(data),
      prompt: "",
      sql: "",
    };
    eventBus.publish(EventType.SAVE_CHART, info);
  };

  // Convert from px to viewport width (vw)
  const pxToVW = (px: number): number => {
    // Get viewport width
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    return (px * 100) / viewportWidth;
  };

  useEffect(() => {
    if (codePreRef.current) {
      const preElement = codePreRef.current;
      const codeElement = preElement.querySelector("code");
      if (codeElement) {
        codeElement.removeAttribute("data-highlighted");
      }
      hljs.highlightAll();
    }

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          previewWidth.current = pxToVW(entry.contentRect.width);
        }
      }
    );

    if (previewRef && previewRef.current) {
      resizeObserver.observe(previewRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [chartConfig]);

  return (
    <div
      className="border border-[#2c2d2e] bg-[#1f2123] p-4 rounded-lg text-[#AEB4C0]"
      ref={previewRef}
    >
      <div className="bg-[#161717] rounded-md font-mono text-sm overflow-x-auto mb-3 border border-[#2c2d2e] p-3 text-[#FACC15]">
        <pre ref={codePreRef}>
          <code className="language-sql">{sqlQuery}</code>
        </pre>
      </div>

      <div className="sticky z-10 pb-3">
        <div className="mb-3">
          <div className="flex gap-2">
            <button
              disabled={!chartConfig}
              onClick={saveChart}
              className="px-4 py-2 rounded-md bg-[#21C1D6] text-[#161717] font-medium hover:bg-[#1AA8BD] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Save Chart
            </button>
          </div>
        </div>

        {chartConfig?.title && (
          <div className="w-full flex items-center justify-center font-semibold text-[#AEB4C0] mb-3 text-base">
            {chartConfig?.title}
          </div>
        )}

        <div className="relative w-full flex items-center justify-center min-h-[150px]">
          {!chartConfig && (
            <div className="text-center w-full flex flex-col justify-center items-center text-[#AEB4C0]">
              <i className="fa fa-chart-column text-2xl text-[#EAB308] mb-2"></i>
              <p className="text-sm">Configure your chart to see the preview</p>
            </div>
          )}

          {chartConfig && chartConfig.type === "number" && (
            <Suspense
              fallback={
                <div className="text-center text-white">Loading...</div>
              }
            >
              <NumberCanvas number={number.current} />
            </Suspense>
          )}
          {chartConfig && chartConfig.type === "bar" && (
            <Suspense
              fallback={
                <div className="text-center text-white">Loading...</div>
              }
            >
              <BarChart
                chartData={chartConfig}
                previewWidth={previewWidth.current}
              />
            </Suspense>
          )}
          {chartConfig && chartConfig.type === "line" && (
            <Suspense
              fallback={
                <div className="text-center text-white">Loading...</div>
              }
            >
              <LineChart
                chartData={chartConfig}
                previewWidth={previewWidth.current}
              />
            </Suspense>
          )}
          {chartConfig && chartConfig.type === "pie" && (
            <Suspense
              fallback={
                <div className="text-center text-white">Loading...</div>
              }
            >
              <PieChart
                chartData={chartConfig}
                previewWidth={previewWidth.current}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartPreview;
