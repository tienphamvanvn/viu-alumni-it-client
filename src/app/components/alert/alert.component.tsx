import React, { useCallback, useEffect } from "react";
import { useMessage } from "@vechaiui/message";
import { useSelector } from "react-redux";
import { GlobalState } from "@/app/store/global.store";
import Loader from "../loader";

const Alert = () => {
  const { isLoading, success, error } = useSelector(alertReducer);
  const message = useMessage();

  const handleMessage = useCallback(
    (status, msg: string) => {
      return message({
        message: msg,
        status,
        position: "top",
        className: "rounded-md border-gray-200",
      });
    },
    [message]
  );

  useEffect(() => {
    if (success) {
      handleMessage("success", success);
    }

    if (error) {
      handleMessage("error", error);
    }
  }, [handleMessage, success, error]);

  return <>{isLoading && <Loader />}</>;
};

const alertReducer = (state: GlobalState) => state.alert;

export default Alert;
