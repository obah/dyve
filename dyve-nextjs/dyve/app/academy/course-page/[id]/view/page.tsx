import { CourseCurriculum } from "@/components/academy/course-curriculum";
import { CourseDetails } from "@/components/academy/course-details";
import { FullscreenView } from "@/components/academy/fullscreen-video";

export default function Page() {
  return (
    <section className="mx-auto mt-5 w-11/12">
      <div className="mb-[52px] flex gap-[60px]">
        <CourseCurriculum />
        <FullscreenView />
      </div>

      <CourseDetails full />
    </section>
  );
}
