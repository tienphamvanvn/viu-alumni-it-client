import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import Layout from "@/app/components/layout";
import Head from "@/app/components/head";
import { ReactComponent as IconUserFill } from "@/app/assets/svgs/icon-user-fill.svg";
import { getNotifies, updateNotify } from "@/app/store/notify/notify.action";
import { Notify } from "@/app/shared/types/notify.type";

const NotificationsPage: React.FC = () => {
  const { token } = useSelector(userSelector);
  const { notifies } = useSelector(notifySelector);

  const dispatch = useDispatch<AppDispatch>();

  const handleIsRead = (msg: Notify) => dispatch(updateNotify(msg, token));

  useEffect(() => {
    if (token) {
      dispatch(getNotifies(token));
    }
  }, [dispatch, token]);

  return (
    <Layout>
      <div className="flex flex-col">
        <Head
          account={null}
          user={null}
          studentIDParam=""
          headline="Notifications"
        />
      </div>

      {notifies &&
        notifies.length > 0 &&
        notifies.map(notify => (
          <div key={notify._id} className="block border-b border-gray-100">
            <Link
              to={notify.url}
              className="flex flex-col py-3 px-4 hover:bg-gray-100"
              onClick={() => handleIsRead(notify)}
            >
              <div className="flex">
                <div
                  className="flex flex-col justify-start flex-grow-0 mr-3"
                  style={{ flexBasis: "48px" }}
                >
                  {notify.type === "FOLLOW" && (
                    <IconUserFill className="h-7 text-blue-600 fill-current" />
                  )}
                </div>
                <div
                  className="flex flex-col flex-grow overflow-hidden"
                  style={{ flexBasis: "0px" }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col flex-shrink max-w-full">
                      <div className="flex flex-col flex-shrink max-w-full">
                        <div className="flex flex-col pr-5 mb-3">
                          <div className="flex flex-wrap overflow-hidden">
                            <div className="flex flex-col flex-shrink max-w-full">
                              <div className="flex flex-col h-8 w-8 rounded-full overflow-hidden">
                                <div className="block overflow-hidden relative rounded-full">
                                  <div
                                    className="block w-full"
                                    style={{ paddingBottom: "100%" }}
                                  ></div>
                                  <div className="h-full w-full absolute inset-0">
                                    <div
                                      className="h-full w-full absolute inset-0 bg-cover bg-center bg-no-repeat"
                                      style={{
                                        backgroundImage: `url(${notify.user.profilePicture})`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-shrink">
                          <div className="flex items-center">
                            <div className="max-w-full overflow-ellipsis overflow-hidden text-gray-700">
                              <div className="inline-flex flex-col">
                                <div className="font-bold">
                                  <span>{notify.user.fullname}</span>
                                </div>
                              </div>
                              <span> {notify.text}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span>{moment(notify.createdAt).fromNow()}</span>
                </div>
                {!notify.isRead && (
                  <div className="flex flex-col pt-2 ml-2">
                    <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
    </Layout>
  );
};

const userSelector = (state: GlobalState) => state.user;
const notifySelector = (state: GlobalState) => state.notify;

export default NotificationsPage;
