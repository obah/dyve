"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ConnectionModal } from "./auth/connection-modal";

const Navbar = () => {
  const pathname = usePathname();

  const activeLink =
    "bg-purple-3 rounded-full px-10 py-2 text-white font-medium text-md";
  const inActiveLink =
    "bg-transparent px-4 py-2 rounded-full hover:bg-[#221D2C] text-white font-medium text-md";

  return (
    <div className="hidden w-full flex-row items-center justify-between px-16 md:flex">
      <div className="flex items-center justify-between gap-9">
        <Image src="/assets/logo.png" width={90} height={30} alt="Dyve logo" />
        <header className="flex w-full items-center justify-between gap-4 rounded-full bg-[#51515114] px-3 py-2">
          <Link
            href={"/"}
            className={pathname === "/" ? activeLink : inActiveLink}
          >
            Home
          </Link>

          <Link
            href={"/about"}
            className={pathname === "/about" ? activeLink : inActiveLink}
          >
            About
          </Link>

          <Link
            href={"/dashboard"}
            className={pathname === "/dashboard" ? activeLink : inActiveLink}
          >
            Dashboard
          </Link>

          <Link
            href={"/loan"}
            className={pathname === "/loan" ? activeLink : inActiveLink}
          >
            Micro Loan
          </Link>

          <Link
            href={"/savings"}
            className={pathname === "/savings" ? activeLink : inActiveLink}
          >
            Savings
          </Link>

          <Link
            href={"/academy"}
            className={pathname === "/academy" ? activeLink : inActiveLink}
          >
            Academy
          </Link>
        </header>
      </div>

      <div>
        <ConnectionModal />
      </div>
    </div>
  );
};

export default Navbar;
