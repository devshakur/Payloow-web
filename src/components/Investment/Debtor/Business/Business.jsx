import React, { useState } from 'react'
import { SliderVertical1 } from 'iconsax-react'
import DebtorLayoutPage from '../DebtorLayoutPage';
import { Button } from '@headlessui/react'
import Modal from './BusinessModal/Modal';
import StageTwo from './BusinessModal/StageTwo';
import Loan from './BusinessModal/Loan';
import useInvestment from '../../../../hooks/useInvetment';
import { useEffect } from 'react';


const Business = ({ nextStep }) => {
  const {ViewBusiness} = useInvestment();
  let [isOpen, setIsOpen] = useState(false)
  const [active, setIsActive] = useState('one')
  const [data, setData] = useState([])
  const startups = [
    {
      id: 1,
      name: "Startup A",
      description: "A tech startup focused on creating AI solutions.",
      loans: "$15,000",
      approvedImage: "/images/Approved.png",
    },
    {
      id: 2,
      name: "Startup B",
      description: "An eco-friendly company developing sustainable products.",
      loans: "$25,000",
      approvedImage: "/images/Approved.png",
    },
    {
      id: 3,
      name: "Startup C",
      description: "A fintech startup revolutionizing personal finance.",
      loans: "$30,000",
      approvedImage: "/images/Approved.png",
    },
  ];
  useEffect(()=>{
    const businessDetails = async ()=>{
      try {
        const resp = await ViewBusiness();
        let info = resp.data.data.businesses[0]
        setData(info)
       console.log(data);
      } catch (error) {
        
        console.error("Failed to fetch information on business:", error);
      }
    
    }

    businessDetails();
  }, [])

  return (
    <DebtorLayoutPage>
      <main>
        <header className='bg-[#DBE7FE] px-4 shadow-lg rounded-md'>
          <h1 className='font-poppins text-[28px] py-4 font-semibold'>Create Your Business Now</h1>
          <p className='lg:w-1/2 my-5 lg:-my-0 text-[22px] font-medium text-black font-poppins tracking-wide'>Bring your vision to life by setting up your business. Share your story, showcase your business goals, and connect with investors to fund your next big idea.</p>
          <div className='flex justify-center lg:justify-end lg:relative lg:-top-[9rem]'>
            <img src="/images/person.png" className='h-[14rem]' alt="person" />
          </div>
          <div className='my-9 lg:-my-[12rem]'>
            <Button onClick={nextStep} className="w-full lg:w-1/5 rounded-lg bg-[#3369F4] py-3 lg:mb-4 my-5 px-4 text-md text-white mt-6 text-xl data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
              Create Business
            </Button>
          </div>
        </header>
        <section className='lg:my-[15rem]'>
          <div className='flex justify-between mx-6'>
            <h3 className='font-poppins font-medium text-xl'>My Businesses</h3>
            <p className='font-poppins text-blue-500 font-medium text-xl'>See all</p>
          </div>
          <div className='flex flex-wrap justify-center lg:justify-start'>
            {startups.map((startup) => (
              <article key={startup.id} className='flex lg:flex-row justify-center my-4 lg:mx-4 w-full lg:w-[30%]'>
                <div className='bg-white w-full lg:py-[5rem] py-3 rounded-lg shadow-lg'>
                  <div className='flex justify-between mx-3 lg:-mt-12'>
                    <div className='h-9 w-9 flex justify-center items-center bg-gray-300 rounded-[50%]'>
                      <SliderVertical1 size="22" color="blue" />
                    </div>
                    <div className='bg-green-200 rounded-md flex justify-center items-center py-3 px-3'>
                      <img src={startup.approvedImage} alt={startup.name} />
                    </div>
                  </div>
                  <h3 className='font-poppins font-semibold mt-7 text-2xl text-[#1D2433] mx-3'>{startup.name}</h3>
                  <p className='font-medium font-poppins mt-2 text-xl tracking-wide mx-3 text-[#1D2433CC]'>{startup.description}</p>
                  <div className='flex my-4 mx-3 gap-3 lg:mt-9'>
                    <h4 className='font-medium font-poppins text-lg'>Loans:</h4>
                    <p className='font-semibold font-poppins text-xl'>{startup.loans}</p>
                  </div>
                  <div className='mx-4 mt-9 flex gap-4 flex-col lg:-mb-[3rem]'>
                    <button className='w-full bg-[#3369F4] py-3 rounded-md text-white font-semibold'>See Investments</button>
                    <button onClick={() => setIsOpen(true)} className='w-full border border-blue-300 py-3 rounded-md text-blue-500 font-semibold'>View Business</button>
                  </div>
             {active === 'one' && <Modal isOpen={isOpen} setIsOpen={setIsOpen} data={data} active={active} setIsActive={setIsActive} /> } 
             {active === 'two' && <StageTwo  isOpen={isOpen} setIsOpen={setIsOpen} setIsActive={setIsActive}   />}
             {active === 'three' && <Loan  isOpen={isOpen} setIsOpen={setIsOpen} setIsActive={setIsActive}   />}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </DebtorLayoutPage>
  )
}

export default Business
