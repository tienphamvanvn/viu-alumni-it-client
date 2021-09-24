import { errorHandler } from "@/app/shared/utils/error-handler";
import { postDataAPI } from "@/app/shared/utils/fetch-data";
import { AppThunk } from "../global.store";
import { AlertActionType } from "../alert/alert.type";
import { UserActionType } from "./user.type";

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
