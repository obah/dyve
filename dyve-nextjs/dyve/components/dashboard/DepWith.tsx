import { Dropdown } from "./Dropdown";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";

const DepWith = ({pointer, btnTitle}:{pointer:string, btnTitle:string}) => {
  return (
    <div
        className="rounded-xl bg-black-2 border-2 border-background-3 p-8"
    >

        <div
            className="flex flex-row items-center mb-8"
        >
            <p
                className="text-xl font-normal text-white mr-20"
            >
                Currency
            </p>

            <Dropdown 
                title={"Select Currency"}
                options={["USD", "EUR", "JPN", "Fuck naira"]}
            />
        </div>

        <div
            className="flex flex-row justify-between items-center mb-8"
        >
            <p
                className="text-xl font-normal text-white mr-20"
            >
                Currency
            </p>

            <Input 
                type="text" 
                placeholder="500,000" 
                className="border-2 border-[#AEB9E1] rounded-2xl text-lg text-[#AEB9E1] font-normal"
            />
        </div>

        <div 
            className="w-full flex flex-row justify-end"
        >
            <Button
                variant={"deposit"}
                className="w-9/12"
            >
                {btnTitle}
            </Button>
        </div>

    </div>
  )
}

export default DepWith