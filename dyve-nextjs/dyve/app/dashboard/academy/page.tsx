"use client";

import CourseCount from "@/components/dashboard/CourseCount";
import CurrentCourse from "@/components/dashboard/CurrentCourse";
import Notification from "@/components/dashboard/Notification";
import { AcademyAbi } from "@/contract-abi/Academy";
import { Address } from "viem";
import { useReadContract, useAccount } from "wagmi";

export default function Page() {
  const { address } = useAccount();

  const ACADEMY_ADDRESS = process.env.NEXT_PUBLIC_ACADEMY_CONTRACT as Address;

  const { data, isLoading, error } = useReadContract({
    address: ACADEMY_ADDRESS,
    abi: AcademyAbi,
    functionName: "getStudent",
    args: [address],
  });

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error.message}</div>;

  const { name, dateJoined, isActive } = data as any;

  console.log(name, dateJoined);

  return (
    <section className="px-6 py-8">
      <div className="flex flex-row justify-between">
        <div className="w-2/3">
          <CourseCount />

          <CurrentCourse />
        </div>

        <Notification />
      </div>
    </section>
  );
}
