import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const Hero2 = () => {
  return (
    <div className="mt-20 flex items-center justify-center px-4">
      <div className="flex flex-row items-center justify-between lg:w-11/12">
        <div className="w-7/12">
          <p className="mb-4 text-7xl font-bold text-white">
            Start Saving, Secure Your Future
          </p>

          <p className="mb-4 text-xl font-normal text-white lg:w-7/12">
            Easy, safe, and accessible savings plans designed to help you grow
            your wealth
          </p>

          <Button className="w-[200px]">Start Saving</Button>
        </div>

        <div>
          {/* <Image 
                    src={"/assets/hero-img.png"}
                    width={400}
                    height={600}
                    alt='logo'
                    // fill={true}
                    className='object-contain'
                /> */}
          <img src="/assets/piggy2.png" />
        </div>
      </div>
    </div>
  );
};

export default Hero2;
