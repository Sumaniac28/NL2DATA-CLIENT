import { useEffect, useState } from "react";
import type { FC, ReactElement, ChangeEvent, FormEvent } from "react";
import type { IPostgreSQLDatasource } from "../interfaces/datasource.interface";
import clsx from "clsx";
import { eventBus } from "../../../shared/events";
import { EventType } from "../../../shared/events/types";

interface DataSourceFormProps {
  datasource?: IPostgreSQLDatasource;
  onCancel: () => void;
  type: "Add" | "Edit";
}

const DataSourceForm: FC<DataSourceFormProps> = ({
  datasource,
  onCancel,
  type,
}): ReactElement => {
  const [formData, setFormData] = useState<IPostgreSQLDatasource>({
    projectId: "",
    databaseName: "",
    databaseUrl: "",
    username: "",
    password: "",
    port: "",
  });

  const [isTested, setIsTested] = useState<boolean>(false);

  const isValid =
    Object.values(formData).every(
      (value) => value.length > 0 && value.trim() !== ""
    ) &&
    formData.port.length >= 4 &&
    formData.port.length <= 6;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsTested(false);
  };

  const handleCancel = (): void => {
    setFormData({
      projectId: "",
      databaseName: "",
      databaseUrl: "",
      username: "",
      password: "",
      port: "",
    });
    setIsTested(false);
    onCancel();
  };

  const handleTestDatasourceConnection = (): void => {
    if (isValid) {
      eventBus.publish(EventType.POSTGRESQL_DATASOURCE_TEST, formData);
    }
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (isValid && isTested) {
      eventBus.publish(EventType.POSTGRESQL_DATASOURCE_SAVE, {
        ...formData,
        ...(datasource && {
          id: datasource.id,
          userId: datasource.userId,
        }),
      });
    }
  };

  useEffect(() => {
    if (datasource) {
      const { projectId, port, databaseName, databaseUrl, username, password } =
        datasource;

      setFormData({
        projectId: projectId || "",
        databaseUrl: databaseUrl || "",
        port: port || "",
        databaseName: databaseName || "",
        username: username || "",
        password: password || "",
      });
    }
  }, [datasource]);

  useEffect(() => {
    const handleTestResult = (payload: unknown) => {
      setIsTested(Boolean(payload));
    };
    eventBus.subscribe(
      EventType.POSTGRESQL_DATASOURCE_TEST_SUCCESS,
      handleTestResult
    );
    return () => {
      eventBus.unsubscribe(
        EventType.POSTGRESQL_DATASOURCE_TEST_SUCCESS,
        handleTestResult
      );
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-black border border-[#1AA8BD] rounded-lg shadow-xl p-4 sm:p-6 md:p-8 space-y-5"
      autoComplete="off"
    >
      <h2 className="text-xl font-semibold text-white">{type} Data Source</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#AEB4C0] mb-1">
            Connection Identifier
          </label>
          <input
            type="text"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full rounded-md bg-[#0A0F1C] border border-[#AEB4C0] text-white px-3 py-2 focus:ring-2 focus:ring-[#21C1D6] outline-none transition"
            placeholder="Ex: dataviz-pg-connection"
          />
        </div>

        <div>
          <label className="block text-sm text-[#AEB4C0] mb-1">
            Host address
          </label>
          <input
            type="text"
            name="databaseUrl"
            value={formData.databaseUrl}
            onChange={handleChange}
            className="w-full rounded-md bg-[#0A0F1C] border border-[#AEB4C0] text-white px-3 py-2 focus:ring-2 focus:ring-[#21C1D6] outline-none transition"
            placeholder="My Database Connection"
          />
        </div>

        <div>
          <label className="block text-sm text-[#AEB4C0] mb-1">Port</label>
          <input
            type="text"
            name="port"
            value={formData.port}
            onChange={handleChange}
            className="w-full rounded-md bg-[#0A0F1C] border border-[#AEB4C0] text-white px-3 py-2 focus:ring-2 focus:ring-[#21C1D6] outline-none transition"
            placeholder="5432"
          />
        </div>

        <div>
          <label className="block text-sm text-[#AEB4C0] mb-1">
            Database Name
          </label>
          <input
            type="text"
            name="databaseName"
            value={formData.databaseName}
            onChange={handleChange}
            className="w-full rounded-md bg-[#0A0F1C] border border-[#AEB4C0] text-white px-3 py-2 focus:ring-2 focus:ring-[#21C1D6] outline-none transition"
            placeholder="my_database"
          />
        </div>

        <div>
          <label className="block text-sm text-[#AEB4C0] mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="new-username"
            className="w-full rounded-md bg-[#0A0F1C] border border-[#AEB4C0] text-white px-3 py-2 focus:ring-2 focus:ring-[#21C1D6] outline-none transition"
            placeholder="Username"
          />
        </div>

        <div>
          <label className="block text-sm text-[#AEB4C0] mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full rounded-md bg-[#0A0F1C] border border-[#AEB4C0] text-white px-3 py-2 focus:ring-2 focus:ring-[#21C1D6] outline-none transition"
            placeholder="********"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={clsx(
              "text-sm font-semibold px-4 py-2 rounded-md transition w-full sm:w-auto",
              {
                "bg-[#21C1D6] text-black hover:bg-[#1AA8BD] cursor-pointer":
                  isValid && isTested,
                "bg-[#1AA8BD]/40 text-black cursor-not-allowed": !(
                  isValid && isTested
                ),
              }
            )}
          >
            Save
          </button>
        </div>

        <button
          type="button"
          onClick={handleTestDatasourceConnection}
          className={clsx(
            "text-sm font-semibold px-4 py-2 rounded-md transition w-full sm:w-auto",
            {
              "bg-[#21C1D6] text-black hover:bg-[#1AA8BD] cursor-pointer":
                isValid,
              "bg-[#1AA8BD]/40 text-black cursor-not-allowed": !isValid,
            }
          )}
        >
          Test Connection
        </button>
      </div>
    </form>
  );
};

export default DataSourceForm;
