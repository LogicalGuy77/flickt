/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Starfield from "@/components/Starfield";
import PhantomComponent from "@/components/PhantomComponent";
import Post from "@/components/Post";
import { TextRevealCard } from "@/components/TextRevealCard";
import { FloatingDock } from "@/components/floating-dock";
import SolanaInteraction from "@/components/SolanaInteraction";

const Page: React.FC = () => {
  const wallet = useWallet();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [otherUsers, setOtherUsers] = useState<string[]>([]);
  const [newPost, setNewPost] = useState({
    description: "",
    url: "",
    postId: 0,
  });
  const [comment, setComment] = useState("");

  const {
    accountDetails,
    followers = [] as string[], // Explicitly type followers as string[]
    followed,
    posts,
    initializeAccount,
    addFollower,
    removeFollower,
    createPost,
    likePost,
    commentPost,
    fetchAllAccounts,
  } = SolanaInteraction({
    onAccountInitialized: setIsInitialized,
    onOwnershipCheck: setIsOwner,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (wallet.publicKey) {
        const allAccounts: PublicKey[] = await fetchAllAccounts(); // Specify the type of allAccounts

        const otherUserAddresses = allAccounts
          .filter(
            (account: PublicKey) =>
              account.toString() !== wallet.publicKey?.toString()
          )
          .map((account: PublicKey) => account.toString());

        setOtherUsers(otherUserAddresses);
      }
    };
    fetchData();
  }, [wallet.publicKey]);

  const handleAddPost = async () => {
    if (isOwner) {
      await createPost(newPost.description, newPost.url, newPost.postId);
      setNewPost({ description: "", url: "", postId: newPost.postId + 1 });
    }
  };

  const handleLikePost = async (postPublicKey: PublicKey) => {
    await likePost(postPublicKey);
  };

  const handleCommentPost = async (postPublicKey: PublicKey) => {
    if (comment.trim()) {
      await commentPost(postPublicKey, comment);
      setComment("");
    }
  };

  const handleInitializeAccount = async () => {
    const name = prompt("Enter your name to initialize your account:");
    if (name) {
      await initializeAccount(name);
    }
  };

  const handleFollowUnfollow = async (pubkey: string) => {
    if (followers.includes(pubkey)) {
      await removeFollower(pubkey);
    } else {
      await addFollower(pubkey);
    }
  };

  if (!wallet.connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p className="mb-4">Please connect your wallet to continue.</p>
        <WalletMultiButton />
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <button
          onClick={handleInitializeAccount}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Initialize Account
        </button>
      </div>
    );
  }

  return (
    <main className="relative flex w-full min-h-screen p-4 bg-black">
      <Starfield />
      <div className="fixed z-20 bottom-6 left-1/2 transform -translate-x-1/2">
        <FloatingDock
          items={[
            { title: "Home", icon: "🏠", href: "/" },
            { title: "Profile", icon: "🚀", href: "/user/profile" },
            {
              title: "Pitch Deck",
              icon: "📊",
              href:
                "https://www.canva.com/design/DAGQYnOIMzs/cyp9qNShAQqSu8ziErR-xQ/view?utm_content=DAGQYnOIMzs&utm_campaign=designshare&utm_medium=link&utm_source=editor",
            },
          ]}
        />
      </div>

      <aside className="fixed ml-10 w-[20%] min-h-screen border-r-2 border-gray-700">
        {/* <ExpandableCardDemo /> */}
        <div className="mt-7 mr-6">
          {isOwner && (
            <div className="mb-6">
              <h3 className="text-white mb-2">Create a Post:</h3>
              <input
                type="text"
                placeholder="Description"
                value={newPost.description}
                onChange={(e) =>
                  setNewPost({ ...newPost, description: e.target.value })
                }
                className="mb-2 p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="URL"
                value={newPost.url}
                onChange={(e) =>
                  setNewPost({ ...newPost, url: e.target.value })
                }
                className="mb-2 p-2 rounded w-full"
              />
              <button
                onClick={handleAddPost}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Add Post
              </button>
            </div>
          )}
          <div>
            <h3 className="text-white font-bold mb-2">Other Users:</h3>
            {otherUsers.map((pubkey, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <span className="text-white">{pubkey.slice(0, 8)}...</span>
                <button
                  onClick={() => handleFollowUnfollow(pubkey)}
                  className={`px-2 py-1 rounded ${
                    followers.includes(pubkey)
                      ? "bg-red-500 hover:bg-red-700"
                      : "bg-green-500 hover:bg-green-700"
                  } text-white text-sm`}
                >
                  {followers.includes(pubkey) ? "Unfollow" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="flex flex-col items-center justify-center ml-[20%] w-2/3">
        {posts.length > 0
          ? posts.map(
              (
                post: {
                  postId: number;
                  description: string;
                  url: string;
                  likeCount: number;
                  publicKey: PublicKey;
                  comments: {
                    author: PublicKey;
                    content: string;
                    timestamp: number;
                  }[];
                },
                index: number
              ) => (
                <Post
                  key={index}
                  title={`Post ${post.postId}`}
                  content={post.description}
                  imagePost={post.url}
                  imageProfile="" // Add a valid URL or variable for the profile image
                  likeCount={Number(post.likeCount)}
                  onLike={() => handleLikePost(post.publicKey)}
                  comments={post.comments.map((comment) => ({
                    author: comment.author.toString(),
                    content: comment.content,
                    timestamp: new Date(
                      comment.timestamp * 1000
                    ).toLocaleString(),
                  }))}
                >
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="p-2 rounded w-full"
                    />
                    <button
                      onClick={() => handleCommentPost(post.publicKey)}
                      className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                      Comment
                    </button>
                  </div>
                </Post>
              )
            )
          : ""}
      </section>
      <div className="fixed top-0 right-0 h-[20%] m-5">
        <div className="w-[280px] mt-4">
          <div className="ml-auto flex translate-x-16">
            <PhantomComponent /> {/* This is where your button is located */}
          </div>
        </div>
        <div className="fixed z-20 bottom-6">
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
      </div>
    </main>
  );
};

export default Page;
