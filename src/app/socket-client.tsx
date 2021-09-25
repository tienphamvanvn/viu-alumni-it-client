import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "./shared/types/notify.type";
import { AppDispatch, GlobalState } from "./store/global.store";
import { NotifyActionType } from "./store/notify/notify.type";
import { UserActionType } from "./store/user/user.type";

const SocketClient = () => {
  const { account } = useSelector(userSelector);
  const { socket } = useSelector(socketSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.emit("joinUser", account);
  }, [socket, account]);

  useEffect(() => {
    socket.on("followToClient", (data: any) => {
      dispatch({
        type: UserActionType.FOLLOW,
        payload: {
          account: data.account,
          user: data.user,
        },
      });
    });

    return () => {
      socket.off("followToClient");
    };
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on("unfollowToClient", (data: any) => {
      dispatch({
        type: UserActionType.UNFOLLOW,
        payload: {
          account: data.account,
          user: data.user,
        },
      });
    });

    return () => {
      socket.off("unfollowToClient");
    };
  }, [dispatch, socket]);

  // Create notify
  useEffect(() => {
    socket.on("createNotifyToClient", (notify: Notify) => {
      dispatch({
        type: NotifyActionType.CREATE_NOTIFY,
        payload: {
          notify,
        },
      });
    });

    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch]);

  // Delete notify
  useEffect(() => {
    socket.on("deleteNotifyToClient", (notify: Notify) => {
      dispatch({
        type: NotifyActionType.DELETE_NOTIFY,
        payload: {
          notify,
        },
      });
    });

    return () => socket.off("deleteNotifyToClient");
  }, [socket, dispatch]);

  return <></>;
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

export default SocketClient;
