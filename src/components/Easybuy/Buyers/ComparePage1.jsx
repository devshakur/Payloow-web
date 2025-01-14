
// import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
// import { useState, useEffect } from 'react';
// import BuyersLayout from '../EasyBuyRegistration/BuyersLayout';
// import { IoCartOutline } from "react-icons/io5";
// import { useRouter } from '../../../Routes/router';
// import useInvestment from '../../../hooks/useInvetment';

// const ComparePage1 = () => {
//   const {FetchAllProduct} = useInvestment()
//   let [isOpen, setIsOpen] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [productList, setProductList] = useState([])
//   const router = useRouter();

//   useEffect(() => {
//     const productItems = async () => {
//       try {
//         const resp = await FetchAllProduct();
//         const message = resp?.data?.data?.message; 
//         const productsData = resp?.data?.data?.data;
//         if (productsData) {
//           setProductList(productsData)
//           toast.success(message)
//         } else {
//           toast.error('No Products')
//         }
//       } catch (error) {
//         if (error?.response?.data?.msg) {
//           toast.error(error.response.data.msg);  
//         } else {
//           toast.error('Failed to fetch products'); 
//         }
//       }
//     }
//    productItems();
//   }, [])

//   // const compareProduct = [
//   //   {
//   //     id: 1,
//   //     img: '/images/iphone.png',
//   //     name: 'Apple IPhone XS',
//   //     amount: '₦3,499',
//   //     descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
//   //   },
//   //   {
//   //     id: 2,
//   //     img: '/images/iPhone11.png',
//   //     name: 'iPhone11',
//   //     amount: '₦300,000',
//   //     descrp: '7/ 5.8 Inches - Reliable power wherever ...',
//   //   },
//   //   {
//   //     id: 3,
//   //     img: '/images/iPhone11.png',
//   //     name: 'iPhone11',
//   //     amount: '₦300,000',
//   //     descrp: '7/ 5.8 Inches - Reliable power wherever ...',
//   //   },
//   //   {
//   //     id: 4,
//   //     img: '/images/iphone.png',
//   //     name: 'Apple IPhone XS',
//   //     amount: '₦3,499',
//   //     descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
//   //   },
//   // ];

//   const handleSelectItem = (itemId) => {
//     // Toggle selection
//     if (selectedItems.includes(itemId)) {
//       setSelectedItems(selectedItems.filter((_id) => id !== itemId));
//     } else {
//       if (selectedItems.length < 2) {
//         setSelectedItems([...selectedItems, itemId]);
//       }
//     }
//   };

//   const handleSave = () => {
//     setIsOpen(false);
//     // Selected items will be displayed below
//   };

//   return (
//     <BuyersLayout>
//       <div>
//         <header>
//           <h3 className="text-[15px] font-medium text-blue-600">
//             Home / Search / Iphone11 / <span className="text-black">Compare</span>
//           </h3>
//         </header>
//         <div className="mt-5 flex flex-col lg:flex-row justify-between">
//           <div className="flex gap-2">
//             {productList.map((itemId) => {
//               const item = compareProduct.find((product) => product._id === itemId);
//               return (
//                 <button key={itemId} className="flex text-[14px] font-poppins font-medium border border-blue-500 w-[7rem] px-3 gap-3 justify-between rounded-lg items-center bg-blue-100">
//                   <p>{item.name}</p>
//                   <span>X</span>
//                 </button>
//               );
//             })}
//             <button
//               onClick={() => setIsOpen(true)}
//               className="flex  text-[14px] font-poppins font-medium border border-blue-500 w-[5rem] px-4 gap-3 justify-between rounded-lg items-center bg-blue-100"
//             >
//               <p>Click Me!</p>
             
//             </button>
//           </div>
//         </div>

//         {/* Display selected items side-by-side */}
//         <main className="flex flex-wrap gap-5 mt-6">
//           {productList.map((itemId) => {
//             const item = productList.find((product) => product.id === itemId);
//             return (
//               <div key={item.id} className="border p-4 w-full sm:w-[45%] lg:w-[30%] rounded-lg shadow-md">
//                 <img src={item.img || '/images/iPhone12.png'} alt={item.name} className="w-full h-auto" />
//                 <h4 className="font-poppins font-medium text-lg text-black">{item.name}</h4>
//                 <p className="font-poppins text-gray-600 text-sm">{item.descrp}</p>
//                 <p className="font-poppins font-semibold text-blue-500">{item.amount}</p>
//               </div>
//             );
//           })}
//         </main>

