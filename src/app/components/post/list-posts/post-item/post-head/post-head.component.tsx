import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "@/app/shared/types/post.type";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { follow, unfollow } from "@/app/store/user/user.action";
import { deletePost } from "@/app/store/post/post.action";
import VIUPopper from "@/app/components/viu-popover";
import UserProfilePicture from "@/app/components/user/user-profile-picture";
import UserShortInfo from "@/app/components/user/user-short-info";
import PostContent from "../post-body/post-content";
import PostImages from "../post-body/post-images";
import PostMenu from "../post-body/post-menu";
import { ReactComponent as IconEllipsis } from "@/app/assets/svgs/icon-ellipsis.svg";
import { ReactComponent as IconRecycleBin } from "@/app/assets/svgs/icon-recycle-bin.svg";
import { ReactComponent as IconUserFollow } from "@/app/assets/svgs/icon-user-follow.svg";
import { ReactComponent as IconUserUnfollow } from "@/app/assets/svgs/icon-user-unfollow.svg";

const PostHead: React.FC<PropType> = ({ post, isPageDetails }) => {
  const { token, account } = useSelector(userSelector);
  const { socket } = useSelector(socketSelector);

  const dispatch = useDispatch<AppDispatch>();

  const handleDeletePost = (id: string) =>
    token && dispatch(deletePost(token, id, socket));

  const handleFollow = (id: string) =>
    token && dispatch(follow(token, id, socket));

  const handleUnfollow = (id: string) =>
    token && dispatch(unfollow(token, id, socket));

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col flex-grow flex-basis-0 pt-3"></div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col flex-grow-0 flex-basis-3 items-center mr-3">
          <div className="flex flex-col flex-grow-0 flex-shrink w-full">
            <div className="flex flex-col flex-shrink max-w-full">
              <UserProfilePicture
                user={post.user}
                type="a"
                cssClass="block h-12 w-12"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow justify-center min-w-0">
          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <UserShortInfo
                user={post.user}
                createdAt={post.createdAt}
                isPageDetails={isPageDetails}
              />

              <div className="flex flex-col ml-5 relative">
                {account && (
                  <VIUPopper
                    icon={
                      <IconEllipsis className="h-5 w-5 z-10 fill-current group-hover:text-blue-600" />
                    }
                    body={
                      <>
                        {account._id === post.user._id ? (
                          <div
                            className="flex w-full p-4 cursor-pointer hover:bg-gray-100"
                            onClick={e => {
                              e.stopPropagation();
                              handleDeletePost(post._id);
                            }}
                          >
                            <div className="flex flex-col justify-center">
                              <IconRecycleBin className="h-5 fill-current text-red-600 mr-3" />
                            </div>
                            <div className="flex items-center">
                              <div className="leading-5 break-words min-w-0 text-red-600">
                                <span>Delete</span>
                              </div>
                            </div>
                          </div>
                        ) : post &&
                          account.following.includes(post.user._id) ? (
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
                        ) : (
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
                        )}
                      </>
                    }
                  />
                )}
              </div>
            </div>
          </div>
          {!isPageDetails && (
            <div className="flex flex-col pb-3">
              <PostContent content={post.content} />
              <PostImages images={post.images} />
              <PostMenu post={post} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

type PropType = {
  post: Post;
  isPageDetails?: boolean;
};

export default PostHead;
