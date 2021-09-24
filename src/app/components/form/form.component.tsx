import React, { useState, ReactNode } from "react";
import "./form.component.css";

const TextBox = ({ children, labelName }: PropTypeTextBox) => {
  return (
    <div className="relative">
      {children}
      {labelName && (
        <span className="form-textbox-label absolute top-4 left-4 text-gray-700 transition-all duration-300">
          {labelName}
        </span>
      )}
    </div>
  );
};

const TextBoxInput = ({
  type,
  name,
  value,
  onChange,
  rest,
}: PropTypeTextBoxInput) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const isFocus =
    focus || (value && value.length !== 0) ? "form-textbox-focused " : "";

  return (
    <input
      autoComplete="off"
      {...rest}
      type={type}
      name={name}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      className={`${isFocus}block h-14 w-full pt-4 px-4 pb-0 rounded-xl border-gray-300 outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition-all duration-300`}
    />
  );
};

type PropTypeTextBox = {
  children?: ReactNode;
  labelName?: string;
};

type PropTypeTextBoxInput = {
  rest?: any;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export { TextBox, TextBoxInput };
