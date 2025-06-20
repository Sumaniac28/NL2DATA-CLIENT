export type EventType =
  | "toast.message"
  | "postgresql.datasource.test"
  | "postgresql.datasource.save"
  | "postgresql.datasource.test.success"
  | "close.datasource.modal"
  | "generate.chart"
  | "save.chart"
  | "chart.change";

export const EventType = {
  TOAST_MESSAGE: "toast.message" as EventType,
  POSTGRESQL_DATASOURCE_TEST: "postgresql.datasource.test" as EventType,
  POSTGRESQL_DATASOURCE_SAVE: "postgresql.datasource.save" as EventType,
  POSTGRESQL_DATASOURCE_TEST_SUCCESS:
    "postgresql.datasource.test.success" as EventType,
  CLOSE_DATASOURCE_MODAL: "close.datasource.modal" as EventType,
  GENERATE_CHART: "generate.chart" as EventType,
  SAVE_CHART: "save.chart" as EventType,
  CHART_CHANGE: "chart.change" as EventType,
};
