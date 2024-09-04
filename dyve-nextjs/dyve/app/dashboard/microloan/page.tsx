import Accounts from "@/components/dashboard/Accounts";
import Notification from "@/components/dashboard/Notification";
import CourseCount from "@/components/dashboard/CourseCount";
import LoanBox from "@/components/dashboard/LoanBox";

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

          <LoanBox />
        </div>

        <Notification />

      </div>
    </section>
  );
}
