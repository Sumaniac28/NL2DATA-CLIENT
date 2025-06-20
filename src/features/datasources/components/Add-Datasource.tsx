import { useEffect } from "react";
import type { FC, ReactElement } from "react";
import ModalComponent from "../../../shared/components/Modal";
import { useAppDispatch } from "../../../store";
import { useMutation, type FetchResult } from "@apollo/client";
import {
  CHECK_POSTGRESQL_CONNECTION,
  CREATE_POSTGRESQL_DATASOURCE,
} from "../graphql/datasource";
import { eventBus } from "../../../shared/events";
import { EventType } from "../../../shared/events/types";
import type { IPostgreSQLDatasource } from "../interfaces/datasource.interface";
import DataSourceForm from "./Datasource-Form";
import { ToastService } from "../../../shared/services/toast.service";
import { setLocalStorageItem } from "../../../shared/utils/utils";
import { addDataSource } from "../reducers/datasource.reducer";

const AddDatasource: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [checkPostgresqlConnection] = useMutation(CHECK_POSTGRESQL_CONNECTION, {
    fetchPolicy: "no-cache",
  });
  const [createPostgresqlDataSource] = useMutation(
    CREATE_POSTGRESQL_DATASOURCE,
    {
      fetchPolicy: "no-cache",
    }
  );

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
      const result: FetchResult = await createPostgresqlDataSource({
        variables: { source: updatedConfig },
      });
      if (result && result.data) {
        const { dataSource } = result.data.createPostgresqlDataSource;
        setLocalStorageItem("activeProject", JSON.stringify(dataSource[0]));
        dispatch(
          addDataSource({
            active: dataSource[0],
            database: dataSource[0].database,
            dataSource,
          })
        );
        toastService.show(
          "PostgreSQL datasource created successfully.",
          "success"
        );
        eventBus.publish(EventType.CLOSE_DATASOURCE_MODAL, false);
      }
    } catch (error) {
      console.error("Error creating PostgreSQL datasource:", error);
      toastService.show("Failed to create postgresql datasource.", "error");
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
    } catch (error) {
      console.error("Error testing PostgreSQL connection:", error);
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
        <DataSourceForm onCancel={closeModal} type={"Add"} />
      </div>
    </ModalComponent>
  );
};

export default AddDatasource;
