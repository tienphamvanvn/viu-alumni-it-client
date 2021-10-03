import React from "react";
import { Post } from "@/app/shared/types/post.type";
import PostHead from "./post-head";
import PostBody from "./post-body";
import PostFoot from "./post-foot";

const PostItem: React.FC<PropType> = ({ post, isPageDetails }) => {
  return (
    <article className="flex flex-col px-4 overflow-hidden">
      <div className="flex flex-col flex-grow flex-shrink">
        <PostHead post={post} isPageDetails={isPageDetails} />
        <PostBody post={post} isPageDetails={isPageDetails} />
      </div>
      {isPageDetails && <PostFoot post={post} />}
    </article>
  );
};

type PropType = {
  isPageDetails?: boolean;
  post: Post;
};

export default PostItem;
