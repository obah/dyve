import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutCourse } from "./about-course";
import { CourseContent } from "./course-content";

export function CourseDetails() {
  return (
    <Tabs
      defaultValue="account"
      className="h-[500px] rounded-r1 border border-[#343B4F] bg-gradient-to-b from-purple-1/5 px-5 py-10"
    >
      <TabsList>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="content">Course Content</TabsTrigger>
        <TabsTrigger value="submission">Submission</TabsTrigger>
      </TabsList>

      <TabsContent value="about">
        <AboutCourse />
      </TabsContent>
      <TabsContent value="content">
        <CourseContent />
      </TabsContent>
      <TabsContent value="submission">Change your password here.</TabsContent>
    </Tabs>
  );
}
