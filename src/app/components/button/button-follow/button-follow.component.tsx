import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/app/shared/types/user.type";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { follow, unfollow } from "@/app/store/user/user.action";

const ButtonFollow: React.FC<PropType> = ({ account, user }) => {
  const { token } = useSelector(userSelector);
  const { socket } = useSelector(socketSelector);

  const [isFollowing, setFollowing] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const handleFollow = (id: string) =>
    token && dispatch(follow(token, id, socket));

  const handleUnfollow = (id: string) =>
    token && dispatch(unfollow(token, id, socket));

  return (
    user && (
      <>
        {account?.following.includes(user._id) ? (
          <div className="group mb-3" onClick={e => e.stopPropagation()}>
            <div
              className="flex flex-col min-h-9 px-4 rounded-full cursor-pointer border border-blue-200 group-hover:border-red-200 group-hover:bg-red-600"
              style={{ minWidth: "102px" }}
              onMouseOver={() => setFollowing(false)}
              onMouseOut={() => setFollowing(true)}
              onClick={() => handleUnfollow(user._id)}
            >
              <div className="flex justify-center items-center flex-grow">
                <span className="font-medium leading-none group-hover:text-white text-blue-600">
                  {isFollowing ? "Following" : "Unfollow"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col min-h-9 mb-3 px-4 rounded-full cursor-pointer border border-blue-200 hover:bg-blue-700 bg-blue-600"
            style={{ minWidth: "102px" }}
            onClick={e => {
              e.stopPropagation();
              handleFollow(user._id);
            }}
          >
            <div className="flex justify-center items-center flex-grow">
              <span className="font-medium leading-none text-white">
                Follow
              </span>
            </div>
          </div>
        )}
      </>
    )
  );
};

type PropType = {
  account: User | null;
  user: User | null;
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

export default ButtonFollow;
