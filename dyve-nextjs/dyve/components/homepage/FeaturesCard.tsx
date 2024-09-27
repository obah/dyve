import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type PropT = {
  title: string;
  desc: string;
  img: string;
};

const FeaturesCard = ({ data, idx }: { data: PropT; idx: number }) => {
  return (
    <div className="mr-10 flex h-[122px] w-[265px] flex-row rounded-[36px] border-[0.5px] border-r-0 border-[#00000033] bg-gradient-to-r from-purple-1/10 p-8 shadow-lg md:h-[244px] md:w-[550px]">
      <div className="flex flex-col justify-between">
        <div className="hidden w-fit cursor-pointer rounded-full bg-[#201427] p-2 drop-shadow-md md:block">
          <FaArrowRight className="text-white" />
        </div>

        <div className="w-9/12">
          <p className="mb-2 text-lg font-semibold text-white-1 md:text-3xl">
            {data.title}
          </p>

          <p className="text-xs font-normal text-white-1 md:text-base">
            {data.desc}
          </p>
        </div>
      </div>

      <div className="mg:block hidden">
        <Image
          src={`${data.img}`}
          className={"shadow-2xl"}
          width={idx === 0 ? 270 : 500}
          height={idx === 0 ? 200 : 500}
          alt="pic"
        />
      </div>
    </div>
  );
};

export default FeaturesCard;
