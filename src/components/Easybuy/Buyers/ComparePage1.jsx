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
            className="flex text-[14px] font-plus-jakarta font-medium border border-blue-500 px-4 py-2 gap-3 justify-between rounded-lg items-center bg-blue-100"
          >
            <p className=''>Click Me!</p>
          </button>
        </div>

        {/* Display selected items side-by-side */}
        <main className="flex w-full flex-col md:flex-row gap-5 lg:gap-1 mt-6">
         {compareProducts.map((item) => (
  <Link key={item._id} to={`/product-details/${item._id}`}>
    <div className="border p-4 w-full sm:w-[85%] lg:w-[70%] rounded-lg shadow-md">
      <img
        src={item.imageUrl || '/images/z-fold.jpeg'}
        alt={item.name}
        className="w-full h-auto"
      />
      <h4 className="font-plus-jakarta font-medium text-lg text-black">{item.name}</h4>
      <p className="font-plus-jakarta text-gray-600 text-sm">{item.description}</p>
      <p className="font-plus-jakarta font-semibold text-blue-500">
        ₦{parseFloat(item.price?.$numberDecimal || 0).toLocaleString()}
      </p>
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
    <img
      src={item.imageUrl || '/images/z-fold.jpeg'}
      alt={item.name}
      className="w-full h-auto"
    />
    <h5 className="font-medium">{item.name}</h5>
    <p>₦{parseFloat(item.price?.$numberDecimal || 0).toLocaleString()}</p>
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
