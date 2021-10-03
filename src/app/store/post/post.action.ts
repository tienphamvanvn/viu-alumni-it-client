import { Socket } from "socket.io-client";
import { User } from "@/app/shared/types/user.type";
import { errorHandler } from "@/app/shared/utils/error-handler";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "@/app/shared/utils/fetch-data";
import { uploadMultipleFile } from "@/app/shared/utils/upload";
import { Post } from "@/app/shared/types/post.type";
import { AppThunk } from "../global.store";
import { AlertActionType } from "../alert/alert.type";
import { PostActionType } from "./post.type";
import { createNotify, deleteNotify } from "../notify/notify.action";

export const createPost =
  (token: string, socket: Socket, content: string, images: any): AppThunk =>
  async dispatch => {
    try {
      dispatch({
        type: PostActionType.POST_CREATE_LOADING,
        payload: { isLoadingCreate: true },
      });

      const paths = await uploadMultipleFile(images, token);

      const { data } = await postDataAPI(
        "post/create",
        { content, images: paths },
        token
      );

      dispatch({
        type: PostActionType.CREATE_POST,
        payload: {
          post: data.post,
        },
      });

      const notify = {
        uId: data.post._id,
        text: "added a new post",
        recipients: data.post.user.followers,
        url: `/post/${data.post._id}`,
        content,
        type: "POST",
      };

      dispatch(
        createNotify({ account: data.post.user, token, notify, socket })
      );

      dispatch({
        type: PostActionType.POST_CREATE_LOADING,
        payload: { isLoadingCreate: false },
      });
    } catch (error) {
      dispatch({
        type: PostActionType.POST_CREATE_LOADING,
        payload: { isLoadingCreate: false },
      });

      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const getPosts =
  (token: string): AppThunk =>
  async dispatch => {
    try {
      dispatch({
        type: PostActionType.POST_LOADING,
        payload: { isLoading: true },
      });

      const { data } = await getDataAPI("post/list-posts", token);

      dispatch({
        type: PostActionType.GET_POSTS,
        payload: {
          posts: data.posts,
        },
      });

      dispatch({
        type: PostActionType.POST_LOADING,
        payload: { isLoading: false },
      });
    } catch (error) {
      dispatch({
        type: PostActionType.POST_LOADING,
        payload: { isLoading: false },
      });

      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const getPost =
  (token: string, postId: string): AppThunk =>
  async dispatch => {
    if (token) {
      try {
        dispatch({
          type: PostActionType.POST_LOADING,
          payload: { isLoading: true },
        });

        const { data } = await getDataAPI(`post/${postId}`, token);

        dispatch({
          type: PostActionType.GET_POST,
          payload: {
            post: data.post,
          },
        });

        dispatch({
          type: PostActionType.POST_LOADING,
          payload: { isLoading: false },
        });
      } catch (error) {
        dispatch({
          type: PostActionType.POST_LOADING,
          payload: { isLoading: false },
        });

        dispatch({
          type: AlertActionType.ALERT_FAILURE,
          payload: { error: errorHandler(error) },
        });
      }
    }
  };

export const like =
  (token: string, account: User, socket: Socket, post: Post): AppThunk =>
  async dispatch => {
    try {
      const newPost = {
        ...post,
        likes: [...post.likes, account],
      };

      socket.emit("likePost", newPost);

      await patchDataAPI(`post/${post._id}/like`, null, token);

      const notify = {
        uId: post.user._id,
        text: "like your post",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        type: "LIKE",
      };

      dispatch(createNotify({ account, token, notify, socket }));
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const unlike =
  (token: string, account: User, socket: Socket, post: Post): AppThunk =>
  async dispatch => {
    try {
      const newPost = {
        ...post,
        likes: post.likes.filter(user => user._id !== account?._id),
      };

      socket.emit("unlikePost", newPost);

      await patchDataAPI(`post/${post._id}/unlike`, null, token);

      const notify = {
        uId: post.user._id,
        text: "like your post",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        type: "LIKE",
      };

      dispatch(deleteNotify({ token, notify, socket }));
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const getUserPosts =
  (userId: string): AppThunk =>
  async (dispatch, getState) => {
    const { token } = getState().user;
    if (token) {
      try {
        const { data } = await getDataAPI(`post/${userId}/user-posts`, token);

        dispatch({
          type: PostActionType.GET_USER_POSTS,
          payload: {
            posts: data.posts,
          },
        });
      } catch (error) {
        dispatch({
          type: AlertActionType.ALERT_FAILURE,
          payload: { error: errorHandler(error) },
        });
      }
    }
  };

export const getBookmarkPosts =
  (token: string): AppThunk =>
  async dispatch => {
    try {
      dispatch({
        type: PostActionType.POST_LOADING,
        payload: { isLoading: true },
      });

      const { data } = await getDataAPI("post/bookmark-posts", token);

      dispatch({
        type: PostActionType.GET_BOOKMARK_POSTS,
        payload: {
          posts: data.posts,
        },
      });

      dispatch({
        type: PostActionType.POST_LOADING,
        payload: { isLoading: false },
      });
    } catch (error) {
      dispatch({
        type: PostActionType.POST_LOADING,
        payload: { isLoading: false },
      });

      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const deletePost =
  (token: string, postId: string, socket: Socket): AppThunk =>
  async dispatch => {
    try {
      const { data } = await deleteDataAPI(`post/${postId}/delete`, token);

      dispatch({
        type: PostActionType.DELETE_POST,
        payload: {
          post: data.post,
        },
      });

      const notify = {
        uId: postId,
        text: "added a new post",
        recipients: data.post.user.followers,
        url: `/post/${postId}`,
        type: "POST",
      };

      dispatch(deleteNotify({ token, notify, socket }));
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const editPost =
  (token: string, content: string, images: any, post?: Post): AppThunk =>
  async dispatch => {
    try {
      dispatch({
        type: PostActionType.POST_EDIT_LOADING,
        payload: { isLoadingEdit: true },
      });

      const imageNewUrl = images.filter(
        (image: { url: any }) => typeof image !== "string"
      );
      const imageOldUrl = images.filter(
        (image: { url: any }) => typeof image === "string"
      );

      let paths: string[] = [];

      if (imageNewUrl.length > 0) {
        paths = await uploadMultipleFile(imageNewUrl, token);
      }

      const { data } = await patchDataAPI(
        `post/${post?._id}/edit`,
        { content, images: [...imageOldUrl, ...paths] },
        token
      );

      dispatch({
        type: PostActionType.EDIT_POST,
        payload: {
          post: data.post,
        },
      });

      dispatch({
        type: PostActionType.POST_EDIT_LOADING,
        payload: { isLoadingEdit: false },
      });
    } catch (error) {
      dispatch({
        type: PostActionType.POST_EDIT_LOADING,
        payload: { isLoadingEdit: false },
      });

      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };
