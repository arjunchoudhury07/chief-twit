import React from "react";

export function Navbar() {
  return (
    <nav className="w-full bg-gray-900">
      <div className="flex items-center justify-center gap-x-2">
        <h1 className="my-6  text-center text-4xl font-bold">Cheif </h1>
        <h2 className="my-6 rounded-xl bg-slate-600 px-3 py-1 text-center text-4xl font-bold">
          Twit
        </h2>
      </div>

      <ul className="mx-7 flex justify-between">
        <li className="border-b-4 border-blue-500  p-2 font-bold">For you</li>
        <li className="border-b-4 border-blue-500  p-2 font-bold">Trending</li>
        <li className="border-b-4 border-blue-500  p-2 font-bold">Sports</li>
        <li className="border-b-4 border-blue-500  p-2 font-bold">
          Entertainment
        </li>
        <li className="border-b-4 border-blue-500  p-2 font-bold">News</li>
      </ul>
    </nav>
  );
}
