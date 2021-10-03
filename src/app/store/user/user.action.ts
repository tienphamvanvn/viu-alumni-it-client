import { Socket } from "socket.io-client";
import { errorHandler } from "@/app/shared/utils/error-handler";
import {
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "@/app/shared/utils/fetch-data";
import { AppThunk } from "../global.store";
import { AlertActionType } from "../alert/alert.type";
import { UserActionType } from "./user.type";
import { uploadSingleFile } from "@/app/shared/utils/upload";
import { createNotify, deleteNotify } from "../notify/notify.action";
import { Post } from "@/app/shared/types/post.type";
import { getUserPosts } from "../post/post.action";

export const signUp =
  (payload: {
    fullname: string;
    studentID: string;
    email: string;
    password: string;
    gender: string;
  }): AppThunk =>
  async dispatch => {
    try {
      dispatch({
        type: AlertActionType.ALERT_REQUEST,
        payload: { isLoading: true },
      });

      const { data } = await postDataAPI("auth/signup", payload);

      dispatch({
        type: UserActionType.SIGNUP,
      });

      dispatch({
        type: AlertActionType.ALERT_SUCCESS,
        payload: {
          success: data.message,
        },
      });

      window.location.href = "/signin";
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const signIn =
  (payload: { studentID: string; password: string }): AppThunk =>
  async dispatch => {
    try {
      dispatch({
        type: AlertActionType.ALERT_REQUEST,
        payload: { isLoading: true },
      });

      const { data } = await postDataAPI("auth/signin", payload);

      dispatch({
        type: UserActionType.SIGNIN,
        payload: {
          token: data.token,
          account: data.account,
        },
      });

      localStorage.setItem("viu-alumni-it", data.token);

      dispatch({
        type: AlertActionType.ALERT_SUCCESS,
        payload: { success: data.message },
      });
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const signOut = (): AppThunk => async dispatch => {
  try {
    localStorage.removeItem("viu-alumni-it");
    await postDataAPI("auth/signout");
    window.location.href = "/signin";
  } catch (error) {
    dispatch({
      type: AlertActionType.ALERT_FAILURE,
      payload: { error: errorHandler(error) },
    });
  }
};

export const getAccount = (): AppThunk => async dispatch => {
  const token = localStorage.getItem("viu-alumni-it");

  if (token) {
    const { data } = await postDataAPI("auth/refreshtoken");

    dispatch({
      type: UserActionType.GET_ACCOUNT,
      payload: {
        token: data.token,
        account: data.account,
      },
    });
  }
};

export const getUser =
  (studentID: string): AppThunk =>
  async dispatch => {
    try {
      dispatch({
        type: AlertActionType.ALERT_REQUEST,
        payload: { isLoading: true },
      });

      const { data } = await getDataAPI(`user/${studentID}`);

      dispatch({
        type: UserActionType.GET_USER,
        payload: {
          user: data.user,
        },
      });

      dispatch(getUserPosts(data.user._id));

      dispatch({
        type: AlertActionType.ALERT_SUCCESS,
        payload: { success: null },
      });
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: null },
      });
    }
  };

export const editAccount =
  (
    payload: {
      fullname: string;
      bio: string;
      website: string;
      currentCity: string;
      hometown: string;
      className: string;
      majors: string;
      gender: string;
    },
    images: { coverPhoto: any; profilePicture: any }
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: AlertActionType.ALERT_REQUEST,
        payload: { isLoading: true },
      });

      const token = getState().user.token;

      if (token) {
        let pathCoverPhoto = "",
          pathProfilePicture = "";

        if (typeof images.coverPhoto === "string") {
          pathCoverPhoto = images.coverPhoto;
        } else {
          pathCoverPhoto = await uploadSingleFile(images.coverPhoto, token);
        }

        if (typeof images.profilePicture === "string") {
          pathProfilePicture = images.profilePicture;
        } else {
          pathProfilePicture = await uploadSingleFile(
            images.profilePicture,
            token
          );
        }

        const editedAccount = {
          ...payload,
          coverPhoto: pathCoverPhoto,
          profilePicture: pathProfilePicture,
        };

        const { data } = await patchDataAPI("user/edit", editedAccount, token);

        dispatch({
          type: UserActionType.EDIT_ACCOUNT,
          payload: {
            account: data.account,
          },
        });

        dispatch({
          type: AlertActionType.ALERT_SUCCESS,
          payload: { success: data.message },
        });
      }
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
      return Promise.reject();
    }
  };

export const follow =
  (id: string, socket: Socket): AppThunk =>
  async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      if (token) {
        const { data } = await patchDataAPI(`user/${id}/follow`, null, token);

        socket.emit("follow", { account: data.account, user: data.user });

        dispatch({
          type: UserActionType.FOLLOW,
          payload: {
            account: data.account,
            user: data.user,
          },
        });

        const notify = {
          uId: data.account._id,
          text: "followed you",
          recipients: [data.user._id],
          url: `/${data.account.studentID}`,
          type: "FOLLOW",
        };

        dispatch(
          createNotify({ account: data.account, token, notify, socket })
        );
      }
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const unfollow =
  (id: string, socket: Socket): AppThunk =>
  async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      if (token) {
        const { data } = await patchDataAPI(`user/${id}/unfollow`, null, token);

        socket.emit("unfollow", { account: data.account, user: data.user });

        dispatch({
          type: UserActionType.UNFOLLOW,
          payload: {
            account: data.account,
            user: data.user,
          },
        });

        const notify = {
          uId: data.account._id,
          text: "followed you",
          recipients: [data.user._id],
          url: `/${data.account.studentID}`,
          type: "FOLLOW",
        };

        dispatch(deleteNotify({ token, notify, socket }));
      }
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const getFollow =
  (studentID: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      if (token) {
        const { data } = await getDataAPI(`user/${studentID}/follow`, token);

        dispatch({
          type: UserActionType.GET_FOLLOW,
          payload: {
            following: data.following,
            followers: data.followers,
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

export const getSuggestionsUser =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const token = getState().user.token;

      if (token) {
        const { data } = await getDataAPI(`user/suggestions-user`, token);

        dispatch({
          type: UserActionType.GET_SUGGESTIONS_USER,
          payload: {
            usersSuggestions: data.users,
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

export const bookmarkPost =
  (token: string, post: Post): AppThunk =>
  async dispatch => {
    try {
      const { data } = await patchDataAPI(
        `user/${post._id}/bookmark-post`,
        null,
        token
      );

      dispatch({
        type: UserActionType.BOOKMARK_POST,
        payload: {
          account: data.account,
        },
      });
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };

export const unbookmarkPost =
  (token: string, post: Post): AppThunk =>
  async dispatch => {
    try {
      const { data } = await patchDataAPI(
        `user/${post._id}/unbookmark-post`,
        null,
        token
      );

      dispatch({
        type: UserActionType.UNBOOKMAKR_POST,
        payload: {
          account: data.account,
        },
      });
    } catch (error) {
      dispatch({
        type: AlertActionType.ALERT_FAILURE,
        payload: { error: errorHandler(error) },
      });
    }
  };
