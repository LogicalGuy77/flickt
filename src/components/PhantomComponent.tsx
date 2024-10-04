"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import WalletButton from "./WalletButton";

export default function PhantomComponent() {
  const { publicKey } = useWallet();

  return (
    <div>
      <WalletButton />
      {publicKey ? (
        <p>Your wallet is connected: {publicKey.toBase58()}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}
