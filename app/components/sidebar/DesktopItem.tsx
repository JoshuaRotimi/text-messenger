"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `group flex rounded-md gap-x-3 text-sm leading-6 
          font-semibold p-3 text-gray-500 hover:text-black hover:bg-gray-100`,
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className={"h-6 w-6 shrink-0"} />
        <span className={"sr-only"}>{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
