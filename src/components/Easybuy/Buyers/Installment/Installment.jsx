import React, {useState} from 'react'
import BuyersLayoutGen from '../BuyersLayoutGen'
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import InstallmentModal from './InstallmentModal';
const items = [
    {
   id: 1,
    img: '/images/iphon-green.png',
    name: 'Iphone Xr',
    status: 'active',
},
{
    id:   2,
    img: '/images/iphon11-small.png',
    name: 'Iphone 11',
    status: 'Locked',
},
{
    id:    3,
    img: '/images/iphon-yellow.png',
    name: 'Iphone 12',
    status: 'active',
}
]

const orders = [{
    img: '/images/iphon11-small.png',
    productName: 'Iphone Xr',
    ProductDate: '10/11/2021',
    productPrice: '$5,000',
    orderDate: '04/10/2024',
    productStatus: 'pending',
},
{
    img: '/images/iPhone12.png',
    productName: 'Iphone 12',
    ProductDate: '09/02/2020',
    productPrice: '$8,000',
    orderDate: '05/03/2022',
    productStatus: 'Shipped',
},
{
    img: '/images/iphon-green.png',
    productName: 'Iphone 13',
    ProductDate: '10/05/2023',
    productPrice: '$10,000',
    orderDate: '24/11/2024',
    productStatus: 'Pending',
},
{
    img: '/images/iphon-yellow.png',
    productName: 'Iphone 15',
    ProductDate: '20/04/2021',
    productPrice: '$14,000',
    orderDate: '14/03/2021',
    productStatus: 'Shipped',
},
{
    img: '/images/iphon-black.png',
    productName: 'Iphone 13 pro max',
    ProductDate: '10/02/2021',
    productPrice: '$17,000',
    orderDate: '02/12/2024',
    productStatus: 'Pending',
},
]



