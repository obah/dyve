import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div
        className='w-full p-4 flex flex-row justify-between items-center mt-20'
    >
        
        <div
            className='flex flex-row justify-between items-center w-[230px]'
        >
            <img 
                src="/assets/logo.png"
            />

            <p className='font-normal text-lg text-white-5' >
                © 2024 Dyve
            </p>
        </div>

        <p className='text-center text-white-5 font-normal text-lg'>
            All Rights Reserved | Terms and Conditions | Privacy Policy
        </p>

        <div
            className="flex flex-row justify-between items-center w-[160px]"
        >
            <FaFacebookF className="text-purple-1 font-medium" />
            <FaTwitter className="text-purple-1 font-medium" />
            <FaInstagram className="text-purple-1 font-medium" />
            <FaLinkedinIn className="text-purple-1 font-medium" />
            <FaYoutube className="text-purple-1 font-medium" />
        </div>

    </div>
  )
}

export default Footer