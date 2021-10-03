import React from "react";
import { ReactComponent as IconImage } from "@/app/assets/svgs/icon-image.svg";

const InputImagePost: React.FC<PropType> = ({ onChange }) => {
  return (
    <div className="flex flex-col relative min-h-9 min-w-9 rounded-full -ml-2 cursor-pointer hover:bg-blue-100">
      <div className="flex justify-center items-center flex-grow">
        <span className="font-medium leading-none text-blue-600">
          <IconImage className="h-5 w-5 text-blue-600 fill-current" />
        </span>
      </div>
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm"
        className="absolute h-full w-full inset-0 opacity-0 overflow-hidden cursor-pointer"
        onChange={onChange}
      />
    </div>
  );
};

type PropType = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

export default InputImagePost;
