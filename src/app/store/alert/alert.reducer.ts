import { AlertAction, AlertActionType, AlertState } from "./alert.type";

const initialState: AlertState = {
  isLoading: false,
  success: null,
  error: null,
};

export const alertReducer = (
  state: AlertState = initialState,
  action: AlertAction
): AlertState => {
  switch (action.type) {
    case AlertActionType.ALERT_REQUEST:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        success: null,
        error: null,
      };
    case AlertActionType.ALERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.success,
      };
    case AlertActionType.ALERT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
