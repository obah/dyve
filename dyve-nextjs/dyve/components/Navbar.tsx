"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ConnectionModal } from "./auth/connection-modal";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 50) {
        setIsVisible(true);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("scroll", controlHeader);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [lastScrollY]);

  const pathname = usePathname();

  const activeLink =
    "bg-purple-3 rounded-full px-10 py-2 text-white font-medium text-sm";
  const inActiveLink =
    "bg-transparent px-4 py-2 rounded-full hover:bg-[#221D2C] text-white font-medium text-sm";

  return (
    <div
      className={`fixed left-0 top-0 z-50 hidden w-full flex-row items-center justify-between bg-[#0F0E10] px-16 pb-2 pt-5 backdrop-blur transition-transform duration-300 ease-in-out supports-[backdrop-filter]:bg-[#0f0e10c4] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } md:flex`}
    >
      <div className="flex items-center justify-between gap-9">
        <Image src="/assets/logo.png" width={90} height={30} alt="Dyve logo" />
        <header className="flex w-full items-center justify-between gap-4 rounded-full bg-black-background-2 px-3 py-2">
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
