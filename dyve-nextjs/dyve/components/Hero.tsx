import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex h-screen items-center justify-center bg-hero-bg bg-cover bg-[right_top_450px] bg-no-repeat px-4">
      <div className="flex flex-col items-center justify-between md:flex-row lg:w-11/12">
        <div className="w-2/3 space-y-[22px]">
          <p className="text-center text-[64px] font-bold leading-[77px] text-white md:text-left">
            Blockchain <span className="text-purple-1">Gateway</span> to
            <span className="text-purple-1"> Financial</span> Inclusion
          </p>

          <p className="text-xl font-normal text-white lg:w-7/12">
            Secure microloans, grow your savings, learn and earn rewards—all in
            one place.
          </p>

          <Button onClick={() => {}}>Get Started For Free</Button>
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
    </section>
  );
};

export default Hero;
