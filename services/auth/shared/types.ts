export enum HasuraRole {
  admin = "admin",
}

export type HasuraAction = {
  name: string;
};

export interface HasuraActionRequestBody<T, U> {
  action: HasuraAction;
  input: T;
  "session_variables": U;
}
