import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutCourse } from "./about-course";
import { CourseContent } from "./course-content";
import { CourseSubmission } from "./course-submission";
import { OtherContent } from "./other-content";

export function CourseDetails({ full }: { full?: boolean }) {
  return (
    <Tabs
      defaultValue="about"
      className="h-[500px] rounded-r1 border border-[#343B4F] bg-gradient-to-b from-purple-1/5 px-5 py-10"
    >
      <TabsList>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="content">Course Content</TabsTrigger>
        <TabsTrigger value="submission">Submission</TabsTrigger>
        {full && <TabsTrigger value="other">Other content</TabsTrigger>}
      </TabsList>

      <TabsContent value="about">
        <AboutCourse />
      </TabsContent>
      <TabsContent value="content">
        <CourseContent />
      </TabsContent>
      <TabsContent value="submission">
        <CourseSubmission />
      </TabsContent>
      <TabsContent value="other">
        <OtherContent />
      </TabsContent>
    </Tabs>
  );
}
