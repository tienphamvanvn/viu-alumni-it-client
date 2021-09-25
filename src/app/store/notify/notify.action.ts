import { Socket } from "socket.io-client";
import { errorHandler } from "@/app/shared/utils/error-handler";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "@/app/shared/utils/fetch-data";
import { AppThunk } from "../global.store";
import { AlertActionType } from "../alert/alert.type";
import { NotifyActionType } from "./notify.type";
import { User } from "@/app/shared/types/user.type";
import { Notify, NotifyProps } from "@/app/shared/types/notify.type";

export const createNotify =
  ({
    account,
    token,
    notify,
    socket,
  }: {
    account: User;
    token: string;
    notify: NotifyProps;
    socket: Socket;
  }): AppThunk =>
  async dispatch => {
    try {
      const { data } = await postDataAPI("notify/create", notify, token);

      socket.emit("createNotify", {
        ...data.notify,
        user: {
          fullname: account.fullname,
          studentID: account.studentID,
          profilePicture: account.profilePicture,
        },
      });
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const getNotifies =
  (token: string): AppThunk =>
  async dispatch => {
    try {
      const { data } = await getDataAPI("notify", token);

      dispatch({
        type: NotifyActionType.GET_NOTIFIES,
        payload: {
          notifies: data.notifies,
        },
      });
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const deleteNotify =
  ({
    token,
    notify,
    socket,
  }: {
    token: string;
    notify: NotifyProps;
    socket: Socket;
  }): AppThunk =>
  async dispatch => {
    try {
      await deleteDataAPI(
        `notify/${notify.uId}/delete?url=${notify.url}`,
        token
      );

      socket.emit("deleteNotify", notify);
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const updateNotify =
  (msg: Notify, token: string | null): AppThunk =>
  async dispatch => {
    try {
      if (token) {
        const { data } = await patchDataAPI(
          `/notify/${msg._id}/isReadNotify`,
          null,
          token
        );
        dispatch({
          type: NotifyActionType.UPDATE_NOTIFY,
          payload: {
            notifies: data.notifies,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };
