import React, { useState } from 'react';  
import { Category2, Notification, ProfileCircle, ArrowLeft2, ArrowDown2, SearchNormal1 } from "iconsax-react";  
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";  
import MobileSideNav from './MobileSideNav';
import { useRouter } from '../../Routes/router'

const BillsHeader = ({ active }) => {  
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);  

    const userNavigation = [  
        { name: "Your profile", href: "#" },  
        { name: "Sign out", href: "#" },  
    ]; 
    const closeNav = () => {
        setIsOpen(false);
    };

    const baseStyles = ' h-[36px] my-16 mx-5 rounded-lg border flex justify-center items-center gap-2 lg:flex lg:ml-[29vw] xl:ml-[22vw]';
    const activeStyles = active === 'page3' || active === 'page4'
        ? 'w-[186px] lg:mt-[12vh] border-[#6196F9]'
        : 'w-[86px] lg:mt-[10vh] border-[#6196F9]';
    const secondary = active === 'page2'
        ? 'w-[146px] lg:mt-[12vh] border-[#6196F9]'
        : null
  const move = ()=>{
    router.push('/dashboard')
  }

    return (  
        <div>  
            <header className='mt-5 w-[92%] mx-3 grid grid-cols-[auto, 1fr] grid-flow-col h-[30px] items-center'>  
                <div className="lg:hidden">  
                    <button >  
                        <Category2 size="24" color="black" onClick={() => setIsOpen(true)} />  
                    </button>  
                    <div>
                  {isOpen && <MobileSideNav onClose={closeNav}  />  }  
                    </div>
                </div>  
                <div className='hidden w-[65vw] lg:flex lg:justify-end xl:justify-center xl:ml-[5rem]'>  
                    <SearchNormal1 size="24" className='relative top-4 left-10' color="#697689" />  
                    <input type="text" placeholder="Tap here to search" className='h-14 w-[400px] pl-12 mr-3 border' />  
                </div>  
                <div className='flex flex-row justify-end items-center gap-4 lg:w-[27vw]'>  
                    <Notification size="24" color="black" />  
                    <ProfileCircle size="34" className='lg:size-14' color="#697689" variant="Bulk" />  
                    <div className='gap-2 mt-1 items-center hidden lg:flex lg:flex-row xl:mr-8'>  
                        <p className='font-poppins font-normal text-lg text-[#1D2433] leading-5'>Mayowa Sunusi</p>  
                        <Menu as="div" className="relative">  
                            <MenuButton>  
                                <ArrowDown2 size="28" className='mt-1' color="#697689" />  
                            </MenuButton>  
                            <MenuItems  
                                transition  
                                className="absolute right-0 z-10 mt-2.8 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"  
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
            </header>  
            <div className=''>  
                <button onClick={ move}  className={`${baseStyles} ${activeStyles} ${secondary}`}>  
                    <ArrowLeft2 size="22" color="blue" />  
                    <span className='text-sm font-semibold text-[#6196F9] leading-5'>  
                        {active === 'page1' && 'Back'}  
                        {active === 'page2' && 'Back'}  
                        {(active === 'page3' || active === 'page4') && 'Back To Dashboard'}  
                    </span>  
                </button>  
            </div>  
        </div>  
    )  
}  

export default BillsHeader;


