import React from "react";

const Message = ({
  variant = "alert-info",
  children,
}: {
  variant: string;
  children: React.ReactNode;
}) => {
  return <div className={`alert ${variant}`}>{children}</div>;
};

export default Message;
