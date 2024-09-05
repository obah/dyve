import FeaturesCard from "../FeaturesCard";

const Why = () => {
  const listA: any = [
    {
      title: "Low Rates",
      desc: "Low interest rates for easier repayment",
      img: "/assets/hand-A.png",
    },
    {
      title: "Quick Approval ",
      desc: "Receive approval in minutes with our streamlined process",
      img: "/assets/hand-B.png",
    },
  ];

  return (
    <div className="mt-20 flex w-full items-center justify-center bg-background-2 p-8">
      <div className="lg:w-11/12">
        <div className="mb-20">
          <p className="mb-2 text-xl font-light text-purple-1">
            Why Choose Dyve Microloans?
          </p>

          <p className="text-3xl font-normal text-white-1">
            Flexible, Fast, and Fair Microloans for Your Needs
          </p>
        </div>

        <div className="w-full">
          <div className="mb-8 flex flex-col items-center md:flex-row">
            {listA.map((cur: any, idx: number) => (
              <FeaturesCard key={idx} data={cur} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
