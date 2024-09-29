import Image from "next/image";

const QuickGuide = () => {
  return (
    <div className="w-full p-16">
      <div className="group relative w-full rounded-r1 bg-cover bg-center bg-no-repeat">
        <div className="animate-tilt absolute -inset-0.5 rounded-r1 bg-purple-1 opacity-10 blur-lg transition duration-1000 group-hover:opacity-20 group-hover:duration-200"></div>
        <div className="relative h-[200px] rounded-t-r1 bg-background-2 pb-[38px] pt-[72px] text-center">
          <h2 className="text-xl font-light uppercase text-purple-1">
            Get Started with Ease
          </h2>

          <p className="text-[36px] font-normal text-white-1">
            Quick Guide to the plaform
          </p>
        </div>

        <div className="relative grid place-items-center rounded-b-r1 bg-[#0E0E0E]">
          <div className="flex h-[400px] items-center justify-center p-8">
            <div className="flex w-8/12 flex-row items-center justify-between">
              <div>
                <Image
                  src="/assets/reg.png"
                  width={195}
                  height={195}
                  alt={"guide image"}
                />
              </div>

              <div className="w-11/12 p-4 text-center">
                <p className="text-2xl font-semibold text-white-3">
                  1. Create Your Account
                </p>

                <p className="text-xl font-normal text-white-4">
                  Click on the &quot;Sign Up&quot; button to create a new
                  account. Fill in your personal information and choose a secure
                  password. Verify your email to complete the registration
                  process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGuide;
