import React from "react";

export function Navbar() {
  return (
    <nav className="w-full bg-gray-900">
      <h1 className="my-6 text-center  text-4xl font-bold">Cheif Twit</h1>
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
