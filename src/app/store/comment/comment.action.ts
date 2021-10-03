import { Post } from "@/app/shared/types/post.type";
import { User } from "@/app/shared/types/user.type";
import { errorHandler } from "@/app/shared/utils/error-handler";
import { deleteDataAPI, postDataAPI } from "@/app/shared/utils/fetch-data";
import { Socket } from "socket.io-client";
import { AlertActionType } from "../alert/alert.type";
import { AppThunk } from "../global.store";
import { createNotify, deleteNotify } from "../notify/notify.action";
import { PostActionType } from "../post/post.type";

export const createComment =
  (
    token: string,
    post: Post,
    comment: any,
    account: User,
    socket: Socket
  ): AppThunk =>
  async dispatch => {
    try {
      const { data } = await postDataAPI(
        "comment/create",
        {
          ...comment,
          postId: post._id,
          postUserId: post.user._id,
        },
        token
      );

      const newPost = {
        ...post,
        comments: [
          ...post.comments,
          {
            ...data.comment,
            user: account,
          },
        ],
      };

      dispatch({
        type: PostActionType.EDIT_POST,
        payload: {
          post: newPost,
        },
      });

      socket.emit("createComment", newPost);

      const notify = {
        uId: data.comment._id,
        text: comment.reply
          ? "mentioned you in a comment"
          : "has commented on your post",
        recipients: comment.reply ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        type: "COMMENT",
      };

      dispatch(createNotify({ account: post.user, token, notify, socket }));
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const deleteComment =
  (token: string, post: Post, comment: any, socket: Socket): AppThunk =>
  async dispatch => {
    try {
      const deleteArr = [
        ...post.comments.filter(comment => comment.reply === comment._id),
        comment,
      ];

      const newPost = {
        ...post,
        comments: post.comments.filter(
          comment => !deleteArr.find(item => comment._id === item._id)
        ),
      };

      dispatch({
        type: PostActionType.EDIT_POST,
        payload: {
          post: newPost,
        },
      });

      socket.emit("deleteComment", newPost);

      deleteArr.forEach(item => {
        deleteDataAPI(`comment/${item._id}/delete`, token);

        const notify = {
          uId: item._id,
          text: comment.reply
            ? "mentioned you in a comment"
            : "has commented on your post",
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
          type: "COMMENT",
        };

        dispatch(deleteNotify({ token, notify, socket }));
      });
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };
