import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Hero1 = () => {
  return (
    <div
        className='flex justify-center items-center px-4 mt-20'
    >

        <div
            className='flex flex-row justify-between items-center lg:w-11/12'
        >
            <div
                className='w-1/3'
            >
                <p
                    className='font-bold text-7xl text-white mb-4' 
                >
                    Access to micro loans
                </p>

                <p
                    className='font-normal text-xl mb-4 text-white'
                >
                    Unlock Opportunities with Quick, Accessible Microloans
                </p>

                <Button
                    variant={"heroBtn"}
                    className='w-[200px]'
                >
                    Secure Loans
                </Button>
            </div>

            <div
            >
                <Image 
                    src={"/assets/wallet-3.png"}
                    width={500}
                    height={600}
                    alt='logo'
                    // fill={true}
                    className='object-contain'
                />
                {/* <img 
                    src="/assets/wallet-1.png"
                /> */}
            </div>
        </div>

    </div>
  )
}

export default Hero1