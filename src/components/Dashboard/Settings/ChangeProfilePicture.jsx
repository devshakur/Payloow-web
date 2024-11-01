import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { endpoints } from "../../../api/Endpoint";

const ChangeProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const getUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).auth;
      // console.log(token);
      const response = await axios.get(endpoints.getCurrentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
    } catch (error) {
      toast.error("An error occured while fetching user data");
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.auth;
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        endpoints.changeProfilePicture,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("Profile picture updated successfully");
        setIsOpen(true);
        getUser();
      } else {
        toast.error("Failed to update profile picture. Please try again.");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <h3 className="md:text-2xl text-xl mb-10">Change Profile Picture</h3>
        <div className="flex flex-col md:flex-row items-center md:space-x-10 space-y-5 md:space-y-0">
          <img
            src={
              previewUrl || currentUser?.profilePicture || "/images/user.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex flex-col space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              className="text-white bg-primary px-10 py-4 rounded-lg"
              onClick={triggerFileInput}
              disabled={isUploading}
            >
              Select new photo
            </button>
            {selectedFile && (
              <button
                className="text-white bg-green-600 px-10 py-4 rounded-lg"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload photo"}
              </button>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-2xl rounded-xl bg-white py-20 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="text-center">
                <img
                  src="/images/success-svg.svg"
                  alt="success"
                  className="mx-auto py-5"
                />
                <h3 className="md:text-3xl text-xl mt-4 md:px-20 px-3">
                  Profile Picture Updated Successfully
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

export default ChangeProfilePicture;
