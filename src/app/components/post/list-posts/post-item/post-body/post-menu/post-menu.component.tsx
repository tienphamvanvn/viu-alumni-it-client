import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "@/app/shared/types/post.type";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { like, unlike } from "@/app/store/post/post.action";
import { bookmarkPost, unbookmarkPost } from "@/app/store/user/user.action";
import PostLikeButton from "./post-like-button";
import PostBookmarkButton from "./post-bookmark-button/post-bookmark-button.component";
import PostCommentButton from "./post-comment-button";
import PostEditButton from "./post-edit-button";

const PostMenu: React.FC<PropType> = ({ post, isPageDetails }) => {
  const { token, account } = useSelector(userSelector);
  const { socket } = useSelector(socketSelector);

  const dispatch = useDispatch<AppDispatch>();

  const handleLike = () =>
    token && account && dispatch(like(token, account, socket, post));

  const handleUnlike = () =>
    token && account && dispatch(unlike(token, account, socket, post));

  const handleBookmark = () => token && dispatch(bookmarkPost(token, post));

  const handleUnbookmark = () => token && dispatch(unbookmarkPost(token, post));

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col${
          isPageDetails ? " border-b border-gray-100" : ""
        }`}
      >
        <div
          className={`${
            isPageDetails
              ? "justify-around h-12 px-1"
              : "justify-between max-w-md mt-3"
          } flex items-stretch gap-x-2`}
        >
          <PostCommentButton post={post} isPageDetails={isPageDetails} />
          {account && post.likes.some(user => user._id === account._id) ? (
            <PostLikeButton
              post={post}
              onClick={handleUnlike}
              isPageDetails={isPageDetails}
              isActive
            />
          ) : (
            <PostLikeButton
              post={post}
              onClick={handleLike}
              isPageDetails={isPageDetails}
            />
          )}
          {account?.bookmark.includes(post._id) ? (
            <PostBookmarkButton onClick={handleUnbookmark} isActive />
          ) : (
            <PostBookmarkButton onClick={handleBookmark} />
          )}
          {account?._id === post.user._id && <PostEditButton post={post} />}
        </div>
      </div>
    </div>
  );
};

type PropType = {
  isPageDetails?: boolean;
  post: Post;
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

export default PostMenu;
