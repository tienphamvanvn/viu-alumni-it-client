import React from "react";
import { ReactComponent as IconLoading } from "@/app/assets/svgs/icon-loading.svg";

const Loader = () => {
  return (
    <div className="h-full w-full flex justify-center items-center absolute z-50 inset-0 bg-white">
      <IconLoading className="animate-spin h-10 w-10 text-blue-600" />
    </div>
  );
};

export default Loader;
