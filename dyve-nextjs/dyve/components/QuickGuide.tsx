const QuickGuide = () => {
  return (
    <div className="mt-20 flex w-full items-center justify-center rounded-r1 p-8">
      <div className="rounded-r1">
        <div className="rounded-t-r1 bg-background-2 p-8 text-center">
          <p className="mb-2 text-xl font-light text-purple-1">
            Get Started with Ease
          </p>

          <p className="text-3xl font-normal text-white-1">
            Quick Guide to the plaform
          </p>
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="flex w-8/12 flex-row items-center justify-between">
            <div>
              <img src="/assets/reg.png" />
            </div>

            <div className="w-11/12 p-4 text-center">
              <p className="text-2xl font-semibold text-white-3">
                1. Create Your Account
              </p>

              <p className="text-xl font-normal text-white-4">
                Click on the &quot;Sign Up&quot; button to create a new account.
                Fill in your personal information and choose a secure password.
                Verify your email to complete the registration process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGuide;
