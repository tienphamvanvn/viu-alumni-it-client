import React from "react";

const PostButton: React.FC<PropType> = ({ textInButton, onSubmit }) => {
  return (
    <div
      className="flex flex-col min-h-9 min-w-9 px-4 rounded-full cursor-pointer border border-blue-600 hover:bg-blue-700 bg-blue-600"
      onClick={onSubmit}
    >
      <div className="flex justify-center items-center flex-grow">
        <span className="font-medium leading-none text-white">
          {textInButton}
        </span>
      </div>
    </div>
  );
};

type PropType = {
  textInButton: string;
  onSubmit: () => void;
};

export default PostButton;
