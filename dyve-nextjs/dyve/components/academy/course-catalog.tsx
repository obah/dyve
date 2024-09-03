import { CatalogItem } from "@/lib/types";
import { CatalogWrapper } from "../catalog-wrapper";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface Props {
  data: CatalogItem[];
}

export function CourseCatalog({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-9 lg:grid-cols-3">
      {data.map((item) => (
        <CatalogWrapper key={item.id}>
          <Image
            src={item.imageUrl}
            width={310}
            height={170}
            alt="Course image"
            className="rounded-r2"
          />

          <div>
            <h3 className="text-sm font-extrabold text-[#D6D6D6]">
              {item.title}
            </h3>
            <p className="text-[10px] font-normal text-[#AAAAAA]">
              {item.description}
            </p>
          </div>

          <Link
            href={`/academy/course-page/${item.id}`}
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Enroll Now
          </Link>
        </CatalogWrapper>
      ))}
    </div>
  );
}
