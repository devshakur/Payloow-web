


import React from 'react'
import { useLocation } from "react-router-dom";
import { MoneyChange, TableDocument, BookSaved, Chart, Home, Headphone, Setting2, LogoutCurve, CloseCircle } from "iconsax-react";
const currentUser = JSON.parse(localStorage.getItem("currentUser"));



const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Easybuy", href: "/easybuy", icon: MoneyChange },
  { name: "Bills", href: "/airtime", icon: TableDocument },
  {
    name: "E-Learning",
    href: currentUser?.role === 'Tutor' ? "/e-learning/tutor/dashboard" : "/e-learning/student/dashboard",
    icon: BookSaved,
  },
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
const closeNav = () => {

}
const MobileSideNav = ({ onClose }) => {
  const location = useLocation();
  const isActive = (href) => location.pathname === href;

  return (
    <div className='w-[80%] h-[100vh] fixed z-40 top-0 left-0 overflow-y-auto flex'>
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
      </div>
      <div className='ml-3'>
        <button onClick={onClose} className='mb-4 relative top-[-48vh] right-[38%] z-100 h-full bg-red'>
          <CloseCircle
            size="25"
            color="black"
          />
        </button>

      </div>
    </div>
  )
}

export default MobileSideNav
