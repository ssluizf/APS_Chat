import React from "react";

type ContainerProps = { children?: JSX.Element | JSX.Element[] };

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-between container
    py-4 h-screen bg-slate-400 font-roboto">
      {children}
    </div>
  );
};

export default Container;
