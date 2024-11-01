import React, {useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const BusinessStep4 = () => {
    const { acceptedFiles: files1, getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone();
    const { acceptedFiles: files2, getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone();
    const { acceptedFiles: files3, getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone();

    const renderFiles = (files) => files.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    let [isOpen, setIsOpen] = useState(false)

    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }

    return (
        <div>
            <header className='flex justify-between items-center mx-8 mt-8 border-b-4'>
                <div className="flex shrink-0 items-center">
                    <img
                        alt="Paylow Logo"
                        src="/images/logo.svg"
                        className="h-14 w-auto"
                    />
                </div>
                <div className='mt-2'>
                    <p className='font-poppins font-medium text-2xl text-blue-600'>Exit</p>
                </div>
            </header>
            <main className='bg-blue-50 w-full h-screen'>
                <div className='flex justify-center'>
                    <ul className='flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4'>
                        <li className='font-poppins text-xl font-medium'>Account Information</li>
                        <li className='font-poppins text-xl font-medium'>Online</li>
                        <li className='font-poppins text-xl font-medium text-blue-600'>Business Details</li>
                    </ul>
                </div>
                <section className='flex justify-center'>
                    <div className='bg-white w-full lg:w-1/2 mx-4 p-4 rounded-lg shadow-lg'>
                        <form className='flex flex-col'>
                            <section>
                                <label htmlFor="website" className='mt-4 mb-1 font-semibold text-lg'>Financial Statements</label>
                                <div 
                                    {...getRootProps1({ className: 'border-2 border-dashed border-gray-400 rounded-lg p-8 bg-[#C0D5FD] text-center cursor-pointer hover:border-blue-500 transition mb-6' })}
                                >
                                    <input {...getInputProps1()} className="hidden" />
                                    <p className='text-black text-md font-poppins font-medium'>Drop files here to upload…</p>
                                </div>
                                <aside className='-mt-5'>
                                    <ul className='list-disc pl-5'>{files1.length > 0 ? renderFiles(files1) : <li>No files selected</li>}</ul>
                                </aside>

                                <label htmlFor="website" className='mb-1 font-semibold text-lg'>Growth Plans</label>
                                <div 
                                    {...getRootProps2({ className: 'border-2 border-dashed border-gray-400 rounded-lg p-8 bg-[#C0D5FD] text-center cursor-pointer hover:border-blue-500 transition mb-6' })}
                                >
                                    <input {...getInputProps2()} className="hidden" />
                                    <p className='text-black text-md font-poppins font-medium'>Drop files here to upload…</p>
                                </div>
                                <aside className='-mt-5'>
                                    <ul className='list-disc pl-5'>{files2.length > 0 ? renderFiles(files2) : <li>No files selected</li>}</ul>
                                </aside>

                                <label htmlFor="website" className='mt-4 mb-1 font-semibold text-lg'>Loan Requirements</label>
                                <div 
                                    {...getRootProps3({ className: 'border-2 border-dashed border-gray-400 rounded-lg p-8 bg-[#C0D5FD] text-center cursor-pointer hover:border-blue-500 transition mb-6' })}
                                >
                                    <input {...getInputProps3()} className="hidden" />
                                    <p className='text-black text-md font-poppins font-medium'>Drop files here to upload…</p>
                                </div>
                                <aside className='-mt-5'>
                                    <ul className='list-disc pl-5'>{files3.length > 0 ? renderFiles(files3) : <li>No files selected</li>}</ul>
                                </aside>
                            </section>
                            <div className='flex justify-center'>
                            <button  onClick={open} className='w-[50%] py-3 my-5 bg-blue-600 text-white rounded-lg'>Submit</button>
                            </div>
                        </form>
                        <div>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full items-start mt-[9rem] justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-3xl h-auto rounded-xl  bg-white p-12  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="flex justify-center h-[11rem]">
                <img src="/images/success.png" alt="success" />
              </DialogTitle>
              <p className="mt-2 text-xl text-black font-semibold">
              Congratulations! Your business is now set up and ready to go. Start adding loan details to attract investors and take your business to the next level.
              </p>
              <div className="w-full py-5 mt-4 gap-4 flex justify-center">
               <button className='w-full py-2 rounded-md border border-blue-400 text-blue-600'>Add Loan</button>
               <button onClick={close} className='w-full rounded-md  bg-blue-500 text-white'>Done</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BusinessStep4;
