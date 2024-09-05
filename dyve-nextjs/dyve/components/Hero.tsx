import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-screen bg-hero-bg bg-cover bg-[right_top_300px] bg-no-repeat flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-between lg:w-11/12">
        <div className="w-2/3">
          <p className="mb-4 text-center text-7xl font-bold text-white md:text-left">
            Blockchain <span className="text-purple-1">Gateway</span> to
            <span className="text-purple-1"> Financial</span> Inclusion
          </p>

          <p className="mb-4 text-xl font-normal text-white lg:w-7/12">
            Secure microloans, grow your savings, learn and earn rewards—all in
            one place.
          </p>

          <Button>Get Started For Free</Button>
        </div>

        <div className="w-1/3">
          <Image
            src="/assets/hero-2.png"
            alt="hero image"
            height={435}
            width={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
