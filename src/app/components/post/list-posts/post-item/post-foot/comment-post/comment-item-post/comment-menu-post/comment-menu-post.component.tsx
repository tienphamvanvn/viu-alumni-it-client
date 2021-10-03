import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "@/app/shared/types/post.type";
import { Comment } from "@/app/shared/types/comment.type";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { deleteComment } from "@/app/store/comment/comment.action";
import VIUPopper from "@/app/components/viu-popover";
import { ReactComponent as IconEllipsis } from "@/app/assets/svgs/icon-ellipsis.svg";

const CommentMenuPost: React.FC<PropType> = ({ post, comment }) => {
  const { token, account } = useSelector(userSelector);
  const { socket } = useSelector(socketSelector);

  const dispatch = useDispatch<AppDispatch>();

  const onDeleteComment = () => {
    if (post.user._id === account?._id || comment.user._id === account?._id) {
      token && dispatch(deleteComment(token, post, comment, socket));
    }
  };

  return (
    account && (
      <VIUPopper
        icon={
          <IconEllipsis className="h-5 w-5 z-10 fill-current group-hover:text-blue-600" />
        }
        body={
          <>
            {post.user._id === account?._id ||
            comment.user._id === account?._id ? (
              <div
                className="flex w-full p-4 cursor-pointer hover:bg-gray-100"
                onClick={onDeleteComment}
              >
                <div className="flex items-center">
                  <div className="leading-5 break-words min-w-0 text-red-600">
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        }
      />
    )
  );
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

type PropType = {
  comment: Comment;
  post: Post;
};

export default CommentMenuPost;
