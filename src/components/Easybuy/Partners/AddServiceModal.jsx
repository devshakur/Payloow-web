import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import useInvestment from '../../../hooks/useInvetment';

const AddServiceModal = ({ isOpen, setIsOpen }) => {
  const { CreateServiceCenter } = useInvestment();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    location: {
      latitude: '',
      longitude: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'latitude' || name === 'longitude') {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            location: {
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            },
          }));
        },
        (error) => {
          console.error('Error fetching location:', error.message);
          toast.error('Unable to fetch location. Please allow location access.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  const createServiceCenter = async () => {
    try {
      const resp = await CreateServiceCenter(formData);
      const message = resp?.data?.data
      if (resp) {
        toast.success('Service Center Created Successfully');
      } else {
        toast.success('Service Center Created Successfully');
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.msg;
      if (errorMsg) {
        toast.error(errorMsg);
      } else {
        toast.error('Failed to upload Service Center details');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    createServiceCenter();
    setIsOpen(false); // Close the modal after submission
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-auto"> {/* Center and allow scrolling */}
          <DialogPanel className="w-full max-w-md md:max-w-lg lg:max-w-xl space-y-4 bg-white p-6 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"> {/* Limit height and enable scrolling */}
            <DialogTitle className="text-2xl font-semibold text-gray-900">Add Service Center</DialogTitle>
            <Description>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="w-full">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 outline-none"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    name="address"
                    type="text"
                    placeholder="Your Address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 outline-none"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 outline-none"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 outline-none"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    name="latitude"
                    type="text"
                    placeholder="Latitude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 outline-none"
                    value={formData.location.latitude}
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    name="longitude"
                    type="text"
                    placeholder="Longitude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-3 outline-none"
                    value={formData.location.longitude}
                    readOnly
                  />
                </div>
                <button
                  type="button"
                  onClick={getLocation}
                  className="w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300"
                >
                  Get My Location
                </button>
                <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors">
                  Create Center
                </button>
              </form>
            </Description>
            <div className="w-full flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full border p-3 rounded-lg border-blue-700 text-blue-700 hover:bg-blue-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default AddServiceModal;
