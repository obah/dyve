import React from 'react'
import { Button } from '../ui/button'
import { FiSmartphone } from "react-icons/fi";

const CurrentCourse = () => {
  return (
    <div
        className='bg-black-2 rounded-xl p-4'
    >
        <div
            className='mb-4 flex flex-row justify-between items-center'
        >
            <p
                className='text-xl font-normal text-white'
            >
                Current Course
            </p>

            <Button
                variant={"withdraw"}
                className='text-xs font-medium'
            >
                All Courses
            </Button>
        </div>

        <div
            className='flex flex-row justify-between items-center'
        >

            <div
                className='flex flex-row justify-between items-center'
            >

                <div
                    className='mr-4 h-[68px] w-[68px] p-4 flex justify-center items-center bg-black-3 rounded-xl'
                >
                    <FiSmartphone className='text-white-2 text-xl' />
                </div>

                <div>
                    <p
                        className='text-base font-medium text-white mb-4'
                    >
                        Financial Literacy and Smart Investments
                    </p>

                    <div className='rounded-xl h-[20px] w-full bg-black-3'>
                        <div className='rounded-xl w-1/2 h-full bg-gradient-to-r from-[#C239F4] to-[#71218E]'></div>
                    </div>
                </div>

            </div>

            <div 
                className='flex flex-col justify-between'
            >
                <p
                    className='bg-[#FFB01633] rounded-xl text-xs text-[#FDB52A] font-medium p-2 mb-2'
                >
                    Certificate
                </p>

                <p
                    className='text-white text-sm font-medium'
                >
                    4/10 Lesson
                </p>
            </div>

        </div>
    </div>
  )
}

export default CurrentCourse