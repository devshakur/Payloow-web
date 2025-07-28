// import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
// import { CloseCircle } from 'iconsax-react';
// import { motion } from 'framer-motion';
// import clsx from 'clsx';
// import { Button, Field, Input } from '@/components/ui'; // adjust this path to match your UI library

// const RegisterModal = () => {
//   const handleTutor = () => {
//     // your logic for tutor
//   };

//   const handleStudent = () => {
//     // your logic for student
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // your submit logic
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Dialog open={true} onClose={() => {}} className="relative z-50">
//         <DialogBackdrop className="fixed inset-0 bg-black/30" />
//         <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//           <DialogPanel static className="max-w-xl lg:w-[30vw] space-y-6 border bg-white p-12 rounded-lg">
//             <div className="flex justify-between items-start gap-x-[10rem]">
//               <DialogTitle className="-mt-7 -ml-7 font-bold font-plus-jakarta text-[16px] md:text-md lg:text-lg text-[#1D2433]">
//                 Register as?
//               </DialogTitle>
//               <div className="-mt-7">
//                 <CloseCircle size="30" color="black" />
//               </div>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <Field>
//                 <Input
//                   defaultValue="Tutor"
//                   readOnly
//                   onClick={handleTutor}
//                   className={clsx(
//                     'focus mt-3 block w-full rounded-lg bg-[#F1F3F9] py-6 mb-8 px-5 text-xl font-bold cursor-pointer focus:outline-none'
//                   )}
//                 />
//                 <Input
//                   defaultValue="Student"
//                   readOnly
//                   onClick={handleStudent}
//                   className={clsx(
//                     'focus mt-3 block w-full rounded-lg bg-[#F1F3F9] py-6 px-5 text-xl font-bold cursor-pointer focus:outline-none'
//                   )}
//                 />
//               </Field>

//               <div className="w-full flex lg:justify-end">
//                 <Button
//                   autoFocus
//                   type="submit"
//                   className="w-full lg:w-[200px] rounded-lg bg-[#3369F4] py-4 px-4 text-md text-white mt-6 data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
//                 >
//                   Next
//                 </Button>
//               </div>
//             </form>
//           </DialogPanel>
//         </div>
//       </Dialog>
//     </motion.div>
//   );
// };

// export default RegisterModal;
