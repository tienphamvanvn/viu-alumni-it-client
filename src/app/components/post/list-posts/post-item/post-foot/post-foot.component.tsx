import React from "react";
import { Post } from "@/app/shared/types/post.type";
import CommentPost from "./comment-post";

const PostFoot: React.FC<PropType> = ({ post }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col py-3">
        <div className="flex flex-col px-4">
          <CommentPost post={post} />
        </div>
      </div>
    </div>
  );
};

type PropType = {
  post: Post;
};

export default PostFoot;
