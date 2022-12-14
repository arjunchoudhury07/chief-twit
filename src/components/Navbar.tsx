import React from "react";

export function Navbar() {
  return (
    <nav className="w-full bg-gray-900">
      <div className="my-4 flex items-center justify-center gap-x-2">
        <h1 className="text-4xl font-bold">Chief </h1>
        <h2 className="rounded-xl bg-blue-400 px-3 py-1 pb-2 text-center text-4xl font-bold text-black">
          <p>Twit</p>
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
