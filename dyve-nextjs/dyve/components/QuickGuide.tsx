
const QuickGuide = () => {
  return (
    <div
        className='w-full flex justify-center items-center p-8 mt-20'
    >

        <div
            className='rounded-lg w-full'
        >
            <div
                className='bg-background-2 p-8 text-center'
            >
                <p
                    className='text-purple-1 font-light text-xl mb-2'
                >
                    Get Started with Ease
                </p>

                <p
                    className='text-3xl text-white-1 font-normal'
                >
                    Quick Guide to the plaform
                </p>
            </div>

            <div
                className='p-8 flex justify-center items-center '
            >

                <div
                    className='flex flex-row justify-between items-center w-8/12'
                >

                    <div>
                        <img src="/assets/reg.png" />
                    </div>

                    <div
                        className="p-4 text-center w-11/12"
                    >
                        <p className="font-semibold text-2xl text-white-3">
                            1. Create Your Account
                        </p>
                        
                        <p className="text-white-4 font-normal text-xl" >
                            Click on the &quot;Sign Up&quot; button to create a new account. 
                            Fill in your personal information and choose a secure 
                            password. Verify your email to complete the registration process.
                        </p>
                    </div>

                </div>

            </div>
        </div>

    </div>
  )
}

export default QuickGuide