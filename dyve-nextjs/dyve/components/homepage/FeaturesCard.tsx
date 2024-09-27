"use client";

import { Icons } from "../icons";
import { IFeatureItem } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const FeaturesCard = ({ data, idx }: { data: IFeatureItem; idx: number }) => {
  const router = useRouter();

  return (
    <div
      className={`${idx === 0 || idx === 3 ? "col-span-4" : "col-span-6"} row-span-1 flex h-[122px] flex-row rounded-[36px] border border-r-0 border-[#00000033] bg-gradient-to-r from-purple-1/10 p-8 shadow-lg md:h-[244px]`}
    >
      <div className="flex flex-col justify-between">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => router.push(data.href)}
          className="hover: hidden h-8 w-8 rounded-full bg-[#201427] p-1 shadow-md shadow-black-2 hover:bg-[#5b3572] md:block"
        >
          <Icons.arrowRight className="text-[#CBCBCB]" />
        </Button>

        <div className="w-9/12">
          <p className="mb-2 text-lg font-semibold text-white-1 md:text-[32px]">
            {data.title}
          </p>

          <p className="text-xs font-normal text-white-1 md:text-base">
            {data.desc}
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <Image
          src={data.img}
          width={idx === 0 ? 320 : idx === 1 ? 300 : idx === 2 ? 190 : 340}
          height={idx === 0 ? 260 : idx === 1 ? 300 : idx === 2 ? 247 : 340}
          alt="feature picture"
        />
      </div>
    </div>
  );
};

export default FeaturesCard;
