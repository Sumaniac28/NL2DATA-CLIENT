import { useCallback, useEffect, useState } from "react";
import type { FC, ReactElement } from "react";

interface ColumnType {
  name: string;
}

interface IDataSet {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryResultType = { columns: ColumnType[]; dataset: any[] };

const COLORS: string[] = [
  "text-red-500",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-purple-500",
  "text-pink-500",
  "text-indigo-500",
  "text-orange-500",
  "text-teal-500",
];

const DataTable: FC<{ data: Record<string, unknown>[] }> = ({
  data,
}): ReactElement => {
  const [copiedRow, setCopiedRow] = useState<number | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResultType>({
    columns: [],
    dataset: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getObjectString = (cell: any): string => {
    return cell ? cell.toString() : cell;
  };

  const getCellColor = (index: number): string => {
    return COLORS[index % COLORS.length];
  };

  const handleCopy = (rowData: IDataSet[], rowIndex: number): void => {
    const jsonData = JSON.stringify(
      Object.fromEntries(
        rowData.map((value, index) => [queryResult.columns[index].name, value])
      )
    );

    navigator.clipboard.writeText(jsonData);
    setCopiedRow(rowIndex);

    setTimeout(() => {
      setCopiedRow(null);
    }, 2000);
  };

  const mappedTableData = useCallback(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]).map((key) => {
        return {
          name: key,
        };
      });
      const dataset = data.map((row) => Object.values(row));
      setQueryResult({
        columns,
        dataset,
      });
    } else {
      setQueryResult({
        columns: [],
        dataset: [],
      });
    }
  }, [data]);

  useEffect(() => {
    mappedTableData();
  }, [mappedTableData]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#161717] text-sm text-[#AEB4C0]">
      <div className="overflow-x-auto max-h-[calc(100vh-380px)] custom-scrollbar">
        {queryResult && queryResult.dataset.length > 0 ? (
          <table className="w-full border-collapse border-l border-b border-r border-[#21C1D6]/10">
            <thead className="sticky top-0 z-50 bg-[#1d1f1f] text-left text-white border-b border-[#21C1D6]/20">
              <tr>
                {queryResult.columns.map((column) => (
                  <th
                    key={column.name}
                    className="px-4 py-2 truncate whitespace-nowrap border-r border-[#21C1D6]/10 font-medium"
                    style={{ maxWidth: 150 }}
                    title={column.name}
                  >
                    {column.name}
                  </th>
                ))}
                <th className="sticky right-0 z-30 w-12 px-4 py-2 text-center bg-[#1d1f1f] border-r border-[#21C1D6]/10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#AEB4C0]/10">
              {queryResult.dataset.map((row, rowIndex: number) => {
                const rowData: IDataSet[] = row as IDataSet[];
                return (
                  <tr
                    key={rowIndex}
                    className="hover:bg-[#21C1D6]/5 transition-colors"
                  >
                    {rowData.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="overflow-hidden px-4 py-2 truncate whitespace-nowrap border-r border-[#21C1D6]/10"
                        style={{ maxWidth: 150 }}
                        title={getObjectString(cell)}
                      >
                        {typeof cell === "object" ||
                        typeof cell === "boolean" ? (
                          <div
                            className={`${getCellColor(cellIndex)} truncate`}
                          >
                            <pre className="m-0 p-0 bg-transparent overflow-hidden whitespace-nowrap text-ellipsis text-[#FACC15]">
                              {getObjectString(cell)}
                            </pre>
                          </div>
                        ) : (
                          <span className={getCellColor(cellIndex)}>
                            {cell}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="sticky right-0 z-20 px-4 py-2 text-center bg-[#161717] border-l border-[#21C1D6]/10">
                      <button
                        onClick={() => handleCopy(row, rowIndex)}
                        className="text-[#AEB4C0] cursor-pointer hover:text-[#21C1D6] transition-colors"
                        title="Copy row as JSON"
                      >
                        {copiedRow === rowIndex ? (
                          <i className="text-[#FACC15] fa fa-check" />
                        ) : (
                          <i className="fa fa-copy" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-full w-full text-[#AEB4C0]">
            <span className="mt-10">No records to show</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
