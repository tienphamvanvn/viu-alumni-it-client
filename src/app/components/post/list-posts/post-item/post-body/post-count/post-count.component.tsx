import React, { useState } from "react";
import { Post } from "@/app/shared/types/post.type";
import UsersLikedPostDialog from "@/app/modules/dialogs/users-liked-post-dialog";

const PostCount: React.FC<PropType> = ({ post }) => {
  const [showDialog, setShowDialog] = useState(false);

  const onOpen = () => setShowDialog(true);

  const onClose = () => setShowDialog(false);

  return (
    <>
      {(post.likes.length > 0 || post.comments.length > 0) && (
        <>
          {
            <div className="flex flex-col">
              <div className="flex flex-1 flex-nowrap border-b border-gray-100 px-1 py-4">
                {post.comments.length > 0 && (
                  <div className="flex flex-col mr-5">
                    <div className="flex flex-col">
                      <div className="break-words leading-5 cursor-pointer hover:underline">
                        <div className="inline-flex overflow-hidden">
                          <span className="break-words font-bold">
                            {post.comments.length}
                          </span>
                        </div>{" "}
                        <span className="break-words">
                          {post.comments.length > 1 ? "Comments" : "Comment"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {post.likes.length > 0 && (
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div
                        className="break-words leading-5 cursor-pointer hover:underline"
                        onClick={e => {
                          e.stopPropagation();
                          onOpen();
                        }}
                      >
                        <div className="inline-flex overflow-hidden">
                          <span className="break-words font-bold">
                            {post.likes.length}
                          </span>
                        </div>{" "}
                        <span className="break-words">
                          {post.likes.length > 1 ? "Likes" : "Like"}
                        </span>
                      </div>
                      <UsersLikedPostDialog
                        show={showDialog}
                        onClose={onClose}
                        users={post.likes}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        </>
      )}
    </>
  );
};

type PropType = {
  post: Post;
};

export default PostCount;
