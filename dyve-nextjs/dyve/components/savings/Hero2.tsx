import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Hero2 = () => {
  return (
    <div
        className='flex justify-center items-center px-4 mt-20'
    >

        <div
            className='flex flex-row justify-between items-center lg:w-11/12'
        >
            <div
                className='w-7/12'
            >
                <p
                    className='font-bold text-7xl text-white mb-4' 
                >
                    Start Saving, Secure Your Future
                </p>

                <p
                    className='font-normal text-xl mb-4 text-white lg:w-7/12'
                >
                    Easy, safe, and accessible savings plans designed to help you grow your wealth
                </p>

                <Button
                    variant={"heroBtn"}
                    className='w-[200px]'
                >
                    Start Saving
                </Button>
            </div>

            <div
            >
                {/* <Image 
                    src={"/assets/hero-img.png"}
                    width={400}
                    height={600}
                    alt='logo'
                    // fill={true}
                    className='object-contain'
                /> */}
                <img 
                    src="/assets/piggy2.png"
                />
            </div>
        </div>

    </div>
  )
}

export default Hero2