"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
} from "@solana/web3.js";

export default function SendSolComponent() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleSendSol = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!publicKey) {
      setStatus("Wallet not connected!");
      return;
    }

    try {
      const recipientPubKey = new PublicKey(recipient);
      const lamportsToSend = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: lamportsToSend,
        })
      );

      setStatus("Sending transaction...");
      const signature = await sendTransaction(transaction, connection);

      setStatus("Confirming transaction...");
      const confirmation = await connection.confirmTransaction(
        signature,
        "confirmed"
      );

      if (confirmation.value.err) {
        setStatus(`Transaction failed! ${confirmation.value.err.toString()}`);
      } else {
        setStatus(`Transaction successful! Signature: ${signature}`);
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
      setStatus(`Error: ${getErrorMessage(error)}`);
    }
  };

  // Helper function to safely get error message
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    return String(error);
  };

  return (
    <form onSubmit={handleSendSol}>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient's public key"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in SOL"
        required
        min="0"
        step="0.000000001"
      />
      <button type="submit" disabled={!publicKey}>
        Send SOL
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}
