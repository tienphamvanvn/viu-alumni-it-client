import React from "react";

const VerticalLine: React.FC<PropType> = ({ className }) => {
  return (
    <div
      className={`flex flex-col flex-grow bg-gray-100${
        className ? ` ${className}` : ""
      }`}
      style={{ width: "2px" }}
    ></div>
  );
};

type PropType = {
  className?: string;
};

export default VerticalLine;
