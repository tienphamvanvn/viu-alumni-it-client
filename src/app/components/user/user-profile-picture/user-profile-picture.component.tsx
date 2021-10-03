import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "@/app/shared/types/user.type";
import { GlobalState } from "@/app/store/global.store";

const UserProfilePicture = ({ user, type, cssClass }: PropType) => {
  const { account } = useSelector(userSelector);

  const content = (
    <>
      <div className="block relative overflow-hidden rounded-full">
        <div className="block w-full" style={{ paddingBottom: "100%" }}></div>
        <div className="h-full w-full absolute top-0 bottom-0 left-0">
          <div className="flex flex-col flex-basis-auto absolute inset-0 overflow-hidden rounded-full">
            <div
              className="flex flex-col h-full w-full absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  user?.studentID === account?.studentID
                    ? account?.profilePicture
                    : user?.profilePicture
                })`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col absolute inset-0 rounded-full group-hover:bg-blackAlpha-300"></div>
    </>
  );

  return type === "div" ? (
    <div
      className={`relative overflow-hidden rounded-full bg-white${
        cssClass ? ` ${cssClass}` : ""
      }`}
    >
      {content}
    </div>
  ) : (
    <Link
      to={`/${
        user?.studentID === account?.studentID
          ? account?.studentID
          : user?.studentID
      }`}
      className={`relative overflow-hidden rounded-full bg-white group${
        cssClass ? ` ${cssClass}` : ""
      }`}
      onClick={e => e.stopPropagation()}
    >
      {content}
    </Link>
  );
};

type PropType = {
  type: "div" | "a";
  user: User | null;
  cssClass?: string;
};

const userSelector = (state: GlobalState) => state.user;

export default UserProfilePicture;
