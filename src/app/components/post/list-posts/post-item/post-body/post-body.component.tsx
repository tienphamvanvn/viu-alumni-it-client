import React from "react";
import { Post } from "@/app/shared/types/post.type";
import PostContent from "./post-content";
import PostImages from "./post-images";
import PostDate from "./post-date/post-date.component";
import PostCount from "./post-count";
import PostMenu from "./post-menu";

const PostBody: React.FC<PropType> = ({ post, isPageDetails }) => {
  return isPageDetails ? (
    <div className="flex flex-col">
      <PostContent content={post.content} />
      <PostImages images={post.images} />
      <PostDate post={post} />
      <PostCount post={post} />
      <PostMenu post={post} isPageDetails={isPageDetails} />
    </div>
  ) : (
    <></>
  );
};

type PropType = {
  isPageDetails?: boolean;
  post: Post;
};

export default PostBody;
