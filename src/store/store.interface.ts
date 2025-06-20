import type { IAppDataSource } from "../features/datasources/interfaces/datasource.interface";
import type { IUser } from "../shared/interfaces/user.interface";

export interface IReduxState {
  authUser: IUser;
  logout: boolean;
  datasource: IAppDataSource;
}
