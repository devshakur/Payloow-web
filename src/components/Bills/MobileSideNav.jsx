


// import React from 'react'
// import { useLocation } from "react-router-dom";
// import { MoneyChange, TableDocument, BookSaved, Chart, Home, Headphone, Setting2, LogoutCurve, CloseCircle } from "iconsax-react";
// const currentUser = JSON.parse(localStorage.getItem("currentUser"));



// const navigation = [
//   { name: "Dashboard", href: "/dashboard", icon: Home },
//   { name: "Easybuy", 
//    href: currentUser?.role === 'Buyer'  ? "/buyers/dashboard"  : currentUser?.role === 'Partner' ? "/partners/dashboard" : "/easybuy/home", 
//   icon: MoneyChange
// },

//   { name: "Bills", href: "/dashboard", icon: TableDocument },

//   //this is the route to E-learning, Investment, and shares. this code will reinstated when needed
//  {
//     name: "E-Learning",
//     href: currentUser?.role === 'Tutor' ? "/e-learning/tutor/dashboard" : "/e-learning/student/dashboard",
//     icon: BookSaved,
//   },
//   {
//     name: "Investment", 
//     href: currentUser?.role === 'Debtor' ? "/debtor/dashboard" : currentUser?.role === 'Investor' ? "/investor/dashboard" : '/investment',
//     icon: Chart
//   },
//   // { name: "Shares", href: "/shares/dashboard", icon: RiStockLine },
// ];
// const action = [
//   { name: "Support", href: "/support", icon: Headphone },
//   { name: "Settings ", href: "/settings", icon: Setting2 },
//   { name: "Logout", href: "/", icon: LogoutCurve, onclick: () => localStorage.clear() },
// ];
// const userNavigation = [
//   { name: "Your profile", href: "/settings" },
//   { name: "Sign out", href: "/" },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
// const closeNav = () => {

// }
// const MobileSideNav = ({ onClose }) => {
//   const location = useLocation();
//   const isActive = (href) => location.pathname === href;

//   return (
//     <div className='w-[80%] h-[100vh] fixed z-40 top-0 left-0 overflow-y-auto flex'>
//       <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
//         <div className="flex shrink-0 items-center mt-8">
//           <img alt="Paylow Logo" src="/images/logo.svg" className="h-14 w-auto" />
//         </div>
//           <nav className="flex flex-1 flex-col">
//               <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                 <li>
//                   <ul role="list" className="-mx-2 space-y-3">
//                    {navigation.map((item) => (
//   <li key={item.name}>
//     <a
//       href={item.href}
//       className={classNames(
//         item.name === "Bills"
//           ? "bg-primary text-white" // Always highlighted
//           : isActive(item.href)
//           ? "bg-primary text-white"
//           : "hover:bg-primary hover:text-white",
//         "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
//       )}
//     >
//       <item.icon
//         aria-hidden="true"
//         className={classNames(
//           item.name === "Bills"
//             ? "text-white"
//             : isActive(item.href)
//             ? "text-white"
//             : "group-hover:text-white",
//           "h-6 w-6 shrink-0"
//         )}
//       />
//       {item.name}
//     </a>
//   </li>
// ))}

//                   </ul>
//                 </li>
//                 <li className="mt-auto">
//                   <ul role="list" className="-mx-2 space-y-1">
//                     {action.map((item) => (
//                       <li key={item.name}>
//                         <a
//                           href={item.href}
//                           className={classNames(
//                             isActive(item.href)
//                               ? "bg-primary text-white"
//                               : "hover:bg-primary hover:text-white",
//                             "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
//                           )}
//                           onClick={item.onclick}
//                         >
//                           <item.icon
//                             aria-hidden="true"
//                             className={classNames(
//                               isActive(item.href)
//                                 ? "text-white"
//                                 : "group-hover:text-white",
//                               "h-6 w-6 shrink-0"
//                             )}
//                           />
//                           {item.name}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               </ul>
//             </nav>
//       </div>
//       <div className='ml-3'>
//         <button onClick={onClose} className='mb-4 relative top-[-48vh] right-[38%] z-100 h-full bg-red'>
//          <CloseCircle
//                       aria-hidden="true"
//                       className="h-6 w-6 text-black"
//                     />
//         </button>

//       </div>
//     </div>
//   )
// }

// export default MobileSideNav

import React from "react";
import { useLocation } from "react-router-dom";
import {
  MoneyChange,
  TableDocument,
  BookSaved,
  Chart,
  Home,
  Headphone,
  Setting2,
  LogoutCurve,
  CloseCircle,
} from "iconsax-react";
import { motion, AnimatePresence } from "framer-motion";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  {
    name: "Easybuy",
    href:
      currentUser?.role === "Buyer"
        ? "/buyers/dashboard"
        : currentUser?.role === "Partner"
        ? "/partners/dashboard"
        : "/easybuy/home",
    icon: MoneyChange,
  },
  { name: "Bills", href: "/dashboard", icon: TableDocument },
  {
    name: "E-Learning",
    href:
      currentUser?.role === "Tutor"
        ? "/e-learning/tutor/dashboard"
        : "/e-learning/student/dashboard",
    icon: BookSaved,
  },
  {
    name: "Investment",
    href:
      currentUser?.role === "Debtor"
        ? "/debtor/dashboard"
        : currentUser?.role === "Investor"
        ? "/investor/dashboard"
        : "/investment",
    icon: Chart,
  },
];

const action = [
  { name: "Support", href: "/support", icon: Headphone },
  { name: "Settings ", href: "/settings", icon: Setting2 },
  {
    name: "Logout",
    href: "/",
    icon: LogoutCurve,
    onclick: () => localStorage.clear(),
  },
];

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const MobileSideNav = ({ onClose }) => {
  const location = useLocation();
  const isActive = (href) => location.pathname === href;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black bg-opacity-40 flex"
      >
        {/* Container for sidebar and floating close button */}
        <div className="relative w-[80%] h-full z-50">
          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full h-full bg-white flex flex-col px-6 pb-4 pt-8 overflow-y-auto relative"
          >
            {/* Logo */}
            <div className="flex items-center">
              <img alt="Paylow Logo" src="/images/logo.svg" className="h-14 w-auto" />
            </div>

            {/* Navigation */}
            <nav className="flex flex-col flex-1 mt-6">
              <ul className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-3">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.name === "Bills"
                              ? "bg-primary text-white"
                              : isActive(item.href)
                              ? "bg-primary text-white"
                              : "hover:bg-primary hover:text-white",
                            "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.name === "Bills"
                                ? "text-white"
                                : isActive(item.href)
                                ? "text-white"
                                : "group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* Footer Actions */}
                <li className="mt-auto">
                  <ul className="-mx-2 space-y-1">
                    {action.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            isActive(item.href)
                              ? "bg-primary text-white"
                              : "hover:bg-primary hover:text-white",
                            "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
                          )}
                          onClick={item.onclick}
                        >
                          <item.icon
                            className={classNames(
                              isActive(item.href)
                                ? "text-white"
                                : "group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </motion.div>

          {/* Floating Close Button – positioned OUTSIDE sidebar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 -right-11 rounded-full shadow-md z-50 p-2"
          >
            <CloseCircle
              aria-hidden="true"
              className="h-6 w-6 text-white hover:text-red-500 transition"
            />
          </button>
        </div>

        {/* Clicking on the backdrop closes the sidebar */}
        <div className="flex-grow" onClick={onClose}></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileSideNav;
