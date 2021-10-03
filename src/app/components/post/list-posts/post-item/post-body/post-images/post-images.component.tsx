import React from "react";

const PostImages: React.FC<PropType> = ({ images }) => {
  return (
    <>
      {images.length > 0 && (
        <div className="flex flex-col">
          <div className="flex flex-wrap h-full w-full mt-3 relative max-h-96 overflow-x-hidden overflow-y-auto no-scrollbar">
            {images.map((img: any, index: number) => (
              <div
                key={index}
                className={`${
                  images.length > 1
                    ? "h-64 w-1/2 mb-2"
                    : `${img.match(/video/i) ? "h-96 w-full" : "h-64 w-full"}`
                }`}
              >
                <div className="flex flex-col flex-grow relative h-full rounded-2xl cursor-pointer overflow-hidden mr-2">
                  <div className="absolute inset-0">
                    {img.match(/video/i) ? (
                      <video
                        controls
                        src={img}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                    ) : (
                      <img
                        src={img}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        alt={img}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

type PropType = {
  images: string[];
};

export default PostImages;
