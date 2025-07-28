// import React, { useState, useEffect } from 'react'
// import { SliderVertical1 } from 'iconsax-react'
// import DebtorLayoutPage from '../DebtorLayoutPage';
// import { Button } from '@headlessui/react'
// import Modal from './BusinessModal/Modal';
// import StageTwo from './BusinessModal/StageTwo';
// import Loan from './BusinessModal/Loan';
// import useInvestment from '../../../../hooks/useInvetment';
// import SkeletonLoader from '../../../Skeleton/SkeletalLoading';
// import { useRouter } from '../../../../Routes/router';
// import clsx from 'clsx';

// const Business = ({ nextStep }) => {
//   const {ViewBusiness, getBusinessInfo} = useInvestment();
//   let [isOpen, setIsOpen] = useState(false)
//   const [active, setIsActive] = useState('one')
//   const [getid, setGetId] = useState()
//   const [data, setData] = useState([])
//   const [businessData, setBusinessData] = useState({});
//   const [user, setUser] = useState({});
//   const [links, setLinks] = useState({})
//   const [businesslinks, setBusinessLinks] = useState([])
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const selectedId = getid;
//  const router = useRouter();


//  const handleInvestment = ()=>{
//   router.push('/debtor/request')
//  }
//   useEffect(() => {
//     const businessInfo = async () => {
//       try {
//         const resp = await getBusinessInfo(selectedId); // get detailed info about a particular business
//         const info = resp.data?.data?.business; 
//         const SocialLinks = info.online
//         const documentLinks = info.business_details;
//         const users = resp.data?.data?.user
  
//         if (info) {
//           setBusinessData(info); 
//           setUser(users)
//           setLinks(SocialLinks)
//           setBusinessLinks(documentLinks)
//         } else {
//           console.error("No business data found.");
//           setBusinessData({});
//         }
//       } catch (error) {
//         console.error("Failed to fetch information on business:", error);
//         setBusinessData({}); 
//       }
//     };
  
//     if (selectedId) {
//       businessInfo();
//     }
//   }, [selectedId]);

  



// useEffect(()=>{
//   const businessDetails = async ()=>{
//       try {
//         const response = await ViewBusiness();
//         const businesses = response.data;
//         setData(businesses);

//         // Loop through each business
//         for (const biz of businesses) {
//           if (biz.isOpen === true) {
//             // Update the business
//             await UpdateBusiness(biz._id, {
//               isOpen: false,
//               status: "isOpened",
//             });
//             console.log(`Business ${biz.business_name} approved.`);
//           }
//         }

//         toast.success("All open businesses have been approved.");
//       } catch (error) {
//         console.error("Error processing businesses:", error);
//         toast.error("Failed to fetch or update businesses.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     businessDetails();
//   }, []);
  
 
//  const handleView = (id)=>{
//    setGetId(id);

//  }

//  if (selectedId && businessData) {
//   setIsOpen(true); // Open the modal only when data is ready
// }
//  const indexOfLastItem = currentPage * itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const currentBusinesses = data.slice(indexOfFirstItem, indexOfLastItem);

// const totalPages = Math.ceil(data.length / itemsPerPage);

// // Function to change page
// const handlePageChange = (pageNumber) => {
//   setCurrentPage(pageNumber);
// };


//   return (
//     <DebtorLayoutPage>
//       <main>
//         <header className='bg-[#DBE7FE] px-4 shadow-lg rounded-md'>
//           <h1 className='font-poppins text-[28px] py-4 font-semibold'>Create Your Business Now</h1>
//           <p className='lg:w-1/2 my-5 lg:-my-0 text-[22px] font-medium text-black font-poppins tracking-wide'>Bring your vision to life by setting up your business. Share your story, showcase your business goals, and connect with investors to fund your next big idea.</p>
//           <div className='flex justify-center lg:justify-end lg:relative lg:-top-[9rem]'>
//             <img src="/images/person.png" className='h-[14rem]' alt="person" />
//           </div>
//           <div className='my-9 lg:-my-[12rem]'>
//             <Button onClick={nextStep} className="w-full lg:w-1/5 rounded-lg bg-[#3369F4] py-3 lg:mb-4 my-5 px-4 text-md text-white mt-6 text-xl data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500">
//               Create Business
//             </Button>
//           </div>
//         </header>
//      <section className="lg:my-32 mt-[3rem] lg:mt-[15rem]">
//   <div className="flex justify-between items-center  mx-6 mb-6">
//     <h3 className="font-plus-jakarta font-semibold text-2xl text-gray-800">My Businesses</h3>
//     <p className="text-blue-600 hover:underline cursor-pointer font-medium text-lg">See all</p>
//   </div>

