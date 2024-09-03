import FeaturesCard from "./FeaturesCard";

const Features = () => {

    const listA:any = [
        {
            title: "Microloans",
            desc: "Need a small loan for personal or business",
            img: "/assets/wallet.png"
        },
        {
            title: "Savings",
            desc: "simple way to save money, earning interest and growing your funds safely",
            img: "/assets/piggy-bank.png"
        }
    ];

    const listB:any = [
        {
            title: "Identity Verification",
            desc: "blockchain-based identity solutions to help you access financial services.",
            img: "/assets/phone.png"
        },
        {
            title: "Academy",
            desc: "Learn at your own pace and get certified",
            img: "/assets/grade.png"
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

export default Features