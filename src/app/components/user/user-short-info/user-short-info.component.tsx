import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { moment } from "@/app/shared/utils/moment";
import { GlobalState } from "@/app/store/global.store";
import { User } from "@/app/shared/types/user.type";

const UserShortInfo = ({ user, createdAt, isPageDetails }: PropType) => {
  const { account } = useSelector(userSelector);

  return (
    <Link
      to={`/${
        user?.studentID === account?.studentID
          ? account?.studentID
          : user?.studentID
      }`}
      className={`${
        isPageDetails ? "flex-col " : ""
      }flex flex-shrink max-w-full group min-w-0`}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center max-w-full">
        <div className="overflow-hidden max-w-full break-words overflow-ellipsis whitespace-nowrap font-bold leading-5 group-hover:underline">
          <span>
            {user?.studentID === account?.studentID
              ? account?.fullname
              : user?.fullname}
          </span>
        </div>
      </div>
      <div className={`flex${!isPageDetails ? " ml-1" : ""}`}>
        <div className="overflow-hidden max-w-full break-words overflow-ellipsis whitespace-nowrap font-normal leading-5">
          <span>{`@${
            user?.studentID === account?.studentID
              ? account?.studentID
              : user?.studentID
          }`}</span>
        </div>
      </div>
      {!isPageDetails && (
        <>
          <div className="flex px-1">
            <div className="overflow-hidden max-w-full break-words overflow-ellipsis whitespace-nowrap font-normal leading-5">
              <span>.</span>
            </div>
          </div>
          <div className="flex">
            <div className="overflow-hidden max-w-full break-words overflow-ellipsis whitespace-nowrap font-normal leading-5">
              {moment(createdAt).fromNow(true)}
            </div>
          </div>
        </>
      )}
    </Link>
  );
};

type PropType = {
  user: User | null;
  createdAt?: Date;
  isPageDetails?: boolean;
};

const userSelector = (state: GlobalState) => state.user;

export default UserShortInfo;
