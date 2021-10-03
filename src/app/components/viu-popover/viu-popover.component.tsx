import React, { ReactNode } from "react";
import { Popover, Transition } from "@headlessui/react";

const VIUPopover: React.FC<PropType> = ({ icon, body }) => {
  return (
    <Popover className="flex flex-col relative">
      {({ open }) => (
        <>
          <div
            className="flex justify-start"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col justify-center">
              <div className="flex items-center">
                <Popover.Button
                  className={`flex min-w-0 group cursor-pointer${
                    open ? "" : " text-opacity-90"
                  }`}
                >
                  <div className="inline-flex relative rounded-full">
                    <div className="inline-flex absolute inset-0 -m-2 rounded-full z-0 group-hover:bg-blue-100"></div>
                    {icon}
                  </div>
                </Popover.Button>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel
                    className={`flex flex-col w-64 absolute top-0 z-30 rounded shadow-md overflow-hidden right-0 bg-white`}
                    style={{ maxWidth: "calc(384px)" }}
                  >
                    {body}
                  </Popover.Panel>
                </Transition>
              </div>
            </div>
          </div>
        </>
      )}
    </Popover>
  );
};

type PropType = {
  icon?: ReactNode;
  body: ReactNode;
};

export default VIUPopover;
