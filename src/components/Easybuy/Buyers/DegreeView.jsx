import React, { useState, useEffect } from 'react';
import { useRouter } from '../../../Routes/router';
import { motion } from 'framer-motion';
import useInvestment from '../../../hooks/useInvetment';
import { toast, Toaster } from 'react-hot-toast';
import tinycolor from 'tinycolor2';

const DegreeView = () => {
    const router = useRouter();
    const { GetCart } = useInvestment();
    const [cartItems, setCartItems] = useState([]);
    const [selectedImages, setSelectedImages] = useState({});
    const [otherImagesMap, setOtherImagesMap] = useState({});
    const [selectedColors, setSelectedColors] = useState(() => {
        const storedColors = localStorage.getItem('selectedColors');
        return storedColors ? JSON.parse(storedColors) : {};
    });

    const colorHexMap = {
        "army-green": "#4b5320",
        "maroon-red": "#800000",
        "sky-blue": "#87ceeb",
        "teal": "#008080",
        "navy-blue": "#000080",
        "default": "#000000",
    };

    const handleCheckout = () => router.push('/checkout-product');
    const handleCancel = () => router.push('/buyers/dashboard');
    const handleBack = () => router.back();

    const handleImageClick = (productId, imageUrl) => {
        setSelectedImages((prev) => ({ ...prev, [productId]: imageUrl }));
    };

    const handleColorChange = (productId, color) => {
        const updatedColors = { ...selectedColors, [productId]: color };
        localStorage.setItem('selectedColors', JSON.stringify(updatedColors));
        setSelectedColors(updatedColors);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const resp = await GetCart();
                const info = resp?.data?.data;
                if (info) {
                    setCartItems(info);
                    toast.success(resp?.data?.message);
                    const otherImagesTemp = {};
                    const selectedImagesTemp = {};

                    info.forEach((item) => {
                        const productId = item._id;
                        const additionalImages = item.product?.additionalImages || [];
                        otherImagesTemp[productId] = additionalImages;
                        selectedImagesTemp[productId] = additionalImages[0] || '';
                    });

                    setOtherImagesMap(otherImagesTemp);
                    setSelectedImages(selectedImagesTemp);
                } else {
                    toast.error('No cart items found');
                }
            } catch (error) {
                toast.error(error?.response?.data?.msg || 'Failed to fetch cart');
            }
        };

        fetchCartItems();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <header className="p-4 flex justify-between items-center bg-white shadow-md mt-6 mx-3 rounded-lg">
                <img alt="Paylow Logo" src="/images/logo.svg" className="h-10 hidden md:block" />
                <h4 onClick={handleBack} className="font-semibold text-lg text-gray-800 cursor-pointer hover:text-blue-600">
                    360-Degree Views
                </h4>
                <button onClick={handleCancel} className="text-blue-600 font-medium hover:underline">Cancel</button>
            </header>

            {cartItems.length > 0 ? (
                cartItems.map((item) => {
                    const productId = item._id;
                    const selectedImage = selectedImages[productId];
                    const otherImages = otherImagesMap[productId] || [];

                    return (
                        <main key={productId} className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] bg-white mt-5 lg:gap-10 rounded-xl shadow-sm p-4">
                            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                                <motion.img
                                    className="w-full max-w-md h-auto rounded-lg object-contain"
                                    src={selectedImage || '/images/default-image.png'}
                                    alt="Selected product"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />

                                <div className="flex flex-wrap gap-2 justify-center lg:flex-col lg:items-start lg:ml-6">
                                    {otherImages.map((image, index) => (
                                        <motion.img
                                            key={index}
                                            className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-500"
                                            src={image || '/images/full-preview-small.png'}
                                            onClick={() => handleImageClick(productId, image)}
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <article className="mt-4 lg:mt-0">
                                <h4 className="font-bold text-xl text-gray-800 mb-2">{item.product?.name}</h4>
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-lg font-medium text-gray-900">
                                        ${item.product?.price.$numberDecimal}
                                    </p>
                                    <p className="text-red-500 line-through text-md">
                                        ${item.product?.price.$numberDecimal}
                                    </p>
                                </div>
                                <p className="text-gray-600 mb-4">{item.product?.description}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-4">
  <p className="font-medium text-gray-700">Color:</p>
  <span className="capitalize text-gray-800 font-semibold">{item.color || 'N/A'}</span>
  <div
    className="w-10 h-10 rounded-full border border-gray-300 shadow"
    style={{
      backgroundColor: tinycolor(item.color).isValid()
        ? tinycolor(item.color).toHexString()
        : colorHexMap[item.color] || colorHexMap.default,
    }}
  ></div>
</div>

                            </article>
                        </main>
                    );
                })
            ) : (
                <div className="text-center text-gray-500 mt-10">No products found in your cart.</div>
            )}

            {cartItems.length > 0 && (
                <div className="w-full my-6 flex justify-center">
                    <motion.button
                        onClick={handleCheckout}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition-all"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        Buy Now
                    </motion.button>
                </div>
            )}

            <Toaster position="top-right" />
        </motion.div>
    );
};

export default DegreeView;
