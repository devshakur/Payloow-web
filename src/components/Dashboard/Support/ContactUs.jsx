import React from 'react'
import toast from 'react-hot-toast';
import { IoCopyOutline, IoLocation } from "react-icons/io5";

const ContactUs = () => {
  // Function to handle copying text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`Copied: ${text}`);
    }).catch((error) => {
      console.error("Failed to copy text: ", error);
    });
  };

  return (
    <div className='bg-white rounded-lg md:p-10 p-5'>
      <div className='space-y-3 mb-5 border-b pb-5'>
        <h3 className="md:text-4xl text-3xl font-semibold">Contact Us</h3>
        <p className='max-w-3xl text-[#1D2433CC]'>You can reach us via our phone numbers, social media profiles, email etc.</p>
      </div>
      <div className="mt-5 space-y-8">
        <div className='bg-[#DBE7FE] px-8 py-4 rounded-xl space-y-4'>
          <h3 className='font-semibold text-xl pt-3'>Our Office</h3>
          <p className="flex space-x-3 items-center pb-3">
            <span><IoLocation color='#3369F4' size={20} /></span>
            <span>1234 Street Name, City Name, Country Name</span>
          </p>
        </div>
        <div>
          <p>Phone Number</p>
          <div className='bg-[#DBE7FE] px-8 py-4 rounded-xl space-y-4 mt-2 flex items-center justify-between'>
            <p>09012345678</p>
            <button onClick={() => copyToClipboard("09012345678")}>
              <IoCopyOutline />
            </button>
          </div>
          <div className='bg-[#DBE7FE] px-8 py-4 rounded-xl space-y-4 mt-2 flex items-center justify-between'>
            <p>08012345678</p>
            <button onClick={() => copyToClipboard("08012345678")}>
              <IoCopyOutline />
            </button>
          </div>
        </div>
        <div>
          <p>Email Address</p>
          <div className='bg-[#DBE7FE] px-8 py-4 rounded-xl space-y-4 mt-2 flex items-center justify-between'>
            <p>payloow@support.com</p>
            <button onClick={() => copyToClipboard("payloow@support.com")}>
              <IoCopyOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
