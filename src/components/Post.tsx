"use client";

import Image from "next/image";
import Heart from "react-animated-heart";
import { useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

interface Comment {
  author: string;
  content: string;
  timestamp: string;
}

interface PostProps {
  imageProfile: string;
  imagePost: string;
  title: string;
  content: string;
  likeCount: number;
  comments: Comment[];
  onLike: () => void;
  children?: React.ReactNode;
}

const RECIPIENT_ADDRESS = "GbhG73QyzBfgeQZwA5D7YTpATXTeZmzQRr4kss2thg4o";

const Post: React.FC<PostProps> = ({
  imageProfile,
  imagePost,
  title,
  content,
  likeCount,
  comments = [],
  onLike,
}) => {
  const [isClick, setClick] = useState(false);
  const [comment, setComment] = useState("");
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);

  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  useEffect(() => {
    console.log("Connected to Solana devnet");
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log(comment);
    setComment("");
  };

  const handleLikeClick = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      console.error("Wallet not connected");
      return;
    }

    setIsSendingTransaction(true);

    try {
      console.log("Initiating transaction on Solana devnet");

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(RECIPIENT_ADDRESS),
          lamports: LAMPORTS_PER_SOL * 0.5,
        })
      );

      const {
        blockhash,
        lastValidBlockHeight,
      } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      const signedTransaction = await wallet.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      console.log("Transaction sent, awaiting confirmation");

      await connection.confirmTransaction({
        signature: txid,
        blockhash,
        lastValidBlockHeight,
      });

      console.log("Transaction confirmed on devnet:", txid);

      onLike();
      setClick(!isClick);
    } catch (error) {
      console.error("Error sending transaction on devnet:", error);
    } finally {
      setIsSendingTransaction(false);
    }
  };

  return (
    <div className="relative z-[10] w-[45vw] border-2 border-gray-700 p-2 rounded-md m-3 text-white">
      <div className="flex m-3">
        <Image
          src={imageProfile}
          width={32}
          height={32}
          className="rounded-full h-8 w-8 mr-3"
          alt={`${title} profile picture`}
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">{title}</h1>
          <p>{content}</p>
          <Image
            src={imagePost}
            width={400}
            height={500}
            className="rounded-2xl object-cover"
            alt={`Post image of ${title}`}
          />
        </div>
      </div>

      <div className="w-full flex items-center ml-3 pr-5">
        <Heart
          isClick={isClick}
          onClick={handleLikeClick}
          //@ts-expect-error - Fix this by adding the correct type for the style prop
          disabled={isSendingTransaction || !wallet.connected}
        />
        <span className="ml-2">{likeCount} likes</span>

        <textarea
          name="comment"
          id="comment"
          className="bg-transparent border-2 border-gray-50 rounded-full h-10 w-[70%] p-1.5 overflow-hidden"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />

        <button
          type="button"
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white rounded-full px-3 py-1 ml-2 w-15"
        >
          Comment
        </button>
      </div>

      <div className="mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex flex-col mt-2">
            <span className="font-bold">{comment.author}</span>
            <span className="text-sm">{comment.timestamp}</span>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
