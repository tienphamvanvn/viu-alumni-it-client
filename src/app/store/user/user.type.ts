import { User } from "@/app/shared/types/user.type";

export interface UserState {
  token: string | null;
  account: User | null;
}

export enum UserActionType {
  SIGNUP = "SIGNUP",
  SIGNIN = "SIGNIN",
  GET_ACCOUNT = "GET_ACCOUNT",
}

export interface SignUpAction {
  type: typeof UserActionType.SIGNUP;
}

export interface SignInAction {
  type: typeof UserActionType.SIGNIN;
  payload: {
    token: string;
    account: User;
  };
}

export interface GetAccountAction {
  type: typeof UserActionType.GET_ACCOUNT;
  payload: {
    token: string;
    account: User;
  };
}

export type UserAction = SignUpAction | SignInAction | GetAccountAction;
