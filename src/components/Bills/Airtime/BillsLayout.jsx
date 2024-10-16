import { useLocation } from "react-router-dom";
import { MoneyChange, TableDocument, BookSaved, Chart, Home, Headphone, Setting2, LogoutCurve } from "iconsax-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Easybuy", href: "/easybuy", icon: MoneyChange },
  { name: "Bills", href: "/airtime", icon: TableDocument },
  { name: "E-Learning", href: "/e-learning", icon: BookSaved },
  { name: "Investment", href: "/investment", icon: Chart },
];

const action = [
  { name: "Support", href: "/support", icon: Headphone },
  { name: "Settings", href: "/settings", icon: Setting2 },
  { name: "Logout", href: "/", icon: LogoutCurve },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ onClose }) {   
  const location = useLocation();
  const isActive = (href) => location.pathname === href;

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex shrink-0 items-center mt-8">
          <img alt="Paylow Logo" src="/images/logo.svg" className="h-14 w-auto" />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        isActive(item.href)
                          ? "bg-primary text-white"
                          : "hover:bg-primary hover:text-white",
                        "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
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
            <li className="mt-auto">
              <ul role="list" className="-mx-2 space-y-1">
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
                    >
                      <item.icon
                        aria-hidden="true"
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
        {/* Close Sidebar Button */}
        <button className="ml-6 mb-4" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}


// import { useLocation } from "react-router-dom";
// import { MoneyChange, TableDocument, BookSaved, Chart, Home, Headphone, Setting2, LogoutCurve } from "iconsax-react";

// const navigation = [
//   { name: "Dashboard", href: "/dashboard", icon: Home },
//   { name: "Easybuy", href: "/easybuy", icon: MoneyChange },
//   { name: "Bills", href: "/airtime", icon: TableDocument },
//   { name: "E-Learning", href: "/e-learning", icon: BookSaved },
//   { name: "Investment", href: "/investment", icon: Chart },
// ];

// const action = [
//   { name: "Support", href: "/support", icon: Headphone },
//   { name: "Settings", href: "/settings", icon: Setting2 },
//   { name: "Logout", href: "/", icon: LogoutCurve },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Sidebar() {
//   const location = useLocation();
//   const isActive = (href) => location.pathname === href;

//   return (
//     <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
//       <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
//         <div className="flex shrink-0 items-center mt-8">
//           <img alt="Paylow Logo" src="/images/logo.svg" className="h-14 w-auto" />
//         </div>
//         <nav className="flex flex-1 flex-col">
//           <ul role="list" className="flex flex-1 flex-col gap-y-7">
//             <li>
//               <ul role="list" className="-mx-2 space-y-3">
//                 {navigation.map((item) => (
//                   <li key={item.name}>
//                     <a
//                       href={item.href}
//                       className={classNames(
//                         isActive(item.href)
//                           ? "bg-primary text-white"
//                           : "hover:bg-primary hover:text-white",
//                         "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
//                       )}
//                     >
//                       <item.icon
//                         aria-hidden="true"
//                         className={classNames(
//                           isActive(item.href)
//                             ? "text-white"
//                             : "group-hover:text-white",
//                           "h-6 w-6 shrink-0"
//                         )}
//                       />
//                       {item.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//             <li className="mt-auto">
//               <ul role="list" className="-mx-2 space-y-1">
//                 {action.map((item) => (
//                   <li key={item.name}>
//                     <a
//                       href={item.href}
//                       className={classNames(
//                         isActive(item.href)
//                           ? "bg-primary text-white"
//                           : "hover:bg-primary hover:text-white",
//                         "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
//                       )}
//                     >
//                       <item.icon
//                         aria-hidden="true"
//                         className={classNames(
//                           isActive(item.href)
//                             ? "text-white"
//                             : "group-hover:text-white",
//                           "h-6 w-6 shrink-0"
//                         )}
//                       />
//                       {item.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// }