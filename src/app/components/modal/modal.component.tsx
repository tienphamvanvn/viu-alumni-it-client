import React, { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cx } from "@vechaiui/react";
import { ReactComponent as IconClose } from "@/app/assets/svgs/icon-close.svg";
import Loader from "../loader";

const Modal: React.FC<PropType> = ({
  body,
  title,
  show,
  isLoading,
  cssClass,
  cssStyle,
  onClose,
}) => {
  return (
    <Transition show={show}>
      <Dialog
        as="div"
        className="flex justify-center items-center h-full w-screen fixed inset-0 z-20"
        open={show}
        onClose={onClose}
      >
        <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-gray-900 opacity-25" />
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div
            className={cx(
              `relative flex flex-col flex-shrink mx-auto rounded-2xl${
                cssClass ? ` ${cssClass}` : ""
              }`,
              "bg-white border",
              "dark:bg-neutral-800 dark:border-neutral-700"
            )}
            style={{
              minWidth: "600px",
              maxWidth: "80vw",
              maxHeight: "90vh",
              ...cssStyle,
            }}
          >
            <div className="flex flex-col h-53px border-b border-gray-100">
              <div className="flex justify-center items-center w-full h-53px mx-auto px-4 rounded-t-2xl bg-white">
                <div className="flex flex-col justify-center items-start self-stretch min-h-8 min-w-14">
                  <div className="flex rounded-full group">
                    <div
                      className="flex flex-grow min-h-9 min-w-9 overflow-hidden rounded-full cursor-pointer group-hover:bg-blue-100"
                      onClick={onClose}
                    >
                      <div className="flex flex-grow justify-center items-center">
                        <IconClose className="h-5 w-5 fill-current group-hover:text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow flex-shrink justify-center h-full overflow-hidden">
                  <div className="flex flex-col items-start">
                    <h2 className="max-w-full text-xl font-bold overflow-hidden overflow-ellipsis whitespace-nowrap leading-tight">
                      {title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-grow flex-shrink relative w-full max-w-600px overflow-hidden rounded-b-2xl">
              <div className="flex flex-col flex-grow flex-shrink overflow-auto">
                <div className="flex flex-col pb-16">{body}</div>
              </div>
              {isLoading && <Loader />}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

type PropType = {
  body: ReactNode;
  title: string;
  show: boolean;
  isLoading?: boolean;
  cssClass?: string;
  cssStyle?: any;
  onClose: () => void;
};

export default Modal;
