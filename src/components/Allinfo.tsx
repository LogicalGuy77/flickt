"use client";
import React from "react";
import Profile from "../../public/shin.png";
import Image from "next/image";

const Allinfo = () => {
  return (
    <div className="h-full border-b-2 border-gray-800 pb-5 mt-5">
      <div className="flex">
        <div>
          <Image
            src={Profile}
            width={170}
            height={150}
            className="rounded-full mr-3"
            alt="profile"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex w-[30rem] items-center justify-between">
            <h1 className="text-xl">4 posts</h1>
            <h1 className="text-xl">329 followers</h1>
            <h1 className="text-xl">441 following</h1>
          </div>
          <div>
            <h1 className="font-bold mt-5">User radar solana</h1>
          </div>
          <div>
            <h1>
              Wallet Address: CFesDYDHR4mTbXEdZC9YAoGcr7TFU9maN9DXVFMsKjxx
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allinfo;
