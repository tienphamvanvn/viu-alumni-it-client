import { User } from "@/app/shared/types/user.type";

export interface UserState {
  token: string | null;
  account: User | null;
  user: User | null;
  following: User[] | null;
  followers: User[] | null;
  usersSuggestions: User[];
}

export enum UserActionType {
  SIGNUP = "SIGNUP",
  SIGNIN = "SIGNIN",
  SIGNOUT = "SIGNOUT",
  GET_ACCOUNT = "GET_ACCOUNT",
  GET_USER = "GET_USER",
  EDIT_ACCOUNT = "EDIT_ACCOUNT",
  FOLLOW = "FOLLOW",
  UNFOLLOW = "UNFOLLOW",
  GET_FOLLOW = "GET_FOLLOW",
  GET_SUGGESTIONS_USER = "GET_SUGGESTIONS_USER",
  BOOKMARK_POST = "BOOKMARK_POST",
  UNBOOKMAKR_POST = "UNBOOKMAKR_POST",
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

export interface SignOutAction {
  type: typeof UserActionType.SIGNOUT;
  payload: {
    token: null;
    account: null;
  };
}

export interface GetAccountAction {
  type: typeof UserActionType.GET_ACCOUNT;
  payload: {
    token: string;
    account: User;
  };
}

export interface GetUserAction {
  type: typeof UserActionType.GET_USER;
  payload: {
    user: User;
  };
}

export interface EditAccountAction {
  type: typeof UserActionType.EDIT_ACCOUNT;
  payload: {
    account: User;
  };
}

export interface FollowAction {
  type: typeof UserActionType.FOLLOW;
  payload: {
    account: {
      _id: string;
      following: string[];
    };
    user: {
      _id: string;
      followers: string[];
    };
  };
}

export interface UnfollowAction {
  type: typeof UserActionType.UNFOLLOW;
  payload: {
    account: {
      _id: string;
      following: string[];
    };
    user: {
      _id: string;
      followers: string[];
    };
  };
}

export interface GetFollowAction {
  type: typeof UserActionType.GET_FOLLOW;
  payload: {
    following: User[];
    followers: User[];
  };
}

export interface GetSuggestionsUserAction {
  type: typeof UserActionType.GET_SUGGESTIONS_USER;
  payload: {
    usersSuggestions: User[];
  };
}

export interface BookmarkPostAction {
  type: typeof UserActionType.BOOKMARK_POST;
  payload: {
    account: User;
  };
}

export interface UnbookmarkPostAction {
  type: typeof UserActionType.UNBOOKMAKR_POST;
  payload: {
    account: User;
  };
}

export type UserAction =
  | SignUpAction
  | SignInAction
  | SignOutAction
  | GetAccountAction
  | GetUserAction
  | EditAccountAction
  | FollowAction
  | UnfollowAction
  | GetFollowAction
  | GetSuggestionsUserAction
  | BookmarkPostAction
  | UnbookmarkPostAction;
