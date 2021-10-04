import React from "react";
import { Link, useHistory } from "react-router-dom";
import { User } from "@/app/shared/types/user.type";
import FollowsYou from "../../common/follows-you";
import ButtonFollow from "../../button/button-follow";
import UserProfilePicture from "../user-profile-picture";

const FollowUserItem: React.FC<PropType> = ({ account, user, hiddenBtn }) => {
  const history = useHistory();

  const onClick = () => history.push(`/${user?.studentID}`);

  return (
    <div
      className="flex flex-col py-3 px-4 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="flex">
        <div className="flex flex-col flex-basis-3 justify-start flex-grow-0 mr-3">
          <div className="flex flex-col flex-shrink max-w-full">
            <UserProfilePicture user={user} type="a" />
          </div>
        </div>
        <div className="flex flex-col flex-grow flex-basis-0 overflow-hidden">
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
