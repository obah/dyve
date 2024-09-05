import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const Hero = () => {
  return (
    <div
        className="h-screen bg-hero-bg bg-cover bg-[right_top_300px] bg-no-repeat flex justify-center items-center px-4"
    >

        <div
            className='flex flex-row justify-between items-center lg:w-11/12 pb-24'
        >
            <div
                className='w-2/3'
            >
                <p
                    className='font-bold text-7xl text-white mb-4' 
                >
                    Your <span className='text-purple-1'>Gateway</span> to 
                    <span className='text-purple-1'> Financial</span> Freedom
                </p>

                <p
                    className='font-normal text-xl mb-4 text-white lg:w-7/12'
                >
                    Secure microloans, grow your savings, learn and earn rewards—all in one place.
                </p>

                <Button
                    variant={"heroBtn"}
                >
                    Get Started For Free
                </Button>
            </div>

            <div
                className='w-1/3'
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
                    src="/assets/hero-2.png"
                />
            </div>
        </div>

    </div>
  )
}

export default Hero