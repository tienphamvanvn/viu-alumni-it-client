import React, { useState } from "react";
import { Link } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import { Comment } from "@/app/shared/types/comment.type";
import ButtonReadMore from "@/app/components/button/button-read-more";

const CommentContentPost: React.FC<PropType> = ({ comment }) => {
  const [isReadMore, setReadMore] = useState<boolean>(true);

  const toggleReadMore = () => setReadMore(!isReadMore);

  const htmlContent = draftToHtml(JSON.parse(comment.content));

  return (
    <div className="flex flex-col flex-grow">
      <div className="inline-flex w-full relative">
        <div className="viu-inline-comment">
          {(comment.postUserId !== comment.user?._id ||
            comment.tag?._id !== comment.postUserId) && (
            <Link
              to={`/${comment.tag?.studentID}`}
              className="text-blue-600 mr-1"
            >
              {comment.tag?.fullname}
            </Link>
          )}
          {isReadMore && htmlContent.length > 100 ? (
            <span
              className="post-content break-words break-all"
              dangerouslySetInnerHTML={{
                __html: htmlContent.slice(0, 100) + "....",
              }}
            ></span>
          ) : (
            <span
              className="post-content break-words break-all"
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
            ></span>
          )}
          {htmlContent.length > 100 && (
            <ButtonReadMore isReadMore={isReadMore} onClick={toggleReadMore} />
          )}
        </div>
      </div>
    </div>
  );
};

type PropType = {
  comment: Comment;
};

export default CommentContentPost;
