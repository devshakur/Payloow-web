import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BuyersLayoutGen from '../BuyersLayoutGen';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from '../../../../Routes/router';
import useInvestment from '../../../../hooks/useInvetment';

const SolarDashboard = () => {
  const { FetchAllProduct } = useInvestment();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await FetchAllProduct();
     const productsData = resp?.data?.data?.data;

        if (productsData) {
          // Filter products that contain "phone" (case-insensitive)
          const filteredProducts = productsData.filter((product) =>
          product.category.name.toLowerCase().includes('solar panel')
          );
          setProducts(filteredProducts); // Set filtered products to state
        } else {
          setProducts([]); // If no products found, set an empty array
        }
      } catch (error) {
        console.error('Failed to fetch products:', error); // Log error in case of failure
      }
    };

    fetchProducts();
  }, [FetchAllProduct]);



  const handleEnergy = () => {
    router.push('/energy-calculator');
  };

  const handleDesign = () => {
    router.push('/design-solar');
  };

 
  const itemsPerPage = 6; // Number of items per page
  const totalPages = Math.ceil(products.length / itemsPerPage); 

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayedItems = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <BuyersLayoutGen>
      <header className='flex gap-6 flex-col sm:flex-row sm:gap-3'>
        <div className='bg-blue-100 p-3 flex flex-col gap-3'>
          <motion.h3
            className='font-poppins font-medium text-2xl text-[#1D2433]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Energy Calculator
          </motion.h3>
          <motion.p
            className='font-plus-jakarta font-normal text-lg text-[#1D2433]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Discover your potential savings! Calculate the energy and cost benefits of switching to solar with our easy-to-use Energy Calculator.
          </motion.p>
          <div className="flex justify-center">
          <motion.button
            onClick={handleEnergy}
            className='w-[50%] bg-blue-500 rounded-md text-white py-3'
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Get Started
          </motion.button>
          </div>
        </div>

        <div className='bg-blue-100 p-3 flex flex-col gap-3'>
          <motion.h3
            className='font-poppins font-medium text-2xl text-[#1D2433]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Solar System Design Tool
          </motion.h3>
          <motion.p
            className='font-plus-jakarta font-normal text-lg text-[#1D2433]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Design your ideal solar setup! Get an accurate quote and personalized solar system design tailored to your energy needs.
          </motion.p>
          <div className="flex justify-center">
          <motion.button
            onClick={handleDesign}
            className='w-[50%] rounded-md bg-blue-500 text-white py-3'
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Get Started
          </motion.button>
          </div>
        </div>
      </header>

      <main className='my-6'>
        <motion.h3
          className='font-poppins font-medium text-lg text-[#1D2433]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Solar Deals
        </motion.h3>

        <div className='grid lg:grid-cols-3 justify-center gap-x-4 sm:grid-cols-2 gap-y-8'>
        {displayedItems.length === 0 ? (
            <div className="flex justify-start my-5">
              <p className="font-plus-jakarta text-lg font-medium text-gray-700">
                No Solar Product For Sales
              </p>
            </div>
          ) : (
          displayedItems.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/product-details/${product._id}`}>
              <div className='w-full flex justify-center lg:justify-start'>
                  <img src={product.imageKey} alt={product._id} className='w-[100%] h-[100%]' />
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
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span><IoCartOutline className='text-[#475367]' /></span>
                  <p className='text-[14px] text-[#475367] font-poppins font-semibold'> Add to Cart</p>
                </motion.button>
              </Link>
            </motion.div>
            ))
            )}
        </div>

        <div className='flex justify-center'>
          <motion.button
            className='bg-[#2751E9] py-2 px-6 rounded-lg text-white font-poppins font-semibold text-[12px]'
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setItemsPerPage(itemsPerPage > 6 ? 6 : 12)}
          >
            {itemsPerPage > 6 ? 'View Less' : 'View More'}
          </motion.button>
        </div>

        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'flex justify-start mt-6'}
          pageClassName={'mx-1'}
          pageLinkClassName={'px-4 py-2 rounded bg-gray-300 text-black hover:bg-blue-500 hover:text-white transition duration-200'}
          activeClassName={'bg-blue-600 text-white'}
        />
      </main>
    </BuyersLayoutGen>
  );
};

export default SolarDashboard;
