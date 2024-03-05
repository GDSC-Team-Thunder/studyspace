import React, { ReactNode } from "react";

interface SideColProps {
  children: ReactNode;
}

const SideCol: React.FC<SideColProps> = ({children}) => {
  return (
    <div className="relative flex flex-col h-[85%] bg-[#FCFBF8] opacity-65 rounded-[25px] self-center w-[24%] p-1 justify-between">
      {children}
    </div>
  );
}

export default SideCol;
