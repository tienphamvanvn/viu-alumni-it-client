import { User } from "@/app/shared/types/user.type";
import { UserAction, UserActionType, UserState } from "./user.type";

const initialState: UserState = {
  token: null,
  account: null,
  user: null,
  following: null,
  followers: null,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionType.SIGNUP:
      return {
        ...state,
      };
    case UserActionType.SIGNIN:
    case UserActionType.GET_ACCOUNT:
      return {
        ...state,
        token: action.payload.token,
        account: action.payload.account,
      };
    case UserActionType.GET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case UserActionType.EDIT_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      };
    case UserActionType.FOLLOW:
    case UserActionType.UNFOLLOW:
      if (state.account?._id === action.payload.user._id) {
        return {
          ...state,
          account: {
            ...state.account,
            followers: action.payload.user.followers,
          },
        };
      } else {
        return {
          ...state,
          account: {
            ...state.account,
            following: action.payload.account.following,
          } as User,
          user: {
            ...state.user,
            followers: action.payload.user.followers,
          } as User,
        };
      }
    case UserActionType.GET_FOLLOW:
      return {
        ...state,
        following: action.payload.following,
        followers: action.payload.followers,
      };

    default:
      return state;
  }
};
