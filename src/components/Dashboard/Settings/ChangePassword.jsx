import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { endpoints } from '../../../api/Endpoint';

const ChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });

  const close = () => {
    setIsOpen(false);
  };

  const getUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('auth')).auth;
      // console.log(token);
      const response = await axios.get(endpoints.getCurrentUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response);
      localStorage.setItem('currentUser', JSON.stringify(response.data.data));

    } catch (error) {
      toast.error('An error occured while fetching user data')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPin !== formData.confirmPin) {
      toast.error('New pin and confirm pin do not match.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      currentPin: formData.currentPin,
      newPin: formData.newPin,
    };

    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.auth;
      if (!token) {
        toast.error('No token found. Please log in again.');
        return;
      }

      const response = await axios.patch(endpoints.changePassword, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        toast.success('Pin changed successfully');
        setIsOpen(true);
        getUser();
        // Clear form data
        setFormData({
          currentPin: "",
          newPin: "",
          confirmPin: "",
        });
      } else {
        toast.error('Failed to change pin. Please try again.');
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <h3 className="md:text-2xl text-xl mb-10">Change Pin</h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col space-y-2">
            <label htmlFor="current-pin" className="form-label">
              Current Pin
            </label>
            <input
              type="password"
              id="current-pin"
              placeholder="****"
              name="currentPin"
              className="form-input"
              maxLength={4}
              pattern='[0-9]{4}'
              value={formData.currentPin}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="new-pin" className="form-label">
              New Pin
            </label>
            <input
              type="password"
              id="new-pin"
              placeholder="****"
              name="newPin"
               maxLength={4}
              pattern='[0-9]{4}'
              className="form-input"
              value={formData.newPin}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirm-pin" className="form-label">
              Confirm Pin
            </label>
            <input
              type="password"
              id="confirm-pin"
              placeholder="****"
              name="confirmPin"
               maxLength={4}
              pattern='[0-9]{4}'
              className="form-input"
              value={formData.confirmPin}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Changing Pin...' : 'Change Pin'}
          </button>
        </form>
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              className="w-full max-w-2xl rounded-xl bg-white py-20 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex items-center justify-end text-primary">
                {/* Add close button if needed */}
              </div>
              <div className="text-center">
                <img src="/images/success-svg.svg" alt="success" className="mx-auto py-5" />
                <h3 className="md:text-3xl text-xl mt-4 md:px-20 px-3">
                  Pin Changed Successfully
                </h3>
              </div>
              <div className="mt-10 flex items-center justify-end">
                <Button
                  className="bg-primary border border-primary py-3 rounded-md text-white w-full md:mx-20 mx-5"
                  onClick={close}
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ChangePassword;