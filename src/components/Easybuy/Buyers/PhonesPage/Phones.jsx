import React, { useState, useEffect } from 'react';
import { IoCartOutline } from "react-icons/io5";
import ReactPaginate from 'react-paginate';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BuyersLayoutGen from '../BuyersLayoutGen';
import useInvestment from '../../../../hooks/useInvetment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

const Phones = () => {
  const { FetchAllProduct } = useInvestment();
  const [currentPage, setCurrentPage] = useState(0);
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const itemsPerPage = 6; // Number of items per page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const resp = await FetchAllProduct();
        const productsData = resp?.data?.data?.data;

        if (productsData) {  
          const filteredProducts = productsData.filter((product) =>
            product.category.name.toLowerCase().includes('phones')
          );

          setPhones([...filteredProducts].reverse()); 
        } else {
          setPhones([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error); // Log error in case of failure
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [FetchAllProduct]);

  const totalPages = Math.ceil(phones.length / itemsPerPage); // Calculate total pages

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Update the current page
  };

  const displayedItems = phones.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  ); 
  console.log(displayedItems);
  

  return (
    <BuyersLayoutGen>
      <div className="h-[211px] w-full bg-[#FFFFFF] shadow-md flex justify-center items-center">
        <motion.h3
          className="font-poppins text-[50px] font-medium lg:text-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ads Here
        </motion.h3>
      </div>
      <main className="my-12">
        <motion.h3
          className="font-poppins font-medium text-xl text-[#00000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Phones Deals
        </motion.h3>

        <div className="grid lg:grid-cols-3 justify-center gap-x-6 sm:grid-cols-2 gap-y-8">
          {loading ? (
            // Render skeleton loaders
            Array(itemsPerPage)
              .fill()
              .map((_, index) => (
                <div key={index} className="mx-2">
                  <Skeleton height={200} width="100%" />
                  <Skeleton height={30} width="80%" className="my-2" />
                  <Skeleton height={20} width="50%" />
                  <Skeleton height={40} width="100%" className="mt-2" />
                </div>
              ))
          ) : displayedItems.length === 0 ? (
            <div className="flex justify-start my-5">
              <p className="font-plus-jakarta text-lg font-medium text-gray-700">
                No Phone Product For Sales
              </p>
            </div>
          ) : (
            displayedItems.map((product) => (
              <motion.div
                key={product._id}
                className="w-full product-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link to={`/product-details/${product._id}`}>
                  <div className='w-full flex justify-center lg:justify-start'>
                    <img src={product.imageUrl} alt={product._id} className='w-[95%]  md:h-[400px]' />
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
                    className="flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span>
                      <IoCartOutline className="text-[#475367]" />
                    </span>
                    <p className="text-[14px] text-[#475367] font-poppins font-semibold">
                      Add to Cart
                    </p>
                  </motion.button>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination Section */}
        <div className="flex text-center justify-between mt-6">
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
            pageLinkClassName={
              'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'
            }
            previousClassName={'mx-1'}
            previousLinkClassName={
              'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'
            }
            nextClassName={'mx-1'}
            nextLinkClassName={
              'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'
            }
            activeClassName={'bg-blue-600 text-white'}
            disabledClassName={'opacity-50 cursor-not-allowed'}
          />
        </div>
      </main>
    </BuyersLayoutGen>
  );
};

export default Phones;
