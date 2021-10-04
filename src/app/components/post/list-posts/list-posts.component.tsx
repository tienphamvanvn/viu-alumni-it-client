import React from "react";
import { useHistory } from "react-router-dom";
import { Post } from "@/app/shared/types/post.type";
import PostItem from "./post-item";

const ListPosts: React.FC<PropType> = ({ posts }) => {
  const history = useHistory();

  const onClick = (postId: string) => history.push(`/post/${postId}`);

  return posts.length > 0 ? (
    <>
      {posts.map(post => (
        <div
          key={post._id}
          className="flex flex-col cursor-pointer border-b border-gray-100 hover:bg-gray-50"
          onClick={() => onClick(post._id)}
        >
          <PostItem post={post} />
        </div>
      ))}
    </>
  ) : (
    <></>
  );
};

type PropType = {
  posts: Post[];
};

export default ListPosts;
