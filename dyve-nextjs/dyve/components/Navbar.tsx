"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {  usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname()

  console.log(pathname)

  return (
    <div
        className="flex flex-row justify-between items-center w-full p-4"
      >

        <div 
          className="w-8/12 bg-black-background-2 rounded-lg flex flex-row justify-between items-center"
        >
          <img 
            src="/assets/logo.png"
          />

          <Button
            variant={pathname === "/" ? "activeLink" : "inActiveLink"}
          >
            Home
          </Button>

          <Button
            variant={pathname === "/about" ? "activeLink" : "inActiveLink"}
          >
            About
          </Button>

          <Button
            variant={pathname === "/micro loan" ? "activeLink" : "inActiveLink"}
          >
            Mico Loan
          </Button>

          <Button
            variant={pathname === "/savings" ? "activeLink" : "inActiveLink"}
          >
            Savings
          </Button>

          <Button
            variant={pathname === "/academy" ? "activeLink" : "inActiveLink"}
          >
            Academy
          </Button>
        </div>

        <div
        >
          <Button
            variant={"heroBtn"}
            className='w-[160px]'
          >
            Register
          </Button>
        </div>

      </div>
  )
}

export default Navbar;