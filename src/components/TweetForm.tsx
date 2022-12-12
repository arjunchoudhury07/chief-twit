import React, { useState } from "react";
import { trpc } from "../utils/trpc";

export function TweetForm() {
  const mutation = trpc.tweet.create.useMutation().mutateAsync;
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleTweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    if (text.length < 3) {
      setError("Tweet must be more than 3 characters long");
    }
    mutation({ text });
    setText("");
  };

  return (
    <form className="my-4 w-10/12 ">
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Type your Tweet..."
        name=""
        id=""
        className="w-full rounded-lg border-4 border-blue-600 bg-transparent px-8 py-4"
      ></textarea>
      <div className="flex w-full justify-end">
        <button
          onClick={(e) => handleTweet(e)}
          className="rounded-xl bg-blue-500 px-5 py-3"
        >
          Tweet
        </button>
      </div>
    </form>
  );
}
