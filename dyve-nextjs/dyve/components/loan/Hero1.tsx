import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const Hero1 = () => {
  return (
    <div className="mt-20 flex items-center justify-center px-4">
      <div className="flex flex-row items-center justify-between lg:w-11/12">
        <div className="w-1/3">
          <p className="mb-4 text-7xl font-bold text-white">
            Access to micro loans
          </p>

          <p className="mb-4 text-xl font-normal text-white">
            Unlock Opportunities with Quick, Accessible Microloans
          </p>

          <Button className="w-[200px]">Secure Loans</Button>
        </div>

        <div>
          <Image
            src={"/assets/wallet-3.png"}
            width={500}
            height={600}
            alt="logo"
            // fill={true}
            className="object-contain"
          />
          {/* <img 
                    src="/assets/wallet-1.png"
                /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero1;
