"use client";

import { Button } from './ui/button';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
   
    return (
        <div className='flex justify-center items-center px-4 mt-20'>
            <div className='flex flex-row justify-between items-center lg:w-11/12'>
                <div className='w-2/3'>
                    
                    <p className='font-bold text-7xl text-white mb-4'>
                        Your <span className='text-purple-1'>Gateway</span> to 
                        <span className='text-purple-1'> Financial</span> Freedom
                    </p>
                    <p className='font-normal text-xl mb-4 text-white lg:w-7/12'>
                        Secure microloans, grow your savings, learn and earn rewards—all in one place.
                    </p>
                    <Button variant={"heroBtn"}>
                        Get Started For Free
                    </Button>
                </div>
                <div className='w-1/3'>
                    <img src="/assets/hero-2.png" alt='hero' />
                </div>
            </div>
        </div>
    );
};

export default Hero;
