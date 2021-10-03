import React from "react";
import { ReactComponent as IconBookmark } from "@/app/assets/svgs/icon-bookmark.svg";
import { ReactComponent as IconBookmarkFill } from "@/app/assets/svgs/icon-bookmark-fill.svg";
import ButtonIcon from "@/app/components/button/button-icon";

const PostBookmarkButton: React.FC<PropType> = ({ onClick, isActive }) => {
  return (
    <ButtonIcon
      buttonType="bookmark"
      icon={
        isActive ? (
          <IconBookmarkFill className="h-5 w-5 z-10 fill-current text-yellow-600" />
        ) : (
          <IconBookmark className="h-5 w-5 z-10 fill-current group-hover:text-yellow-600" />
        )
      }
      onClick={onClick}
    />
  );
};

type PropType = {
  onClick: () => void;
  isActive?: boolean;
};

export default PostBookmarkButton;
