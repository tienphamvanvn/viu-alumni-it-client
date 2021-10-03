import React from "react";
import { ReactComponent as IconHeart } from "@/app/assets/svgs/icon-heart.svg";
import { ReactComponent as IconHeartFill } from "@/app/assets/svgs/icon-heart-fill.svg";
import { Post } from "@/app/shared/types/post.type";
import ButtonIcon from "@/app/components/button/button-icon";

const PostLikeButton: React.FC<PropType> = ({
  post,
  onClick,
  isPageDetails,
  isActive,
}) => {
  return (
    <ButtonIcon
      post={post}
      buttonType="like"
      icon={
        isActive ? (
          <IconHeartFill className="h-5 w-5 z-10 fill-current text-pink-600" />
        ) : (
          <IconHeart className="h-5 w-5 z-10 fill-current group-hover:text-pink-600" />
        )
      }
      onClick={onClick}
      isActive={isActive}
      isPageDetails={isPageDetails}
    />
  );
};

type PropType = {
  post: Post;
  onClick: () => void;
  isPageDetails?: boolean;
  isActive?: boolean;
};

export default PostLikeButton;
