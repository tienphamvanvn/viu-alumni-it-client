import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { Comment } from "@/app/shared/types/comment.type";
import { Post } from "@/app/shared/types/post.type";
import { User } from "@/app/shared/types/user.type";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { createComment } from "@/app/store/comment/comment.action";
import Modal from "@/app/components/modal";
import CreatePost from "@/app/components/post/create-post";
import UserProfilePicture from "@/app/components/user/user-profile-picture";
import UserShortInfo from "@/app/components/user/user-short-info";
import PostContent from "@/app/components/post/list-posts/post-item/post-body/post-content";
import VerticalLine from "@/app/components/common/vertical-line";
import PostImages from "@/app/components/post/list-posts/post-item/post-body/post-images";

const CreateCommentDialog: React.FC<PropType> = ({
  show,
  onClose,
  post,
  comt,
}) => {
  const { account } = useSelector(userSelector);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const onClick = (
    token: string,
    post: Post,
    comment: any,
    account: User,
    socket: Socket
  ) => {
    setLoading(true);

    let cm = {
      ...comment,
    };

    if (comt) {
      cm = {
        ...cm,
        reply: comt.reply ? comt.reply : comt._id,
        tag: comt.user,
      };
    }

    dispatch(createComment(token, post, cm, account, socket)).then(() => {
      onClose();
      setLoading(false);
    });
  };

  return (
    <Modal
      title="Reply"
      show={show}
      onClose={onClose}
      isLoading={isLoading}
      body={
        <>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="flex">
                  <div className="flex flex-col flex-grow flex-basis-0 pt-3"></div>
                </div>
              </div>
            </div>
            <div className="flex px-4">
              <div className="flex flex-grow flex-shrink">
                <div className="flex flex-col flex-grow-0 flex-basis-3 items-center mr-3">
                  <div className="flex flex-col flex-grow-0 flex-shrink w-full">
                    <div className="flex flex-col flex-shrink max-w-full">
                      <UserProfilePicture
                        user={comt ? comt.user : post.user}
                        type="a"
                        cssClass="block h-12 w-12"
                      />
                    </div>
                  </div>
                  <VerticalLine className="mt-1" />
                </div>
                <div className="flex flex-col flex-grow flex-basis-0">
                  <div className="flex flex-col">
                    <UserShortInfo
                      user={comt ? comt.user : post.user}
                      createdAt={comt ? comt.createdAt : post.createdAt}
                    />
                    <PostContent content={comt ? comt.content : post.content} />
                    {!comt && <PostImages images={post.images} />}
                  </div>
                  {account?._id !== post.user._id && (
                    <div className="pt-1 pb-4">
                      Replying to{" "}
                      <span className="text-blue-600">
                        {comt ? comt.user.fullname : post.user.fullname}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <CreatePost
            textInButton="Reply"
            post={post}
            postType="create-comment-dialog"
            editorOptions={{
              placeholder: "Post your reply",
              toolbar: {
                options: ["emoji"],
              },
            }}
            onClickCreateComment={onClick}
          />
        </>
      }
    />
  );
};

const userSelector = (state: GlobalState) => state.user;

type PropType = {
  show: boolean;
  onClose: () => void;
  post: Post;
  comt?: Comment;
};

export default CreateCommentDialog;
