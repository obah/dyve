import { courses } from "@/lib/data";
import { CourseCatalog } from "./course-catalog";

export function OtherCourses() {
  return (
    <div className="w-full rounded-r1 border-[0.5px] border-[#323232] bg-[#2B2B2F1A] p-14">
      <h3 className="mb-10 text-center text-4xl text-white">Other Courses</h3>
      <div className="flex justify-between">
        <CourseCatalog data={courses.slice(3, 6)} />
      </div>
    </div>
  );
}
