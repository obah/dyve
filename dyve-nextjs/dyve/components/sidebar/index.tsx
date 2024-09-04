import Link from "next/link";
import { NavItem } from "./navItem";
import { Button } from "../ui/button";
import { MdArrowOutward } from "react-icons/md";
import { FiArrowDownRight } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[200px_1fr]">
      <div className="sticky top-0 hidden h-screen border-r border-purple-4 bg-black-background lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center px-5">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <img src="/assets/logo.png" />
            </Link>
          </div>
          <div className="flex flex-1 flex-col justify-between overflow-auto py-2">
            <nav className="grid items-start border-none pl-2 pr-4 text-sm font-medium">
              <NavItem href="/dashboard">Overview</NavItem>

              <NavItem href="/dashboard/savings">Savings</NavItem>
              <NavItem href="/dashboard/microloan">Loans</NavItem>
              <NavItem href="/dashboard/academy">Academy</NavItem>
            </nav>

            <Button variant={"withdraw"} className="w-[160px]">
              Logout
              <AiOutlineLogout className="ml-2 text-purple-1" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-between gap-4 bg-black-background px-6 pt-6">
          <h1 className="text-2xl font-semibold text-white-7">
            Welcome back, John
          </h1>
          <div className="flex w-[350px] flex-row items-center justify-between">
            <Button variant={"withdraw"} className="w-[160px]">
              Withdraw
              <MdArrowOutward className="ml-2" />
            </Button>

            <Button variant={"deposit"} className="w-[160px]">
              Deposit
              <FiArrowDownRight className="ml-2" />
            </Button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
