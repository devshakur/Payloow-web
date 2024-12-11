import React, {useState} from 'react'
import BuyersLayoutGen from '../BuyersLayoutGen'
import { IoCartOutline } from "react-icons/io5";
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const items = [
    {
      id: 1,
      img: '/images/iphone.png',
      name: 'Apple IPhone XS',
      amount: '₦3,499',
      descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
    },
    {
      id: 2,
      img: '/images/galaxy.png',
      name: 'Galaxy S21',
      amount: '₦800,499',
      descrp: '7/ 5.8 Inches - Reliable power wherever ...',
    },
    {
      id: 3,
      img: '/images/iPhone11.png',
      name: 'iPhone11',
      amount: '₦300,000',
      descrp: ' 5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
    },
    {
      id: 4,
      img: '/images/iPhone12.png',
      name: 'iPhone12',
      amount: '₦400,000',
      descrp: '1000W 48V 120VAC Solar Cabin kit',
    },
    {
      id: 5,
      img: '/images/iphone.png',
      name: 'Apple IPhone XS',
      amount: '₦3,499',
      descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
    },
    {
      id: 6,
      img: '/images/iphone.png',
      name: 'Apple IPhone XS',
      amount: '₦3,499',
      descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
    },
    {
      id: 7,
      img: '/images/iPhone11.png',
      name: 'iPhone11',
      amount: '₦300,000',
      descrp: ' 5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
    },
    {
      id: 8,
      img: '/images/iPhone12.png',
      name: 'iPhone13',
      amount: '₦400,000',
      descrp: '1000W 48V 120VAC Solar Cabin kit',
    },
   
  ];
  
const Phones = () => {
 const [currentPage, setCurrentPage] = useState(0);
 const navigate = useNavigate()
  const handleProduct = ()=>{
    navigate('/product-details')
  }

  const itemsPerPage = 6;  // Number of items per page

  // Calculateing total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Handle pagination page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Slicing  items array to get the current page items
  const displayedItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <BuyersLayoutGen>
    <div className='h-[211px] w-full bg-[#FFFFFF] shadow-md flex justify-center'>
     <h3 className='font-poppins font-medium text-[100px]'>Ads Here</h3>
    </div>
   <main className='my-9'>
    <h3 className='font-poppins font-medium text-xl text-[#00000]'>Phones Deals</h3>
    <div className='grid lg:grid-cols-3 justify-center gap-x-6 sm:grid-cols-2 gap-y-8'>
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
                  <p className='font-poppins w-[80%] truncate font-normal text-[14px] text-[#101928]'>{item.descrp}</p>
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

export default Phones
