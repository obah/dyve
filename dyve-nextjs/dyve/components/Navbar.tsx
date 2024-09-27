"use client";

import { Button } from "./ui/button";
import { ConnectionModal } from "./auth/connection-modal";
import Image from "next/image";
import Link from "next/link";
import { NavItems } from "@/lib/CONSTANTS";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useState } from "react";

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

  return (
    <div
      className={`fixed left-0 top-0 z-50 hidden w-full flex-row items-center justify-between bg-[#0F0E10] px-16 pb-2 pt-5 backdrop-blur transition-transform duration-300 ease-in-out supports-[backdrop-filter]:bg-[#0f0e10c4] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } md:flex`}
    >
      <div className="flex items-center justify-between gap-9">
        <Image src="/assets/logo.png" width={90} height={30} alt="Dyve logo" />
        <header className="flex w-full items-center justify-between gap-4 rounded-full bg-black-background-2 px-3 py-2">
          {NavItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`rounded-full py-2 text-sm font-medium capitalize text-white ${pathname === item.href ? "bg-purple-3 px-10" : "bg-transparent px-4 hover:bg-[#221D2C]"}`}
            >
              {item.title}
            </Link>
          ))}
        </header>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-1 border-transparent"
        >
          <Globe className="h-[18px] w-[18px]" />
          EN
          <ChevronDown className="h-4 w-4" />
        </Button>

        <ConnectionModal />
      </div>
    </div>
  );
};

export default Navbar;
