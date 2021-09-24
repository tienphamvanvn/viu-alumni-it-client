import React from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "@/app/store/global.store";
import Logo from "./logo";
import Nav from "./nav";
import AccountMenu from "./account-menu";

const Header = () => {
  const { account } = useSelector(userSelector);

  return (
    <header className="flex flex-col flex-grow items-end">
      <div className="flex flex-col w-22 xl:w-72">
        <div className="flex flex-col h-full fixed top-0">
          <div className="flex flex-col justify-between h-full w-22 px-3 overflow-y-auto xl:w-72">
            <div className="flex flex-col items-center xl:items-start">
              <Logo />
              <Nav account={account} />
            </div>
            {account && <AccountMenu account={account} />}
          </div>
        </div>
      </div>
    </header>
  );
};

const userSelector = (state: GlobalState) => state.user;

export default Header;
