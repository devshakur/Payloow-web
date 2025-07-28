import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import BuyersLayoutPage from './BuyersLayoutPage';
import useInvestment from '../../../hooks/useInvetment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';  // Import skeleton styles

const BuyersDashboard = () => {
  const { FetchAllProduct } = useInvestment();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);  // Loading state





  useEffect(() => {
    const productItems = async () => {
      try {
        const resp = await FetchAllProduct();
        const message = resp?.data?.data?.message;
        const productsData = resp?.data?.data?.data;
        if (productsData) {
          localStorage.removeItem(('selectedColors'))
          setProducts([...productsData].reverse());
          toast.success(message);
       
        } else {
          toast.success('Fetched Products');
        }
      } catch (error) {
        if (error?.response?.data?.msg) {
          toast.error(error.response.data.msg);
        } else {
          toast.error('Failed to fetch products');
        }
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };
    productItems();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage); // Calculate total pages

  // Handle pagination page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Slice the items array to get the current page items
  const displayedItems = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log(displayedItems)

 

  return (
    <div>
      <BuyersLayoutPage>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className='font-poppins text-[22px] font-medium my-6 tex-[#000000]'>
            Phones & Solar items Deals
          </h3>

          <motion.div
            className='grid lg:grid-cols-3 justify-center gap-x-4 sm:grid-cols-2 gap-y-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {loading ? (
              // Skeleton loading for each product
              Array(6).fill().map((_, index) => (
                <div key={index} className='mx-2'>
                  <Skeleton height={200} width="100%" />
                  <Skeleton height={30} width="80%" className="my-2" />
                  <Skeleton height={20} width="50%" />
                  <Skeleton height={40} width="100%" className="mt-2" />
                </div>
              ))
            ) : displayedItems.length > 0 ? (
              displayedItems.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className='mx-2'
                >
                  <Link to={`/product-details/${product._id}`}>
                    <div className='w-full flex justify-center lg:justify-start'>
                      <img src={product.imageUrl || '/images/default-img.png'} alt={product._id || 'Product'}  className='w-[85%] md:h-[400px]' />
                    </div>
                    <div className='lg:w-[80%] w-[100%] flex justify-between md:w-[70%]'>
                      <p className='font-poppins font-medium text-[#101928] text-lg'>{product.name}</p>
                      <p className='font-poppins font-[450] text-[#101928] text-xl'>₦{product.price?.$numberDecimal}</p>
                    </div>
                    <div className="truncate-text">
                      <p className="font-poppins w-[100%] lg:w-[80%] font-normal text-[14px] text-[#101928] line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <motion.button
                      className='flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span><IoCartOutline className='text-[#475367]' /></span>
                      <p className='text-[14px] text-[#475367] font-poppins font-semibold'>
                        Add to Cart
                      </p>
                    </motion.button>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className='flex justify-center items-center'>
                <p className='font-semibold text-lg font-plus-jakarta text-gray-600'>No Available Product for Sales</p>
              </div>
            )}
          </motion.div>

          <div className='flex justify-center'>
            <motion.button
              className='bg-[#2751E9] py-2 px-6 rounded-lg text-white font-poppins font-semibold text-[12px]'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => itemsPerPage > 6 ? setItemsPerPage(6) : setItemsPerPage(12)}
            >
              {itemsPerPage > 6 ? 'View Less' : ' View More'}
            </motion.button>
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
            <div className='px-6 py-1 text-white bg-blue-700 flex items-center gap-3 rounded-lg cursor-pointer'>
              <IoIosArrowBack onClick={() => setItemsPerPage(6)} className='w-6 h-6' />
              <IoIosArrowForward onClick={() => setItemsPerPage(12)} className='w-6 h-6' />
            </div>
          </div>
        </motion.main>
      </BuyersLayoutPage>
      <Toaster />
    </div>
  );
};

export default BuyersDashboard;

