import React, { ReactNode } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const Layout = ({ children }: PropType) => {
  return (
    <div className="w-full flex">
      <Header />
      <main className="flex flex-col flex-grow flex-shrink items-start min-h-screen">
        <div className="flex flex-col flex-grow flex-shrink w-990px">
          <div className="flex flex-grow justify-between items-stretch min-h-full w-full">
            <div className="flex flex-col w-full max-w-600px border-r border-l border-gray-100 bg-white">
              {children}
            </div>
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

type PropType = {
  children: ReactNode;
};

export default Layout;
