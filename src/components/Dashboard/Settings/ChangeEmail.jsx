import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { endpoints } from '../../../api/Endpoint';
import { Toaster } from 'react-hot-toast';

const ChangeEmail = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    newEmail: "",
    confirmEmail: "",
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

    if (formData.newEmail !== formData.confirmEmail) {
      toast.error('New email and confirm email do not match.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      email: formData.newEmail,
    };

    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.auth;
      if (!token) {
        toast.error('No token found. Please log in again.');
        return;
      }

      const response = await axios.patch(endpoints.changeEmail, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        toast.success('Email changed successfully');
        setIsOpen(true);
        setFormData({
          newEmail: "",
          confirmEmail: "",
        });
        getUser();
      } else {
        toast.error('Failed to change email. Please try again.');
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
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Toaster />
      <div>
        <h3 className="md:text-2xl text-xl mb-10">Change Email</h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col space-y-2">
            <label htmlFor="current-email" className="form-label">
              Current Email
            </label>
            <input
              type="email"
              id="current-email"
              name="current-email"
              className="form-input"
              disabled
              value={currentUser?.email}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="new-email" className="form-label">
              New Email
            </label>
            <input
              type="email"
              id="new-email"
              placeholder="ade@email.com"
              name="newEmail"
              className="form-input"
              value={formData.newEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="confirm-email" className="form-label">
              Confirm Email
            </label>
            <input
              type="email"
              id="confirm-email"
              placeholder="ade@email.com"
              name="confirmEmail"
              className="form-input"
              value={formData.confirmEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:py-4 py-3 rounded-lg md:text-base text-sm bg-primary text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? `Submitting...` : 'Submit'}
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
                  Email Changed Successfully
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

export default ChangeEmail;