import React from "react";

export default function HeaderIcon({ Icon, active }) {
  return (
    <div className="flex items-center cursor-pointer md:px-10 sm:h-14 hover:bg-gray-100 rounded-xl active:border-b-2 active:hover:border-blue-500 group">
      <Icon
        className={`h-5 text-gray-500 text-center mx-auto sm:h-7 group-hover:text-blue-500 ${
          active && "text-blue-500"
        }`}
      />
    </div>
  );
}
