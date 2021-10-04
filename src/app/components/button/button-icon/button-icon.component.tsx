import React, { ReactNode } from "react";
import { Post } from "@/app/shared/types/post.type";
import { Comment } from "@/app/shared/types/comment.type";

const ButtonIcon: React.FC<PropType> = ({
  post,
  comment,
  buttonType,
  isPageDetails,
  isActive,
  children,
  icon,
  onOpen,
  onClick,
}) => {
  const cssHover = "inline-flex absolute inset-0 -m-2 rounded-full";

  return (
    <div className="flex justify-start">
      <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <div
            className="flex min-w-0 group cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onOpen && onOpen();
              onClick && onClick();
            }}
          >
            <div className="inline-flex relative rounded-full">
              {(buttonType === "comment" || buttonType === "more") && (
                <div className={`${cssHover} group-hover:bg-blue-100`}></div>
              )}
              {buttonType === "like" && (
                <div className={`${cssHover} group-hover:bg-pink-100`}></div>
              )}
              {buttonType === "bookmark" && (
                <div className={`${cssHover} group-hover:bg-yellow-100`}></div>
              )}
              {buttonType === "edit" && (
                <div className={`${cssHover} group-hover:bg-green-100`}></div>
              )}
              {buttonType === "inbox" && (
                <div
                  className={`${cssHover} group-hover:bg-blue-100 opacity-60 border border-blue-200`}
                ></div>
              )}
              {icon}
            </div>
            {post && !isPageDetails && (
              <>
                {buttonType === "comment" && post.comments.length > 0 && (
                  <div className="inline-flex items-center overflow-hidden">
                    <span className="px-3 text-sm group-hover:text-blue-600">
                      {comment ? "Reply" : post.comments.length}
                    </span>
                  </div>
                )}
                {buttonType === "like" && post.likes.length > 0 && (
                  <div className="inline-flex items-center overflow-hidden">
                    <span
                      className={`${
                        isActive ? "text-pink-600 " : ""
                      }px-3 text-sm group-hover:text-pink-600`}
                    >
                      {post.likes.length}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

type PropType = {
  post?: Post;
  comment?: Comment;
  buttonType: "comment" | "like" | "bookmark" | "edit" | "more" | "inbox";
  isPageDetails?: boolean;
  isActive?: boolean;
  children?: ReactNode;
  icon: ReactNode;
  onOpen?: () => void;
  onClick?: () => void;
};

export default ButtonIcon;
