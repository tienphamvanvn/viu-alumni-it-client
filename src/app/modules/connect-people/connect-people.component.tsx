import React from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "@/app/store/global.store";
import Layout from "@/app/components/layout";
import Head from "@/app/components/head";
import UserItem from "@/app/components/user/user-item";

const ConnectPeoplePage: React.FC = () => {
  const { account, usersSuggestions } = useSelector(userSelector);

  return (
    <Layout>
      <div className="flex flex-col">
        <Head account={null} user={null} studentIDParam="" headline="Connect" />
        <div className="flex flex-col">
          <div className="flex flex-col justify-between py-3 px-4 border-t border-gray-100">
            <h2 className="text-xl font-bold">Suggested for you</h2>
          </div>
          <div className="flex flex-col relative">
            {usersSuggestions.length > 0 &&
              usersSuggestions.map(user => (
                <UserItem key={user._id} account={account} user={user} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const userSelector = (state: GlobalState) => state.user;

export default ConnectPeoplePage;
