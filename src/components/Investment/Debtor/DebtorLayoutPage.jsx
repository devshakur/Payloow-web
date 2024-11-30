import { useState, useEffect } from "react";
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
    ArrowUp2,
    BookSaved,
    Chart,
    CloseCircle,
    Category2,
    Headphone,
    Home,
    LogoutCurve,
    AlignBottom,
    Notification,
    SearchNormal,
    Setting2,
    MessageText1,
} from "iconsax-react";
import { useLocation, useNavigate } from "react-router-dom";
import '../investment.css';
import { Toaster } from "react-hot-toast";

const board = [
    { name: "Main Menu", icon: Home },
    { name: "Investment", icon: ArrowDown2 },
];

const navigation = [
    { name: "Dashboard", href: '/debtor/dashboard', icon: Chart },
    { name: "Business", href: '/debtor/business', icon: BookSaved },
    { name: "Loans", href: "/debtor/loans", icon: AlignBottom },
    { name: "Request", href: "/debtor/request", icon: MessageText1 },
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

function DebtorLayoutPage({ children }) {
    const [clickedStates, setClickedStates] = useState({ "Investment": true }); 
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const toggleClick = (itemName) => {
        setClickedStates((prev) => ({
            ...prev,
            [itemName]: !prev[itemName],
        }));
    };

    const handleNavigationClick = (item) => {
        setActiveItem(item.name);
        navigate(item.href); // Navigate to the desired page
    };

    return (
        <>
            <Toaster />
            <div className="font-plus-jakarta">
                <Dialog
                    open={sidebarOpen}
                    onClose={setSidebarOpen}
                    className="relative z-50 lg:hidden"
                >
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />
                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(false)}
                                        className="-m-2.5 p-2.5"
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <CloseCircle
                                            aria-hidden="true"
                                            className="h-6 w-6 text-white"
                                        />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src="/images/logo.svg"
                                        className="h-10 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul
                                                role="list"
                                                className="-mx-2 space-y-5 font-plus-jakarta"
                                            >
                                                <div className="w-[60%] flex gap-5 flex-col mt-5">
                                                    {board.map((item) => (
                                                        <div key={item.name} className="flex items-center justify-between">
                                                            <span className="text-md font-bold">{item.name}</span>
                                                            <div>
                                                                {clickedStates[item.name] ? (
                                                                    <ArrowUp2 onClick={() => toggleClick(item.name)} className="font-normal text-gray-500" />
                                                                ) : (
                                                                    <ArrowDown2 onClick={() => toggleClick(item.name)} className="font-normal text-gray-500" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {clickedStates["Investment"] && (
                                                    <ul className="space-y-4">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    onClick={() => handleNavigationClick(item)}
                                                                    className={classNames(
                                                                        activeItem === item.name
                                                                            ? "bg-blue-500 text-white"
                                                                            : "hover:bg-blue-700 hover:text-white",
                                                                        "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6"
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        aria-hidden="true"
                                                                        className={classNames(
                                                                            location.pathname === item.href
                                                                                ? "text-blue-700"
                                                                                : "group-hover:text-white",
                                                                            "h-6 w-6 shrink-0"
                                                                        )}
                                                                    />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </ul>
                                        </li>

                                        <li className="mt-auto">
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {action.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                location.pathname === item.href
                                                                    ? "bg-blue-500 text-white"
                                                                    : "hover:bg-blue-700 hover:text-white",
                                                                "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6"
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    location.pathname === item.href
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
                        </DialogPanel>
                    </div>
                </Dialog>

                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <div className="flex shrink-0 items-center mt-8">
                            <img
                                alt="Paylow Logo"
                                src="/images/logo.svg"
                                className="h-14 w-auto"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <div className="w-[60%] flex gap-5 flex-col mt-5">
                                    {board.map((item) => (
                                        <div key={item.name} className="flex items-center justify-between">
                                            <span className="text-md font-bold">{item.name}</span>
                                            <div>
                                                {clickedStates[item.name] ? (
                                                    <ArrowUp2 onClick={() => toggleClick(item.name)} className="font-normal text-gray-500" />
                                                ) : (
                                                    <ArrowDown2 onClick={() => toggleClick(item.name)} className="font-normal text-gray-500" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {clickedStates["Investment"] && (
                                    <ul className="-mt-4 flex flex-col gap-6">
                                        <nav className="flex flex-col">
                                            <ul className="flex flex-col gap-y-2 my-3">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            onClick={() => handleNavigationClick(item)}
                                                            className={classNames(
                                                                activeItem === item.name
                                                                    ? "bg-blue-700 text-white"
                                                                    : "hover:bg-blue-700 hover:text-white",
                                                                "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6"
                                                            )}
                                                        >
                                                            <item.icon className="w-5 text-[#1D2433CC] font-semibold h-5" />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </ul>
                                )}

                                <ul className="flex flex-col fixed bottom-0">
                                    <nav className="flex flex-col">
                                        <ul className="flex flex-col gap-y-2 my-3">
                                            {action.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            location.pathname === item.href
                                                                ? "bg-blue-500 text-white"
                                                                : "hover:bg-blue-700 hover:text-white",
                                                            "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6"
                                                        )}
                                                    >
                                                        <item.icon className="w-5 text-[#1D2433CC] font-semibold h-5" />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </ul>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Category2 aria-hidden="true" className="h-6 w-6" />
                        </button>
                        <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />
                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form action="#" method="GET" className="relative flex flex-1">
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
                                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button
                                    type="button"
                                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <Notification aria-hidden="true" className="h-6 w-6" />
                                </button>
                                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src={currentUser ? currentUser.profilePicture : "/images/user.png"}
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                                                {currentUser ? currentUser.firstName : 'John Doe'}
                                            </span>
                                            <ArrowDown2
                                                aria-hidden="true"
                                                className="ml-2 h-5 w-5 text-gray-400"
                                            />
                                                <span className="relative top-4 right-16 text-sm  text-gray-300">Debtor</span>
                                           
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

export default DebtorLayoutPage;






