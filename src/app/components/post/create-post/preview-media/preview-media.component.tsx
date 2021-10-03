import React from "react";
import { ReactComponent as IconClose } from "@/app/assets/svgs/icon-close.svg";

const PreviewMedia: React.FC<PropType> = ({ images, onDelete }) => {
  const imageShow = (src: string) => {
    return (
      <img
        src={src}
        alt="images"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    );
  };

  const videoShow = (src: string) => {
    return (
      <video
        controls
        src={src}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    );
  };

  return (
    images &&
    images.length > 0 && (
      <div className="flex flex-col mt-2 mb-1">
        <div className="flex flex-wrap h-full w-full relative max-h-72 overflow-x-hidden overflow-y-auto no-scrollbar">
          {images.map((img: any, index: number) => (
            <div
              key={index}
              className={`${images.length === 1 ? "w-full h-64 " : "w-1/2 "}${
                images.length === 2 ? "w-1/2 h-64 " : ""
              }h-32 mb-2`}
            >
              <div className="flex flex-col flex-grow relative h-full rounded-2xl cursor-pointer overflow-hidden mr-2">
                <div className="absolute inset-0">
                  {img.url || img.type
                    ? img.url
                      ? img.url.match(/video/i)
                        ? videoShow(img.url)
                        : imageShow(img.url)
                      : img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img))
                      : imageShow(URL.createObjectURL(img))
                    : img.match(/video/i)
                    ? videoShow(img)
                    : imageShow(img)}
                </div>
                <div className="flex absolute top-1 left-1 rounded-full group">
                  <div
                    className="flex flex-grow bg-blackAlpha-800 min-h-8 min-w-8 overflow-hidden rounded-full cursor-pointer group-hover:opacity-80"
                    onClick={() => onDelete(index)}
                  >
                    <div className="flex flex-grow justify-center items-center">
                      <IconClose className="h-5 w-5 fill-current text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

type PropType = {
  images: any;
  onDelete: (index: number) => void;
};

export default PreviewMedia;
