"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction } from "@solana/web3.js";

export default function SendSolComponent() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const handleSendSol = async () => {
    if (!publicKey) return;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: RECIPIENT_PUBLIC_KEY, // Replace with actual recipient
        lamports: AMOUNT_IN_LAMPORTS, // Replace with actual amount
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");
      console.log("Transaction sent:", signature);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <button onClick={handleSendSol} disabled={!publicKey}>
      Send SOL
    </button>
  );
}
