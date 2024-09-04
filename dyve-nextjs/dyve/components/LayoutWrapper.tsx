"use client";

import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { usePathname } from 'next/navigation';

const LayoutWrapper = ({children}: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <div>
        {!pathname.includes("dashboard") && <Navbar/> }
        <main>{children}</main>
        {!pathname.includes("dashboard") && <Footer /> }
    </div>
  )
}

export default LayoutWrapper