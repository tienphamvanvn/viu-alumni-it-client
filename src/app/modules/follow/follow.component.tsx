import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { getFollow, getUser } from "@/app/store/user/user.action";
import Layout from "@/app/components/layout";
import Head from "@/app/components/head";
import FollowUserItem from "@/app/components/follow-user-item";

const FollowPage: React.FC<PropType> = ({ location, match }) => {
  const { account, user, following, followers } = useSelector(userSelector);

  const pathname = location.pathname;

  const dispatch = useDispatch<AppDispatch>();

  const [active, setActive] = useState(pathname);

  const studentIDParam = match.params.studentID;

  const pathFollowers =
    "/" +
    (account && account.studentID === studentIDParam
      ? account.studentID
      : user?.studentID) +
    "/followers";

  const pathFollowing =
    "/" +
    (account && account.studentID === studentIDParam
      ? account.studentID
      : user?.studentID) +
    "/following";

  useEffect(() => {
    dispatch(getUser(studentIDParam));
    dispatch(getFollow(studentIDParam));
  }, [dispatch, studentIDParam]);

  return (
    <Layout>
      <div className="flex flex-col">
        <Head
          account={account}
          user={user}
          studentIDParam={studentIDParam}
          headline={"Follow"}
        />
        {(account?.studentID.toString() === studentIDParam ||
          user?.studentID.toString() === studentIDParam) && (
          <div className="flex flex-col">
            <div className="flex flex-grow border-b border-gray-100">
              <div
                className="flex flex-col flex-grow"
                onClick={() => setActive(pathFollowers)}
              >
                <Link
                  className="flex flex-col justify-center items-center h-53px min-w-14 px-1 cursor-pointer"
                  to={`/${
                    account && account.studentID === studentIDParam
                      ? account.studentID
                      : user?.studentID
                  }/followers`}
                >
                  <div
                    className={`flex flex-col relative py-4${
                      active === pathFollowers ? " text-primary" : ""
                    }`}
                  >
                    Followers
                    {active === pathFollowers && (
                      <div className="absolute bottom-0 h-1 w-full min-w-14 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </Link>
              </div>
              <div
                className="flex flex-col flex-grow"
                onClick={() => setActive(pathFollowing)}
              >
                <Link
                  className="flex flex-col justify-center items-center h-53px min-w-14 px-1 cursor-pointer"
                  to={`/${
                    account && account.studentID === studentIDParam
                      ? account.studentID
                      : user?.studentID
                  }/following`}
                >
                  <div
                    className={`flex flex-col relative py-4${
                      active === pathFollowing ? " text-primary" : ""
                    }`}
                  >
                    Following
                    {active === pathFollowing && (
                      <div className="absolute bottom-0 h-1 w-full min-w-14 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              {active === pathFollowers &&
                followers?.map(user => (
                  <FollowUserItem
                    key={user._id}
                    account={account}
                    user={user}
                  />
                ))}
              {active === pathFollowing &&
                following?.map(user => (
                  <FollowUserItem
                    key={user._id}
                    account={account}
                    user={user}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

interface MatchParams {
  studentID: string;
}

type PropType = RouteComponentProps<MatchParams>;

const userSelector = (state: GlobalState) => state.user;

export default FollowPage;
