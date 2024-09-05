import FeaturesCard from "../FeaturesCard";

const Empower = () => {
  const listA: any = [
    {
      title: "Easy Access",
      desc: "Withdraw savings anytime, anywhere, without hassle",
      img: "/assets/wallet.png",
    },
    {
      title: "Flexible Deposit",
      desc: "Save when you can—no minimum deposits ",
      img: "/assets/piggy-bank.png",
    },
  ];

  const listB: any = [
    {
      title: "High-Interest Rates",
      desc: "Watch your money grow with our competitive interest rates",
      img: "/assets/phone.png",
    },
    {
      title: "Secure and Reliable",
      desc: "Your savings are safe, protected by the latest security measures",
      img: "/assets/grade.png",
    },
  ];

  return (
    <div className="my-20 flex w-full items-center justify-center bg-background-2 p-8">
      <div className="lg:w-11/12">
        <div className="mb-20">
          <p className="mb-2 text-xl font-light text-purple-1">
            Empower Your Financial Future
          </p>

          <p className="text-lg font-normal text-white-1 md:text-3xl">
            Transform your finance one step at a Time
          </p>
        </div>

        <div className="w-full">
          <div className="mb-8 flex flex-col items-center md:flex-row">
            {listA.map((cur: any, idx: number) => (
              <FeaturesCard key={idx} data={cur} idx={idx} />
            ))}
          </div>

          <div className="flex flex-col items-center md:flex-row">
            {listB.map((cur: any, idx: number) => (
              <FeaturesCard key={idx} data={cur} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empower;
