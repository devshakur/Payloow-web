import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from 'framer-motion';
import useInvestment from '../../../../hooks/useInvetment';
import { Menu } from '@headlessui/react';
import { MoreVertical } from 'lucide-react';
import {toast, Toaster} from 'react-hot-toast'
const MyInventory = () => {
  const { GetProductInventory } = useInvestment();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPhones, setTotalPhones] = useState(0);
  const [inventory, setInventory] = useState([]); // To hold inventory data

  useEffect(() => {
    const getInventory = async () => {
      try {
        const resp = await GetProductInventory();
        
        // Fetching inventory from API response
        const productsData = resp?.data?.data?.data; 
        
        if (productsData) {
         toast.success('Fetched User Inventory')
          setInventory(productsData); 
         
          
        }
      } catch (error) {
        toast.error('Error fetching inventory:', error);
      }
    };

    getInventory();
  }, [GetProductInventory]);

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Items per page for pagination
  const itemsPerPage = 4;
  const pageCount = Math.ceil(inventory.length / itemsPerPage);
  const displayedOrders = inventory.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div>
      <div className="flex justify-center">
        <article className="bg-white w-[100%] overflow-scroll mx-4 lg:mx-0 rounded-lg p-4">
          <motion.ul 
            className="lg:flex justify-between bg-white shadow-lg hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <li className="font-medium text-lg lg:mr-5">Product ID</li>
            <li className="font-medium text-lg relative lg:left-6">Product Name</li>
            <li className="font-medium text-lg relative lg:left-7">Category</li>
            <li className="font-medium text-lg lg:mr-7">Stock Quantity</li>
            <li className="font-medium text-lg lg:mr-7 relative xl:left-[-2rem]">Unit Price</li>
            <li className="font-medium text-lg lg:mr-7 relative xl:left-[-3.4rem]">Action</li>
          </motion.ul>
        {displayedOrders.length === 0 ? (
         <>
         <div className="flex justify-center my-3">
          <p className="text-lg font-plus-jakarta font-medium text-gray-700">No orders found for this partner</p>
         </div>
         </>
        ):
          displayedOrders.reverse().map(item => (
            <motion.div 
              key={item._id} // Use item._id as the key
              className="rounded-lg p-4 mb-4  shadow-md lg:shadow-sm"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 50 }}
            >
              <div className="flex justify-center lg:justify-between lg:items-center flex-col lg:flex-row">
                <div className="flex justify-between w-full lg:w-[12%] mt-3">
                  <p className="font-poppins text-lg font-medium lg:hidden truncate">Product ID:</p>
                  <div className="text-sm justify-start ml-[-1rem] font-poppins font-medium lg:truncate">
                    <p>{item._id}</p> {/* Display product ID */}
                  </div>
                </div>
                <div className="flex justify-between w-full lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-medium lg:hidden">Product Name:</p>
                  <span className="text-sm font-poppins font-medium lg:relative lg:right-20 lg:truncate">
                    {item.name} {/* Display product name */}
                  </span>
                </div>
                <div className="flex justify-between w-full lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-medium lg:hidden">Category:</p>
                  <span className="font-poppins text-sm font-medium lg:ml-[-6rem] xl:ml-[-6rem]">
                    {item.category.name} {/* Display category name */}
                  </span>
                </div>
                <div className="flex justify-between lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-medium lg:hidden">Stock Quantity:</p>
                  <span className="text-sm font-poppins font-medium lg:relative lg:right-20 lg:max-w-[8rem] lg:truncate">
                    {item.stock} {/* Display stock quantity */}
                  </span>
                </div>
                <div className="flex justify-between w-full lg:w-auto mt-3">
                  <p className="font-poppins text-lg font-medium lg:hidden">Unit Price:</p>
                  <span className='text-sm font-poppins font-medium lg:relative right-9 xl:right-16'>
                    {item.price.$numberDecimal} {/* Display unit price */}
                  </span>
                </div>
                <Menu as="div" className="relative inline-block text-right xl:right-20">
     <Menu.Button className="focus:outline-none">
  <MoreVertical className="w-5 h-5 mt-4 text-gray-600" />
</Menu.Button>


      <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-gray-100 text-blue-600' : 'text-gray-800'
                } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                onClick={() => console.log('Edit clicked')}
              >
                Edit
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-gray-100 text-red-600' : 'text-gray-800'
                } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                onClick={() => console.log('Delete clicked')}
              >
                Delete
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-gray-100 text-green-600' : 'text-gray-800'
                } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                onClick={() => console.log('Activate clicked')}
              >
                Activate
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>

              </div>
            </motion.div>
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
            <motion.div 
              className='px-6 h-8 mt-5 text-white bg-blue-700 flex items-center gap-3 rounded-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <IoIosArrowBack className='w-4 h-4' />
              <IoIosArrowForward className='w-4 h-4' />
            </motion.div>
          </div>
        </article>
        <Toaster />
      </div>
    </div>
  );
};

export default MyInventory;
