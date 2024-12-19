import React, {useState} from 'react'
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Inventory = [{
    id: 1,
    ProductId: '12/02/2023',
    productName: 'Dividend',
    Category: 'phone',
    quantity: '04',
    Price: '$5,000',
},
{
    id: 2,
    ProductId: '23/10/2021',
    productName: 'Deposit',
    Category:     'Transfer from Bank',
    quantity: '02',
    Price: '$15,000',
},
{
    id: 3,
    ProductId: '06/11/2020',
    productName: 'Buy',
    Category:      'Bought 2shares of Payloow',
    quantity: '04',
    Price: '$50,000',
},
{
    id: 4,
    ProductId: '01/04/2019',
    productName: 'Sell',
    Category:    'sold 4 shares of payloow',
    quantity: '01',
    Price: '$25,000',
},
{
    id: 5,
    ProductId: '21/05/2018',
    productName: 'Deposit',
    Category:     'Transfer from kuda',
    quantity: '03',
    Price: '$35,000',
},
]
const HistoryData = () => {
    const [selectedStatus, setSelectedStatus] = useState('Inventory');
    const [currentPage, setCurrentPage] = useState(0);

    // Filter orders based on selected status
    const filteredOrders = selectedStatus === 'Inventory'
        ? Inventory
        : Inventory.filter(order => Inventory.Category.toLowerCase() === selectedStatus.toLowerCase());

    // Handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Items per page for pagination
    const itemsPerPage = 4;
    const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
    const displayedOrders = filteredOrders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  return (
    <div>
        <div className="flex justify-center">
                    <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
                        <ul className="lg:flex justify-between bg-white shadow-lg hidden">
                            <li className="font-medium text-lg lg:mr-5">Date</li>
                            <li className="font-medium text-lg relative lg:-left-4">Transaction Type</li>
                            <li className="font-medium text-lg relative lg:-left-4">Description</li>
                            <li className="font-medium text-lg lg:mr-7 relative xl:left-[-2rem]">Amount</li>
                            <li className="font-medium text-lg lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
                        </ul>

                        {displayedOrders.map(item => (
                            <div key={item.id} className="rounded-lg p-4 mb-4 shadow-md lg:shadow-sm">
                                <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                                    <div className="flex justify-between w-full lg:w-[12%] mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Date:</p>
                                        <div className="text-sm  justify-start ml-[-1rem] font-poppins font-medium lg:truncate">
                                          
                                            <p>{item.ProductId}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Transaction Type:</p>
                                        <span className="text-sm font-poppins font-medium lg:relative lg:right-28 lg:truncate">{item.productName}</span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Description:</p>
                                        <span className="font-poppins text-sm font-medium lg:ml-[-4rem] xl:ml-[-7rem]">{item.Category}</span>
                                    </div>
                            
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Amount:</p>
                                        <span
                                            className='text-sm font-poppins font-medium lg:relative right-9 xl:right-20'
                                        >
                                            {item.Price}
                                        </span>
                                    </div>

                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Action:</p>
                                        <span className="font-poppins text-sm font-medium lg:relative lg:right-9 xl:right-24">...</span>
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
    </div>
  )
}

export default HistoryData