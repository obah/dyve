import { Dropdown } from "./Dropdown";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const DepWith = ({
  pointer,
  btnTitle,
}: {
  pointer: string;
  btnTitle: string;
}) => {
  return (
    <div className="rounded-xl border-2 border-background-3 bg-black-2 p-8">
      <div className="mb-8 flex flex-row items-center">
        <p className="mr-20 text-xl font-normal text-white">
          {pointer === "request loan" ? "Duration" : "Currency"}
        </p>

        {pointer !== "request loan" ? (
          <Dropdown
            title={"Select Currency"}
            options={["USD", "DYV", "USDT", "ETH", "NGN"]}
          />
        ) : (
          <Input
            type="date"
            placeholder="Select date"
            className="rounded-2xl border-2 border-[#AEB9E1] text-lg font-normal text-[#AEB9E1]"
          />
        )}
      </div>

      <div className="mb-8 flex flex-row items-center justify-between">
        <p className="mr-20 text-xl font-normal text-white">Amount</p>

        <Input
          type="text"
          placeholder="500,000"
          className="rounded-2xl border-2 border-[#AEB9E1] text-lg font-normal text-[#AEB9E1]"
        />
      </div>

      <div className="flex w-full flex-row justify-end">
        <Button variant={"deposit"} className="w-9/12">
          {btnTitle}
        </Button>
      </div>
    </div>
  );
};

export default DepWith;
