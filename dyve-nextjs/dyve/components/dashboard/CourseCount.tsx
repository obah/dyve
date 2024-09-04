import { IoMdTabletPortrait } from "react-icons/io";

const CourseCount = () => {

    const dataB:any = [
        {
            "title": "Total Courses Enrolled",
            "value": "4"
        },
        {
            "title": "Courses Completed",
            "value": "2"
        }
    ]

  return (
    <div
        className='mb-16'
    >

        <div
            className="flex flex-row justify-between gap-4 items-center"
        >
            {
                dataB.map((cur:any, idx:number) => (
                    <div
                        key={idx}
                        className="w-full p-4 rounded-xl border-2"
                    >
                        <p
                            className="flex flex-row justify-start items-center text-white-5 text-xs font-medium mb-4"
                        >
                            <IoMdTabletPortrait className="text-purple-5 text-xl font-medium mr-2" /> {cur.title}
                        </p>

                        <p
                            className="text-white text-2xl font-semibold"
                        >
                            {cur.value}
                        </p>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default CourseCount