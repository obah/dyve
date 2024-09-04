"use client";

import { transaction_column } from "@/components/columns/transaction-column";
import Accounts from "@/components/dashboard/Accounts";
import CourseCount from "@/components/dashboard/CourseCount";
import CurrentCourse from "@/components/dashboard/CurrentCourse";
import Notification from "@/components/dashboard/Notification";
import { DataTable } from "@/components/ui/data-table";
import { dummyTransactions } from "@/lib/data";

export default function Page() {
  return (
    <section
      className="px-6 py-8"
    >

      <div
        className="flex flex-row justify-between"
      >

        <div
          className="w-2/3"
        >
          <Accounts />

          <CourseCount />

          <CurrentCourse />

          <DataTable columns={transaction_column} data={dummyTransactions}/>
        </div>

        <Notification />

      </div>

    </section>
  );
}
