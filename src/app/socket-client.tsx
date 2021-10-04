import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "./shared/types/notify.type";
import { Post } from "./shared/types/post.type";
import { User } from "./shared/types/user.type";
import { AppDispatch, GlobalState } from "./store/global.store";
import { NotifyActionType } from "./store/notify/notify.type";
import { PostActionType } from "./store/post/post.type";
import { UserActionType } from "./store/user/user.type";

const SocketClient = () => {
  const { account } = useSelector(userSelector);
  const { socket } = useSelector(socketSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.emit("joinUser", account);
  }, [socket, account]);

  useEffect(() => {
    socket.on(
      "followToClient",
      ({ account, user }: { account: User; user: User }) => {
        dispatch({
          type: UserActionType.FOLLOW,
          payload: {
            account,
            user,
          },
        });
      }
    );

    return () => {
      socket.off("followToClient");
    };
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on(
      "unfollowToClient",
      ({ account, user }: { account: User; user: User }) => {
        dispatch({
          type: UserActionType.UNFOLLOW,
          payload: {
            account,
            user,
          },
        });
      }
    );

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

  // Like
  useEffect(() => {
    socket.on("likeToClient", (post: Post) => {
      dispatch({
        type: PostActionType.LIKE,
        payload: {
          post,
        },
      });
    });

    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  // Unlike
  useEffect(() => {
    socket.on("unlikeToClient", (post: Post) => {
      dispatch({
        type: PostActionType.UNLIKE,
        payload: {
          post,
        },
      });
    });

    return () => socket.off("unlikeToClient");
  }, [socket, dispatch]);

  // Create comment
  useEffect(() => {
    socket.on("createCommentToClient", (post: Post) => {
      dispatch({
        type: PostActionType.EDIT_POST,
        payload: {
          post,
        },
      });
    });

    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  // Delete comment
  useEffect(() => {
    socket.on("deleteCommentToClient", (post: Post) => {
      dispatch({
        type: PostActionType.EDIT_POST,
        payload: {
          post,
        },
      });
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  return <></>;
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

export default SocketClient;
