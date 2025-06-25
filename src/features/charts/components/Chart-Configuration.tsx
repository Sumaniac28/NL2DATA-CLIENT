import { useState, useEffect, useRef, lazy, Suspense } from "react";
import type { FC, ReactElement, ChangeEvent } from "react";
import { eventBus } from "../../../shared/events";
import { EventType } from "../../../shared/events/types";
import { setLocalStorageItem } from "../../../shared/utils/utils";
import clsx from "clsx";
import type {
  ChartType,
  IChartConfiguration,
  IChartInfo,
  IChartResult,
} from "../interfaces/chart.interface";
import type { DropdownOption } from "../../../shared/components/Custom-Dropdown";
import type {
  IAppDataSource,
  IDatasource,
} from "../../datasources/interfaces/datasource.interface";

const CustomDropdown = lazy(
  () => import("../../../shared/components/Custom-Dropdown")
);

const CHART_TYPES: ChartType[] = [
  { name: "number", icon: "fa-brands fa-creative-commons-zero" },
  { name: "bar", icon: "fa fa-chart-column" },
  { name: "line", icon: "fa fa-chart-line" },
  { name: "pie", icon: "fa fa-chart-pie" },
];

interface IChartConfigType {
  dropdownOptions: DropdownOption[];
  datasources: IAppDataSource | null;
  chartInfo: IChartInfo | null;
  chartConfig: IChartResult | null;
  chartConfigData: IChartResult | null;
}

const ChartConfiguration: FC<IChartConfigType> = ({
  dropdownOptions,
  datasources,
  chartInfo,
  chartConfig,
  chartConfigData,
}): ReactElement => {
  const [config, setConfig] = useState<IChartConfiguration>({
    projectId: "",
    userPrompt: "",
    chartType: "",
  });
  const defaultProject = useRef<DropdownOption | null>(null);

  const isConfigValid = (): boolean => {
    return Boolean(
      config.projectId && config.chartType && config.userPrompt.trim()
    );
  };

  const handleDropdownChange = (option: DropdownOption): void => {
    setConfig({ ...config, projectId: option.value });
    const selectedDatasource = datasources?.dataSource.find(
      (source: IDatasource) => source.id === option.id
    );
    setLocalStorageItem("activeProject", JSON.stringify(selectedDatasource));
  };

  const calculateTotal = (chart: IChartResult): number => {
    const data = chart.data as Record<string, unknown>[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.reduce((prev, curr: any) => prev + curr[chart.yAxis], 0);
  };

  const selectChartType = (type: ChartType): void => {
    setConfig({ ...config, chartType: type.name });
    if (chartConfig && chartConfig.type !== "number" && type.name !== "pie") {
      const chart = {
        ...chartConfig,
        type: type.name,
        ...(type.name === "number" && {
          data: calculateTotal(chartConfig),
        }),
      };
      eventBus.publish(EventType.CHART_CHANGE, chart);
    }

    if (
      chartConfig &&
      chartConfig.type === "number" &&
      Array.isArray(chartConfigData?.data) &&
      type.name !== "pie"
    ) {
      eventBus.publish(EventType.CHART_CHANGE, {
        ...chartConfigData,
        type: type.name,
      });
    }
  };

  const generateChart = (): void => {
    if (isConfigValid()) {
      eventBus.publish(EventType.GENERATE_CHART, config);
    }
  };

  const firstLetterUpper = (text: string): string =>
    `${text.charAt(0).toUpperCase()}${text.substring(1)}`;

  useEffect(() => {
    if (chartInfo) {
      const { id, projectId, prompt, chartType } = chartInfo as IChartInfo;
      setConfig({
        projectId: projectId!,
        userPrompt: prompt,
        chartType,
      });
      defaultProject.current = {
        id: id!,
        label: projectId!,
        value: projectId!,
      };
    }
  }, [chartInfo]);

  return (
    <div className="bg-[#1f2123] rounded-lg border border-[#2c2d2e] px-4 py-3 text-[#AEB4C0] z-10">
      <h2 className="text-base font-semibold text-white mb-4">
        Chart Configuration
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-[#AEB4C0]">
          Data Source
        </label>
        <Suspense
          fallback={<div className="text-center text-white">Loading...</div>}
        >
          <CustomDropdown
            options={dropdownOptions}
            dropdownMessage="No datasource"
            placeholder="Select datasource"
            defaultOption={defaultProject.current}
            onSelect={handleDropdownChange}
          />
        </Suspense>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-[#AEB4C0]">
          Chart Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CHART_TYPES.map((type: ChartType) => (
            <button
              key={type.name}
              onClick={() => selectChartType(type)}
              className={clsx(
                "flex flex-col items-center justify-center p-2 text-xs font-medium rounded-lg border transition-all duration-150 cursor-pointer",
                {
                  "bg-[#FEF3C733] border-[#EAB308] text-[#21C1D6]":
                    config.chartType === type.name,
                  "border-[#2c2d2e] text-[#AEB4C0] hover:bg-[#222324] hover:text-white":
                    config.chartType !== type.name,
                }
              )}
            >
              <i className={`${type.icon} mb-1 text-sm`}></i>
              {firstLetterUpper(type.name)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-[#AEB4C0]">
          Prompt
        </label>
        <textarea
          value={config.userPrompt}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setConfig({ ...config, userPrompt: event.target.value });
          }}
          rows={3}
          className="w-full px-3 py-2 rounded-md border border-[#2c2d2e] bg-[#161717] text-white placeholder-[#AEB4C0] focus:outline-none focus:ring-2 focus:ring-[#21C1D6] shadow-sm"
          placeholder="e.g. Show monthly sales as a bar chart"
        ></textarea>
      </div>

      <button
        disabled={!isConfigValid()}
        onClick={generateChart}
        className="w-full px-4 py-2 rounded-md bg-[#21C1D6] text-[#161717] font-semibold hover:bg-[#1AA8BD] transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-[#21C1D6] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Generate Chart
      </button>
    </div>
  );
};

export default ChartConfiguration;
