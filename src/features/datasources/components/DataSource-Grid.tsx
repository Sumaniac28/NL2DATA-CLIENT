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
    <div className="mx-auto w-full max-w-md sm:max-w-xl md:max-w-2xl h-72 flex flex-col items-center justify-center bg-black border border-[#1AA8BD1A] rounded-xl shadow-inner text-center space-y-4 px-4">
      <i className="fa fa-database text-[#21C1D6] text-3xl animate-pulse" />
      <p className="text-[#AEB4C0] text-sm sm:text-base">
        You haven't created any data sources yet.
        <br />
        Start building your database stack.
      </p>
    </div>
  ) : (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-black px-4 py-6 sm:px-6 sm:py-8">
      <div className="relative z-10 space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">
            PostgreSQL Data Sources
          </h2>
          <span className="text-sm text-[#AEB4C0]">
            {dataSources.length} Connected
          </span>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSources.map((source: IDatasource) => (
            <div
              key={source.id}
              className="relative group flex flex-col justify-between p-4 rounded-xl bg-black/30 backdrop-blur-md border border-[#21C1D6]/20 hover:border-[#21C1D6]/40 shadow-md transition-all duration-300"
            >
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute w-32 h-32 bg-[#21C1D6] rounded-full blur-2xl opacity-15 top-0 left-0" />
                <div className="absolute w-32 h-32 bg-[#FACC15] rounded-full blur-2xl opacity-15 bottom-0 right-0" />
              </div>

              <div className="relative z-10 flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#21C1D6]/10 border border-[#21C1D6]/30">
                  <i className="fa fa-database text-[#21C1D6] text-base" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3
                    className="text-white text-sm font-semibold truncate max-w-[160px] sm:max-w-[180px]"
                    title={source.projectId}
                  >
                    {source.projectId}
                  </h3>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-2 sm:gap-3 mt-4">
                <span className="text-[10px] bg-[#FEF3C733] text-[#FACC15] px-2 py-1 rounded font-semibold uppercase tracking-wide whitespace-nowrap">
                  {source.type}
                </span>
                <button
                  onClick={() => onEdit(source.projectId)}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md bg-[#1AA8BD1A] hover:bg-[#21C1D6] transition"
                  title="Edit"
                >
                  <i className="fa fa-pen text-[#21C1D6] group-hover:text-white text-sm sm:text-base" />
                </button>
                <button
                  onClick={() => onDelete(source.id)}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md bg-red-500/10 hover:bg-red-600 transition"
                  title="Delete"
                >
                  <i className="fa fa-trash text-red-500 group-hover:text-white text-sm sm:text-base" />
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
