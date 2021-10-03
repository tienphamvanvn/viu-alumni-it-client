import React, { useState } from "react";
import { ReactComponent as IconMes } from "@/app/assets/svgs/icon-mes.svg";
import CreateCommentDialog from "@/app/modules/dialogs/create-comment-dialog";
import { Post } from "@/app/shared/types/post.type";
import ButtonIcon from "@/app/components/button/button-icon";
import { Comment } from "@/app/shared/types/comment.type";

const PostCommentButton: React.FC<PropType> = ({
  post,
  comment,
  isPageDetails,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const onOpen = () => setShowDialog(true);

  const onClose = () => setShowDialog(false);

  return (
    <ButtonIcon
      post={post}
      comment={comment}
      buttonType="comment"
      icon={
        <IconMes className="h-5 w-5 z-10 fill-current group-hover:text-blue-600" />
      }
      isPageDetails={isPageDetails}
      children={
        <CreateCommentDialog
          show={showDialog}
          onClose={onClose}
          post={post}
          comt={comment}
        />
      }
      onOpen={onOpen}
    />
  );
};

type PropType = {
  post: Post;
  comment?: Comment;
  isPageDetails?: boolean;
};

export default PostCommentButton;
