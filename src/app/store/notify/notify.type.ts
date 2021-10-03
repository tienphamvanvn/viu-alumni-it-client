import { Notify } from "@/app/shared/types/notify.type";

export interface NotifyState {
  notifies: Notify[];
}

export enum NotifyActionType {
  CREATE_NOTIFY = "CREATE_NOTIFY",
  DELETE_NOTIFY = "DELETE_NOTIFY",
  DELETE_ALL_NOTIFIES = "DELETE_ALL_NOTIFIES",
  GET_NOTIFIES = "GET_NOTIFIES",
  UPDATE_NOTIFY = "UPDATE_NOTIFY",
}

export interface CreateNotifyAction {
  type: typeof NotifyActionType.CREATE_NOTIFY;
  payload: {
    notify: Notify;
  };
}

export interface GetNotifiesAction {
  type: typeof NotifyActionType.GET_NOTIFIES;
  payload: {
    notifies: Notify[];
  };
}

export interface DeleteNotifyAction {
  type: typeof NotifyActionType.DELETE_NOTIFY;
  payload: {
    notify: Notify;
  };
}

export interface UpdateNotifyAction {
  type: typeof NotifyActionType.UPDATE_NOTIFY;
  payload: {
    notify: Notify;
    notifies: Notify[];
  };
}

export type NotifyAction =
  | CreateNotifyAction
  | GetNotifiesAction
  | DeleteNotifyAction
  | UpdateNotifyAction;
