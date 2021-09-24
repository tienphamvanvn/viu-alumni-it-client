import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { getSuggestionsUser } from "@/app/store/user/user.action";
import FollowUserItem from "../../follow-user-item";

const Sidebar = () => {
  const { account, usersSuggestions } = useSelector(userSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSuggestionsUser());
  }, [dispatch]);

  return (
    <div className="flex flex-col sticky w-88 pt-3 pb-16 mr-2">
      {account && usersSuggestions && usersSuggestions.length > 0 && (
        <div className="flex flex-col bg-gray-50 mb-4 rounded-2xl overflow-hidden">
          <aside className="flex flex-col">
            <div className="flex flex-col justify-between py-3 px-4">
              <h2 className="text-xl font-bold">Who to follow</h2>
            </div>
          </aside>
          {usersSuggestions.slice(0, 2).map(user => (
            <FollowUserItem key={user._id} account={account} user={user} />
          ))}
          <Link
            to={"/connect_people"}
            className="flex flex-col p-4 text-blue-500 hover:bg-gray-200"
          >
            Show more
          </Link>
        </div>
      )}
    </div>
  );
};

const userSelector = (state: GlobalState) => state.user;

export default Sidebar;
