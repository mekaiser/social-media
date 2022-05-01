import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function InputBox() {
  const { data: session } = useSession();

  const sendPost = (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={
            session
              ? session.user.image
              : "https://images.unsplash.com/photo-1600352712371-15fd49ca42b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
          }
          width={40}
          height={40}
          layout="fixed"
          alt=""
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${
              session ? session.user.name : "John"
            }?`}
          />
          <button type="submit" className="hidden" onClick={sendPost}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
