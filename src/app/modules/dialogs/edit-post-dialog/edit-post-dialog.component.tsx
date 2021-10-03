import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "@/app/shared/types/post.type";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { editPost } from "@/app/store/post/post.action";
import CreatePost from "@/app/components/post/create-post";
import Modal from "@/app/components/modal";

const EditPostDialog: React.FC<PropType> = ({ show, onClose, post }) => {
  const { isLoadingEdit } = useSelector(postSelector);
  const dispatch = useDispatch<AppDispatch>();

  const onClick = (token: string, content: string, images: any, post: Post) => {
    dispatch(editPost(token, content, images, post)).then(() => onClose());
  };

  return (
    <Modal
      title="Edit post"
      show={show}
      isLoading={isLoadingEdit}
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

const postSelector = (state: GlobalState) => state.post;

type PropType = {
  show: boolean;
  onClose: () => void;
  post: Post;
};

export default EditPostDialog;
