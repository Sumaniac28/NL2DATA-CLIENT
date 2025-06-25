import { lazy, Suspense, useEffect, useState } from "react";
import type { FC, ReactElement } from "react";
import { useAppSelector } from "../../store";
import type { IReduxState } from "../../store/store.interface";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, type FetchResult } from "@apollo/client";
import clsx from "clsx";
import { ToastService } from "../../shared/services/toast.service";
import type { IChartInfo } from "./interfaces/chart.interface";
import { DELETE_CHART, GET_CHARTS } from "./graphql/chartInfo";

const ChartGrid = lazy(() => import("./components/Chart-Grid"));

const Charts: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [charts, setCharts] = useState<IChartInfo[]>([]);
  const [filteredCharts, setFilteredCharts] = useState<IChartInfo[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();
  const filters: string[] = ["All", "Number", "Bar", "Line", "Pie"];
  const { data, error, loading } = useQuery(GET_CHARTS, {
    fetchPolicy: "no-cache",
    variables: { userId: authUser.id },
  });
  const [deleteChart] = useMutation(DELETE_CHART, {
    fetchPolicy: "no-cache",
  });

  const createNewChart = (): void => {
    navigate("/charts/create");
  };

  const toggleFilter = (filter: string): void => {
    setActiveFilter(filter);
    filter = filter.toLowerCase();
    if (filter === "all") {
      setFilteredCharts(charts);
    } else {
      const filtered: IChartInfo[] = charts.filter(
        (chart: IChartInfo) => chart.chartType === filter
      );
      setFilteredCharts(filtered);
    }
  };

  const deleteCreatedChart = async (chartId: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this chart?")) {
      const toastService = new ToastService();
      try {
        const result: FetchResult = await deleteChart({
          variables: { chartId },
        });
        if (result && result.data) {
          const { id } = result.data.deleteChart;
          const updatedCharts: IChartInfo[] = charts.filter(
            (chart: IChartInfo) => chart.id !== id
          );
          setCharts(updatedCharts);
          setFilteredCharts(updatedCharts);
          toastService.show("Chart deleted successfully.", "success");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toastService.show("Error deleting chart.", "error");
      }
    }
  };

  useEffect(() => {
    if (data && !error) {
      const { getCharts } = data;
      setCharts(getCharts);
      setFilteredCharts(getCharts);
    }
  }, [data, error]);

  return (
    <div className="min-h-full bg-[#161717] px-4 py-4 sm:px-6 md:px-8 lg:px-12">
      <div className="sm:mb-2 rounded-xl p-2 sm:p-4 md:p-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight sm:leading-snug text-white">
              YOUR SAVED CHARTS
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#AEB4C0]">
              View and manage your saved charts
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={createNewChart}
              className="w-full sm:w-auto bg-[#21C1D6] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-[#1AA8BD] flex items-center justify-center sm:justify-start gap-2 sm:gap-3 shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 text-sm sm:text-base font-semibold cursor-pointer"
            >
              <i className="fa fa-plus text-white text-base sm:text-lg drop-shadow-sm"></i>
              Create Chart
            </button>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 md:p-6">
        <div className="mb-6 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={clsx(
                "px-4 py-2 text-sm rounded-full font-medium border transition-all duration-200 cursor-pointer",
                {
                  "bg-[#FEF3C733] text-[#21C1D6] border-[#EAB308]":
                    activeFilter === filter,
                  "border-[#2c2d2e] text-[#AEB4C0] hover:bg-[#222324] hover:text-white":
                    activeFilter !== filter,
                }
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredCharts.length > 0 && !loading && (
          <Suspense
            fallback={
              <div className="text-center text-white">Loading charts...</div>
            }
          >
            <ChartGrid
              charts={filteredCharts}
              deleteCreatedChart={deleteCreatedChart}
            />
          </Suspense>
        )}

        {filteredCharts.length === 0 && !loading && (
          <div className="mt-20 text-center px-6">
            <h3 className="mt-5 text-xl font-semibold text-white">
              No charts found
            </h3>

            <p className="mt-2 text-sm text-[#AEB4C0]">
              You don’t have any charts yet. Click below to create one.
            </p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={createNewChart}
                className="inline-flex items-center gap-2 rounded-lg bg-[#21C1D6] hover:bg-[#1AA8BD] text-white px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 cursor-pointer"
              >
                <i className="fa fa-plus text-sm" />
                Create Chart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
