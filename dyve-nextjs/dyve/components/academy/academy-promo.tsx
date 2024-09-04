import Image from "next/image";
import Link from "next/link";

export function AcademyPromo() {

  const listA:any = [
    "Learn at Your Own Pace with Easy-to-Follow Lessons",
    "Gain Practical Skills You Can Use Right Away",
    "Earn Verified Blockchain Certificates!"
  ]

  return (
    <div className="flex items-center justify-between rounded-r1 bg-[#13121D] px-20 py-10 text-[#A7A5A5]">
      <div className="w-[60%] space-y-6">
        <h3 className="text-5xl font-semibold leading-[58px]">
          Learn, Earn, and Grow with Our Academy
        </h3>

        {/* <ul className="list-image-[url('/images/star.png')] space-y-3 mb-8 text-sm font-medium text-[#8E8B96]">
          <li>Learn at Your Own Pace with Easy-to-Follow Lessons</li>
          <li>Gain Practical Skills You Can Use Right Away</li>
          <li>Earn Verified Blockchain Certificates!</li>
        </ul> */}

        <div
          className="space-y-3 mb-8 text-sm font-medium text-[#8E8B96] w-[500px]"
        >
          {
            listA.map((cur:string, idx:number) => (
              <div key={idx} className="flex flex-row justify-start items-center">
                <img src="/images/star.png" className="mr-2" />
                <p>{cur}</p>
              </div>
            ))
          }
        </div>

        <Link
          href={"/academy/course-page/1"}
          className="inline-block rounded-r1 bg-[#2D2D2D] px-[30px] py-[15px] text-base font-medium text-white hover:bg-purple-2"
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
