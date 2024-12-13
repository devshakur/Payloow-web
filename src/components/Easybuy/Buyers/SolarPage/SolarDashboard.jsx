import React, {useState} from 'react'
import BuyersLayoutGen from '../BuyersLayoutGen'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
 import { IoIosArrowForward } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
 import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from '../../../../Routes/router';


const items = [
    {
      id: 1,
      img: '/images/solar.png',
      name: 'Solar Panel 100W',
      amount: '₦80,499',
      descrp: '7/ 5.8 Inches - Reliable power wherever ...',
    },
    {
      id: 2,
      img: '/images/inverter.png',
      name: 'Rich Solar',
      amount: '₦400,000',
      descrp: '1000W 48V 120VAC Solar Cabin kit',
    },
    {
      id: 3,
      img: '/images/inverter-two.png',
      name: 'UltraSolar Inverter 5kW',
      amount: '₦100,000',
      descrp: 'Solar Hybrid Inverter AC220V Pure Sine ...',
    },
    {
      id: 4,
      img: '/images/camera.png',
      name: 'Solar Led Landscape',
      amount: '₦60,000',
      descrp: '1000W 48V 120VAC Solar Cabin kit',
    },
    {
        id: 5,
        img: '/images/inverter.png',
        name: 'Rich Solar',
        amount: '₦400,000',
        descrp: '1000W 48V 120VAC Solar Cabin kit',
      },
      {
        id: 6,
        img: '/images/solar.png',
        name: 'Solar Panel 100W',
        amount: '₦80,499',
        descrp: '7/ 5.8 Inches - Reliable power wherever ...',
      },
      {
        id: 7,
        img: '/images/inverter-two.png',
        name: 'UltraSolar Inverter 5kW',
        amount: '₦100,000',
        descrp: 'Solar Hybrid Inverter AC220V Pure Sine ...',
      },

    // Add more items if needed
  ];
const SolarDashboard = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate()
    const router = useRouter()
    
      const handleProduct = ()=>{
        navigate('/product-details')
      }
    
      const handleEnergy=()=>{
        router.push('/energy-calculator')

      }
      const handleDesign = ()=>{
        router.push('/design-solar')
      }
      const itemsPerPage = 6;  // Number of items per page
    
      // Calculate total pages
      const totalPages = Math.ceil(items.length / itemsPerPage);
    
      // Handle pagination page click
      const handlePageClick = (data) => {
        setCurrentPage(data.selected);
      };
    
      // Slice the items array to get the current page items
      const displayedItems = items.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      );
    
  return (
    <BuyersLayoutGen>
    <header className='flex gap-6 flex-col sm:flex-row sm:gap-3'>
      <div className='bg-blue-100 p-3 flex flex-col gap-3'>
      <h3 className='font-poppins font-medium text-2xl text-[#1D2433]'>Energy Calculator</h3>
      <p className='font-plus-jakarta font-normal text-lg text-[#1D2433]'>Discover your potential savings! Calculate the energy and cost benefits of switching to solar with our easy-to-use Energy Calculator.</p>
      <div className="w-full sm:flex sm:justify-between sm:items-center">
      <div className='w-full'>
        <button onClick={handleEnergy} className='w-full bg-blue-500 text-white py-3'>Get Started</button>
      </div>
        <div className='w-full flex justify-center sm:justify-end'>
        <img src="/images/solar-logo.png" alt="solar-logo" />
        </div>
        </div>
        </div>
        <div className='bg-blue-100 p-3 flex flex-col gap-3'>
      <h3 className='font-poppins font-medium text-2xl text-[#1D2433]'>Solar System Design Tool</h3>
      <p className='font-plus-jakarta font-normal text-lg text-[#1D2433]'>Design your ideal solar setup! Get an accurate quote and personalized solar system design tailored to your energy needs.</p>
      <div className='w-full sm:flex sm:justify-between sm:items-center'>
      <div className='w-full'>
        <button onClick={handleDesign} className='w-full bg-blue-500 text-white py-3'>Get Started</button>
      </div>
        <div className='w-full flex justify-center sm:justify-end'>
        <img src="/images/solar-energy.png" alt="solar-energy" />
        </div>
        </div>
        </div>
    </header>
    <main className='my-6'>
        <h3 className='font-poppins font-medium text-lg text-[#1D2433]'>Solar Deals</h3>
        <div className='grid lg:grid-cols-3 justify-center gap-x-4 sm:grid-cols-2 gap-y-8'>
            {displayedItems.map((item) => (
              <div key={item.id}>
                <div className='w-full h-[300px]'>
                  <img src={item.img} alt={item.id} className='w-auto h-auto' />
                </div>
                <div className='lg:w-[80%] w-[50%] lg:-mt-6 flex justify-between md:w-[70%]'>
                  <p className='font-poppins font-medium text-[#101928] text-lg'>{item.name}</p>
                  <p className='font-poppins font-[450] text-[#101928] text-xl'>{item.amount}</p>
                </div>
                <div>
                  <p className='font-poppins font-normal text-[14px] text-[#101928]'>{item.descrp}</p>
                </div>
                <button onClick={handleProduct} className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'>
                  <span><IoCartOutline className='text-[#475367]' /></span>
                  <p className='text-[14px] text-[#475367] font-poppins font-semibold'> Add to Cart</p>
                </button>
              </div>
            ))}
          </div>
          <div className='flex justify-center'>
            <button className='bg-[#2751E9] py-2 px-6 rounded-lg text-white font-poppins font-semibold text-[12px]'>View More</button>
          </div>
          
          {/* Pagination Section */}
          <div className="flex text-center justify-between">
            <ReactPaginate
              previousLabel={'←'}
              nextLabel={'→'}
              breakLabel={'...'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'flex justify-center mt-6'}
              pageClassName={'mx-1'}
              pageLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
              previousClassName={'mx-1'}
              previousLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
              nextClassName={'mx-1'}
              nextLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
              activeClassName={'bg-blue-600 text-white'}
              disabledClassName={'opacity-50 cursor-not-allowed'}
            />
            <div className='px-6 py-1 text-white bg-blue-700 flex items-center gap-3 rounded-lg'><IoIosArrowBack className='w-6 h-6'/> <IoIosArrowForward className='w-6 h-6'/></div>
          </div>
    </main>
    </BuyersLayoutGen>
  )
}

export default SolarDashboard