//         {/* Modal */}
//         <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
//           <DialogBackdrop className="fixed inset-0 bg-black/30" />
//           <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//             <DialogPanel className="bg-white rounded-lg shadow-lg p-5 w-full max-w-md">
//               <DialogTitle className="flex justify-between">
//                 <h4 className="font-semibold text-lg">Choose product to Compare</h4>
//                 <button onClick={() => setIsOpen(false)}>X</button>
//               </DialogTitle>
//               <Description>
//                 <div className="grid grid-cols-2 gap-4 mt-4 max-h-[60vh] overflow-auto">
//                   {productList.map((item) => (
//                     <div
//                       key={item.id}
//                       onClick={() => handleSelectItem(item.id)}
//                       className={`cursor-pointer p-4 border rounded-lg ${
//                         selectedItems.includes(item.id) ? 'bg-blue-300' : ''
//                       }`}
//                     >
//                       <img src={item.img} alt={item.name} className="w-full h-auto" />
//                       <h5 className="font-medium">{item.name}</h5>
//                       <p>{item.amount}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex justify-end mt-4">
//                   <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//                     Save
//                   </button>
//                 </div>
//               </Description>
//             </DialogPanel>
//           </div>
//         </Dialog>
//       </div>
//     </BuyersLayout>
//   );
// };

// export default ComparePage1;
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState, useEffect } from 'react';
import BuyersLayout from '../EasyBuyRegistration/BuyersLayout';
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from '../../../Routes/router';
import { Link, } from 'react-router-dom';
import useInvestment from '../../../hooks/useInvetment';

const ComparePage1 = () => {
  const { FetchAllProduct } = useInvestment();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [productList, setProductList] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const productItems = async () => {
      try {
        const resp = await FetchAllProduct();
        const productsData = resp?.data?.data?.data;

        if (productsData) {
          setProductList(productsData);
          toast.success(resp?.data?.data?.message);
        } else {
          toast.error('No Products');
        }
      } catch (error) {
        if (error?.response?.data?.msg) {
          toast.error(error.response.data.msg);
        } else {
          toast.error('Failed to fetch products');
        }
      }
    };
    productItems();
  }, []);

  const handleSelectItem = (itemId) => {
    // Toggle selection
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSave = () => {
    const selectedProducts = productList.filter((product) => selectedItems.includes(product._id));
    setCompareProducts(selectedProducts);
    setIsOpen(false);
  };

  return (
    <BuyersLayout>
      <div>
        <header>
          <h3 className="text-[15px] font-medium text-blue-600">
            Home / Search / Iphone11 / <span className="text-black">Compare</span>
          </h3>
        </header>
        <div className="mt-5 flex flex-col lg:flex-row justify-between">
          <button
            onClick={() => setIsOpen(true)}
            className="flex text-[14px] font-poppins font-medium border border-blue-500 px-4 py-2 gap-3 justify-between rounded-lg items-center bg-blue-100"
          >
            <p className=''>Click Me!</p>
          </button>
        </div>

        {/* Display selected items side-by-side */}
        <main className="flex flex-wrap gap-5 mt-6">
          {compareProducts.map((item) => (
             <Link to={`/product-details/${item._id}`}>
            <div key={item._id} className="border p-4 w-full sm:w-[45%] lg:w-[30%] rounded-lg shadow-md">
              <img src={item.imageKey || '/images/z-fold.jpeg'} alt={item.name} className="w-full h-auto" />
              <h4 className="font-poppins font-medium text-lg text-black">{item.name}</h4>
              <p className="font-poppins text-gray-600 text-sm">{item.description}</p>
              <p className="font-poppins font-semibold text-blue-500">₦{item.price.$numberDecimal}</p>
            </div>
            </Link>
          ))}
        </main>

        {/* Modal */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="bg-white rounded-lg shadow-lg p-5 w-full max-w-xl">
              <DialogTitle className="flex justify-between">
                <h4 className="font-semibold text-lg">Choose products to compare</h4>
                <button onClick={() => setIsOpen(false)}>X</button>
              </DialogTitle>
              <Description>
                <div className="grid grid-cols-2 gap-4 mt-4 max-h-[60vh] overflow-auto">
                  {productList.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleSelectItem(item._id)}
                      className={`cursor-pointer p-4 border rounded-lg ${
                        selectedItems.includes(item._id) ? 'bg-blue-300' : ''
                      }`}
                    >
                      <img src={item.imageKey || '/images/z-fold.jpeg'} alt={item.name} className="w-full h-auto" />
                      <h5 className="font-medium">{item.name}</h5>
                      <p>₦{item.price.$numberDecimal}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Save
                  </button>
                </div>
              </Description>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </BuyersLayout>
  );
};

export default ComparePage1;
