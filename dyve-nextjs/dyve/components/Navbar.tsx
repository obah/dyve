"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ConnectionModal } from "./auth/connection-modal";

const Navbar = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex w-8/12 flex-row items-center justify-between rounded-lg bg-black-background-2 py-2">
        <Image src="/assets/logo.png" width={90} height={30} alt="Dyve logo" />

        <Link
          href={"/"}
          className={buttonVariants({
            variant: pathname === "/" ? "activeLink" : "inActiveLink",
          })}
        >
          Home
        </Link>

        <Link
          href={"/about"}
          className={buttonVariants({
            variant: pathname.includes("/about")
              ? "activeLink"
              : "inActiveLink",
          })}
        >
          About
        </Link>

        <Link
          href={"/loan"}
          className={buttonVariants({
            variant: pathname.includes("/loan") ? "activeLink" : "inActiveLink",
          })}
        >
          Micro Loan
        </Link>

        <Link
          href={"/savings"}
          className={buttonVariants({
            variant: pathname.includes("/savings")
              ? "activeLink"
              : "inActiveLink",
          })}
        >
          Savings
        </Link>

        <Link
          href={"/academy"}
          className={buttonVariants({
            variant: pathname.includes("/academy")
              ? "activeLink"
              : "inActiveLink",
          })}
        >
          Academy
        </Link>
      </div>

      <div>
        <ConnectionModal />
      </div>
    </div>
  );
};

export default Navbar;
