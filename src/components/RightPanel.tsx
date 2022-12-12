import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function RightPanel() {
  const { data } = useSession();
  return (
    <div className="fixed right-0 h-screen w-3/12 bg-gray-800">
      <div className="mr-30 ml-10  flex flex-col items-start gap-y-2">
        {/* <p className="text-xl font-bold">
                Sup Motherfuckers this is a twitter clone made by a Noob Dev
                <pre>{JSON.stringify(users, null, 2)}</pre>
              </p> */}
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
          </div>
        )}
      </div>
    </div>
  );
}