//   {isLoading ? (
//     <SkeletonLoader />
//   ) : (
//     <div className="flex flex-wrap justify-center lg:justify-start gap-6 px-4">
//       {data && data.length > 0 ? (
//         currentBusinesses.reverse().map((startup) => (
//           <article
//             key={startup.business_id}
//             className="w-full lg:w-[30%] bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
//           >
//             <div className="p-5 relative">
//               <div className="flex justify-between items-center mb-4">
//                 <div className="h-10 w-10 flex justify-center items-center bg-blue-100 rounded-full">
//                   <SliderVertical1 size="22" color="blue" />
//                 </div>
//                <div
//   className={`rounded-md py-1 px-3 text-xs font-semibold ${
//     startup.isOpen ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//   }`}
// >
//   {startup.isOpen ? 'Opened' : 'Pending'}
// </div>

//               </div>

//               <h3 className="font-plus-jakarta font-semibold text-lg text-gray-800 truncate">
//                 {startup.business_name}
//               </h3>

//               <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-3">
//                 {startup.business_description}
//               </p>

//               <div className="flex items-center gap-2 mt-5">
//                 <h4 className="text-sm font-medium text-gray-800">Loans:</h4>
//                 <p className="text-blue-600 font-semibold text-sm">
//                   {startup.loan === null ? (
//                     <span className="text-gray-400">No Available Loan</span>
//                   ) : (
//                     `₦${startup?.loan?.loan_amount?.toLocaleString()}`
//                   )}
//                 </p>
//               </div>

//               <div className="mt-6 space-y-3">
//                 <button
//                   onClick={handleInvestment}
//                   className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2 rounded-md font-semibold text-sm"
//                 >
//                   See Investments
//                 </button>
//                 <Button
//                   onClick={() => handleView(startup.business_id)}
//                   className="w-full border border-blue-500 hover:bg-blue-50 text-blue-600 py-2 rounded-md font-semibold text-sm"
//                 >
//                   View Business
//                 </Button>
//               </div>

//               {active === "one" && (
//                 <Modal
//                   isOpen={isOpen}
//                   setIsOpen={setIsOpen}
//                   user={user}
//                   businessData={businessData}
//                   setIsActive={setIsActive}
//                 />
//               )}
//               {active === "two" && (
//                 <StageTwo
//                   isOpen={isOpen}
//                   setIsOpen={setIsOpen}
//                   setIsActive={setIsActive}
//                   links={links}
//                   businesslinks={businesslinks}
//                 />
//               )}
//               {active === "three" && (
//                 <Loan
//                   isOpen={isOpen}
//                   setIsOpen={setIsOpen}
//                   setIsActive={setIsActive}
//                   user={user}
//                   businessData={businessData}
//                 />
//               )}
//             </div>
//           </article>
//         ))
//       ) : (
//         <div className="w-full flex justify-center mt-10">
//           <p className="text-lg text-gray-500 font-medium">No Available Business...</p>
//         </div>
//       )}
//     </div>
//   )}
// </section>

//         <div className="pagination flex justify-center lg:justify-end items-center space-x-3 ">
//   <button
//     onClick={() => handlePageChange(currentPage - 1)}
//     disabled={currentPage === 1}
//     className={clsx(
//       'px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
//     )}
//   >
//     Previous
//   </button>
//   {[...Array(totalPages)].map((_, index) => (
//     <button
//       key={index}
//       onClick={() => handlePageChange(index + 1)}
//       className={clsx(
//         'px-4 py-2 text-lg font-medium text-blue-600 border border-blue-500 rounded-md transition-all',
//         currentPage === index + 1
//           ? 'bg-blue-500 text-white shadow-md'
//           : 'bg-white hover:bg-blue-50'
//       )}
//     >
//       {index + 1}
//     </button>
//   ))}
//   <button
//     onClick={() => handlePageChange(currentPage + 1)}
//     disabled={currentPage === totalPages}
//     className={clsx(
//       'px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
//     )}
//   >
//     Next
//   </button>
// </div>
//       </main>
//     </DebtorLayoutPage>
//   )
// }

