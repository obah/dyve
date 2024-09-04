import FeaturesCard from "../FeaturesCard";

const Empower = () => {

    const listA:any = [
        {
            title: "Easy Access",
            desc: "Withdraw savings anytime, anywhere, without hassle",
            img: "/assets/wallet.png"
        },
        {
            title: "Flexible Deposit",
            desc: "Save when you can—no minimum deposits ",
            img: "/assets/piggy-bank.png"
        }
    ];

    const listB:any = [
        {
            title: "High-Interest Rates",
            desc: "Watch your money grow with our competitive interest rates",
            img: "/assets/phone.png"
        },
        {
            title: "Secure and Reliable",
            desc: "Your savings are safe, protected by the latest security measures",
            img: "/assets/grade.png"
        }
    ];

  return (
    <div
        className='w-full bg-background-2 flex justify-center items-center p-8 my-20'
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
                    Empower Your Financial Future
                </p>

                <p
                    className='text-3xl text-white-1 font-normal'
                >
                    Transform your finance one step at a Time
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

                <div
                    className='flex flex-row items-center'
                >
                    {
                        listB.map((cur:any, idx:number) => (
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

export default Empower