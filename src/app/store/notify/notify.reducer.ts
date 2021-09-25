import { NotifyAction, NotifyActionType, NotifyState } from "./notify.type";

const initialState: NotifyState = {
  notifies: [],
};

export const notifyReducer = (
  state: NotifyState = initialState,
  action: NotifyAction
): NotifyState => {
  switch (action.type) {
    case NotifyActionType.CREATE_NOTIFY:
      return {
        ...state,
        notifies: [...state.notifies, action.payload.notify],
      };
    case NotifyActionType.GET_NOTIFIES:
      return {
        ...state,
        notifies: action.payload.notifies,
      };
    case NotifyActionType.DELETE_NOTIFY:
      return {
        ...state,
        notifies: state.notifies.filter(
          notify =>
            notify.uId !== action.payload.notify.uId ||
            notify.url !== action.payload.notify.url
        ),
      };
    case NotifyActionType.UPDATE_NOTIFY:
      return {
        ...state,
        notifies: action.payload.notifies,
      };

    default:
      return state;
  }
};
