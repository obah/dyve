"use client";
import { useState } from "react";

export function CourseCurriculum() {
  const [currentItem, setCurrentItem] = useState<string>("1");

  const curricculum = [
    { id: "1", text: "Introduction to Blockchain and Cryptocurrency" },
    { id: "2", text: "Understanding Blockchain Technology" },
    { id: "3", text: "What is Decentralized Finance (DeFi)?" },
    { id: "4", text: "What is Decentralized Finance (DeFi)?" },
    { id: "5", text: "What is Decentralized Finance (DeFi)?" },
    { id: "6", text: "What is Decentralized Finance (DeFi)?" },
  ];

  return (
    <div className="h-[500px] rounded-r1 border border-[#343B4F] bg-[#13121E] pl-7 pt-14">
      <ol className="w-2/3 space-y-6 pl-7">
        {curricculum.map((item) => (
          <li
            key={item.id}
            className={`list-decimal text-sm font-medium hover:cursor-pointer hover:text-white ${currentItem === item.id ? "text-[#BCBCBE]" : "text-[#565656]"}`}
            onClick={() => setCurrentItem(item.id)}
          >
            {item.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
