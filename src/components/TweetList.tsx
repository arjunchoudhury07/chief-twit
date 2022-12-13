import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import Spinner from "./Spinner";
import { Tweet } from "./Tweet";

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
    <div className="flex min-h-screen  w-full flex-col items-center gap-9 p-2">
      {data ? (
        tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        })
      ) : (
        <Spinner />
      )}
      {!hasNextPage && data && <div>End of The List</div>}
    </div>
  );
};
