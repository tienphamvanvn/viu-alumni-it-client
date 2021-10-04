import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Post } from "@/app/shared/types/post.type";
import { AppDispatch } from "@/app/store/global.store";
import { editPost } from "@/app/store/post/post.action";
import CreatePost from "@/app/components/post/create-post";
import Modal from "@/app/components/modal";

const EditPostDialog: React.FC<PropType> = ({ show, onClose, post }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const onClick = (token: string, content: string, images: any, post: Post) => {
    setLoading(true);
    dispatch(editPost(token, content, images, post)).then(() => {
      onClose();
      setLoading(false);
    });
  };

  return (
    <Modal
      title="Edit post"
      show={show}
      isLoading={isLoading}
      onClose={onClose}
      body={
        <CreatePost
          textInButton="Save"
          postType="edit-post-dialog"
          post={post}
          editorOptions={{ placeholder: "Enter content" }}
          onClickEdit={onClick}
        />
      }
    />
  );
};

type PropType = {
  show: boolean;
  onClose: () => void;
  post: Post;
};

export default EditPostDialog;
