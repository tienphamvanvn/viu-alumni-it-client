import React from "react";
import { useHistory } from "react-router-dom";
import { Post } from "@/app/shared/types/post.type";
import PostItem from "./post-item";
import Loader from "../../loader";

const ListPosts: React.FC<PropType> = ({ isLoading, posts }) => {
  const history = useHistory();

  const handleClick = (postId: string) => history.push(`/post/${postId}`);

  return (
    <div className="flex flex-col relative">
      {isLoading ? (
        <div className="pt-28">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col w-full mx-auto max-w-600px">
          {posts.length > 0 &&
            posts.map(post => (
              <div
                key={post._id}
                className="flex flex-col cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                onClick={() => handleClick(post._id)}
              >
                <PostItem post={post} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

type PropType = {
  isLoading: boolean;
  posts: Post[];
};

export default ListPosts;
