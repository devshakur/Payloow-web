import React, { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";


const SolarDesign = () => {
  const [items, setItems] = useState([
    { id: 1, quantity: 1, power: '100w' },
  ]);
  

  

  // Add a new item
  const addItem = () => {
    const newItem = { id: Date.now(), quantity: 1, power: '100w' };
    setItems([...items, newItem]);
  };

  // Adjust the quantity of a specific item
  const incrementQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
    ));
  };

  // Adjust the power of a specific item
  const incrementPower = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, power: (parseInt(item.power) + 50) + 'w' } : item
    ));
  };

  const decrementPower = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, power: (parseInt(item.power) - 50) + 'w' } : item
    ));
  };
  return (
    <div className='pb-[100px]'>
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
      <main>
        <div className='p-6'>
        <h4 className='font-poppins font-medium text-[26px] text-[#1D2433]'>Design Your Custom Solar System</h4>
        <p className='font-plus-jakarta font-medium text-lg text-[#1D2433] max-w-2xl mt-3'>Configure a solar system tailored to your energy needs. Enter your preferences to receive a customized design and quote for your home or business.</p>

        </div>
        <section className='flex flex-col lg:grid lg:grid-cols-2 gap-9 mx-6'>
          <div className='col-span-1'>
              <div  className='bg-white shadow-lg mb-4 p-5'>
            {items.map(item => (
                <div className="container" key={item.id}>
                  <div className="mx-4">
                    <div className="md:flex gap-6 md:justify-between">
                      <select name="light" id="light" className='w-full lg:w-[300px] p-2 rounded-lg border border-gray-300 mt-3'>
                        <option value="Light bulb">Light bulb</option>
                        <option value="fan">Fan</option>
                        <option value="television">Television</option>
                      </select>
                      <div className='flex justify-between mt-4 md:gap-4'>
                        <div className='flex items-center justify-between px-5 bg-white border rounded-lg w-[140px]'>
                          <button type="button" onClick={() => decrementQuantity(item.id)} className='font-bold'>
                            <AiOutlineMinus className='w-8 h-8' />
                          </button>
                          <p className='font-bold text-xl'>{item.quantity}</p>
                          <button type="button" onClick={() => incrementQuantity(item.id)} className='font-bold'>
                            <GoPlus className='w-8 h-8' />
                          </button>
                        </div>
                        <div className='flex items-center justify-between px-5 bg-white border rounded-lg w-[140px]'>
                          <button type="button" onClick={() => decrementPower(item.id)} className='font-bold'>
                            <AiOutlineMinus className='w-8 h-8' />
                          </button>
                          <p className='font-bold text-xl'>{item.power}</p>
                          <button type="button" onClick={() => incrementPower(item.id)} className='font-bold'>
                            <GoPlus className='w-8 h-8' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
            
                <div className='mx-5 mt-6'>
                  <button onClick={addItem} className="w-[9rem] py-1  rounded-lg flex items-center gap-3 border border-blue-700 text-blue-600">
                    <GoPlus className='w-5 h-5 ml-2' /> Add Item
                  </button>
                </div>
                </div>
          </div>

          {/* Placeholder for the second column */}
          <div className='bg-white shadow-lg lg:w-[30vw] h-[55vh]'>
            <h3 className='flex justify-start p-2 my-7 font-medium text-xl'>Summary</h3>
            <div className='flex  flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Panels Required:</p>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>10</p>
            </div>
            <div className='flex  flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Battery:</p>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>Sunking 5550w</p>
            </div>
            <div className='flex  flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Inverter:</p>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>800vA</p>
            </div>
            <div className='flex  flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Inverter:</p>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>800vA</p>
            </div>
            <div className='flex  flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Estimated Cost:</p>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>₦1,000,000</p>
            </div>
            <div className='w-full my-9 flex justify-center'>
                <button className='w-[80%] bg-blue-700 py-2 text-white rounded-lg'>View recommended items</button>
            </div>
          </div>
        </section>
        <article className='bg-white  pb-10 mx-6 shadow-2xl'>
          <h3 className='font-poppins font-medium text-2xl text-[#00000] px-6 mt-6'>Installation Preferences</h3>
        <form action="" className='flex flex-col gap-3 p-6'>
          <div className='w-full flex flex-col'>
          <label htmlFor="type" className='mb-1'>Type</label>
          <select className='w-[90%] py-2 rounded-md border border-gray-300 focus:outline-none' name="type" id="type">
            <option value="roof">Roof Mounted</option>
            <option value="suspended">Suspended</option>
            <option value="ground">Ground Mounting</option>
          </select>
          </div>
          <div className='w-full flex flex-col'>
          <label htmlFor="type" className='mb-1'>Roof Type</label>
          <select className='w-[90%] py-2 rounded-md border border-gray-300 focus:outline-none' name="roof" id="roof">
            <option value="roof">Metal</option>
            <option value="suspended">Wood</option>
            <option value="ground">Aluminium</option>
          </select>
          </div>
          <div className='w-full flex flex-col'>
          <label htmlFor="type" className='mb-1'>Space Availaibility</label>
          <select className='w-[90%] py-2 rounded-md border border-gray-300 focus:outline-none' name="space" id="space">
            <option value="roof">1000ft</option>
            <option value="suspended">2000ft</option>
            <option value="ground">3000ft</option>
          </select>
          </div>
        </form>
        </article>
      </main>
    </div>
  )
}

export default SolarDesign
