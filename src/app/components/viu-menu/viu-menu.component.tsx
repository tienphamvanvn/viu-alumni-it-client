import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { cx } from "@vechaiui/react";
import { ReactComponent as IconRecycleBin } from "@/app/assets/svgs/icon-recycle-bin.svg";
import { ReactComponent as IconUserFollow } from "@/app/assets/svgs/icon-user-follow.svg";
import { ReactComponent as IconUserUnfollow } from "@/app/assets/svgs/icon-user-unfollow.svg";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { follow, unfollow } from "@/app/store/user/user.action";
import { deletePost } from "@/app/store/post/post.action";
import { Post } from "@/app/shared/types/post.type";

const ViuMenu: React.FC<PropType> = ({ post }) => {
  const { token, account } = useSelector(userSelector);
  const { socket } = useSelector(socketSelector);

  const dispatch = useDispatch<AppDispatch>();

  const handleDeletePost = (id: string) =>
    token && dispatch(deletePost(token, id, socket));

  const handleFollow = (id: string) => dispatch(follow(id, socket));

  const handleUnfollow = (id: string) => dispatch(unfollow(id, socket));

  return (
    <Menu
      as="div"
      className="flex flex-col relative"
      onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
    >
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
            "absolute right-10 flex flex-col z-10 overflow-hidden origin-top-left rounded-md w-80 shadow-sm outline-none",
            "bg-white border border-gray-200",
            "dark:bg-neutral-800 dark:border-gray-700"
          )}
        >
          {account?._id === post.user._id ? (
            <>
              <Menu.Item>
                <div
                  className="flex max-w-full p-4 cursor-pointer overflow-hidden hover:bg-gray-100"
                  onClick={e => {
                    e.stopPropagation();
                    handleDeletePost(post._id);
                  }}
                >
                  <div className="flex flex-col justify-center">
                    <IconRecycleBin className="h-5 text-red-600 fill-current mr-3" />
                  </div>
                  <div className="flex flex-col flex-grow flex-shrink max-w-full">
                    <div className="text-red-600 max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis break-words">
                      Delete post
                    </div>
                  </div>
                </div>
              </Menu.Item>
            </>
          ) : (
            <>
              {account?.following.includes(post.user._id) ? (
                <Menu.Item>
                  <div
                    className="flex max-w-full p-4 cursor-pointer overflow-hidden hover:bg-gray-100"
                    onClick={e => {
                      e.stopPropagation();
                      handleUnfollow(post.user._id);
                    }}
                  >
                    <div className="flex flex-col justify-center">
                      <IconUserUnfollow className="h-5 fill-current mr-3" />
                    </div>
                    <div className="flex flex-col flex-grow flex-shrink min-w-0">
                      <div className="max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis break-words">
                        Unfollow {post.user.fullname}
                      </div>
                    </div>
                  </div>
                </Menu.Item>
              ) : (
                <Menu.Item>
                  <div
                    className="flex max-w-full p-4 cursor-pointer overflow-hidden hover:bg-gray-100"
                    onClick={e => {
                      e.stopPropagation();
                      handleFollow(post.user._id);
                    }}
                  >
                    <div className="flex flex-col justify-center">
                      <IconUserFollow className="h-5 fill-current mr-3" />
                    </div>
                    <div className="flex flex-col flex-grow flex-shrink min-w-0">
                      <div className="max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis break-words">
                        Follow {post.user.fullname}
                      </div>
                    </div>
                  </div>
                </Menu.Item>
              )}
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

type PropType = {
  post: Post;
};

export default ViuMenu;
