import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FC, ReactElement } from "react";
import { useAppSelector } from "../../../store";
import type { IReduxState } from "../../../store/store.interface";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { GET_POSTGRESQL_TABLE_DATA } from "../graphql/postgresql";
import { ToastService } from "../../../shared/services/toast.service";
import {
  addPromptSQLQuery,
  clearPromptSQLQuery,
} from "../reducers/sql.reducer";
import { clearDocuments } from "../reducers/documents.reducer";
import hljs from "highlight.js";

interface PromptEditorProps {
  onLoadingChange: (loading: boolean) => void;
  onPromptResult: (result: string) => void;
}

const PromptEditor: FC<PromptEditorProps> = ({
  onLoadingChange,
  onPromptResult,
}): ReactElement => {
  const rootDatasource = useAppSelector(
    (state: IReduxState) => state.datasource
  );
  const sqlData = useAppSelector((state: IReduxState) => state.sqlQuery);
  const [prompt, setPrompt] = useState<string>("");
  const [sqlQuery, setSqlQuery] = useState<string>("No SQL generated yet");
  const codePreRef = useRef<HTMLPreElement>(null);
  const dispatch = useDispatch();
  const [getSQLQueryData] = useLazyQuery(GET_POSTGRESQL_TABLE_DATA, {
    fetchPolicy: "no-cache",
  });

  const handleSubmit = async (): Promise<void> => {
    const toastService = new ToastService();
    if (!prompt) return;

    try {
      onLoadingChange(true);
      const result = await getSQLQueryData({
        variables: {
          info: {
            prompt,
            projectId: rootDatasource.active?.projectId,
          },
        },
      });

      const data = result?.data?.getSQLQueryData;
      onPromptResult(data);

      const { sql } = JSON.parse(data);
      const dataSQL = sql.replace(/\n/g, " ");
      setSqlQuery(dataSQL.replace(/\s+/g, " "));
      dispatch(addPromptSQLQuery(dataSQL.replace(/\s+/g, " ")));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toastService.show("Failed to return data.", "error");
    } finally {
      onLoadingChange(false);
    }
  };

  const copySqlToClipboard = () => {
    if (sqlQuery) {
      navigator.clipboard
        .writeText(sqlQuery)
        .then(() => console.log("SQL copied to clipboard"))
        .catch((error) => console.log("Failed to copy SQL", error));
    }
  };

  const clearEditor = () => {
    setPrompt("");
    setSqlQuery("No SQL generated yet");
    onPromptResult(JSON.stringify({ sql: "", result: [] }));
    dispatch(clearPromptSQLQuery(""));
    dispatch(clearDocuments([]));
  };

  useEffect(() => {
    if (sqlData && sqlData.promptQuery) {
      setSqlQuery(sqlData.promptQuery);
    }
  }, [sqlData]);

  useEffect(() => {
    if (codePreRef.current) {
      const preElement = codePreRef.current;
      const codeElement = preElement.querySelector("code");
      if (codeElement) {
        codeElement.removeAttribute("data-highlighted");
      }
      hljs.highlightAll();
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#161717]">
      <div className="px-6 py-3 flex justify-end items-center gap-3 bg-[#161717] border-b border-[#21C1D6]/10">
        <button
          onClick={clearEditor}
          type="button"
          className="px-4 py-2 cursor-pointer bg-[#AEB4C0] text-[#161717] rounded-md hover:bg-white transition-colors text-sm font-medium"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          disabled={!prompt}
          className="bg-[#21C1D6] text-[#161717] px-4 py-2 rounded-md hover:bg-[#1AA8BD] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-colors cursor-pointer"
        >
          Run Query
        </button>
      </div>

      <textarea
        name="promptText"
        value={prompt}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setPrompt(event.target.value)
        }
        placeholder="Show me all users who signed up in the last month"
        className="w-full h-36 p-4 bg-[#161717] text-white placeholder-[#AEB4C0] border-t border-[#21C1D6]/10 focus:outline-none resize-none font-mono text-sm"
      />

      <div className="border-t border-[#21C1D6]/10 bg-[#161717] py-3">
        <div className="flex items-center justify-between px-4 mb-2">
          <h3 className="font-medium text-sm text-white">Generated SQL</h3>
          <button
            onClick={copySqlToClipboard}
            className="text-sm cursor-pointer text-[#FACC15] hover:text-[#EAB308] flex items-center gap-2 transition-colors"
          >
            <i className="fa fa-copy" />
            Copy
          </button>
        </div>
        <div className="bg-[#161717] rounded-md font-mono text-sm text-white overflow-x-auto px-4 py-3 border border-[#AEB4C0]/10">
          <pre ref={codePreRef}>
            <code className="language-sql">{sqlQuery}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PromptEditor;
