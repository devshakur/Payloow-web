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
        // Initialize selectedColors from localStorage if available
        const storedColors = localStorage.getItem('selectedColors');
        return storedColors ? JSON.parse(storedColors) : {};
    });

    const colorHexMap = {
        "army-green": "#4b5320",
        "maroon-red": "#800000",
        "sky-blue": "#87ceeb",
        "teal": "#008080",
        "navy-blue": "#000080",
        "default": "#000000", // Fallback color
    };

    const handleCheckout = () => {
        router.push('/checkout-product');
    };

    const handleImageClick = (productId, imageUrl) => {
        setSelectedImages((prev) => ({ ...prev, [productId]: imageUrl }));
    };

    const handleCancel = () => {
        router.push('/buyers/dashboard');
    };

    const handleBack = () => {
        router.back();
    };

    const handleColorChange = (productId, color) => {
        setSelectedColors((prevColors) => {
            const updatedColors = { ...prevColors, [productId]: color };
            // Save updated colors to localStorage
            localStorage.setItem('selectedColors', JSON.stringify(updatedColors));
            return updatedColors;
        });
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
                    const selectedColorsTemp = {};

                    info.forEach((item) => {
                        const productId = item._id;
                        const additionalImages = item.product?.additionalImageUrls || [];
                        otherImagesTemp[productId] = additionalImages;
                        selectedImagesTemp[productId] = additionalImages[0] || ''; // Default to first image
                        selectedColorsTemp[productId] = item.product?.color?.[0] || ''; // Default to first color
                    });

                    setOtherImagesMap(otherImagesTemp);
                    setSelectedImages(selectedImagesTemp);
                } else {
                    toast.error('No cart items found');
                }
            } catch (error) {
                const errorMsg = error?.response?.data?.msg;
                toast.error(errorMsg);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <header className="p-5 flex justify-between items-center bg-white mt-6 mx-3">
                <div className="hidden md:flex shrink-0 items-center">
                    <img alt="Paylow Logo" src="/images/logo.svg" className="h-14 w-auto" />
                </div>
                <div>
                    <h4 onClick={handleBack} className="font-plus-jakarta font-normal text-lg text-[#000000] cursor-pointer">
                        360-Degree Views
                    </h4>
                </div>
                <div>
                    <button onClick={handleCancel} className="text-blue-700 cursor-pointer">
                        Cancel
                    </button>
                </div>
            </header>

            {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => {
                    const productId = item._id;
                    const selectedImage = selectedImages[productId];
                    const otherImages = otherImagesMap[productId] || [];

                    return (
                        <main
                            key={productId}
                            className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] bg-white mt-5 lg:gap-12"
                        >
                            <div className="flex flex-col lg:flex-row justify-center lg:justify-start mx-3">
                                <motion.img
                                    className="w-[100%] h-[90%]"
                                    src={selectedImage || '/images/default-image.png'}
                                    alt="Selected product"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <div className="flex pl-8 lg:pl-12 lg:gap-2 lg:flex-col lg:mt-8 lg:justify-center lg:rounded-[56px]">
                                    {otherImages.map((image, index) => (
                                        <div className="mt-4" key={index}>
                                            <motion.img
                                                className="w-[70%] h-[90%]"
                                                src={image || '/images/full-preview-small.png'}
                                                alt="small"
                                                onClick={() => handleImageClick(productId, image)}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <article className="lg:mt-12 mx-2">
                                <div className="flex justify-center">
                            <motion.img
                                    className="hidden lg:block w-[40%] h-[30%]"
                                    src={selectedImage || '/images/default-image.png'}
                                    alt="Selected product"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />

                                </div>
                                <div className="flex justify-between">
                                    <h4 className="font-plus-jakarta font-semibold text-lg">
                                        {item.product?.name}
                                    </h4>
                                    <p className="font-medium text-lg font-poppins">
                                        {item.product?.price.$numberDecimal}
                                        <span className="ml-3 font-medium text-lg font-poppins text-red-500 line-through">
                                            {item.product?.price.$numberDecimal}
                                        </span>
                                    </p>
                                </div>
                                <p className="text-[16px] font-plus-jakarta font-normal mt-5">
                                    {item.product?.description}
                                </p>
                                <div className="flex mt-5 gap-3 items-center">
                                    <h5>Color:</h5>
                                    <select
                                        name="color"
                                        id={`color-${productId}`}
                                        onChange={(e) => handleColorChange(productId, e.target.value)}
                                        value={selectedColors?.[productId] || ''}
                                        className="border border-gray-300 shadow-md rounded-md px-2 py-1"
                                    >
                                        <option value="">Select a color</option>
                                        {item.product?.color?.map((color, index) => (
                                            <option key={index} value={color}>
                                                {color}
                                            </option>
                                        ))}
                                    </select>
                                    <p
                                        className="w-12 h-12 rounded-[50%]"
                                        style={{
                                            backgroundColor: tinycolor(selectedColors[productId]).isValid()
                                                ? tinycolor(selectedColors[productId]).toHexString()
                                                : colorHexMap[selectedColors[productId]] || colorHexMap.default,
                                        }}
                                    ></p>
                                </div>
                            </article>
                        </main>
                    );
                })
            ) : (
                <div>No product....</div>
            )}
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full my-4 flex justify-center">
                    <motion.button
                        onClick={handleCheckout}
                        className="w-[50%] lg:w-[20%] font-plus-jakarta text-white bg-blue-700 py-3 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        Buy Now
                    </motion.button>
                </div>
            ) : (
                <div></div>
            )}

            <Toaster />
        </motion.div>
    );
};

export default DegreeView;
