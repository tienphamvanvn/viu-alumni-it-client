import React, { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cx } from "@vechaiui/react";
import { ReactComponent as IconClose } from "@/app/assets/svgs/icon-close.svg";

const ModalSm: React.FC<PropType> = ({
  body,
  show,
  cssClass,
  cssStyle,
  onClose,
}) => {
  return (
    <Transition show={show}>
      <Dialog
        as="div"
        className="flex justify-center items-center w-64 z-20"
        open={show}
        onClose={onClose}
      >
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
            <div className="flex flex-col flex-grow flex-shrink relative w-full max-w-600px overflow-hidden rounded-b-2xl">
              <div className="flex flex-col flex-grow flex-shrink overflow-auto">
                <div className="flex flex-col pb-16">{body}</div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

type PropType = {
  body: ReactNode;
  show: boolean;
  cssClass?: string;
  cssStyle?: any;
  onClose: () => void;
};

export default ModalSm;
