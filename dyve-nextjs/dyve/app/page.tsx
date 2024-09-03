"use client";

import Features from "@/components/Features";
import Hero from "@/components/Hero";
import QuickGuide from "@/components/QuickGuide";


export default function Home() {

  return (
    <div
      className="bg-background"
    >  
      <Hero />
      <Features />
      <QuickGuide />
    </div>
  );
}
