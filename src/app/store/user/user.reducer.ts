import { UserAction, UserActionType, UserState } from "./user.type";

const initialState: UserState = {
  token: null,
  account: null,
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

    default:
      return state;
  }
};
