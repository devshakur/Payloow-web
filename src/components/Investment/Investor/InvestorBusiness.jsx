import React, { useState } from 'react';
import InvestorLayoutPage from './InvestorLayoutPage';
import { Sort, SliderVertical1, Book1, Box2, Bubble, Bucket, BuyCrypto, ChartCircle, Drop, Bank, Decred, OceanProtocol } from 'iconsax-react';

const InvestorBusiness = () => {
    const field = [
        { name: 'Tech', icon: OceanProtocol },
        { name: 'Agriculture', icon: Box2 },
        { name: 'Retail', icon: Decred },
        { name: 'Education', icon: Book1 },
        { name: 'Finance', icon: Bank },
        { name: 'Mining', icon: Drop },
        { name: 'Crypto', icon: BuyCrypto },
        { name: 'Stock', icon: Bubble },
        { name: 'Gold', icon: ChartCircle },
        { name: 'AgroBonding', icon: Bucket },
    ];

    const startups = [
        { id: 1, name: "Startup A", description: "A tech startup focused on creating AI solutions.", loans: "$15,000" },
        { id: 2, name: "Solar Innovations", description: "A cutting-edge startup focused on creating sustainable, affordable solar energy solutions.", loans: "$25,000" },
        { id: 3, name: "Eco Solutions", description: "An eco-friendly startup focused on sustainable practices.", loans: "$30,000" },
        { id: 4, name: "Health Tech", description: "A startup innovating healthcare technology.", loans: "$20,000" },
        { id: 5, name: "FinTech Revolution", description: "A financial technology startup disrupting traditional banking.", loans: "$40,000" },
        { id: 6, name: "Startup A", description: "A tech startup focused on creating AI solutions.", loans: "$15,000" },
        { id: 7, name: "Solar Innovations", description: "A cutting-edge startup focused on creating sustainable, affordable solar energy solutions.", loans: "$25,000" },
        { id: 8, name: "Eco Solutions", description: "An eco-friendly startup focused on sustainable practices.", loans: "$30,000" },
        { id: 9, name: "Health Tech", description: "A startup innovating healthcare technology.", loans: "$20,000" },
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const startupsPerPage = 3;

    const displayStartups = startups.slice(currentPage * startupsPerPage, (currentPage + 1) * startupsPerPage);

    return (
        <InvestorLayoutPage>
            <header className='flex justify-between mx-2 my-5 items-center'>
                <div>
                    <h3 className='font-poppins text-2xl font-semibold'>Welcome Mayowa</h3>
                    <p className='font-poppins font-normal my-1 leading-6 text-lg text-[#000000]'>Find opportunities and invest in businesses you're passionate about.</p>
                </div>
                <button className='px-5 flex justify-center gap-2 items-center py-3 rounded-xl border border-blue-400'>
                    <Sort size="20" color="blue" />
                    <p className='text-lg text-blue-600 font-semibold font-poppins'>Filter</p>
                </button>
            </header>
            <section>
                <h3 className='font-poppins font-semibold text-[#1D2433] text-2xl'>Explore</h3>
                <ul className='w-[100%] flex-wrap justify-start flex my-3 gap-6'>
                    {field.map((item) => (
                        <div key={item.name} className='flex items-center border-2 border-[#E1E6EF] px-4 py-2 hover:bg-blue-500 cursor-pointer'>
                            <div className='h-11 w-11 mx-3 flex justify-center items-center bg-[#DBE7FE] rounded-[50%]'>
                                <item.icon size={18} color={'blue'} />
                            </div>
                            <li className='font-poppins font-medium text-xl text-[#000000]'>{item.name}</li>
                        </div>
                    ))}
                </ul>
            </section>
            <article className='my-6'>
                <h3 className='font-semibold text-xl text-[#000000] font-poppins'>Featured Businesses</h3>
                <div className='flex flex-wrap justify-center lg:justify-start'>
                    {displayStartups.map((startup) => (
                        <article key={startup.id} className='flex lg:flex-row justify-center my-4 lg:mx-1 w-full lg:w-[30%]'>
                            <div className='bg-white w-full lg:py-[5rem] py-3 rounded-lg shadow-lg flex flex-col justify-between'>
                                <div>
                                    <div className='flex justify-between mx-3 lg:-mt-12'>
                                        <div className='h-9 w-9 flex justify-center items-center bg-gray-300 rounded-[50%]'>
                                            <SliderVertical1 size="22" color="blue" />
                                        </div>
                                    </div>
                                    <h3 className='font-poppins font-semibold mt-7 text-2xl text-[#1D2433] mx-3'>{startup.name}</h3>
                                    <p className='font-medium font-poppins mt-2 text-xl tracking-wide mx-3 text-[#1D2433CC]'>{startup.description}</p>
                                </div>
                                <div className='mx-4 mt-7'>
                                    <button className='w-full bg-[#3369F4] py-3 rounded-md text-white font-semibold'>Invest Now</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className='flex justify-center mt-5'>
                    <div className='flex gap-2'>
                        {[0, 1, 2].map((number) => (
                            <div
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                                    currentPage === number ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500'
                                }`}
                            >
                                {number + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </InvestorLayoutPage>
    );
};

export default InvestorBusiness;
