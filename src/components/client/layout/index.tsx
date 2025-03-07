import { cn } from "@/lib/utils";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({
  children,
  classNames = "",
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <>
      <Header />
      <div
        className={cn(
          "flex items-center flex-col justify-center min-h-[calc(100vh-100px)]",
          classNames
        )}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
