import { features } from "@/lib/CONSTANTS";
import FeaturesCard from "./FeaturesCard";
import { IFeatureItem } from "@/lib/types";

const Features = () => {
  return (
    <div className="flex w-full items-center justify-center bg-background-2 px-8 py-20">
      <div className="lg:w-11/12">
        <div className="mb-[74px] w-1/3">
          <p className="mb-2 text-xl font-light text-purple-1">
            Empower Your Financial Future
          </p>

          <p className="text-[32px] font-normal leading-[38px] text-white-1">
            Transform your finance one step at a Time
          </p>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-10 grid-rows-2 gap-2">
            {features.map((cur: IFeatureItem, idx: number) => (
              <FeaturesCard key={idx} data={cur} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
