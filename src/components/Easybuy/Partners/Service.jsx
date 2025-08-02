import React, { useState, useEffect } from 'react';
import PartnersLayout from './PartnersLayout';
import { BiMenuAltRight, BiEdit } from "react-icons/bi";
import { MdAddLocation } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { motion } from 'framer-motion';
import useInvestment from '../../../hooks/useInvetment';
import { toast, Toaster } from 'react-hot-toast';

const Service = () => {
  const { GetServiceCenter } = useInvestment();
  const [center, setCenter] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const fetchServiceCenter = async () => {
      try {
        const resp = await GetServiceCenter();
        const message = resp?.data?.message;
        const productsData = resp?.data?.data[0];
        if (productsData) {
          setCenter(productsData);
          setFormData(productsData);
          updateMapUrl(productsData.address);
          toast.success(message);
        } else {
          toast.success('No Center Info');
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Failed to fetch center info');
      }
    };
    fetchServiceCenter();
  }, []);

  const updateMapUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    // const url = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
    const url = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    setMapUrl(url);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setCenter(formData);
    updateMapUrl(formData.address);
    setEditMode(false);
    toast.success('Information updated');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PartnersLayout>
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-poppins font-medium text-[24px] text-[#1D2433]">Service Centers</h3>
        <span><BiMenuAltRight className="w-6 h-6" /></span>
      </motion.div>

      <motion.div
        className="md:grid md:grid-cols-2 md:gap-3 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-[#DBE7FE] h-[29vh] rounded-lg p-4">
          <motion.div
            key={center._id}
            className="flex justify-between items-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {editMode ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="text-xl bg-white border rounded p-2 w-full"
              />
            ) : (
              <h4 className="text-xl">{center.address} Regional</h4>
            )}
            <span
              className="flex items-center gap-2 text-blue-500 cursor-pointer"
              onClick={editMode ? handleSave : handleEditClick}
            >
              <BiEdit /> {editMode ? 'Save' : 'Edit'}
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 p-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-blue-500"><MdAddLocation /></span>
            {editMode ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-white border rounded p-2 w-full"
              />
            ) : (
              <p className="font-normal font-poppins text-[16px]">{center.address}</p>
            )}
          </motion.div>

          <motion.div
            className="flex items-center gap-2 p-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="text-blue-500"><FaPhone /></span>
            {editMode ? (
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="bg-white border rounded p-2 w-full"
              />
            ) : (
              <p className="font-normal font-poppins text-[16px]">{center.phoneNumber}</p>
            )}
          </motion.div>

          <motion.div
            className="flex items-center gap-2 p-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="text-blue-500"><MdOutlineMail /></span>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white border rounded p-2 w-full"
              />
            ) : (
              <p className="font-normal font-poppins text-[16px]">{center.email}</p>
            )}
          </motion.div>
        </div>

        <motion.div
          className="w-full mt-6 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <iframe
            src={mapUrl}
            // src="/images/map.jpg"
            title="Service Center Map"
            className="w-full h-[59vh] rounded shadow-md"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </motion.div>
      </motion.div>
      <Toaster />
    </PartnersLayout>
  );
};

export default Service;
