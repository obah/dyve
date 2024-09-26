"use client";

import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("dashboard") && <Navbar />}
      <main>{children}</main>
      {!pathname.includes("dashboard") && <Footer />}
    </>
  );
};

export default LayoutWrapper;
