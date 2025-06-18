export interface IReduxAuthPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authInfo?: any;
}

export interface IReduxAuthPayload {
  type: string;
  payload: IReduxAuthPayload;
}
