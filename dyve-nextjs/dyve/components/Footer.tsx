import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-20 flex w-full flex-row items-center justify-between p-4">
      <div className="flex w-[230px] flex-row items-center justify-between">
        <img src="/assets/logo.png" />

        <p className="hidden text-lg font-normal text-white-5 md:block">
          © 2024 Dyve
        </p>
      </div>

      <p className="hidden text-center text-lg font-normal text-white-5 md:block">
        All Rights Reserved | Terms and Conditions | Privacy Policy
      </p>

      <div className="flex w-[160px] flex-row items-center justify-between">
        <FaFacebookF className="font-medium text-purple-1" />
        <FaTwitter className="font-medium text-purple-1" />
        <FaInstagram className="font-medium text-purple-1" />
        <FaLinkedinIn className="font-medium text-purple-1" />
        <FaYoutube className="font-medium text-purple-1" />
      </div>
    </div>
  );
};

export default Footer;
