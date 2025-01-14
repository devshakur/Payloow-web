// import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { useState } from 'react'

// const AddServiceModal = ({isOpen, setIsOpen}) => {
  

//   return (
//     <>
//       <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
//         {/* The backdrop, rendered as a fixed sibling to the panel container */}
//         <DialogBackdrop className="fixed inset-0 bg-black/30" />

//         {/* Full-screen container to center the panel */}
//         <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//           {/* The actual dialog panel  */}
//           <DialogPanel className='w-full max-w-xl space-y-6 bg-white p-6 rounded-lg'>
//             <DialogTitle className="font-medium text-lg font-plus-jakarta">Add Service Center</DialogTitle>
//             <Description>
//             <form action="" className='flex flex-col gap-4'>
//                                 <div className="w-full">
//                                     <label htmlFor="name" className='font-medium text-[14px] font-poppins'>Full Name</label>
//                                     <input
//                                         name='name'
//                                         type="text"
//                                         placeholder='Your Name'
//                                         className='w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
//                                     />               
//                                 </div>
//                                 <div className="w-full">
//                                     <label htmlFor="address" className='font-medium text-[14px] font-poppins'>Address</label>
//                                     <input
//                                         name='address'
//                                         type="text"
//                                         placeholder='Your Address'
//                                         className='w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
//                                     />               
//                                 </div>
//                                 <div className="w-full">
//                                     <label htmlFor="name" className='font-medium text-[14px] font-poppins'>Phone Number</label>
//                                     <input
//                                         name='number'
//                                         type='phone'
//                                         placeholder='Phone Number'
//                                         className='w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
//                                     />               
//                                 </div>
//                                 <div className="w-full">
//                                     <label htmlFor="name" className='font-medium text-[14px] font-poppins'>Email Address</label>
//                                     <input
//                                         name='email'
//                                         type="email"
//                                         placeholder='Email'
//                                         className='w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
//                                     />               
//                                 </div>
//                                 </form>
//             </Description>
//             <div className="w-full lg:flex gap-2">
//               <button onClick={() => setIsOpen(false)} className='w-full border p-3 rounded-lg border-blue-700 text-blue-700'>Cancel</button>
//               <button  className='w-full bg-blue-700 text-white rounded-lg'>Create Center</button>
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>
//     </>
//   )
// }
// export default AddServiceModal

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
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl space-y-6 bg-white p-6 rounded-lg">
            <DialogTitle className="font-medium text-lg font-plus-jakarta">Add Service Center</DialogTitle>
            <Description>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="w-full">
                  <label htmlFor="name" className="font-medium text-[14px] font-poppins">
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="address" className="font-medium text-[14px] font-poppins">
                    Address
                  </label>
                  <input
                    name="address"
                    type="text"
                    placeholder="Your Address"
                    className="w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phoneNumber" className="font-medium text-[14px] font-poppins">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="font-medium text-[14px] font-poppins">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="latitude" className="font-medium text-[14px] font-poppins">
                    Latitude
                  </label>
                  <input
                    name="latitude"
                    type="text"
                    placeholder="Latitude"
                    className="w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal"
                    value={formData.location.latitude}
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="longitude" className="font-medium text-[14px] font-poppins">
                    Longitude
                  </label>
                  <input
                    name="longitude"
                    type="text"
                    placeholder="Longitude"
                    className="w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal"
                    value={formData.location.longitude}
                    readOnly
                  />
                </div>
                <button
                  type="button"
                  onClick={getLocation}
                  className="w-full bg-gray-200 text-black py-2 rounded-lg"
                >
                  Get My Location
                </button>
                <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg mt-4">
                  Create Center
                </button>
              </form>
            </Description>
            <div className="w-full lg:flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full border p-3 rounded-lg border-blue-700 text-blue-700"
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
