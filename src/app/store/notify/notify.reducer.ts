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
        notifies: [action.payload.notify, ...state.notifies],
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
        notifies: state.notifies.map(notify =>
          notify._id === action.payload.notify._id
            ? action.payload.notify
            : notify
        ),
      };

    default:
      return state;
  }
};
