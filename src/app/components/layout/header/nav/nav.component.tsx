import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { User } from "@/app/shared/types/user.type";
import { ReactComponent as IconHome } from "@/app/assets/svgs/icon-home.svg";
import { ReactComponent as IconHomeFill } from "@/app/assets/svgs/icon-home-fill.svg";
import { ReactComponent as IconHash } from "@/app/assets/svgs/icon-hash.svg";
import { ReactComponent as IconHashFill } from "@/app/assets/svgs/icon-hash-fill.svg";
import { ReactComponent as IconBell } from "@/app/assets/svgs/icon-bell.svg";
import { ReactComponent as IconBellFill } from "@/app/assets/svgs/icon-bell-fill.svg";
import { ReactComponent as IconInbox } from "@/app/assets/svgs/icon-inbox.svg";
import { ReactComponent as IconInboxFill } from "@/app/assets/svgs/icon-inbox-fill.svg";
import { ReactComponent as IconBookmark } from "@/app/assets/svgs/icon-bookmark.svg";
import { ReactComponent as IconBookmarkFill } from "@/app/assets/svgs/icon-bookmark-fill.svg";
import { ReactComponent as IconGroup } from "@/app/assets/svgs/icon-group.svg";
import { ReactComponent as IconGroupFill } from "@/app/assets/svgs/icon-group-fill.svg";
import { ReactComponent as IconUser } from "@/app/assets/svgs/icon-user.svg";
import { ReactComponent as IconUserFill } from "@/app/assets/svgs/icon-user-fill.svg";
import { ReactComponent as IconSignIn } from "@/app/assets/svgs/icon-sign-in.svg";
import { ReactComponent as IconSignInFill } from "@/app/assets/svgs/icon-sign-in-fill.svg";
import { GlobalState } from "@/app/store/global.store";
import { useSelector } from "react-redux";
import { Notify } from "@/app/shared/types/notify.type";

const navList = [
  {
    id: 1,
    name: "Home",
    path: "/home",
    icon: <IconHome className="h-7 fill-current group-hover:text-blue-600" />,
    iconFill: <IconHomeFill className="h-7 fill-current text-blue-600" />,
  },
  {
    id: 2,
    name: "Explore",
    path: "/explore",
    icon: <IconHash className="h-7 fill-current group-hover:text-blue-600" />,
    iconFill: <IconHashFill className="h-7 fill-current text-blue-600" />,
  },
  {
    id: 3,
    name: "Notifications",
    path: "/notifications",
    icon: <IconBell className="h-7 fill-current group-hover:text-blue-600" />,
    iconFill: <IconBellFill className="h-7 fill-current text-blue-600" />,
  },
  {
    id: 4,
    name: "Messages",
    path: "/messages",
    icon: <IconInbox className="h-7 fill-current group-hover:text-blue-600" />,
    iconFill: <IconInboxFill className="h-7 fill-current text-blue-600" />,
  },
  {
    id: 5,
    name: "Bookmarks",
    path: "/bookmarks",
    icon: (
      <IconBookmark className="h-7 fill-current group-hover:text-blue-600" />
    ),
    iconFill: <IconBookmarkFill className="h-7 fill-current text-blue-600" />,
  },
  {
    id: 6,
    name: "Groups",
    path: "/groups",
    icon: <IconGroup className="h-7 fill-current group-hover:text-blue-600" />,
    iconFill: <IconGroupFill className="h-7 fill-current text-blue-600" />,
  },
  {
    id: 7,
    name: "Profile",
    path: "/",
    icon: <IconUser className="h-7 fill-current group-hover:text-blue-600" />,
    iconFill: <IconUserFill className="h-7 fill-current text-blue-600" />,
  },
];

