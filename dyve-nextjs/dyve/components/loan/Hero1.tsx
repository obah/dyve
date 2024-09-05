import React from "react";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

const Hero1 = () => {
  return (
    <div className="mt-20 flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-between md:flex-row lg:w-11/12">
        <div className="w-full md:w-1/3">
          <p className="mb-4 text-7xl font-bold text-white">
            Access to micro loans
          </p>

          <p className="mb-4 text-xl font-normal text-white">
            Unlock Opportunities with Quick, Accessible Microloans
          </p>

          <Link
            href={"/dashboard/microloan"}
            className={`w-[200px] ${buttonVariants({ variant: "default" })}`}
          >
            Secure Loans
          </Link>
        </div>

        <div>
          <Image
            src={"/assets/wallet-3.png"}
            width={500}
            height={600}
            alt="logo"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero1;
