import { IoNotifications } from "react-icons/io5";
import { IoMdTabletPortrait } from "react-icons/io";

const Notification = () => {

    const dataA:any = [
        {
            message: "Loan repayment date is due",
            seen: false
        },
        {
            message: "Loan repayment",
            seen: false
        },
        {
            message: "Loan repayment ",
            seen: false
        }
    ]

    const dataB:any = [
        {
            message: "Financial Literacy and Smart Investments",
            seen: false
        },
        {
            message: "Getting Started with DeFi",
            seen: false
        },
        {
            message: "Getting Started with DeFi",
            seen: false
        }
    ]

  return (
    <div  
        className="flex flex-col items-end" 
    >

        <div
            className='mb-8 p-4 w-11/12 border-2 border-[#4E4E4E] rounded-xl'
        >
            <p
                className='font-medium text-white text-xl mb-2'
            >
                Notifications
            </p>

            <div>
                {
                    dataA.map((cur:any, id:number) => (
                        <div
                            key={id}
                            className="flex flex-row justify-start items-center mb-2"
                        >
                            <IoNotifications className="text-purple-5 font-medium mr-4" />

                            <p
                                className="font-medium text-lg text-white-8"
                            >
                                {cur.message}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>

        <div
            className='p-4 w-11/12 border-2 border-[#4E4E4E] rounded-xl'
        >
            <p
                className='font-medium text-white text-xl mb-4'
            >
                Courses
            </p>

            <div>
                {
                    dataB.map((cur:any, idx:number) => (
                        <div
                            key={idx}
                            className="flex flex-row justify-start items-center mb-2"
                        >
                            <IoMdTabletPortrait className="text-purple-5 font-medium mr-2" />

                            <p
                                className="font-medium text-lg text-white-8"
                            >
                                {cur.message}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default Notification