// export default Business

import React, { useState, useEffect } from 'react';
import { SliderVertical1 } from 'iconsax-react';
import DebtorLayoutPage from '../DebtorLayoutPage';
import { Button } from '@headlessui/react';
import Modal from './BusinessModal/Modal';
import StageTwo from './BusinessModal/StageTwo';
import Loan from './BusinessModal/Loan';
import useInvestment from '../../../../hooks/useInvetment';
import SkeletonLoader from '../../../Skeleton/SkeletalLoading';
import { useRouter } from '../../../../Routes/router';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { Wallet, ArrowRight2 } from 'iconsax-react';

const Business = ({ nextStep }) => {
  const { ViewBusiness, getBusinessInfo, UpdateBusiness } = useInvestment();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setIsActive] = useState('one');
  const [getid, setGetId] = useState();
  const [data, setData] = useState([]);
  const [businessData, setBusinessData] = useState({});
  const [user, setUser] = useState({});
  const [links, setLinks] = useState({});
  const [businesslinks, setBusinessLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const selectedId = getid;
  const router = useRouter();

  const handleInvestment = () => {
    router.push('/debtor/request');
  };

  useEffect(() => {
    const businessDetails = async () => {
      try {
        const response = await ViewBusiness();
        const businesses = response.data;
        setData(businesses);

        for (const biz of businesses) {
          if (biz.isOpen === true) {
            await UpdateBusiness(biz._id, {
              isOpen: false,
              status: "isOpened",
            });
            console.log(`Business ${biz.business_name} approved.`);
          }
        }

        toast.success("All open businesses have been approved.");
      } catch (error) {
        console.error("Error processing businesses:", error);
        toast.error("Failed to fetch or update businesses.");
      } finally {
        setIsLoading(false);
      }
    };

    businessDetails();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (businessId) => {
  const selectedBusiness = data.find((biz) => biz.business_id === businessId);
  if (selectedBusiness) {
    setBusinessData(selectedBusiness);
    setIsActive('one');
    setIsOpen(true);
  } else {
    toast.error("Business not found.");
  }
};


  return (
    <DebtorLayoutPage>
      <main>
        <header className='bg-[#DBE7FE] px-4 shadow-lg rounded-md'>
          <h1 className='font-poppins text-[28px] py-4 font-semibold'>Create Your Business Now</h1>
          <p className='lg:w-1/2 my-5 lg:-my-0 text-[22px] font-medium text-black font-poppins tracking-wide'>
            Bring your vision to life by setting up your business. Share your story, showcase your business goals, and connect with investors to fund your next big idea.
          </p>
          <div className='flex justify-center lg:justify-end lg:relative lg:-top-[9rem]'>
            <img src="/images/person.png" className='h-[14rem]' alt="person" />
          </div>
          <div className='my-9 lg:-my-[12rem]'>
            <Button onClick={nextStep} className="w-full lg:w-1/5 rounded-lg bg-[#3369F4] py-3 lg:mb-4 my-5 px-4 text-md text-white mt-6 text-xl">
              Create Business
            </Button>
          </div>
        </header>

        <section className="lg:my-26 mt-[3rem] lg:mt-[15rem]">
          <div className="flex justify-between items-center mx-6 mb-6">
            <h3 className="font-plus-jakarta font-semibold text-2xl text-gray-800">My Businesses</h3>
            <p className="text-blue-600 hover:underline cursor-pointer font-medium text-lg">See all</p>
          </div>

          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data && data.length > 0 ? (
                currentBusinesses.reverse().map((startup) => (
                  // <article
                  //   key={startup.business_id}
                  //   className="w-full lg:w-[30%] bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                  // >
                  //   <div className="p-5 relative">
                  //     <div className="flex justify-between items-center mb-4">
                  //       <div className="h-10 w-10 flex justify-center items-center bg-blue-100 rounded-full">
                  //         <SliderVertical1 size="22" color="blue" />
                  //       </div>
                  //       <div className={`rounded-md py-1 px-3 text-xs font-semibold ${
                  //         startup.isOpen ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  //       }`}>
                  //         {startup.isOpen ? 'Opened' : 'Pending'}
                  //       </div>
                  //     </div>

                  //     <h3 className="font-plus-jakarta font-semibold text-lg text-gray-800 truncate">
                  //       {startup.business_name}
                  //     </h3>

                  //     <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-3">
                  //       {startup.business_description}
                  //     </p>

                  //     <div className="flex items-center gap-2 mt-5">
                  //       <h4 className="text-sm font-medium text-gray-800">Loans:</h4>
                  //       <p className="text-blue-600 font-semibold text-sm">
                  //         {startup.loan === null ? (
                  //           <span className="text-gray-400">No Available Loan</span>
                  //         ) : (
                  //           `₦${startup?.loan?.loan_amount?.toLocaleString()}`
                  //         )}
                  //       </p>
                  //     </div>

                  //     <div className="mt-6 space-y-3">
                  //       <button
                  //         onClick={handleInvestment}
                  //         className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2 rounded-md font-semibold text-sm"
                  //       >
                  //         See Investments
                  //       </button>
                  //       <Button
                  //         onClick={() => handleView(startup.business_id)}
                  //         className="w-full border border-blue-500 hover:bg-blue-50 text-blue-600 py-2 rounded-md font-semibold text-sm"
                  //       >
                  //         View Business
                  //       </Button>
                  //     </div>
                  //   </div>
                  // </article>
        <article
  key={startup.business_id}
  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md mx-auto"
>
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <div className="bg-[#F1F2F4] p-2 rounded-full">
        <Wallet size={24} className="text-gray-600" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {startup.business_name}
        </h2>
        <p className="text-sm text-gray-500">Business</p>
      </div>
    </div>
    <div>
      <p
        className={`text-xs font-semibold px-3 py-1 rounded-full ${
          startup.loan ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {startup.loan ? "Has Loan" : "No Loan"}
      </p>
    </div>
  </div>

  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
    {startup.business_description || "No description available."}
  </p>

  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
    <div>
      <p className="text-gray-500 text-xs mb-1">Loan Amount</p>
      <p className="font-medium text-gray-800">
        {startup.loan?.loan_amount
          ? `₦${startup.loan.loan_amount.toLocaleString()}`
          : <span className="text-gray-400">None</span>}
      </p>
    </div>
    <div>
      <p className="text-gray-500 text-xs mb-1">Status</p>
      <p className={`rounded-md py-1  text-xs font-semibold ${
     startup.isOpen ? 'text-green-700' : 'bg-red-100 text-red-700'
   }`}>
        {startup.isOpen ? 'Opened' : 'Pending'}
      </p>
    </div>
  </div>

  <div className="flex gap-3">
    <button
      onClick={() => handleView(startup.business_id)}
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
    >
      View Business
    </button>
    <button
      onClick={() => handleInvestment(startup.business_id)}
      className="flex-1 border border-blue-600 hover:bg-blue-50 text-blue-600 py-2 rounded-xl font-semibold transition"
    >
      See Investments
    </button>
  </div>
</article>


                ))
              ) : (
                <div className="w-full flex justify-center mt-10">
                  <p className="text-lg text-gray-500 font-medium">No Available Business...</p>
                </div>
              )}
            </div>
          )}
        </section>

        <div className="pagination flex justify-center lg:justify-end items-center space-x-3 ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(
              'px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
            )}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={clsx(
                'px-4 py-2 text-lg font-medium text-blue-600 border border-blue-500 rounded-md transition-all',
                currentPage === index + 1 ? 'bg-blue-500 text-white shadow-md' : 'bg-white hover:bg-blue-50'
              )}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(
              'px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
            )}
          >
            Next
          </button>
        </div>

        {/* Modals rendered once only */}
        {active === "one" && (
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={user}
            businessData={businessData}
            setIsActive={setIsActive}
          />
        )}
        {active === "two" && (
          <StageTwo
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsActive={setIsActive}
             businessData={businessData}
          />
        )}
        {active === "three" && (
          <Loan
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsActive={setIsActive}
            user={user}
            businessData={businessData}
          />
        )}

      </main>
    </DebtorLayoutPage>
  );
};

export default Business;
