import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from "react-icons/fa"

type PropT = {
    title:string,
    desc:string,
    img:string,
}

const FeaturesCard = ({data, idx}:{data:PropT, idx:number}) => {
  return (
    <div
        className='bg-gradient-to-r from-purple-1/10 shadow-lg rounded-xl p-8 h-[244px] w-[550px] mr-10 border-[0.5px] border-slate-500 rounded-lg flex flex-row'
    >
        <div
            className='flex flex-col justify-between'
        >
            <FaArrowRight className="text-white cursor-pointer" />

            <div
                className='w-9/12'
            >
                <p
                    className="text-white-1 font-semibold text-3xl mb-2"
                >
                    {data.title}
                </p>

                <p
                    className="text-white-1 font-normal text-base"
                >
                    {data.desc}
                </p>
            </div>
        </div>

        <div>
             <Image 
                src={`${data.img}`} 
                className={"shadow-2xl"} 
                width={idx === 0 ? 270 : 500}
                height={idx === 0 ? 200 : 500}
                alt='pic'
            /> 
        </div>
    </div>
  )
}

export default FeaturesCard