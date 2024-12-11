import React, {useState} from 'react'
import BuyersLayoutGen from './BuyersLayoutGen'
import { BiCopy } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const orders = [{
    img: '/images/iphon11-small.png',
    productName: 'Iphone Xr',
    ProductId: '#3097674',
    productPrice: '$5,000',
    orderDate: '04/10/2024',
    productStatus: 'pending',
    type: 'Solar Payment'
},
{
    img: '/images/iPhone12.png',
    productName: 'Iphone 12',
    ProductId: '#0297214',
    productPrice: '$8,000',
    orderDate: '05/03/2022',
    productStatus: 'Shipped',
    type: 'Phone Payment'
},
{
    img: '/images/iphon-green.png',
    productName: 'Iphone 13',
    ProductId: '#0457876',
    productPrice: '$10,000',
    orderDate: '24/11/2024',
    productStatus: 'Pending',
    type: 'Solar Installment'
},
{
    img: '/images/iphon-yellow.png',
    productName: 'Iphone 15',
    ProductId: '#0409876',
    productPrice: '$14,000',
    orderDate: '14/03/2021',
    productStatus: 'Shipped',
    type: 'Phone Payment'
},
{
    img: '/images/iphon-black.png',
    productName: 'Iphone 13 pro max',
    ProductId: '#0203476',
    productPrice: '$17,000',
    orderDate: '02/12/2024',
    productStatus: 'Pending',
    type: 'Phone Payment'
},
]
const Payment = () => {
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(0);

    // Filter orders based on selected status
    const filteredOrders = selectedStatus === 'All'
        ? orders
        : orders.filter(order => order.productStatus.toLowerCase() === selectedStatus.toLowerCase());

    // Handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Items per page for pagination
    const itemsPerPage = 4;
    const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
    const displayedOrders = filteredOrders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  return (
    <BuyersLayoutGen>
    <div className='lg:grid lg:grid-cols-3 lg:gap-4'>
    <div className='bg-[#1E3DD7] w-full  rounded-lg p-6 lg:p-8 lg:h-[300px]'>
        <h3 className='font-poppins font-medium text-2xl text-white'>Available Balance</h3>
        <h4 className='font-poppins font-medium text-4xl text-white mt-3'>₦2,000.00</h4>
        <div className='flex mt-3 text-white gap-3'>
        <p>Wema bank: 4054673854</p>
        <span className='text-white'><BiCopy className='w-4 h-4 text-white'/></span>
        </div>
        <div className='w-full my-5'>
            <button className='bg-[#FFFF] text-blue-800 font-semibold py-3 w-full rounded-md text-sm lg:mt-5'>Make Payment</button>
        </div>
      </div>
      <div className='flex flex-col gap-6 mt-4 lg:mt-0'>
        <div className='bg-[#DBE7FE] flex  flex-col  gap-8 rounded-lg w-auto lg:max-w-sm'>
            <div className='flex items-center gap-5 mt-4 p-2'>
                <span className='w-6 h-6 bg-white flex justify-center items-center rounded-[50%]'><BiCopy className='w-2 h-2 text-blue-300'/></span>
                <p className='font-normal text-lg font-poppins'>Total  Amount Paid</p>
            </div>
            <div className='font-plus-jakarta font-medium text-3xl text-[#1D2433] ml-[3.6rem] pb-3'>₦500,000</div>
        </div>
        <div className='bg-[#DBE7FE] flex  flex-col  gap-8 rounded-lg w-auto lg:max-w-sm'>
            <div className='flex items-center gap-5 mt-4 p-2'>
                <span className='w-6 h-6 bg-white flex justify-center items-center rounded-[50%]'><BiCopy className='w-2 h-2 text-blue-300'/></span>
                <p className='font-normal text-lg font-poppins'>Weekly Rate</p>
            </div>
            <div className='font-plus-jakarta font-medium text-3xl text-[#1D2433] ml-[3.6rem] pb-3'>₦5,000</div>
        </div>
      </div>
      <div className='flex flex-col gap-6 mt-4 lg:mt-0'>
        <div className='bg-[#D6F7FF] flex flex-col  gap-8 rounded-lg w-auto lg:max-w-sm'>
            <div className='flex items-center gap-5 mt-4 p-2'>
                <span className='w-6 h-6 bg-white flex justify-center items-center rounded-[50%]'><BiCopy className='w-2 h-2 text-blue-300'/></span>
                <p className='font-normal text-lg font-poppins'>Amount Behind</p>
            </div>
            <div className='font-plus-jakarta font-medium text-3xl text-[#1D2433] ml-[3.6rem] pb-3'>₦200,000</div>
        </div>
        <div className='bg-[#D6F7FF] flex  flex-col  gap-8 rounded-lg w-auto lg:max-w-sm'>
            <div className='flex items-center gap-5 mt-4 p-2'>
                <span className='w-6 h-6 bg-white flex justify-center items-center rounded-[50%]'><BiCopy className='w-2 h-2 text-blue-300'/></span>
                <p className='font-normal text-lg font-poppins'>Days paid to date</p>
            </div>
            <div className='font-plus-jakarta font-medium text-3xl text-[#1D2433] ml-[3.6rem] pb-3'>200</div>
        </div>
      </div>
    </div>
    <div className='flex justify-between mt-4'>
        <h3 className='font-medium text-[#000000] text-lg font-poppins'>Payment History</h3>
        <p className='text-blue-800'>See all</p>
    </div>
    <div className='flex justify-between'>
                    <div className='lg:flex items-center gap-4'>
                        <button className='border border-blue-800 px-2 lg:px-5 rounded-lg py-2 my-3 flex justify-start items-center gap-3'>
                            <span><IoFilterOutline className='text-blue-800 w-7 h-7' /></span>
                            <p className='text-lg text-blue-700'> Filters</p>
                        </button>
                        <div className='hidden lg:flex gap-3'>
        
                            <p className='font-poppins text-lg font-semibold flex items-center gap-2 text-blue-400'>
                                Type <IoIosArrowDown className='text-blue-400' />
                            </p>
                        </div>
                    </div>
                    <p className='font-poppins font-medium flex items-center gap-2 text-lg text-[#101928]'>
                        Sort by: <span className='flex gap-2 items-center text-blue-800 font-poppins font-medium'>November<IoIosArrowDown /></span>
                    </p>
                </div>
                <div className="flex justify-center">
                    <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
                        <ul className="lg:flex justify-between bg-white shadow-lg hidden">
                            <li className="font-semibold text-lg lg:mr-5">Product ID</li>
                            <li className="font-semibold text-lg relative lg:-left-4">Date</li>
                            <li className="font-semibold text-lg relative lg:-left-2">Amount</li>
                            <li className="font-semibold text-lg lg:mr-7">Transation Type</li>
                            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-2rem]">Status</li>
                            <li className="font-semibold text-lg lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
                        </ul>

                        {displayedOrders.map(item => (
                            <div key={item.ProductId} className=" rounded-lg p-4 mb-4 shadow-sm">
                                <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                                    <div className="flex justify-between w-full lg:w-[12%] mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Product ID:</p>
                                        <div className="text-sm  justify-start ml-[-1rem] font-poppins font-semibold lg:truncate">
                                          
                                            <p>{item.ProductId}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Date:</p>
                                        <span className="text-sm font-poppins font-semibold lg:relative lg:right-20">{item.orderDate}</span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Amount:</p>
                                        <span className="font-poppins text-sm font-semibold lg:ml-[-6rem] xl:ml-[-8rem]">{item.productPrice}</span>
                                    </div>
                                    <div className="flex justify-between lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-semibold lg:hidden">Transation Type:</p>
                                        <span className="text-sm font-poppins font-semibold lg:relative lg:right-20 lg:max-w-[8rem] lg:truncate">
                                            {item.type}
                                        </span>
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
                                onPageChange={handlePageClick}
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

export default Payment
