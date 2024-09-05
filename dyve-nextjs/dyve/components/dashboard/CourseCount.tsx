"use client";

import { AcademyAbi } from "@/contract-abi/Academy";
import { IoMdTabletPortrait } from "react-icons/io";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";

const CourseCount = () => {
  const { address } = useAccount();

  const ACADEMY_ADDRESS = process.env.NEXT_PUBLIC_ACADEMY_CONTRACT as Address;

  const {
    data: completedData,
    isLoading: completedLoading,
    error: completedError,
  } = useReadContract({
    address: ACADEMY_ADDRESS,
    abi: AcademyAbi,
    functionName: "getCompletedCourses",
    args: [address],
  });

  const {
    data: enrolledData,
    isLoading: enrolledLoading,
    error: enrolledError,
  } = useReadContract({
    address: ACADEMY_ADDRESS,
    abi: AcademyAbi,
    functionName: "getEnrolledCourses",
    args: [address],
  });

  const dataB: any = [
    {
      title: "Total Courses Enrolled",
      value: enrolledData?.toString(),
    },
    {
      title: "Courses Completed",
      value: completedData?.toString(),
    },
  ];

  return (
    <div className="mb-16">
      <div className="flex flex-row items-center justify-between gap-4">
        {dataB.map((cur: any, idx: number) => (
          <div key={idx} className="w-full rounded-xl border-2 p-4">
            <p className="mb-4 flex flex-row items-center justify-start text-xs font-medium text-white-5">
              <IoMdTabletPortrait className="mr-2 text-xl font-medium text-purple-5" />
              {cur.title}
            </p>

            <p className="text-2xl font-semibold text-white">
              {enrolledLoading || completedLoading ? (
                <div>...</div>
              ) : enrolledError || completedError ? (
                <div>Error</div>
              ) : (
                cur.value
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCount;
