"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export function Dropdown({
    title,
    options
}:{
    title:string;
    options:string[]
}) {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline" className="w-[200px] h-[30px]">{title}</Button> */}
        <p
              className='w-9/12 flex flex-row justify-between items-center bg-black border-2 border-[#AEB9E1] rounded-2xl text-lg text-[#AEB9E1] font-normal p-2 mb-2'
          >
              {title} <FaChevronDown />
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Pan</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {
                options.map((cur:any, id:number) => (
                    <DropdownMenuRadioItem value={`${cur}`}>{cur}</DropdownMenuRadioItem>
                ))
            }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
