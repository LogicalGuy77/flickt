import { useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import accountIdl from "../idls/AccountIdl.json";
import postIdl from "../idls/PostIdl.json";

// Set the program IDs and network to devnet
const accountProgramID = new PublicKey(accountIdl.metadata.address);
const postProgramID = new PublicKey(postIdl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "processed",
};

const SolanaInteraction = ({ onAccountInitialized, onOwnershipCheck }) => {
  const wallet = useWallet();
  const [accountProgram, setAccountProgram] = useState(null);
  const [postProgram, setPostProgram] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const initializePrograms = async () => {
      if (wallet.publicKey) {
        const provider = new AnchorProvider(
          new Connection(network, opts.preflightCommitment),
          wallet,
          opts.preflightCommitment
        );
        const accountProgram = new Program(
          accountIdl,
          accountProgramID,
          provider
        );
        const postProgram = new Program(postIdl, postProgramID, provider);
        setAccountProgram(accountProgram);
        setPostProgram(postProgram);
        await fetchAccountDetails();
        await fetchAllPosts();
      }
    };
    initializePrograms();
  }, [wallet.publicKey]);

  const fetchAccountDetails = async () => {
    if (!accountProgram || !wallet.publicKey) return;

    try {
      const [accountPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("account_pda"), wallet.publicKey.toBuffer()],
        accountProgram.programId
      );
      const account = await accountProgram.account.accountDetails.fetch(
        accountPDA
      );
      setAccountDetails(account);
      onAccountInitialized(true);
      onOwnershipCheck(
        account.owner.toString() === wallet.publicKey.toString()
      );

      await fetchFollowers(account.followersPda);
      await fetchFollowed(account.followedPda);
    } catch (error) {
      console.error("Error fetching account details:", error);
      onAccountInitialized(false);
      onOwnershipCheck(false);
    }
  };

  const fetchAllPosts = async () => {
    if (!postProgram) return;

    try {
      const allPosts = await postProgram.account.userPost.all();
      setPosts(allPosts.map((post) => post.account));
    } catch (error) {
      console.error("Error fetching all posts:", error);
    }
  };

  const fetchFollowers = async (followersPDA) => {
    const followers = await accountProgram.account.followersList.fetch(
      followersPDA
    );
    setFollowers(followers.followers);
  };

  const fetchFollowed = async (followedPDA) => {
    const followed = await accountProgram.account.followedList.fetch(
      followedPDA
    );
    setFollowed(followed.followed);
  };

  const initializeAccount = async (name) => {
    if (!accountProgram || !wallet.publicKey) return;

    try {
      const [accountPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("account_pda"), wallet.publicKey.toBuffer()],
        accountProgram.programId
      );
      const [followersPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("follower_pda"), wallet.publicKey.toBuffer()],
        accountProgram.programId
      );
      const [followedPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("followed_pda"), wallet.publicKey.toBuffer()],
        accountProgram.programId
      );
      const [postsPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("post_pda"), wallet.publicKey.toBuffer()],
        accountProgram.programId
      );

      await accountProgram.methods
        .initializeAccount(name)
        .accounts({
          accountDetails: accountPDA,
          followersList: followersPDA,
          followedList: followedPDA,
          postsList: postsPDA,
          owner: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      await fetchAccountDetails();
    } catch (error) {
      console.error("Error initializing account:", error);
    }
  };

  const addFollower = async (followerPubkey) => {
    if (!accountProgram || !wallet.publicKey || !accountDetails) return;

    try {
      const [accountPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("account_pda"), wallet.publicKey.toBuffer()],
        accountProgram.programId
      );

      await accountProgram.methods
        .addFollower(new PublicKey(followerPubkey))
        .accounts({
          accountDetails: accountPDA,
          followersList: accountDetails.followersPda,
          owner: wallet.publicKey,
        })
        .rpc();

      await fetchFollowers(accountDetails.followersPda);
    } catch (error) {
      console.error("Error adding follower:", error);
    }
  };

  const removeFollower = async (followerPubkey) => {
    if (!accountProgram || !wallet.publicKey || !accountDetails) return;

    try {
      const [accountPDA] = await PublicKey.findProgramAddress(
        [Buffer.from("account_pda"), wallet.publicKey.toBuffer()],
        accountProgram.programId
      );

      await accountProgram.methods
        .removeFollower(new PublicKey(followerPubkey))
        .accounts({
          accountDetails: accountPDA,
          followersList: accountDetails.followersPda,
          owner: wallet.publicKey,
        })
        .rpc();

      await fetchFollowers(accountDetails.followersPda);
    } catch (error) {
      console.error("Error removing follower:", error);
    }
  };

  const createPost = async (description, url, postId) => {
    if (!postProgram || !wallet.publicKey) return;

    try {
      const [userPostPDA] = await PublicKey.findProgramAddress(
        [
          Buffer.from("user_post"),
          wallet.publicKey.toBuffer(),
          Buffer.from("2"),
        ],
        postProgram.programId
      );

      await postProgram.methods
        .createPost(description, url, postId)
        .accounts({
          userPost: userPostPDA, // Ensure this matches exactly with the PDA on-chain
          authority: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      await fetchAllPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const likePost = async (postPublicKey) => {
    if (!postProgram || !wallet.publicKey) return;

    try {
      await postProgram.methods
        .likePost()
        .accounts({
          userPost: postPublicKey,
          authority: wallet.publicKey,
          from: wallet.publicKey,
          mint: new PublicKey("So11111111111111111111111111111111111111112"), // Replace with actual token mint if needed
          tokenProgram: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      await fetchAllPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const commentPost = async (postPublicKey, content) => {
    if (!postProgram || !wallet.publicKey) return;

    try {
      await postProgram.methods
        .commentPost(content)
        .accounts({
          userPost: postPublicKey,
          authority: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      await fetchAllPosts();
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  const fetchAllAccounts = async () => {
    if (!accountProgram) return [];

    try {
      const accounts = await accountProgram.account.accountDetails.all();
      return accounts.map((account) => account.publicKey);
    } catch (error) {
      console.error("Error fetching all accounts:", error);
      return [];
    }
  };

  return {
    accountDetails,
    followers,
    followed,
    posts,
    initializeAccount,
    addFollower,
    removeFollower,
    createPost,
    likePost,
    commentPost,
    fetchAllAccounts,
  };
};

export default SolanaInteraction;
