import Image from "next/image";
import Link from "next/link";

export function AcademyPromo() {
  return (
    <div className="rounded-r1 flex items-center justify-between bg-[#13121D] px-20 py-10 text-[#A7A5A5]">
      <div className="w-[60%] space-y-6">
        <h3 className="text-5xl font-semibold leading-[58px]">
          Learn, Earn, and Grow with Our Academy
        </h3>

        {/* //list-image-[url('images/star.svg')] */}

        <ul className="space-y-3 text-sm font-medium text-[#8E8B96]">
          <li className="">
            Learn at Your Own Pace with Easy-to-Follow Lessons
          </li>
          <li>Gain Practical Skills You Can Use Right Away</li>
          <li>Earn Verified Blockchain Certificates!</li>
        </ul>

        <Link
          href={"/"}
          className="rounded-r1 inline-block bg-[#2D2D2D] px-[30px] py-[15px] text-base font-medium text-white hover:bg-purple-2"
        >
          START TODAY!
        </Link>
      </div>

      <Image
        src={"/images/graduation2.png"}
        width={360}
        height={360}
        alt="graduation image"
      />
    </div>
  );
}
