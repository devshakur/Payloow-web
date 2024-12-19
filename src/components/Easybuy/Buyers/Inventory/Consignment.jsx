import React, {useState} from 'react'
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const orders = [{
    id: 1,
    ProductId: '#3097674',
    productName: 'Iphone 12',
    status: 'In transit',
    quantity: '04',
    Price: '10/5/2024',
},
{
    id: 2,
    ProductId: '#3097674',
    productName: 'Inverter',
    status: 'On consignment',
    quantity: '02',
    Price: '02/2/2021',
},
{
    id: 3,
    ProductId: '#3097974',
    productName: 'Iphone 12',
    status: 'In transit',
    quantity: '04',
    Price: '10/03/2020',
},
{
    id: 4,
    ProductId: '#3097694',
    productName: 'Battery',
    status: 'On Consignment',
    quantity: '01',
    Price: '23/01/2023',
},
{
    id: 5,
    ProductId: '#3097674',
    productName: 'Iphone 14',
    status: 'In transit',
    quantity: '03',
    Price: '23/01/2001',
},
]
const Consignment = () => {
    const [selectedStatus, setSelectedStatus] = useState('order');
    const [currentPage, setCurrentPage] = useState(0);

    // Filter orders based on selected status
    const filteredOrders = selectedStatus === 'order'
        ? orders
        : orders.filter(order => orders.status.toLowerCase() === selectedStatus.toLowerCase());

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
                            <li className="font-medium text-lg lg:mr-5">Product ID</li>
                            <li className="font-medium text-lg relative lg:-left-4">Product Name</li>
                            <li className="font-medium text-lg relative lg:-left-6"> Status</li>
                            <li className="font-medium text-lg lg:mr-14">Stock Quantity</li>
                            <li className="font-medium text-lg lg:mr-7 relative xl:left-[-4rem]">Date</li>
                            <li className="font-medium text-lg lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
                        </ul>

                        {orders.map(item => (
                            <div key={item.id} className="rounded-lg p-4 mb-4 shadow-md lg:shadow-sm">
                                <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                                    <div className="flex justify-between w-full lg:w-[12%] mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Product ID:</p>
                                        <div className="text-sm  justify-start ml-[-1rem] font-poppins font-medium lg:truncate">
                                          
                                            <p>{item.ProductId}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Product Name:</p>
                                        <span className="text-sm font-poppins font-medium lg:relative lg:right-20 lg:truncate">{item.productName}</span>
                                    </div>
                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Status:</p>
                                        <span className="font-poppins text-sm font-medium lg:ml-[-6rem] xl:ml-[-8rem]">{item.status}</span>
                                    </div>
                                    <div className="flex justify-between lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Stock Quantity:</p>
                                        <span className="text-sm font-poppins font-medium lg:relative lg:right-16 lg:max-w-[8rem] lg:truncate">
                                            {item.quantity}
                                        </span>
                                    </div>


                                    <div className="flex justify-between w-full lg:w-auto mt-3">
                                        <p className="font-poppins text-lg font-medium lg:hidden">Date:</p>
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

export default Consignment
