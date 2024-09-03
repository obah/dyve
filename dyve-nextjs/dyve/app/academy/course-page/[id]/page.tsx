import { Button, buttonVariants } from "@/components/ui/button";
import { courses } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id ?? 1;

  const { title, description } = courses[+id];

  //todo check if user has started the course then change button to continue

  //https://youtu.be/1YyAzVmP9xQ?si=MNrZrJgugZxRXg3c

  return (
    <main className="container mb-40 mt-[90px] px-20">
      <div className="grid grid-cols-2">
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

          <Link
            href=""
            className={`w-1/2 ${buttonVariants({ variant: "default" })}`}
          >
            Enroll For Free
          </Link>
        </div>

        <div className="relative">
          <Image
            src={"/videoImage.png"}
            width={500}
            height={350}
            alt="video thumbnail"
            className="rounded-r1"
          />
          <Button onClick={() => {}}></Button>
        </div>
      </div>
    </main>
  );
}
