import { AppThunk } from "../global.store";
import { SocketActionType } from "./socket.type";

export const sockettt =
  (socket: any): AppThunk =>
  async dispatch => {
    dispatch({
      type: SocketActionType.SOCKET,
      payload: { socket },
    });
  };
