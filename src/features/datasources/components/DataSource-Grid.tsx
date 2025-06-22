import type { FC, ReactElement } from "react";
import type { IDatasource } from "../interfaces/datasource.interface";

interface IDataSourceGrid {
  dataSources: IDatasource[];
  onEdit: (projectId: string) => void;
  onDelete: (id: string) => void;
}

const DataSourceGrid: FC<IDataSourceGrid> = ({
  dataSources = [],
  onEdit,
  onDelete,
}): ReactElement => {
  return dataSources.length === 0 ? (
    <div className="mx-auto w-full max-w-2xl h-72 flex flex-col items-center justify-center text-center space-y-4 px-6">
      <i className="fa fa-database text-[#21C1D6] text-3xl opacity-80" />
      <p className="text-[#AEB4C0] text-sm sm:text-base font-normal leading-relaxed">
        No data sources found.
        <br />
        Start by adding your first database connection.
      </p>
    </div>
  ) : (
    <div className="relative overflow-hidden rounded-lg bg-[#1d1f1f] px-6 py-8 shadow-xl">
      <div className="space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="font-merriweather text-white text-lg sm:text-xl font-semibold tracking-tight">
            PostgreSQL Data Sources
          </h2>
          <span className="text-sm text-[#AEB4C0] font-medium">
            {dataSources.length} Connected
          </span>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dataSources.map((source: IDatasource) => (
            <div
              key={source.id}
              className="relative flex flex-col justify-between p-4 rounded-md bg-[#262828] border border-[#21C1D6]/10 hover:border-[#21C1D6]/30 shadow-sm group transition-colors duration-200"
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-sm bg-[#21C1D6]/10 border border-[#21C1D6]/30">
                  <i className="fa fa-database text-[#21C1D6] text-sm" />
                </div>
                <div className="flex flex-col truncate">
                  <h3
                    className="text-white text-sm font-medium truncate"
                    title={source.projectId}
                  >
                    {source.projectId}
                  </h3>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-2 mt-5">
                <span className="text-[10px] bg-[#FEF3C733] text-[#FACC15] px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wide">
                  {source.type}
                </span>

                <button
                  onClick={() => onEdit(source.projectId)}
                  className="w-8 h-8 flex items-center justify-center rounded-sm bg-[#1AA8BD1A] hover:bg-[#21C1D6] transition-colors cursor-pointer"
                  title="Edit"
                >
                  <i className="fa fa-pen text-[#21C1D6] group-hover:text-white text-sm" />
                </button>

                <button
                  onClick={() => onDelete(source.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-sm bg-red-500/10 hover:bg-red-600 transition-colors cursor-pointer"
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
  );
};

export default DataSourceGrid;
