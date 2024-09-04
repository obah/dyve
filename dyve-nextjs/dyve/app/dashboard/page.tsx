import Accounts from "@/components/dashboard/Accounts";
import CourseCount from "@/components/dashboard/CourseCount";
import CurrentCourse from "@/components/dashboard/CurrentCourse";
import Notification from "@/components/dashboard/Notification";

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
        </div>

        <Notification />

      </div>

    </section>
  );
}
