import React from "react";

const ButtonReadMore: React.FC<PropType> = ({ isReadMore, onClick }) => {
  return (
    <div
      className="inline-block font-semibold rounded-md cursor-pointer hover:underline"
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    >
      <span>{isReadMore ? "Read More" : "Show Less"}</span>
    </div>
  );
};

type PropType = {
  isReadMore: boolean;
  onClick: () => void;
};

export default ButtonReadMore;
