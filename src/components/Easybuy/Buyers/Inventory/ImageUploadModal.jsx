import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploadModal({ isOpened, closes, closeModal, formik, }) {
  const [fullDevice, setFullDevice] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  const handleImageUpload = (files, type) => {
    if (files) {
      switch (type) {
        case 'full':
          setFullDevice(files[0]);
          formik.setFieldValue('image', files[0]); // Update Formik state
          break;
        case 'others':
          setOtherImages(files.slice(0, 3)); // Limit to 3 files
          formik.setFieldValue('additionalImages', files.slice(0, 3)); // Update Formik state
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formik.handleSubmit(); // Trigger Formik's submit
  };

  const {
    getRootProps: getDeviceBoxProps,
    getInputProps: getDeviceBoxInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles, 'full'),
    accept: 'image/*',
    multiple: false,
  });

  const {
    getRootProps: getOtherImagesBoxProps,
    getInputProps: getOtherImagesBoxInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles, 'others'),
    accept: 'image/*',
    multiple: true,
  });

  return (
    <>
      <Dialog
        open={isOpened}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closes}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              className="w-full max-w-md  rounded-xl bg-white shadow-lg p-6"
            >
              <DialogTitle as="h3" className="text-lg font-medium text-gray-600 flex justify-between">
               <h3> Upload Product Images</h3>
               <div className='flex justify-center items-center  border-2 border-gray-950 w-7 h-7 rounded-[50%]'>
               <h5 onClick={closeModal} className='cursor-pointer p-1'>X</h5>

               </div>
              </DialogTitle>
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  {/* Full Device Image Upload */}
                  <div
                    {...getDeviceBoxProps()}
                    className="border-2 border-dashed border-gray-500 p-4 rounded-md cursor-pointer bg-blue-200"
                  >
                    <input {...getDeviceBoxInputProps()} />
                    <p className="text-gray-500">
                      Drag and drop a full device image, or click to select.
                    </p>
                    {formik.touched.image && formik.errors.image && (
                      <div className="text-red-500">{formik.errors.image}</div>
                    )}
                    {fullDevice && (
                      <p className="text-sm text-green-600 mt-2">
                        Uploaded: {fullDevice.name}
                      </p>
                    )}
                  </div>

                  {/* Additional Images Upload */}
                  <div
                    {...getOtherImagesBoxProps()}
                    className="border-2 border-dashed border-gray-500 bg-blue-200 p-4 mt-4 rounded-md cursor-pointer"
                  >
                    <input {...getOtherImagesBoxInputProps()} />
                    <p className="text-gray-500">
                      Drag and drop up to 3 additional images, or click to select.
                    </p>
                    {formik.touched.additionalImages &&
                      formik.errors.additionalImages && (
                        <div className="text-red-500">
                          {formik.errors.additionalImages}
                        </div>
                      )}
                    {otherImages.length > 0 && (
                      <ul className="mt-2 text-sm text-green-600">
                        {otherImages.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white focus:outline-none hover:bg-gray-600"
                  >
                    {formik.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  <Button
                    type="button"
                   
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white focus:outline-none hover:bg-gray-600 ml-2"
                    onClick={closes}
                  >
                   Verify
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
