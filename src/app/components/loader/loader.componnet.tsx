import React from "react";
import { Spinner } from "@vechaiui/spinner";

const Loader = () => {
  return (
    <div className="h-full w-full flex justify-center absolute z-50 inset-0 pt-20 bg-white">
      <Spinner size="lg" className="text-blue-600" />
    </div>
  );
};

export default Loader;
