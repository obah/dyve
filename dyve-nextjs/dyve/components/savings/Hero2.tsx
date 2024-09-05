import React from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

const Hero2 = () => {
  return (
    <div className="mt-20 flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-between md:flex-row lg:w-11/12">
        <div className="w-full text-center md:w-7/12 md:text-left">
          <p className="mb-4 text-7xl font-bold text-white">
            Start Saving, Secure Your Future
          </p>

          <p className="mb-4 text-xl font-normal text-white lg:w-7/12">
            Easy, safe, and accessible savings plans designed to help you grow
            your wealth
          </p>

          <Link
            href={"/dashboard/savings"}
            className={`w-[200px] ${buttonVariants({ variant: "default" })}`}
          >
            Start Saving
          </Link>
        </div>

        <div>
          <img src="/assets/piggy2.png" />
        </div>
      </div>
    </div>
  );
};

export default Hero2;
