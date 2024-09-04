import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="mt-20 flex items-center justify-center px-4">
      <div className="flex flex-row items-center justify-between lg:w-11/12">
        <div className="w-2/3">
          <p className="mb-4 text-7xl font-bold text-white">
            Your <span className="text-purple-1">Gateway</span> to
            <span className="text-purple-1"> Financial</span> Freedom
          </p>

          <p className="mb-4 text-xl font-normal text-white lg:w-7/12">
            Secure microloans, grow your savings, learn and earn rewards—all in
            one place.
          </p>

          <Button>Get Started For Free</Button>
        </div>

        <div className="w-1/3">
          {/* <Image 
                    src={"/assets/hero-img.png"}
                    width={400}
                    height={600}
                    alt='logo'
                    // fill={true}
                    className='object-contain'
                /> */}
          <img src="/assets/hero-2.png" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
