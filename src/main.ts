import { Connection, Keypair } from "@solana/web3.js";
import dotenv from "dotenv";

import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { PumpFunSDK } from "./pumpFunSDK";

dotenv.config();

const main = async () => {
  console.log(process.env.HELIUS_RPC_URL);
  let connection = new Connection(process.env.HELIUS_RPC_URL || "");

  let wallet = new Wallet(new Keypair()); //note this is not used
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "finalized",
  });

  const sdk = new PumpFunSDK(provider);

  let tradeEvent = sdk.addEventListener(
    "tradeEvent",
    (event, slot, signature) => {
      console.log("tradeEvent", event, slot, signature);
    }
  );
  console.log("tradeEvent", tradeEvent);
};

main();
