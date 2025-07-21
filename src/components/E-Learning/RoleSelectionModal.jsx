import React from 'react';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { CloseCircle } from 'iconsax-react';

import { motion } from 'framer-motion';

const RoleSelectionModal = ({ handleTutor, handleStudent }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Dialog open={true} onClose={() => {}} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl lg:w-[30vw] space-y-6 border bg-white p-12 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
              <DialogTitle className="font-bold font-plus-jakarta text-lg text-[#1D2433]">
                Register as?
              </DialogTitle>
              <CloseCircle size="28" color="black" />
            </div>

            <form>
           <input
  type="text"
  value="Tutor"
  readOnly
  onClick={handleTutor}
  className="mt-4 block w-full rounded-xl bg-[#F1F3F9] py-5 px-4 text-xl font-bold cursor-pointer hover:bg-[#e3e7f0] focus:outline focus:outline-2 focus:outline-[#3369F4] transition"
/>
              <input
                type="text"
                value="Student"
                readOnly
                onClick={handleStudent}
                className="mt-4 block w-full rounded-xl bg-[#F1F3F9] py-5 px-4 text-xl font-bold cursor-pointer hover:bg-[#e3e7f0] focus:outline focus:outline-2 focus:outline-[#3369F4] transition"
              />

              <div className="w-full flex lg:justify-end">
                <button
                  type="submit"
                  className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-4 px-4 text-md text-white mt-6 hover:bg-sky-500 active:bg-sky-700 disabled:bg-gray-500"
                >
                  Next
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </motion.div>
  );
};

export default RoleSelectionModal;
