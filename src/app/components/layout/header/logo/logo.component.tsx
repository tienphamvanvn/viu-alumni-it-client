import React from "react";
import { Link } from "react-router-dom";
import ImageLogo from "@/app/assets/images/image-logo.png";

const Logo = () => {
  return (
    <div className="flex flex-col max-w-full py-1 xl:pl-2">
      <h1 className="flex flex-col flex-grow justify-center items-center self-stretch cursor-pointer">
        <Link
          to="/home"
          className="flex flex-col rounded-full p-1 hover:border-blue-600 border-2"
        >
          <div className="flex">
            <img
              src={ImageLogo}
              alt="VIU Alumni IT"
              className="rounded-full h-7 w-7 xl:h-9 xl:w-20"
            />
          </div>
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
