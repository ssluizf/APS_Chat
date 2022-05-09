import React from "react";

type ButtonProps = {
  children?: string | JSX.Element | JSX.Element[],
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button
      type="submit"
      className="bg-indigo-400 rounded-md text-white text-md font-semibold px-20 py-4 mb-14"
    >
      {children}
    </button>
  );
};

export default Button;
