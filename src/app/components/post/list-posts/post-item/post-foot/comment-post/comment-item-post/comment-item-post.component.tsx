import React, { useEffect, useState } from "react";
import { Comment } from "@/app/shared/types/comment.type";
import { Post } from "@/app/shared/types/post.type";
import UserProfilePicture from "@/app/components/user/user-profile-picture";
import CommentMenuPost from "./comment-menu-post";
import CommentContentPost from "./comment-content-post";
import PostCommentButton from "../../../post-body/post-menu/post-comment-button";
import UserShortInfo from "@/app/components/user/user-short-info";
import VerticalLine from "@/app/components/common/vertical-line";

const CommentItemPost: React.FC<PropType> = ({ comment, replyCm, post }) => {
  const [showRep, setShowRep] = useState<Comment[]>([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    replyCm && setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col flex-grow-0 flex-basis-3 items-center mr-3">
          <div className="flex flex-col flex-grow-0 flex-shrink w-full">
            <UserProfilePicture type="a" user={comment.user} />
          </div>
          {replyCm && replyCm?.length > 0 && (
            <VerticalLine className="mt-1 mb-24" />
          )}
        </div>
        <div className="flex flex-col flex-grow flex-basis-0 min-w-0 ">
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex flex-col flex-grow min-w-0 bg-gray-100 rounded-xl p-3">
                <UserShortInfo
                  user={comment.user}
                  createdAt={comment.createdAt}
                />
                <CommentContentPost comment={comment} />
              </div>

              <div className="flex items-start mt-3 ml-3">
                <CommentMenuPost comment={comment} post={post} />
              </div>
            </div>
            <div className="flex items-center mt-3 ml-3 mb-3">
              <PostCommentButton post={post} comment={comment} />
            </div>
            <div className="flex flex-col relative">
              {showRep.map((item, index) => {
                return (
                  item.reply && (
                    <CommentItemPost key={index} comment={item} post={post} />
                  )
                );
              })}
              {replyCm && replyCm.length - next > 0 ? (
                <div
                  className="ml-16 cursor-pointer font-semibold text-gray-600 hover:underline"
                  onClick={() => setNext(next + 10)}
                >
                  View more comments...
                </div>
              ) : (
                replyCm &&
                replyCm.length > 1 && (
                  <div
                    className="ml-16 cursor-pointer font-semibold text-gray-600 hover:underline"
                    onClick={() => setNext(1)}
                  >
                    Hide comments
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type PropType = {
  comment: Comment;
  replyCm?: Comment[];
  post: Post;
};

export default CommentItemPost;
