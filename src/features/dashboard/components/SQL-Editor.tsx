import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FC, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import type { IReduxState } from "../../../store/store.interface";
import { useLazyQuery } from "@apollo/client";
import type { FetchResult } from "@apollo/client/core";
import { EXECUTE_POSTGRESQL_QUERY } from "../graphql/postgresql";
import { ToastService } from "../../../shared/services/toast.service";
import { addDocuments, clearDocuments } from "../reducers/documents.reducer";
import { addSQLQuery, clearSQLQuery } from "../reducers/sql.reducer";
import {
  addLimitIfNeeded,
  addQuotesToColumnNames,
  addQuotesToTableNames,
} from "../../../shared/utils/pg-utils";

interface SqlEditorProps {
  onQueryResult: (results: Record<string, unknown>[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

interface ValidationState {
  message: string;
  isValid: boolean;
}

type QueryValidationResult = {
  isValid: boolean;
  message: string;
};

const SqlEditor: FC<SqlEditorProps> = ({
  onQueryResult,
  onLoadingChange,
}): ReactElement => {
  const rootDatasource = useAppSelector(
    (state: IReduxState) => state.datasource
  );
  const sqlData = useAppSelector((state: IReduxState) => state.sqlQuery);
  const [query, setQuery] = useState<string>("");
  const [validationState, setValidationState] = useState<ValidationState>({
    message: "",
    isValid: false,
  });
  const dispatch = useAppDispatch();
  const [executePostgreSQLQuery] = useLazyQuery(EXECUTE_POSTGRESQL_QUERY, {
    fetchPolicy: "no-cache",
  });

  const isSelectStatement = useCallback((queryText: string): boolean => {
    const normalizedQuery = queryText.trim().toUpperCase();

    if (!normalizedQuery.startsWith("SELECT")) {
      return false;
    }

    const prohibitedKeywords: ReadonlyArray<string> = [
      "INSERT",
      "UPDATE",
      "DELETE",
      "DROP",
      "CREATE",
      "ALTER",
      "TRUNCATE",
      "GRANT",
      "REVOKE",
    ];

    return !prohibitedKeywords.some((keyword) =>
      normalizedQuery.includes(keyword)
    );
  }, []);

  const validateQuery = useCallback(
    (queryText: string): QueryValidationResult => {
      if (!queryText.trim()) {
        return {
          message: "Please enter a SQL query",
          isValid: false,
        };
      }

      if (!isSelectStatement(queryText)) {
        return {
          message: "Only SELECT statements are allowed",
          isValid: false,
        };
      }

      return {
        message: "Valid SELECT query",
        isValid: true,
      };
    },
    [isSelectStatement]
  );

  const onQueryChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newQuery = event.target.value;
      setQuery(newQuery);

      const validationResult = validateQuery(newQuery);
      setValidationState({
        message: validationResult.message,
        isValid: validationResult.isValid,
      });
    },
    [validateQuery]
  );

  const getTableData = useCallback(
    async (projectId: string, sqlQuery: string): Promise<void> => {
      const toastService: ToastService = new ToastService();
      try {
        onLoadingChange(true);
        const result: FetchResult = await executePostgreSQLQuery({
          variables: {
            data: {
              projectId,
              sqlQuery,
            },
          },
        });
        const data = result?.data?.executePostgreSQLQuery;
        const { documents } = data;
        console.log(JSON.parse(documents));
        const filteredDocuments = JSON.parse(documents).filter(
          (obj: Record<string, unknown>) => Object.keys(obj).length > 0
        );
        dispatch(addDocuments(filteredDocuments));
        onQueryResult(filteredDocuments);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toastService.show("Failed to return tables", "error");
      } finally {
        onLoadingChange(false);
      }
    },
    [dispatch, executePostgreSQLQuery, onLoadingChange, onQueryResult]
  );

  const executeQuery = () => {
    if (validationState.isValid && query) {
      dispatch(addSQLQuery(query));
      const processedQuery = addLimitIfNeeded(query);
      const updatedPGTable = addQuotesToTableNames(processedQuery);
      const updatedPGColumns = addQuotesToColumnNames(updatedPGTable);
      getTableData(`${rootDatasource.active?.projectId}`, updatedPGColumns);
    }
  };

  const clearEditor = () => {
    setQuery("");
    setValidationState({
      message: "",
      isValid: false,
    });
    dispatch(clearSQLQuery(""));
    dispatch(clearDocuments([]));
    onQueryResult([]);
  };

  const validationMessageClasses = `px-3 py-1 rounded-sm ${
    validationState.isValid
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800"
  }`;

  useEffect(() => {
    if (sqlData && sqlData.sqlQuery) {
      setQuery(sqlData.sqlQuery);
    }
  }, [sqlData]);

  return (
    <div className="h-full flex flex-col bg-[#161717]">
      <div className="px-6 py-3 flex justify-end items-center gap-3 border-b border-[#21C1D6]/10">
        <button
          onClick={clearEditor}
          className="px-4 py-2 cursor-pointer bg-[#AEB4C0] text-[#161717] rounded-md hover:bg-white transition-colors text-sm font-medium"
        >
          Clear
        </button>
        <button
          onClick={executeQuery}
          disabled={!validationState.isValid}
          className="bg-[#21C1D6] cursor-pointer text-[#161717] px-4 py-2 rounded-md hover:bg-[#1AA8BD] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-colors"
        >
          Run Query
        </button>
      </div>
      <div className="w-full mx-auto">
        <div className="bg-[#161717] px-6 py-5">
          <div className="relative">
            <textarea
              value={query}
              onChange={onQueryChange}
              className="w-full h-28 bg-[#161717] text-white font-mono text-sm p-4 rounded-md resize-none border border-[#21C1D6]/10 focus:outline-none placeholder-[#AEB4C0]"
              placeholder="Enter your SELECT query here..."
            ></textarea>

            {validationState.message && (
              <div
                className={`${validationMessageClasses} mt-2 text-xs font-medium`}
              >
                {validationState.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlEditor;
