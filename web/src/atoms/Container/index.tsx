import React from "react";

type ContainerProps = {
  children?: JSX.Element | JSX.Element[]
  className?: ""
};

const Container: React.FC<ContainerProps> = ({ children, className = "container" }) => {
  return (
    <div className={`${className} scrollbar overflow-y-auto flex flex-col items-center justify-between
    py-4 h-screen bg-slate-400 font-roboto`}>
      {children}
    </div>
  );
};

export default Container;
