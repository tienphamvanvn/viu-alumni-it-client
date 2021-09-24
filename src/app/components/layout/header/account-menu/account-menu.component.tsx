import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { cx } from "@vechaiui/react";
import { User } from "@/app/shared/types/user.type";
import { AppDispatch } from "@/app/store/global.store";
import { ReactComponent as IconEllipsis } from "@/app/assets/svgs/icon-ellipsis.svg";
import { signOut } from "@/app/store/user/user.action";

const AccountMenu = ({ account, history }: PropType) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(signOut());
    history.push("/signin");
  };

  return (
    <Menu
      as="div"
      className="flex flex-col relative my-3 items-center xl:items-start"
    >
      <Menu.Button
        as="div"
        className="flex flex-col w-full cursor-pointer group"
      >
        <div className="flex items-center p-3 rounded-full group-hover:bg-blue-100">
          <div className="flex flex-col">
            <div className="flex h-10 w-10 rounded-full overflow-hidden bg-white">
              <img
                src={account?.profilePicture}
                alt={account?.fullname}
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="hidden flex-col flex-shrink max-w-full overflow-hidden xl:flex">
            <div className="flex flex-col flex-grow flex-shrink max-w-full mx-3">
              <div className="overflow-hidden whitespace-nowrap overflow-ellipsis break-words leading-none">
                <span className="text-sm font-bold">{account?.fullname}</span>
              </div>
              <div className="overflow-hidden whitespace-nowrap overflow-ellipsis break-words leading-none">
                <span className="text-sm">{`@${account?.studentID}`}</span>
              </div>
            </div>
          </div>
          <div className="hidden flex-col flex-grow items-end xl:flex">
            <IconEllipsis className="h-5" />
          </div>
        </div>
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-in-out duration-150"
        enterFrom="transform opacity-0 scale-90"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-out duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-90"
      >
        <Menu.Items
          className={cx(
            "absolute left-0 bottom-20 py-3 flex flex-col z-dropdown overflow-hidden origin-top-left rounded-2xl w-64 shadow-sm outline-none",
            "bg-white border border-gray-200",
            "dark:bg-neutral-800 dark:border-gray-700"
          )}
        >
          <Menu.Item>
            <div
              className="flex max-w-full p-4 cursor-pointer overflow-hidden hover:bg-gray-100"
              onClick={handleSignOut}
            >
              <div className="flex flex-col flex-grow flex-shrink max-w-full">
                <div className="max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis break-words">
                  Sign out @{account?.studentID}
                </div>
              </div>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type PropType = RouteComponentProps & {
  account: User | null;
};

export default withRouter(AccountMenu);
