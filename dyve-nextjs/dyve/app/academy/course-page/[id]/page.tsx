"use client";

import { courses } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { CourseDetails } from "@/components/academy/course-details";
import { OtherCourses } from "@/components/academy/other-courses";

export default function Page({ params }: { params: { id: string } }) {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  const id = params.id ?? 1;

  const { title, description, reward } = courses[+id];

  //todo check if user has started the course then change button to continue

  return (
    <>
      <main className="container mx-auto mb-40 mt-[90px] px-10">
        <div className="mb-40 grid grid-cols-2">
          <div className="space-y-9">
            <div>
              <h3 className="text-[20px] font-light uppercase text-purple-2">
                Get Started with Ease
              </h3>

              <h2 className="text-[64px] font-bold leading-[77px] text-[#CBCBCB]">
                {title}
              </h2>
            </div>

            <p className="w-10/12 text-[20px] font-normal text-white">
              {description}
            </p>

            <div>
              <Link
                href={`${id}/view`}
                className={`w-1/2 ${buttonVariants({ variant: "default" })}`}
              >
                Enroll For Free
              </Link>
              <span className="pl-2 text-sm font-light text-green-500">
                Earn ${reward} on completion
              </span>
            </div>
          </div>

          {playVideo ? (
            <div className="rounded-r1">
              <iframe
                width="500"
                height="350"
                src="https://www.youtube.com/embed/1YyAzVmP9xQ?si=0x0m0KmbApnLtl9N"
                title="Dyve course"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-r1"
              ></iframe>
            </div>
          ) : (
            <div className="group relative h-fit w-fit rounded-r1">
              <Image
                src={"/images/videoImage.png"}
                width={500}
                height={350}
                alt="video thumbnail"
                className="rounded-r1 group-hover:opacity-90"
              />
              <Button
                className="absolute left-[40%] top-1/3 h-auto w-auto rounded-full bg-purple-1 p-5"
                onClick={() => setPlayVideo(true)}
              >
                <Icons.triangle />
              </Button>
            </div>
          )}
        </div>

        <div>
          <CourseDetails />
        </div>
      </main>
      <OtherCourses />
    </>
  );
}