const Installment = () => {
    const [currentPage, setCurrentPage] = useState(0);
    let [isOpen, setIsOpen] = useState(false)

    const itemsPerPage = 4;
const pageCount = Math.ceil(orders.length / itemsPerPage);
const displayedOrders = orders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <BuyersLayoutGen>
    <div className='flex flex-col md:grid md:grid-cols-3 gap-3'>
      <div className='bg-[#FFFFFF] shadow-md p-3'>
       <div className="flex justify-between">
        <h3 className='font-poppins font-normal text-[20px] text-[#1D2433]'>Total Amount</h3>
        <p className='font-medium'>...</p>
       </div>
        <h3 className='font-poppins font-medium text-[28px] text-[#1D2433] py-2'>₦50,000</h3>
      </div>
      <div className='bg-[#FFFFFF] shadow-md p-3'>
       <div className="flex justify-between">
        <h3 className='font-poppins font-normal text-[20px] text-[#1D2433]'>Amount Paid</h3>
        <p className='font-medium'>...</p>
       </div>
        <h3 className='font-poppins font-medium text-[28px] text-[#1D2433] py-2'>₦50,000</h3>
      </div>
      <div className='bg-[#FFFFFF] shadow-md p-3'>
       <div className="flex justify-between">
        <h3 className='font-poppins font-normal text-[20px] text-[#1D2433]'>Remaining Balance</h3>
        <p className='font-medium'>...</p>
       </div>
        <h3 className='font-poppins font-medium text-[28px] text-[#1D2433] py-2'>₦50,000</h3>
      </div>
    </div>
    <div className="md:grid md:grid-cols-2 mt-4 gap-3">
        <div className='bg-[#FFFFFF] shadow-md p-3'>
            <h4 className='font-poppins font-medium text-[22px] text-[#1D2433]'>Next Due Date</h4>
            <div className='flex items-center justify-between mx-6'>
                <div>
                    <h4 className='font-poppins font-normal italic text-xl'>In</h4>
                    <p className='font-poppins font-medium text-[28px] text-[#000]'>6 Days</p>
                    <p className='font-poppins font-medium text-lg text-[#1D2433CC]'>11 Hours, 40 mins</p>
                </div>
                <div className=''><img src="/images/Progress-circle.png" alt="progress-bar" />
                <p className='relative left-14 -top-24 font-poppins font-semibold text-[32px] text-[#000]'>6 : 11 : 40</p>
                </div>
            </div>
        </div>
            <div className='bg-[#FFFFFF] shadow-md p-3'>
               <div className='flex justify-between'>
                 <h3 className='font-poppins font-medium text-xl text-[#1D2433]'>Installment Purchases</h3>
                 <h5 className='font-poppins font-medium text-lg text-blue-600'>View all</h5>
            </div>
                 {items.map((item)=>(
                 <div key={item.id} className='flex justify-between mt-3'>
                    <div className="flex gap-3">
                  <div className='w-11 h-11 rounded-[50%] border border-gray-600 flex justify-center items-center'><img className='w-[30px] h-[30px]' src={item.img} alt={item.name} />
                  </div>
                  <p>{item.name}</p> 
                  </div>  
                  <button onClick={()=>{
                    setIsOpen(true)
                  }} className={`px-4 h-8 rounded-md ${item.status  === 'active' ? 'text-green-500 bg-green-200' : 'text-red-600 bg-red-100'}`}>{item.status}</button>
                 </div>
                 ))}
               </div>
               {isOpen && <InstallmentModal isOpen={isOpen} setIsOpen={setIsOpen}/>}
    </div>
    <div className='flex justify-between mt-3'>
            <div className='lg:flex items-center gap-4'>
            <button className='border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3'>
                <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
                <p className='text-lg text-blue-700'> FIlters</p>
               </button>
               <div className='hidden lg:flex gap-3'><p className='font-poppins text-lg font-semibold text-blue-700 flex items-center gap-2'>Brand (1) <IoIosArrowDown /> </p>
                <p className='font-poppins text-lg font-semibold flex items-center gap-2'>color <IoIosArrowDown /></p>
                <p className='font-poppins text-lg font-semibold flex items-center gap-2'>price <IoIosArrowDown /></p>
               </div>
               </div>
            <p className='font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]'>Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>Most popular <IoIosArrowDown /></span></p>
          </div>
          <div className="flex justify-center">
                    <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
                        <ul className="lg:flex justify-between bg-white shadow-lg hidden">
                            <li className="font-semibold text-lg lg:mr-5">Product</li>
                            <li className="font-semibold text-lg relative lg:-left-2 xl:left-9">Product Date</li>
                            <li className="font-semibold text-lg relative lg:-left-2 xl:left-9">Price</li>
                            <li className="font-semibold text-lg lg:mr-7">Due Date</li>
                            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3rem]">Status</li>
                            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
                        </ul>

                        {displayedOrders.map(item => (
                            <div key={item.ProductId} className=" rounded-lg p-4 mb-4 shadow-sm">
                                <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                                    <div className="flex justify-between w-full lg:w-[12%] mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Product:</p>
                                        <div className="text-sm flex gap-2 justify-start ml-[-1rem] font-poppins font-semibold lg:truncate">
                                            <img src={item.img} alt="phone" style={{ width: '30px', height: '30px' }} />
                                            <p>{item.productName}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Product Date:</p>
                                        <span className="text-sm font-poppins font-semibold lg:ml-[-3rem] lg:max-w-[8rem] lg:truncate">
                                            {item.ProductDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Price:</p>
                                        <span className="font-poppins text-sm font-semibold lg:ml-[-2rem]">{item.productPrice}</span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Due Date Date:</p>
                                        <span className="text-sm font-poppins font-semibold lg:relative lg:right-10">{item.orderDate}</span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Status:</p>
                                        <span
                                            className={`text-sm font-poppins font-semibold lg:relative right-9 xl:right-20 ${item.productStatus.toLowerCase() === 'pending' ? 'text-red-500' : 'text-green-500'
                                                }`}
                                        >
                                            {item.productStatus}
                                        </span>
                                    </div>

                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Action:</p>
                                        <span className="font-poppins text-sm font-semibold lg:relative lg:right-9 xl:right-24">...</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                           <div className="flex text-center justify-between">
                            <ReactPaginate
                                previousLabel="←"
                                nextLabel="→"
                                breakLabel="..."
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                //  onPageChange={handlePageClick}
                                containerClassName="flex justify-center mt-6"
                                pageClassName="mx-1"
                                pageLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200"
                                previousClassName="mx-1"
                                previousLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200"
                                nextClassName="mx-1"
                                nextLinkClassName="px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200"
                                activeClassName="bg-blue-600 text-white"
                                disabledClassName="opacity-50 cursor-not-allowed"
                            />
                                     <div className='px-6 h-8 mt-5 text-white bg-blue-700 flex items-center gap-3 rounded-lg'><IoIosArrowBack className='w-4 h-4'/> <IoIosArrowForward className='w-4 h-4'/></div>
                        </div>
                    </article>
                </div>
    </BuyersLayoutGen>
  )
}

export default Installment
