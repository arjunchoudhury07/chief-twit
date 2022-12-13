import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { type RouterOutputs } from "../utils/trpc";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds ",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});

export function Tweet({
  tweet,
}: {
  tweet: RouterOutputs["tweet"]["list"]["tweets"][number];
}) {
  return (
    <div className="flex w-full flex-col">
      {tweet.author.image && (
        <div className="mx-10 flex flex-col items-start justify-start gap-7 rounded-xl bg-gray-800 px-7 py-5">
          <div className="flex items-center gap-x-3">
            <Image
              src={tweet.author.image}
              alt={`${tweet.author.name} profile picture`}
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="font-thin">{tweet.author.name}</p>
            <p className="text-xs text-gray-400">
              {dayjs(tweet.createdAt).fromNow()}
            </p>
          </div>

          <div className="w-full">
            <p className="text-lg ">{tweet.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
