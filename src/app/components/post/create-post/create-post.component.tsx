import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Socket } from "socket.io-client";
import { Editor } from "react-draft-wysiwyg";
import { Post } from "@/app/shared/types/post.type";
import { User } from "@/app/shared/types/user.type";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { createPost } from "@/app/store/post/post.action";
import { createComment } from "@/app/store/comment/comment.action";
import UserProfilePicture from "../../user/user-profile-picture";
import InputImagePost from "./input-image-post";
import PreviewMedia from "./preview-media";
import PostButton from "./post-button";
import Loader from "../../loader";
import "@@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CreatePost: React.FC<PropType> = ({
  post,
  textInButton,
  postType,
  editorOptions,
  onClickEdit,
  onClickCreateComment,
}) => {
  const { token, account } = useSelector(userSelector);
  const { socket } = useSelector(socketSelector);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>(post?.images || []);

  const dispatch = useDispatch<AppDispatch>();

  const onChangeImage = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;

    let imageList: any[] = [];

    const files = [...e.currentTarget.files];

    files.forEach(file => {
      return imageList.push(file);
    });

    setImages([...images, ...imageList]);
  };

  const onDeleteImage = (index: number) => {
    const imageList = [...images];
    imageList.splice(index, 1);
    setImages(imageList);
  };

  const content = post
    ? postType === "create-comment" || postType === "create-comment-dialog"
      ? ""
      : post.content
    : "";

  const editorContent = post
    ? postType === "create-comment" || postType === "create-comment-dialog"
      ? EditorState.createEmpty()
      : EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState({
    editorState: editorContent,
  });

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState({ editorState });
  };

  const onSubmitPost = () => {
    setLoading(true);

    const content = JSON.stringify(
      convertToRaw(editorState.editorState.getCurrentContent())
    );

    if (postType === "create-post") {
      token &&
        dispatch(createPost(token, socket, content, images)).then(() =>
          setLoading(false)
        );
    }

    if (postType === "edit-post-dialog") {
      token && post && onClickEdit && onClickEdit(token, content, images, post);
    }

    if (postType === "create-comment") {
      const comment = {
        content,
        likes: [],
        user: account,
        createdAt: new Date().toISOString(),
      };

      token &&
        post &&
        account &&
        dispatch(createComment(token, post, comment, account, socket));
    }

    if (postType === "create-comment-dialog") {
      const comment = {
        content,
        likes: [],
        user: account,
        createdAt: new Date().toISOString(),
      };

      token &&
        post &&
        account &&
        onClickCreateComment &&
        onClickCreateComment(token, post, comment, account, socket);
    }

    setEditorState({ editorState: EditorState.createEmpty() });
    setImages([]);
  };

  return (
    <div className="flex flex-col relative bg-white border-b border-gray-100">
      <div className="flex flex-col py-1">
        <div className="flex px-4">
          <div className="flex flex-col flex-basis-3 justify-start flex-grow-0 mr-3">
            <div className="flex flex-col flex-shrink max-w-full">
              <UserProfilePicture type="a" user={account} />
            </div>
          </div>
          <div className="flex flex-col flex-grow flex-basis-0 py-2 min-w-0">
            <div className="flex flex-col">
              <Editor
                editorState={editorState.editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="flex flex-col"
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "emoji",
                    "colorPicker",
                    "list",
                    "textAlign",
                  ],
                }}
                {...editorOptions}
              />

              {(postType === "create-post" ||
                postType === "edit-post-dialog") && (
                <PreviewMedia images={images} onDelete={onDeleteImage} />
              )}
            </div>
            <div className="flex flex-col border-t border-gray-100">
              <div
                className={`${
                  postType === "create-comment" ||
                  postType === "create-comment-dialog"
                    ? "justify-end "
                    : "justify-between "
                }flex items-center flex-wrap`}
              >
                {(postType === "create-post" ||
                  postType === "edit-post-dialog") && (
                  <div className="flex items-center mt-3">
                    <InputImagePost onChange={onChangeImage} />
                  </div>
                )}
                <div className="flex items-center mt-3">
                  <PostButton
                    textInButton={textInButton}
                    onSubmit={onSubmitPost}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

const userSelector = (state: GlobalState) => state.user;
const socketSelector = (state: GlobalState) => state.socket;

type PropType = {
  post?: Post;
  textInButton: string;
  postType:
    | "create-post"
    | "edit-post-dialog"
    | "create-comment"
    | "create-comment-dialog";
  editorOptions?: any;
  onClickEdit?: (
    token: string,
    content: string,
    images: any,
    post: Post
  ) => void;
  onClickCreateComment?: (
    token: string,
    post: Post,
    comment: any,
    account: User,
    socket: Socket
  ) => void;
};

export default CreatePost;
