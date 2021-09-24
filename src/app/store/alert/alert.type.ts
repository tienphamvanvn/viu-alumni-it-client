export interface AlertState {
  isLoading: boolean;
  success: string | null;
  error: string | null;
}

export enum AlertActionType {
  ALERT_REQUEST = "ALERT_REQUEST",
  ALERT_SUCCESS = "ALERT_SUCCESS",
  ALERT_FAILURE = "ALERT_FAILURE",
}

export interface AlertRequest {
  type: typeof AlertActionType.ALERT_REQUEST;
  payload: {
    isLoading: boolean;
  };
}

export interface AlertSuccess {
  type: typeof AlertActionType.ALERT_SUCCESS;
  payload: {
    success: string;
  };
}

export interface AlertFailure {
  type: typeof AlertActionType.ALERT_FAILURE;
  payload: {
    error: string;
  };
}

export type AlertAction = AlertRequest | AlertSuccess | AlertFailure;
