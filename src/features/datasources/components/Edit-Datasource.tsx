import type { FC, ReactElement } from "react";
import { useEffect, useRef } from "react";
import ModalComponent from "../../../shared/components/Modal";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useMutation, useQuery, type FetchResult } from "@apollo/client";
import {
  CHECK_POSTGRESQL_CONNECTION,
  EDIT_DATASOURCE,
  GET_SINGLE_DATA_SOURCE,
} from "../graphql/datasource";
import { eventBus } from "../../../shared/events";
import { EventType } from "../../../shared/events/types";
import type {
  IDatasource,
  IPostgreSQLDatasource,
} from "../interfaces/datasource.interface";
import DataSourceForm from "./Datasource-Form";
import { ToastService } from "../../../shared/services/toast.service";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../shared/utils/utils";
import { addDataSource } from "../reducers/datasource.reducer";
import type { IReduxState } from "../../../store/store.interface";

const EditDatasource: FC<{ projectId: string }> = ({
  projectId,
}): ReactElement => {
  const rootDatasource = useAppSelector(
    (state: IReduxState) => state.datasource
  );
  const dispatch = useAppDispatch();
  const selectedDatasourceData = useRef<IPostgreSQLDatasource | undefined>(
    undefined
  );
  const [checkPostgresqlConnection] = useMutation(CHECK_POSTGRESQL_CONNECTION, {
    fetchPolicy: "no-cache",
  });
  const [editDataSource] = useMutation(EDIT_DATASOURCE, {
    fetchPolicy: "no-cache",
  });
  const { data, error } = useQuery(GET_SINGLE_DATA_SOURCE, {
    fetchPolicy: "no-cache",
    variables: { projectId },
  });
  if (!error && data) {
    const { getDataSourceByProjectId } = data;
    selectedDatasourceData.current = getDataSourceByProjectId;
  }

  const closeModal = (): void => {
    eventBus.publish(EventType.CLOSE_DATASOURCE_MODAL, false);
  };

  const handleConnectionSave = async (
    config: IPostgreSQLDatasource
  ): Promise<void> => {
    const toastService: ToastService = new ToastService();
    try {
      const updatedConfig: IPostgreSQLDatasource = {
        ...config,
        username: config.username,
        password: config.password,
        databaseName: config.databaseName,
        databaseUrl: config.databaseUrl,
      };
      const result: FetchResult = await editDataSource({
        variables: { source: updatedConfig },
      });
      if (result && result.data) {
        const { dataSource } = result.data.editDataSource;
        const activeDatasource = rootDatasource.active;
        const activeProject = getLocalStorageItem("activeProject");
        if (
          activeProject !== "undefined" &&
          activeProject.projectId === activeDatasource?.projectId
        ) {
          const datasourceActive = dataSource.find(
            (source: IDatasource) => source.projectId === config.projectId
          );
          setLocalStorageItem(
            "activeProject",
            JSON.stringify(datasourceActive)
          );
        }
        const activeSource =
          activeProject !== "undefined" &&
          activeProject.projectId === activeDatasource?.projectId
            ? activeDatasource
            : dataSource[0];
        dispatch(
          addDataSource({
            active: activeSource,
            database: activeSource.database,
            dataSource,
          })
        );
        toastService.show(
          "PostgreSQL datasource updated successfully.",
          "success"
        );
        eventBus.publish(EventType.CLOSE_DATASOURCE_MODAL, false);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toastService.show("Failed to update postgresql datasource.", "error");
    }
  };

  const handleConnectionTest = async (
    config: IPostgreSQLDatasource
  ): Promise<void> => {
    const toastService: ToastService = new ToastService();
    try {
      const result: FetchResult = await checkPostgresqlConnection({
        variables: { datasource: config },
      });
      if (result && result.data) {
        toastService.show("PostgreSQL connection test successful.", "success");
        eventBus.publish(EventType.POSTGRESQL_DATASOURCE_TEST_SUCCESS, true);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toastService.show("PostgreSQL connection test failed.", "error");
      eventBus.publish(EventType.POSTGRESQL_DATASOURCE_TEST_SUCCESS, false);
    }
  };

  useEffect(() => {
    const handleTest = (payload: unknown) => {
      handleConnectionTest(payload as IPostgreSQLDatasource);
    };

    const handleSave = (payload: unknown) => {
      handleConnectionSave(payload as IPostgreSQLDatasource);
    };

    eventBus.subscribe(EventType.POSTGRESQL_DATASOURCE_TEST, handleTest);
    eventBus.subscribe(EventType.POSTGRESQL_DATASOURCE_SAVE, handleSave);

    return () => {
      eventBus.unsubscribe(EventType.POSTGRESQL_DATASOURCE_TEST, handleTest);
      eventBus.unsubscribe(EventType.POSTGRESQL_DATASOURCE_SAVE, handleSave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalComponent>
      <div className="w-full md:w-[600px] md:max-w-2xl">
        <DataSourceForm
          onCancel={closeModal}
          datasource={selectedDatasourceData.current}
          type={"Edit"}
        />
      </div>
    </ModalComponent>
  );
};

export default EditDatasource;
