import Image from "next/image";
import React from "react";

export default function Post({
  name,
  message,
  email,
  timestamp,
  image,
  postImage,
}) {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-md">
        <div className="flex items-center space-x-2">
          <Image
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            layout="fixed"
            alt=""
          />
          <div>
            <p>{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="pt-4 ">{message}</p>
      </div>
      {postImage && (
          <div className="relative h-56 md:h-96 mg-white">
              <Image
                src={postImage}
                objectFit='cover'
                layout="fill"
                alt=""
              />
          </div>
      )}
    </div>
  );
}
