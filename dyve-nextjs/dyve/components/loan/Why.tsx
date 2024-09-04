import FeaturesCard from "../FeaturesCard";

const Why = () => {

    const listA:any = [
        {
            title: "Low Rates",
            desc: "Low interest rates for easier repayment",
            img: "/assets/hand-A.png"
        },
        {
            title: "Quick Approval ",
            desc: "Receive approval in minutes with our streamlined process",
            img: "/assets/hand-B.png"
        }
    ];

  return (
    <div
        className='w-full bg-background-2 flex justify-center items-center p-8 mt-20'
    >

        <div
            className='lg:w-11/12'
        >

            <div
                className="mb-20"
            >
                <p
                    className='text-purple-1 font-light text-xl mb-2'
                >
                    Why Choose Dyve Microloans?
                </p>

                <p
                    className='text-3xl text-white-1 font-normal'
                >
                    Flexible, Fast, and Fair Microloans for Your Needs
                </p>
            </div>

            <div
                className="w-full"
            >

                <div
                    className='flex flex-row items-center mb-8'
                >
                    {
                        listA.map((cur:any, idx:number) => (
                            <FeaturesCard 
                                key={idx}
                                data={cur}
                                idx={idx}
                            />
                        ))
                    }
                </div>

            </div>

        </div>

    </div>
  )
}

export default Why