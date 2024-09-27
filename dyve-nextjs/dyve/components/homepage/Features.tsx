import FeaturesCard from "./FeaturesCard";

const Features = () => {
  const listA: any = [
    {
      title: "Microloans",
      desc: "Need a small loan for personal or business",
      img: "/assets/wallet.png",
    },
    {
      title: "Savings",
      desc: "simple way to save money, earning interest and growing your funds safely",
      img: "/assets/piggy-bank.png",
    },
  ];

  const listB: any = [
    {
      title: "Identity Verification",
      desc: "blockchain-based identity solutions to help you access financial services.",
      img: "/assets/phone.png",
    },
    {
      title: "Academy",
      desc: "Learn at your own pace, get paid for it and get certified",
      img: "/assets/grade.png",
    },
  ];

  return (
    <div className="mt-20 flex w-full items-center justify-center bg-background-2 p-8">
      <div className="lg:w-11/12">
        <div className="mb-20">
          <p className="mb-2 text-xl font-light text-purple-1">
            Empower Your Financial Future
          </p>

          <p className="text-3xl font-normal text-white-1">
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

export default Features;
