"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";

export function ConnectionModal() {
  const { openConnectModal } = useConnectModal();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"heroBtn"}>Register</Button>
      </DialogTrigger>
      <DialogContent className="border-[#343B4F] bg-gradient-to-b from-purple-1/10 sm:rounded-r1">
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            Register?
          </DialogTitle>
        </DialogHeader>

        <div className="mt-10 flex flex-col gap-10">
          <Button variant="outline">Continue with Email</Button>

          <Button>
            <ConnectButton />
          </Button>
          {/* <Button onClick={openConnectModal}>
            Connect Wallet
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
