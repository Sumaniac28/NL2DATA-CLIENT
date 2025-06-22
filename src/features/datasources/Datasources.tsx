import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { FC, ReactElement } from "react";
import { eventBus } from "../../shared/events";
import { EventType } from "../../shared/events/types";
import { useAppDispatch, useAppSelector } from "../../store";
import { useMutation, type FetchResult } from "@apollo/client";
import { addDataSource } from "./reducers/datasource.reducer";
import { ToastService } from "../../shared/services/toast.service";
import { DELETE_DATA_SOURCE } from "./graphql/datasource";
import { setLocalStorageItem } from "../../shared/utils/utils";
import type { IDatasource } from "./interfaces/datasource.interface";

const DataSourceGrid = lazy(() => import("./components/DataSource-Grid"));
const AddDatasource = lazy(() => import("./components/Add-Datasource"));
const EditDatasource = lazy(() => import("./components/Edit-Datasource"));

interface IModal {
  add: boolean;
  edit: boolean;
}

const Datasource: FC = (): ReactElement => {
  const rootDatasource = useAppSelector((state) => state.datasource);
  const [modal, setModal] = useState<IModal>({ add: false, edit: false });
  const selectedProjectId = useRef<string>("");
  const dispatch = useAppDispatch();
  const [deleteDatasource] = useMutation(DELETE_DATA_SOURCE, {
    fetchPolicy: "no-cache",
  });

  const showAddModal = (): void => {
    setModal({ ...modal, add: true });
  };

  const handleEdit = (projectId: string): void => {
    selectedProjectId.current = projectId;
    setModal({ ...modal, edit: true });
  };

  const handleDelete = async (datasourceId: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this data source?")) {
      const toastService: ToastService = new ToastService();
      try {
        const result: FetchResult = await deleteDatasource({
          variables: { datasourceId },
        });
        if (result && result.data) {
          const { id } = result.data.deleteDatasource;
          const active = rootDatasource.active;
          const sources = rootDatasource.dataSource.filter(
            (source: IDatasource) => source.id !== id
          );
          const hasActiveDatasource = sources.some(
            (source: IDatasource) => source.id === active?.id
          );
          const activeSource = hasActiveDatasource ? active : sources[0];
          dispatch(
            addDataSource({
              active: activeSource,
              database: activeSource?.database,
              dataSource: sources,
            })
          );
          setLocalStorageItem("activeProject", JSON.stringify(activeSource));
          toastService.show(
            "PostgreSQL datasource deleted successfully.",
            "success"
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toastService.show("Failed to delete datasource.", "error");
      }
    }
  };

  useEffect(() => {
    eventBus.subscribe(EventType.CLOSE_DATASOURCE_MODAL, (payload: unknown) => {
      setModal({ edit: payload as boolean, add: payload as boolean });
    });

    return () => {
      eventBus.unsubscribe(EventType.CLOSE_DATASOURCE_MODAL, () => {
        console.log("CLOSE_DATASOURCE_MODAL event unsubscribed");
      });
    };
  }, []);

  return (
    <div className="min-h-full bg-[#161717] px-4 py-4 sm:px-6 md:px-8 lg:px-12">
      <div className="sm:mb-2 rounded-xl p-4 sm:p-6 md:p-8 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight sm:leading-snug text-white">
              Data Sources
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#AEB4C0]">
              View and manage your datasources
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={showAddModal}
              className="w-full sm:w-auto bg-[#21C1D6] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-[#1AA8BD] flex items-center justify-center sm:justify-start gap-2 sm:gap-3 shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 text-sm sm:text-base font-semibold cursor-pointer"
            >
              <i className="fa fa-plus text-white text-base sm:text-lg drop-shadow-sm"></i>
              Add Data Source
            </button>
          </div>
        </div>
      </div>

      <Suspense>
        <div className="p-4 sm:p-6 md:p-8">
          <DataSourceGrid
            dataSources={rootDatasource?.dataSource ?? []}
            onEdit={(projectId) => handleEdit(projectId)}
            onDelete={(id) => handleDelete(id)}
          />
        </div>
      </Suspense>

      {modal.add && (
        <Suspense>
          <AddDatasource />
        </Suspense>
      )}
      {modal.edit && (
        <Suspense>
          <EditDatasource projectId={selectedProjectId.current} />
        </Suspense>
      )}
    </div>
  );
};

export default Datasource;