const Nav = ({ account, history }: PropType) => {
  const { notifies } = useSelector(notifySelector);
  const pathname = history.location.pathname.slice(0, 5);

  const studentIDParam = history.location.pathname.slice(1);

  const newNotifies: Notify[] =
    notifies && notifies.length > 0
      ? notifies.filter((notify: Notify) => !notify.isRead)
      : [];

  return (
    <div className="flex flex-col w-full my-1 items-center xl:items-start">
      <nav className="flex flex-col items-center w-full xl:items-start">
        {account ? (
          navList.map(item => (
            <Link
              key={item.id}
              to={item.name === "Profile" ? `/${account.studentID}` : item.path}
              className="flex flex-col flex-grow items-center w-full group xl:items-start"
            >
              <div className="flex justify-center items-center max-w-full p-3 rounded-full group-hover:bg-blue-100">
                <div className="flex flex-col relative">
                  {item.name === "Profile" &&
                  (studentIDParam === account.studentID.toString() ||
                    studentIDParam.indexOf(account.studentID + "/following") !==
                      -1 ||
                    studentIDParam.indexOf(account.studentID + "/followers") !==
                      -1)
                    ? item.iconFill
                    : pathname === item.path.slice(0, 5)
                    ? item.iconFill
                    : item.icon}

                  {item.name === "Notifications" && (
                    <>
                      {}
                      {newNotifies.length > 0 && (
                        <div
                          className="flex justify-center items-center absolute h-4 px-2 rounded-full text-xs text-white bg-blue-600"
                          style={{
                            top: "-6px",
                            right: "-4px",
                            minWidth: "16px",
                          }}
                        >
                          <span>
                            {newNotifies.length > 20
                              ? "20+"
                              : newNotifies.length}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="max-w-full hidden ml-5 mr-4 overflow-hidden whitespace-nowrap overflow-ellipsis break-words xl:block">
                  <span
                    className={`text-xl font-bold group-hover:text-blue-600${
                      item.name === "Profile" &&
                      (studentIDParam === account.studentID.toString() ||
                        studentIDParam.indexOf(
                          account.studentID + "/following"
                        ) !== -1 ||
                        studentIDParam.indexOf(
                          account.studentID + "/followers"
                        ) !== -1)
                        ? " text-blue-600"
                        : pathname === item.path.slice(0, 5)
                        ? " text-blue-600"
                        : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <>
            <Link
              to="/explore"
              className="flex flex-col flex-grow items-center w-full group xl:items-start"
            >
              <div className="flex justify-center items-center max-w-full p-3 rounded-full group-hover:bg-blue-100">
                <div className="flex flex-col">
                  {pathname === "/explore".slice(0, 5) ? (
                    <IconHashFill className="h-7 fill-current text-blue-600" />
                  ) : (
                    <IconHash className="h-7 fill-current group-hover:text-blue-600" />
                  )}
                </div>
                <div className="max-w-full hidden ml-5 mr-4 overflow-hidden whitespace-nowrap overflow-ellipsis break-words xl:block">
                  <span
                    className={`text-xl font-bold group-hover:text-blue-600${
                      pathname === "/explore".slice(0, 5)
                        ? " text-blue-600"
                        : ""
                    }`}
                  >
                    Explore
                  </span>
                </div>
              </div>
            </Link>
            <Link
              to="/signin"
              className="flex flex-col flex-grow items-center w-full group xl:items-start"
            >
              <div className="flex justify-center items-center max-w-full p-3 rounded-full group-hover:bg-blue-100">
                <div className="flex flex-col">
                  {pathname === "/signin".slice(0, 5) ? (
                    <IconSignInFill className="h-7 text-blue-600" />
                  ) : (
                    <IconSignIn className="h-7 group-hover:text-blue-600" />
                  )}
                </div>
                <div className="max-w-full hidden ml-5 mr-4 overflow-hidden whitespace-nowrap overflow-ellipsis break-words xl:block">
                  <span
                    className={`text-xl font-bold group-hover:text-blue-600${
                      pathname === "/signin".slice(0, 5) ? " text-blue-600" : ""
                    }`}
                  >
                    Sign In
                  </span>
                </div>
              </div>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

type PropType = RouteComponentProps & {
  account: User | null;
};

const notifySelector = (state: GlobalState) => state.notify;

export default withRouter(Nav);
