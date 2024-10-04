"use client";
import React from "react";
import Starfield from "@/components/Starfield";
import Allinfo from "@/components/Allinfo";
import Post from "@/components/Post";
import Shinchan from "../../../../public/shin.png";
import TestImg from "../../../../public/testimg.jpg";
import Sol from "../../../../public/solana.jpg";
import { FloatingDock } from "@/components/floating-dock";
const Page = () => {
  const postsData = [
    {
      imagePost: Sol,
      imageProfile: Shinchan,
      title: "BCCI",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dis",
    },
    {
      imagePost: TestImg,
      imageProfile: Shinchan,
      title: "BCCI",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dis",
    },
    {
      imagePost: TestImg,
      imageProfile: Shinchan,
      title: "ICC",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos distincti.",
    },
    {
      imagePost: TestImg,
      imageProfile: Shinchan,
      title: "BCCI",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos distinctio veniam earum consequatur deserunt veritatis voluptas obcaecati tempora in repudiandae, laboriosam quam eveniet, quod atque doloremque, doloribus modi. Expedita, id.",
    },
  ];

  return (
    <main className="flex flex-col w-full p-4 items-center justify-center bg-black text-white">
      <Starfield />
      <div className="fixed z-20 bottom-6 left-1/2 transform -translate-x-1/2">
        <FloatingDock
          items={[
            { title: "Home", icon: "🏠", href: "/" },
            {
              title: "Pitch Deck",
              icon: "📊",
              href:
                "https://www.canva.com/design/DAGQYnOIMzs/cyp9qNShAQqSu8ziErR-xQ/view?utm_content=DAGQYnOIMzs&utm_campaign=designshare&utm_medium=link&utm_source=editor",
            },
            { title: "Feed", icon: "🚀", href: "/user" },
          ]}
        />
      </div>
      <Allinfo />
      <div className="flex flex-col items-center justify-center w-2/3 mt-[3rem]">
        {postsData.map((post, index) => (
          <Post
            key={index}
            imageProfile={post.imageProfile.src}
            imagePost={post.imagePost.src}
            title={post.title}
            content={post.content}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
