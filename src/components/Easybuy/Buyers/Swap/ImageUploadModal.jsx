import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

const ImageUploadModal = ({ isOpen, setIsOpen, setActive, handleUploadSuccess, formik, onSubmit, submiting, setSubmiting }) => {
  // States for the selected files
  const [error, setError] = useState('');
  
 

  // Handle closing the modal
  const handleClose = () => {
    setIsOpen(false);
    setError('');
  };

  // Handle image upload logic here
  const handleImageUpload = (file, type) => {
    if (file) {
      formik.setFieldValue(type, file);
    }
  };

  // Use react-dropzone hook for each file input
  const { getRootProps: getDeviceBoxProps, getInputProps: getDeviceBoxInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], 'box'),
    accept: '*/*',
    multiple: false,
  });

  const { getRootProps: getPaymentReceiptProps, getInputProps: getPaymentReceiptInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], 'receipt'),
    accept: '*/*',
    multiple: false,
  });

  const { getRootProps: getDeviceFrontViewProps, getInputProps: getDeviceFrontViewInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], 'front'),
    accept: '*/*',
    multiple: false,
  });

  const { getRootProps: getDeviceBackViewProps, getInputProps: getDeviceBackViewInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], 'back'),
    accept: '*/*',
    multiple: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit(); // Trigger Formik's submit
    // setActive('two');
    handleUploadSuccess(); // Call handleUploadSuccess when the user uploads
    setSubmiting(false)
  };

  const renderFile = (file) => {
    if (file) {
      return (
        <div className="mt-2">
          <p className="text-gray-600">{file.name}</p>
        </div>
      );
    }
    return <p>No file selected</p>;
  };



  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-[100%] md:w-[40rem] space-y-2 bg-white py-3 px-8 rounded-lg">
          <DialogTitle className="font-bold text-xl flex justify-between">
            <p>Upload Device Pictures</p>
            <span
              onClick={handleClose}
              className="cursor-pointer text-xl text-gray-600"
            >
              X
            </span>
          </DialogTitle>

          {/* 4-Column Layout for Dropzone */}
          <form onSubmit={handleSubmit} action="">
          <div className="flex flex-col gap-1">
            {/* First input: Device Box */}
            <label htmlFor="box" className="font-medium font-poppins text-lg -mb-1">Device Box</label>
            <div
              {...getDeviceBoxProps()}
              className="w-full border-2 border-blue-600 bg-[#C0D5FD] border-dashed p-5 rounded-md text-center"
            >
              <input {...getDeviceBoxInputProps()} />
              <p className="text-gray-500">Drop files to Upload....</p>
            </div>
            {renderFile(formik.values.box)}
            {formik.touched.box && formik.errors.box && (
              <div className="text-red-500">{formik.errors.box}</div>
            )}

            {/* Second input: Device Payment Receipt */}
            <label htmlFor="receipt" className="font-medium font-poppins text-lg -mb-1">Device Payment Receipt</label>
            <div
              {...getPaymentReceiptProps()}
              className="w-full border-2 border-blue-600 bg-[#C0D5FD] border-dashed p-5 rounded-md text-center"
            >
              <input {...getPaymentReceiptInputProps()} />
              <p className="text-gray-500">Drop files to Upload....</p>
            </div>
            {renderFile(formik.values.receipt)}
            {formik.touched.receipt && formik.errors.receipt && (
              <div className="text-red-500">{formik.errors.receipt}</div>
            )}

            {/* Third input: Device Front View */}
            <label htmlFor="front" className="font-medium font-poppins text-lg -mb-1">Device Front View</label>
            <div
              {...getDeviceFrontViewProps()}
              className="w-full border-2 border-blue-600 bg-[#C0D5FD] border-dashed p-5 rounded-md text-center"
            >
              <input {...getDeviceFrontViewInputProps()} />
              <p className="text-gray-500">Drop files to Upload....</p>
            </div>
            {renderFile(formik.values.front)}
            {formik.touched.front && formik.errors.front && (
              <div className="text-red-500">{formik.errors.front}</div>
            )}

            {/* Fourth input: Device Back View */}
            <label htmlFor="back" className="font-medium font-poppins text-lg -mb-1">Device Back View</label>
            <div
              {...getDeviceBackViewProps()}
              className="w-full border-2 border-blue-600 bg-[#C0D5FD] border-dashed p-5 rounded-md text-center"
            >
              <input {...getDeviceBackViewInputProps()} />
              <p className="text-gray-500">Drop files to Upload....</p>
            </div>
            {renderFile(formik.values.back)}
            {formik.touched.back && formik.errors.back && (
              <div className="text-red-500">{formik.errors.back}</div>
            )}
          </div>
          <div className="flex gap-4 mt-4 justify-end">
            <button onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded-md">
              Cancel
            </button>
            <button
            type='submit'
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {submiting ? 'Submiting...' : 'Upload'}
            </button>
          </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ImageUploadModal;
