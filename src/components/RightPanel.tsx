import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function RightPanel() {
  const { data } = useSession();
  return (
    <div className="fixed right-0 z-10 h-screen w-3/12 bg-gray-800">
      <div className="mr-30 ml-10  flex flex-col items-start gap-y-2">
        {data ? (
          <div className="my-5 flex items-center justify-center gap-x-4">
            {data?.user?.image && (
              <Image
                className="rounded-full ring-4 ring-blue-500"
                src={data?.user?.image}
                height={50}
                width={50}
                alt={`${data?.user?.name} profle picture`}
              />
            )}

            <p className="text-xl">{data?.user?.name}</p>
          </div>
        ) : (
          <div className="my-10 flex flex-col  justify-center gap-x-4 ">
            <p className="text-xl font-bold">You are not Signed in</p>
            <p>Sign in to Tweet</p>
            <div className="my-10">
              <h2 className="font-semibold">
                This Website is currently in its alpha stage
              </h2>

              <h3 className="text-xl font-semibold">Upcoming Features</h3>
              <ul className="mx-7 my-3 list-disc">
                <li>Like Tweets</li>
                <li>Commenting on Tweets</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
