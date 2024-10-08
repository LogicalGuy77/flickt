// "use client";
// import React from "react";
// import Starfield from "@/components/Starfield";
// import ExpandableCardDemo from "@/components/expandable";
// import Post from "@/components/Post";
// import { TextRevealCard } from "@/components/TextRevealCard";
// import Shinchan from "../../../public/shin.png";
// import TestImg from "../../../public/testimg.jpg";
// import Sol from "../../../public/solana.jpg";
// import AddPostComponent from "@/components/AddPostComponent";
// import { FloatingDock } from "@/components/floating-dock";
// import PhantomComponent from "@/components/PhantomComponent";

// const Page = () => {
//   const postsData = [
//     {
//       imagePost: Sol,
//       imageProfile: Shinchan,
//       title: "Solana Radar",
//       content:
//         "Having a blast at the Solana Radar build station in Jaipur! 🤯 The energy here is incredible and I’m surrounded by so many talented people.",
//     },
//     {
//       imagePost: TestImg,
//       imageProfile: Shinchan,
//       title: "Generative Art",
//       content:
//         "AI art: Where creativity meets technology. Witness the future of art, one pixel at a time.",
//     },
//     {
//       imagePost: TestImg,
//       imageProfile: Shinchan,
//       title: "ICC",
//       content:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos distincti.",
//     },
//     {
//       imagePost: TestImg,
//       imageProfile: Shinchan,
//       title: "BCCI",
//       content:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos distinctio veniam earum consequatur deserunt veritatis voluptas obcaecati tempora in repudiandae, laboriosam quam eveniet, quod atque doloremque, doloribus modi. Expedita, id.",
//     },
//   ];

//   return (
//     <main className="relative flex w-full p-4 bg-black">
//       <Starfield />
//       <div className="fixed z-20 bottom-6 left-1/2 transform -translate-x-1/2">
//         <FloatingDock
//           items={[
//             { title: "Home", icon: "🏠", href: "/" },
//             {
//               title: "Pitch Deck",
//               icon: "📊",
//               href:
//                 "https://www.canva.com/design/DAGQYnOIMzs/cyp9qNShAQqSu8ziErR-xQ/view?utm_content=DAGQYnOIMzs&utm_campaign=designshare&utm_medium=link&utm_source=editor",
//             },
//             { title: "Profile", icon: "🚀", href: "/user/profile" },
//           ]}
//         />
//       </div>
//       <div className="w-[20%] h-full fixed ml-10 border-r-2 border-gray-700">
//         <ExpandableCardDemo />
//         <div className="flex items-center justify-center mt-7 mr-6">
//           <AddPostComponent />
//         </div>
//       </div>

//       <div className="flex flex-col items-center justify-center ml-[20%] w-2/3">
//         {postsData.map((post, index) => (
//           <Post
//             key={index}
//             imageProfile={post.imageProfile.src}
//             imagePost={post.imagePost.src}
//             title={post.title}
//             content={post.content}
//           />
//         ))}
//       </div>

//       <div className="fixed top-0 right-0 h-[20%] m-5">
//         <div className="w-[280px] mt-4">
//           <div className="ml-auto flex translate-x-14">
//             <PhantomComponent />
//           </div>
//         </div>
//         <TextRevealCard
//           text="NFTs"
//           revealText="5 NFTs"
//           className="w-[280px] mb-5"
//         />
//         <TextRevealCard
//           text="Tokens"
//           revealText="10 Token"
//           className="w-[280px]"
//         />
//       </div>
//     </main>
//   );
// };

// export default Page;

"use client";
import React, { useState } from "react";
import Starfield from "@/components/Starfield";
import ExpandableCardDemo from "@/components/expandable";
import Post from "@/components/Post";
import { TextRevealCard } from "@/components/TextRevealCard";
import Shinchan from "../../../public/shin.png";
import TestImg from "../../../public/testimg.jpg";
import Sol from "../../../public/solana.jpg";
import AddPostComponent from "@/components/AddPostComponent";
import PhantomComponent from "@/components/PhantomComponent";
import { FloatingDock } from "@/components/floating-dock";
import { StaticImageData } from "next/image";

const Page = () => {
  const [postsData, setPostsData] = useState<
    {
      imagePost: StaticImageData | string;
      imageProfile: StaticImageData | string;
      title: string;
      content: string;
    }[]
  >([
    {
      imagePost: Sol, // This is StaticImageData
      imageProfile: Shinchan, // StaticImageData
      title: "What are BLINKS?",
      content:
        "⚡ Solana Blinks: The future of web3 interactions is here! 🌐 Seamlessly interact with Solana dApps directly from your favorite platforms. No more wallet switching or complex interfaces",
    },
    {
      imagePost: TestImg, // StaticImageData
      imageProfile: Shinchan, // StaticImageData
      title: "Cat Tax",
      content: ":) like if you love cats! 🐱",
    },
    // Add more initial posts here...
  ]);

  // Function to handle adding a new post
  const handleAddPost = (newPost: { imagePost: string; caption: string }) => {
    setPostsData([
      {
        imagePost: newPost.imagePost, // New image uploaded (as a string URL)
        imageProfile: Shinchan, // Profile image placeholder
        title: "New Post", // Optional title
        content: newPost.caption, // Caption from the post
      },
      ...postsData, // Add new post to the top of the list
    ]);
  };

  return (
    <main className="relative flex w-full p-4 bg-black">
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
            { title: "Profile", icon: "🚀", href: "/user/profile" },
          ]}
        />
      </div>
      <div className="w-[20%] h-full fixed ml-10 border-r-2 border-gray-700">
        <ExpandableCardDemo />
        <div className="flex items-center justify-center mt-7 mr-6">
          <AddPostComponent onAddPost={handleAddPost} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center ml-[20%] w-2/3">
        {postsData.map((post, index) => (
          <Post
            key={index}
            imageProfile={
              typeof post.imageProfile === "string"
                ? post.imageProfile
                : post.imageProfile.src
            } // Extract src if it's StaticImageData
            imagePost={
              typeof post.imagePost === "string"
                ? post.imagePost
                : post.imagePost.src
            } // Extract src if it's StaticImageData
            title={post.title}
            content={post.content}
          />
        ))}
      </div>

      <div className="fixed top-0 right-0 h-[20%] m-5">
        <div className="w-[280px] mt-4">
          <div className="ml-auto flex translate-x-14">
            <PhantomComponent />
          </div>
        </div>
        <TextRevealCard
          text="NFTs"
          revealText="5 NFTs"
          className="w-[280px] mb-5"
        />
        <TextRevealCard
          text="Tokens"
          revealText="10 Token"
          className="w-[280px]"
        />
      </div>
    </main>
  );
};

export default Page;
