import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RouterOutputs, trpc } from "../utils/trpc";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { UseInfiniteQueryOptions } from "@tanstack/react-query";

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

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = (winScroll / height) * 100;

    setScrollPosition(scrolled);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

function Tweet({
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

export const TweetList = () => {
  const scrollPosition = useScrollPosition();

  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.list.useInfiniteQuery(
      {
        limit: 20,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div className="flex  w-full flex-col items-center gap-9 p-2">
      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} tweet={tweet} />;
      })}
      {!hasNextPage && <div>End of The List</div>}
    </div>
  );
};
