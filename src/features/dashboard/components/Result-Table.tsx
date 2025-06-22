import { useEffect, useState } from "react";
import type { FC, ReactElement } from "react";
import DataTable from "./Table";
import Pagination from "../../../shared/components/Pagination.tsx";

interface IResultTable {
  isLoading: boolean;
  tableResult: Record<string, unknown>[];
}

const ITEMS_PER_PAGE = 20;

const ResultTable: FC<IResultTable> = ({
  tableResult,
  isLoading,
}): ReactElement => {
  const [tableData, setTableData] = useState<Record<string, unknown>[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = tableResult.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const onCurrentPageData = (event: number): void => {
    setCurrentPage(event);
    const currentPageData = tableResult.slice(startIndex, endIndex);
    setTableData(currentPageData);
  };

  useEffect(() => {
    if (tableResult.length > 0) {
      const currentPageData = tableResult.slice(startIndex, endIndex);
      setTableData(currentPageData);
    } else {
      setTableData([]);
    }
  }, [endIndex, startIndex, tableResult]);

  return (
    <div className="flex flex-col relative bg-[#1d1f1f] text-white">
      <div className="border-b border-[#21C1D6]/10 py-2 flex justify-between items-center">
        <h3 className="font-semibold px-4 text-base text-white w-full">
          Query Results
        </h3>

        {tableResult.length > 0 && (
          <div className="flex items-end pr-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPaginationData={onCurrentPageData}
            />
          </div>
        )}
      </div>

      <DataTable data={tableData} />

      {isLoading && (
        <div className="absolute inset-0 bg-[#1d1f1f]/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div
            className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#21C1D6] border-r-transparent"
            role="status"
            aria-label="Loading"
          />
        </div>
      )}
    </div>
  );
};

export default ResultTable;
