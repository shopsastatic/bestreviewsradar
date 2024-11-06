import React, { FC } from "react";

export interface SidebarProps {
  className?: string;
  categories: any | null;
}

export const Sidebar: FC<SidebarProps> = ({
  className = "space-y-6 ",
  categories,
}) => {
  return (
    <div className={`nc-SingleSidebar ${className}`}>
    </div>
  );
};
