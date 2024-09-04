import { AcademyPromo } from "@/components/academy/academy-promo";
import { CourseCatalog } from "@/components/academy/course-catalog";
import { buttonVariants } from "@/components/ui/button";
import { courses } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="container mx-auto mb-40 mt-10 scroll-smooth text-white">
      <section className="grid grid-cols-2 items-center px-20 text-[#CBCBCB]">
        <div className="space-y-9">
          <h1 className="text-[64px] font-bold leading-[77px]">
            Learn and Earn with <span className="text-purple-1">DYVE</span>
          </h1>

          <p className="w-10/12 text-[20px] font-normal">
            Learn how to manage your money, understand decentralized finance,
            build a brighter financial future and best of all - we{" "}
            <span className="text-purple-1">pay</span> you for learning.
          </p>

          <Link
            href="#courses"
            className={`w-1/2 ${buttonVariants({ variant: "default" })}`}
          >
            Go to Courses
          </Link>
        </div>

        <Image
          src={"/images/graduation.svg"}
          width={600}
          height={600}
          alt="academy-hero"
        />
      </section>

      <section id="courses">
        <div className="mb-[60px] space-y-2 text-center">
          <p className="text-[20px] font-light text-purple-1">GET STARTED</p>
          <h2 className="text-4xl text-[#A7A5A5]">Courses</h2>
        </div>

        <CourseCatalog data={courses} />
      </section>

      <section className="mt-[124px]">
        <AcademyPromo />
      </section>
    </main>
  );
}
