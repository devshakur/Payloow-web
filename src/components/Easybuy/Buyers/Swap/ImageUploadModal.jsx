import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';


const ImageUploadModal = ({ isOpen, setIsOpen, setActive, handleUploadSuccess }) => {
  // States for the selected files
  const [deviceBoxFile, setDeviceBoxFile] = useState(null);
  const [paymentReceiptFile, setPaymentReceiptFile] = useState(null);
  const [deviceFrontViewFile, setDeviceFrontViewFile] = useState(null);
  const [deviceBackViewFile, setDeviceBackViewFile] = useState(null);
  const [error, setError] = useState('');

  // Handle closing the modal
  const handleClose = () => {
    setIsOpen(false);
    setError('');
  };

  // Handle image upload logic here
  const handleImageUpload = (file, type) => {
    if (file) {
      switch (type) {
        case 'deviceBox':
          setDeviceBoxFile(file);
          break;
        case 'paymentReceipt':
          setPaymentReceiptFile(file);
          break;
        case 'deviceFrontView':
          setDeviceFrontViewFile(file);
          break;
        case 'deviceBackView':
          setDeviceBackViewFile(file);
          break;
        default:
          break;
      }
    }
  };

  // Use react-dropzone hook for each file input
  const { getRootProps: getDeviceBoxProps, getInputProps: getDeviceBoxInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], 'deviceBox'),
    accept: '*/*',
    multiple: false,
  });

  const { getRootProps: getPaymentReceiptProps, getInputProps: getPaymentReceiptInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], 'paymentReceipt'),
    accept: '*/*',
    multiple: false,
  });

  const { getRootProps: getDeviceFrontViewProps, getInputProps: getDeviceFrontViewInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], 'deviceFrontView'),
    accept: '*/*',
    multiple: false,
  });

  const { getRootProps: getDeviceBackViewProps, getInputProps: getDeviceBackViewInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], 'deviceBackView'),
    accept: '*/*',
    multiple: false,
  });

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
        <DialogPanel className="md:w-[40rem] space-y-2 bg-white p-8 rounded-lg">
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
          <div className="flex flex-col gap-1">
            {/* First input: Device Box */}
            <label htmlFor="device-box" className='font-medium font-poppins text-lg -mb-1'>Device Box</label>
            <div
              {...getDeviceBoxProps()}
              className="w-full border-2 border-blue-600 bg-[#C0D5FD] border-dashed p-5 rounded-md text-center"
            >
              <input {...getDeviceBoxInputProps()} />
              <p className="text-gray-500">Drop files to Upload....</p>
            </div>
            {renderFile(deviceBoxFile)}

            {/* Second input: Device Payment Receipt */}
            <label htmlFor="payment-receipt" className='font-medium font-poppins text-lg -mb-1'>Device Payment Receipt</label>
            <div
              {...getPaymentReceiptProps()}
              className="w-full border-2 border-blue-600 bg-[#C0D5FD] border-dashed p-5 rounded-md text-center"
            >
              <input {...getPaymentReceiptInputProps()} />
              <p className="text-gray-500">Drop files to Upload....</p>
            </div>
            {renderFile(paymentReceiptFile)}

            {/* Third input: Device Front View */}
            <label htmlFor="device-front-view" className='font-medium font-poppins text-lg -mb-1'>Device Front View</label>
            <div
              {...getDeviceFrontViewProps()}
              className="w-full border-2 border-blue-600 bg-[#C0D5FD] border-dashed p-5 rounded-md text-center"
            >
              <input {...getDeviceFrontViewInputProps()} />
              <p className="text-gray-500">Drop files to Upload....</p>
            </div>
            {renderFile(deviceFrontViewFile)}

            {/* Fourth input: Device Back View */}
            <label htmlFor="device-back-view" className='font-medium font-poppins text-lg -mb-1'>Device Back View</label>
            <div
              {...getDeviceBackViewProps()}
              className="w-full border-2 border-blue-600 bg-[#C0D5FD] border-dashed p-5 rounded-md text-center"
            >
              <input {...getDeviceBackViewInputProps()} />
              <p className="text-gray-500">Drop files to Upload....</p>
            </div>
            {renderFile(deviceBackViewFile)}
          </div>

          <div className="flex gap-4 mt-4 justify-end">
            <button onClick={handleClose} className="px-4 py-2 bg-gray-300 rounded-md">
              Cancel
            </button>
            <button
              onClick={() => {
                setActive('two');
                handleUploadSuccess(); // Call handleUploadSuccess when the user uploads
                handleClose(); // Close the modal after upload
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Upload
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ImageUploadModal;






