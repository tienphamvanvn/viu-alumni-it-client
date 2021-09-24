import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, GlobalState } from "./store/global.store";
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

  return <></>;
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

export default SocketClient;
