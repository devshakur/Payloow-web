import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import BuyersLayout from '../EasyBuyRegistration/BuyersLayout'
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from '../../../Routes/router';

const ComparePage1 = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); 
  const router = useRouter();
  const handleView = ()=>{
  router.push('/product-view')
  }
 const buttonFnt = ()=>{
  handleView()
  setIsOpen(false)
 }
  const items = [
    {
      id: 1,
      img: '/images/iPhone11.png',
      name: 'iPhone11',
      amount: '₦300,000',
      descrp: '7/ 5.8 Inches - Reliable power wherever ...',
    },
    {
      id: 2,
      img: '/images/iPhone11.png',
      name: 'iPhone11',
      amount: '₦300,000',
      descrp: ' 7/ 5.8 Inches - Reliable power wherever ...',
    },
  ];

  const compareProduct = [
    {
      id: 1,
      img: '/images/iphone.png',
      name: 'Apple IPhone XS',
      amount: '₦3,499',
      descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
    },
    {
      id: 2,
      img: '/images/iPhone11.png',
      name: 'iPhone11',
      amount: '₦300,000',
      descrp: '7/ 5.8 Inches - Reliable power wherever ...',
    },
    {
      id: 3,
      img: '/images/iPhone11.png',
      name: 'iPhone11',
      amount: '₦300,000',
      descrp: ' 7/ 5.8 Inches - Reliable power wherever ...',
    },
    {
      id: 4,
      img: '/images/iphone.png',
      name: 'Apple IPhone XS',
      amount: '₦3,499',
      descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
    },
  ];

  const handleSelectItem = (itemId) => {
    // If item is already selected, remove it
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      // If there are fewer than 3 items selected, add this item
      if (selectedItems.length < 2) {
        setSelectedItems([...selectedItems, itemId]);
      }
    }
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
          <div className="flex gap-2">
            <button className="flex text-[14px] font-poppins font-medium border border-blue-500 w-[7rem] px-3 gap-3 justify-between rounded-lg items-center bg-blue-100">
              <p>iPhone11</p>
              <span>X</span>
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="flex text-[14px] font-poppins font-medium border border-blue-500 w-[5rem] px-3 gap-3 justify-between rounded-lg items-center bg-blue-100"
            >
              <p>Add</p>
              <span>X</span>
            </button>
          </div>
          <div className="font-poppins font-normal text-lg text-black">Showing 1- 6 of 20 results</div>
        </div>
        <main className="flex flex-col sm:flex-row mt-6 gap-5">
          {items.map((item) => (
            <div key={item.id}>
              <div className="w-full h-[300px]">
                <img src={item.img} alt={item.id} className="w-auto h-auto" />
              </div>
              <div className="lg:w-[90%] w-[90%] lg:-mt-6 flex justify-between md:w-[70%]">
                <p className="font-poppins font-medium text-[#101928] text-lg">{item.name}</p>
                <p className="font-poppins font-[450] text-[#101928] text-xl">{item.amount}</p>
              </div>
              <div>
                <p className="font-poppins font-normal text-[14px] text-[#101928]">{item.descrp}</p>
              </div>
              <button className="flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2">
                <span>
                  <IoCartOutline className="text-[#475367]" />
                </span>
                <p className="text-[14px] text-[#475367] font-poppins font-semibold"> Add to Cart</p>
              </button>
            </div>
          ))}
        </main>
        <>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <DialogBackdrop className="fixed inset-0 bg-black/30" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              {/* The actual dialog panel */}
              <DialogPanel className=" space-y-[1rem] bg-white rounded-lg shadow-lg">
                <DialogTitle className="flex justify-between p-5">
                  <h4 className="font-semibold text-lg font-poppins">Choose product to Compare</h4>
                  <span>X</span>
                </DialogTitle>
                <Description>
                  <main className="lg:grid lg:grid-cols-2 flex flex-col max-h-[60vh] overflow-scroll mt-6 gap-5">
                    {compareProduct.map((item) => (
                      <ul key={item.id}>
                        <div
                          onClick={() => handleSelectItem(item.id)}
                          className={` focus:bg-blue-400 ${
                            selectedItems.includes(item.id) ? 'bg-blue-300' : ''
                          }`}
                        >
                          <li className="p-5">
                            <img src={item.img} alt={item.id} className="w-auto h-auto cursor-pointer" />
                          </li>
                          <div className="lg:w-[90%] w-[90%] lg:-mt-4 flex justify-between md:w-[70%] mx-2">
                            <p className="font-poppins font-medium text-[#101928] text-lg mx-4">{item.name}</p>
                            <p className="font-poppins font-[450] text-[#101928] text-xl">{item.amount}</p>
                          </div>
                          <div>
                            <p className="font-poppins font-normal text-[14px] text-[#101928] mx-6">{item.descrp}</p>
                          </div>
                     
                        <button className="flex items-center gap-3 bg-white border rounded-md my-5 py-1 px-2 mx-4">
                          <span>
                            <IoCartOutline className="text-[#475367]" />
                          </span>
                          <p className="text-[14px] text-[#475367] font-poppins font-semibold"> Add to Cart</p>
                        </button>
                        </div>
                      </ul>
                    ))}
                  </main>
                  <div className="w-full flex justify-end">
                    <button
                      className="py-2 w-[8rem] bg-blue-900 rounded-lg p-5 m-6 text-white"
                      onClick={buttonFnt}
                    >
                      Save
                    </button>
                  </div>
                </Description>
              </DialogPanel>
            </div>
          </Dialog>
        </>
      </div>
    </BuyersLayout>
  );
};

export default ComparePage1;
