import React, { useEffect, useState } from "react";
import { Comment } from "@/app/shared/types/comment.type";
import { Post } from "@/app/shared/types/post.type";
import CreatePost from "@/app/components/post/create-post";
import CommentItemPost from "./comment-item-post";

const CommentPost: React.FC<PropType> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState<Comment[]>([]);
  const [next, setNext] = useState(2);

  const [replyComments, setReplyComments] = useState<Comment[]>([]);

  useEffect(() => {
    const newCm = post.comments.filter(cm => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newRep = post.comments.filter(cm => cm.reply);
    setReplyComments(newRep);
  }, [post.comments]);

  return (
    <>
      <div className="-mx-4 mb-3">
        <CreatePost
          textInButton="Reply"
          post={post}
          postType="create-comment"
          editorOptions={{
            placeholder: "Post your reply",
            toolbar: {
              options: ["emoji"],
            },
          }}
        />
      </div>
      {showComments.map((comment, index: number) => (
        <CommentItemPost
          key={index}
          comment={comment}
          post={post}
          replyCm={replyComments.filter(item => item.reply === comment._id)}
        />
      ))}
      {comments.length - next > 0 ? (
        <div
          className="ml-16 cursor-pointer font-semibold text-gray-600 hover:underline"
          onClick={() => setNext(next + 10)}
        >
          View more comments
        </div>
      ) : (
        comments.length > 2 && (
          <div
            className="ml-16 cursor-pointer font-semibold text-gray-600 hover:underline"
            onClick={() => setNext(2)}
          >
            Hide comments
          </div>
        )
      )}
    </>
  );
};

type PropType = {
  post: Post;
};

export default CommentPost;
