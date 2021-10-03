import React from "react";
import { moment } from "@/app/shared/utils/moment";
import { Post } from "@/app/shared/types/post.type";

const PostDate: React.FC<PropType> = ({ post }) => {
  return (
    <div className="flex flex-col border-b border-gray-100">
      <div className="flex flex-col my-4">
        <div className="flex justify-between items-center">
          <div className="break-words leading-5 mr-3">
            {post && (
              <>
                {moment(post.createdAt).format("LT")} .{" "}
                {moment(post.createdAt).format("LL")}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type PropType = {
  post: Post;
};

export default PostDate;
