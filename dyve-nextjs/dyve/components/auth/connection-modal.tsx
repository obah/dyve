"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";

export function ConnectionModal() {
  const { openConnectModal } = useConnectModal();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const truncate = (text: `0x${string}`) => {
    const firstThree = text.slice(0, 3);
    const lastThree = text.slice(-4);

    return `${firstThree}...${lastThree}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{isConnected ? truncate(address!) : "Register"}</Button>
      </DialogTrigger>
      <DialogContent className="border-[#343B4F] bg-gradient-to-b from-purple-1/10 sm:rounded-r1">
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            Register?
          </DialogTitle>
        </DialogHeader>

        <div className="mt-10 flex flex-col gap-10">
          {isConnected ? (
            <Button onClick={() => disconnect()}>Disconnect</Button>
          ) : (
            <>
              <Button variant="outline">Continue with Email</Button>

              <Button onClick={openConnectModal}>Connect Wallet</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
