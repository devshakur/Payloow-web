import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowDown2,
  BookSaved,
  Chart,
  CloseCircle,
  Category2,
  Headphone,
  Home,
  LogoutCurve,
  MoneyChange,
  Notification,
  SearchNormal,
  Setting2,
  TableDocument,
  Card,
} from "iconsax-react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaCircleUser } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { LuStore } from "react-icons/lu";
import { TbMessageStar } from "react-icons/tb";
import { Toaster } from "react-hot-toast";
import { useRouter } from "../../../Routes/router";

const navigation = [
  { name: "Main Menu", href: "/easybuy/home", icon: Category2 },
  { name: "Dashboard", href: "#", icon: LuStore  },
  { name: "My Order", href: "#", icon: HiOutlineArchiveBox },
  { name: "Payment", href: "#", icon: Card },
  { name: "Installment", href: "#", icon: TbMessageStar },
];

const action = [
  { name: "Support", href: "/support", icon: Headphone },
  { name: "Settings", href: "/settings", icon: Setting2 },
  { name: "Logout", href: "/", icon: LogoutCurve },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BuyersLayout({ children }) {
  const location = useLocation();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isActive = (href) => location.pathname === href;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleCart = ()=>{
  router.push('/user-cart')
  }

  return (
    <>
      <Toaster />
      <div className="font-plus-jakarta">
        {/* Sidebar for small screen */}
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
          <div className="fixed inset-0 flex">
            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <CloseCircle className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img alt="Logo" src="/images/logo.svg" className="h-10 w-auto" />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-5">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                isActive(item.href) ? "bg-primary text-white" : "hover:bg-primary hover:text-white",
                                "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon className="h-6 w-6 shrink-0" />
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
                                isActive(item.href) ? "bg-primary text-white" : "hover:bg-primary hover:text-white",
                                "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon className="h-6 w-6 shrink-0" />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Sidebar for large screens */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex shrink-0 items-center mt-8">
              <img alt="Logo" src="/images/logo.svg" className="h-14 w-auto" />
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
                            isActive(item.href) ? "bg-primary text-white" : "hover:bg-primary hover:text-white",
                            "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
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
                            isActive(item.href) ? "bg-primary text-white" : "hover:bg-primary hover:text-white",
                            "group flex gap-x-3 rounded-md p-5 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Layout (Header with search, icons, and profile dropdown) */}
        <div className="lg:pl-72">
  <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
    {/* Menu Icon (Only visible on small screens) */}
    <button
      type="button"
      onClick={() => setSidebarOpen(true)}
      className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
    >
      <span className="sr-only">Open sidebar</span>
      <Category2 aria-hidden="true" className="h-6 w-6" />
    </button>

    <div
      aria-hidden="true"
      className="h-6 w-px bg-gray-200 lg:hidden"
    />

    {/* Flex Container with justify-between */}
    <div className="flex flex-1 justify-between items-center">
      {/* Left: Search Bar (Visible on all screens) */}
      <form action="#" method="GET" className="relative flex justify-around w-full max-w-xs">
        <label htmlFor="search-field" className="sr-only">Search</label>
        <SearchNormal
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
        />
        <input
          id="search-field"
          name="search"
          type="search"
          placeholder="Search..."
          className="block h-full w-full shadow-md py-3 focus:outline-none pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
        />
      </form>

      {/* Right: Icons (Visible on large screens, only notification & profile on small screens) */}
      <div className="flex items-center gap-x-4 lg:gap-x-12">

        {/* Only visible on large screens */}
        <button
          type="button"
          className="-m-2.5 p-1.5 bg-[#F1F3F9] rounded-[50%] text-[#1D2433CC] hover:text-gray-500 lg:block hidden"
        >
          <FiHeart className="w-5 h-5"  />
        </button>

        <button
          type="button"
          onClick={handleCart}
          className="-m-2.5 p-1.5 bg-[#F1F3F9] rounded-[50%] text-[#1D2433CC] hover:text-gray-500 lg:block hidden"
        >
         <IoCartOutline className="w-5 h-5" />
       
        </button>

         {/* Notification Icon (Visible on all screens) */}
         <button
          type="button"
          className="-m-2.5 p-1.5 bg-[#F1F3F9] rounded-[50%] text-[#1D2433CC] hover:text-gray-500"
        >
          <span className="sr-only">View notifications</span>
          <Notification aria-hidden="true" className="h-5 w-5" />
        </button>

        {/* Profile Dropdown (Visible on all screens) */}
        <Menu as="div" className="relative">
          <MenuButton className="-m-1.5 flex items-center p-1.5">
            <img
              alt="User Profile"
              src={currentUser ? <FaCircleUser className="w-5 h-5"/>  : currentUser.profilePicture }
              className="h-8 w-8 rounded-full bg-gray-50"
            />
            <span className="hidden lg:flex lg:items-center">
              <span
                aria-hidden="true"
                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
              >
                {currentUser ? currentUser.firstName : 'John Doe'}
              </span>
              <ArrowDown2
                aria-hidden="true"
                className="ml-2 h-5 w-5 text-gray-400"
              />
            </span>
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a
                  href={item.href}
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                >
                  {item.name}
                </a>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  </div>
  <main className="py-10 bg-[#f8f9fc]">
    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
  </main>
</div>


      </div>
    </>
  );
}

export default BuyersLayout;
