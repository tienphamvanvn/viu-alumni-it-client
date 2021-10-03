import React, { useState } from "react";
import { ReactComponent as IconEdit } from "@/app/assets/svgs/icon-edit.svg";
import { ReactComponent as IconEditS } from "@/app/assets/svgs/icon-edit-s.svg";
import { Post } from "@/app/shared/types/post.type";
import EditPostDialog from "@/app/modules/dialogs/edit-post-dialog";
import ButtonIcon from "@/app/components/button/button-icon";

const PostEditButton: React.FC<PropType> = ({ post }) => {
  const [showDialog, setShowDialog] = useState(false);

  const onOpen = () => setShowDialog(true);

  const onClose = () => setShowDialog(false);

  return (
    <ButtonIcon
      post={post}
      buttonType="edit"
      icon={
        <>
          <IconEdit className="h-5 w-5 z-10 fill-current group-hover:text-green-600" />
          <IconEditS className="h-5 w-5 z-10 fill-current group-hover:text-green-600 absolute text-blue-600" />
        </>
      }
      children={
        <EditPostDialog show={showDialog} onClose={onClose} post={post} />
      }
      onOpen={onOpen}
    />
  );
};

type PropType = {
  post: Post;
};

export default PostEditButton;
