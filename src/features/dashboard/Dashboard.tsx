import { useEffect, useState } from "react";
import type { FC, ReactElement } from "react";
import { useAppSelector } from "../../store";
import type { IReduxState } from "../../store/store.interface";
import DataSourceSidebar from "./components/Data-Sidebar";
import PromptEditor from "./components/Prompt-Editor";
import SqlEditor from "./components/SQL-Editor";
import ResultTable from "./components/Result-Table";

import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";

interface ITab {
  label: string;
}

interface ITableData {
  prompt: Record<string, unknown>[];
  sql: Record<string, unknown>[];
}

const tabs: ITab[] = [{ label: "Prompt" }, { label: "Query" }];

const Dashboard: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const documents = useAppSelector((state: IReduxState) => state.documents);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [tableData, setTableData] = useState<ITableData>({
    prompt: [],
    sql: [],
  });

  const handlePromptResult = (event: string): void => {
    const { result } = JSON.parse(event);
    setTableData({ ...tableData, prompt: result });
  };

  const handleQueryResult = (
    filteredDocuments: Record<string, unknown>[]
  ): void => {
    setTableData({ ...tableData, sql: filteredDocuments });
  };

  useEffect(() => {
    if (documents.length > 0) {
      setTableData((data) => ({ ...data, sql: documents }));
      setActiveTab(1);
    }
  }, [documents]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      <header className="bg-[#161717] flex justify-between items-center px-4 py-2 shadow-md">
        <div className="flex items-center gap-3">
          <h1 className="font-orbitron text-xl font-semibold text-white tracking-wide">
            Query Dashboard
          </h1>
        </div>

        <div className="text-sm font-medium text-[#AEB4C0] cursor-default">
          {authUser?.email}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="bg-[#161717] flex-1 flex flex-col w-[200px] overflow-auto">
          <div className="bg-black border-b border-[#21C1D6]/20 h-12 flex items-center justify-between px-2 overflow-x-auto">
            <div className="flex flex-1 overflow-x-auto">
              {tabs.map((tab: ITab, index: number) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                      isActive
                        ? "border-[#FACC15] text-white"
                        : "border-transparent text-[#AEB4C0] hover:text-[#21C1D6]"
                    } cursor-pointer`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="ml-auto flex-shrink-0 pl-2">
              <button
                onClick={toggleDrawer}
                className="text-[#21C1D6] border border-[#21C1D6]/30 px-3 py-1 rounded-md hover:bg-[#21C1D6]/10 transition-colors text-sm cursor-pointer"
              >
                {isOpen ? "Close Data Drawer" : "Open Data Drawer"}
              </button>
            </div>
          </div>

          <div className="h-60">
            {activeTab === 0 ? (
              <PromptEditor
                onLoadingChange={(loading) => setIsLoading(loading)}
                onPromptResult={handlePromptResult}
              />
            ) : (
              <SqlEditor
                onLoadingChange={(loading) => setIsLoading(loading)}
                onQueryResult={handleQueryResult}
              />
            )}
          </div>

          {tableData.prompt && activeTab === 0 && (
            <ResultTable tableResult={tableData.prompt} isLoading={isLoading} />
          )}
          {tableData.sql && activeTab === 1 && (
            <ResultTable tableResult={tableData.sql} isLoading={isLoading} />
          )}
        </div>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="!w-72 !h-screen bg-[#161717] text-white overflow-auto"
        >
          <div className="h-full overflow-y-auto">
            <DataSourceSidebar />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Dashboard;
