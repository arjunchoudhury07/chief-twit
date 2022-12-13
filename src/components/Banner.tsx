import { signIn } from "next-auth/react";
import React from "react";

export function Banner() {
  return (
    <div className="fixed bottom-0 z-20 flex max-h-20 w-full justify-around bg-blue-500 p-2 text-white">
      <div className="">
        <p className="text-2xl font-bold">Don’t miss what’s happening</p>
        <p>People on Twitter are the first to know</p>
      </div>
      <div className="flex items-center justify-center">
        <button className="mx-2 rounded-full border-2 border-blue-600 px-7 py-2 font-bold">
          Sign Up
        </button>
        <button
          onClick={() => signIn()}
          className="mx-2 rounded-full bg-black px-7 py-2 font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
