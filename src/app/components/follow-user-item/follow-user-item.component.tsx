import React from "react";
import { User } from "@/app/shared/types/user.type";
import { Link } from "react-router-dom";
import ButtonFollow from "../button/button-follow";
import FollowsYou from "../follows-you";

const FollowUserItem = ({ account, user, hiddenBtn }: PropType) => {
  return (
    <div className="flex flex-col py-3 px-4 cursor-pointer hover:bg-gray-100">
      <div className="flex">
        <div
          className="flex flex-col justify-start flex-grow-0 mr-3"
          style={{ flexBasis: "48px" }}
        >
          <div className="flex flex-col flex-shrink max-w-full">
            <Link to={`/${user?.studentID}`} className="block h-12 w-full">
              <div className="block overflow-hidden relative rounded-full">
                <div
                  className="block w-full"
                  style={{ paddingBottom: "100%" }}
                ></div>
                <div className="h-full w-full absolute inset-0">
                  <div
                    className="h-full w-full absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${user?.profilePicture})`,
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div
          className="flex flex-col flex-grow overflow-hidden"
          style={{ flexBasis: "0px" }}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col flex-shrink max-w-full">
              <Link
                to={`/${user?.studentID}`}
                className="flex flex-col flex-shrink max-w-full"
              >
                <div className="flex flex-col flex-shrink max-w-full">
                  <div className="flex items-center max-w-full">
                    <div className="flex items-center max-w-full overflow-ellipsis overflow-hidden font-bold">
                      <span>{user?.fullname}</span>
                    </div>
                  </div>
                  <div className="flex flex-shrink">
                    <div className="flex items-center text-sm max-w-full overflow-ellipsis overflow-hidden text-gray-700">
                      <span>@{user?.studentID}</span>
                    </div>
                    {user && account?.followers.includes(user._id) && (
                      <FollowsYou />
                    )}
                  </div>
                </div>
              </Link>
            </div>
            {!hiddenBtn && (
              <>
                {account?._id !== user?._id && (
                  <div className="flex flex-col mr-3">
                    <div className="flex flex-col">
                      <ButtonFollow account={account} user={user} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {user?.bio && (
            <div
              className="pt-1 text-sm break-words overflow-ellipsis overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              <span>{user.bio}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type PropType = {
  account: User | null;
  user: User | null;
  hiddenBtn?: boolean;
};

export default FollowUserItem;
