import React, { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";

const EnergyCalculator = () => {
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
    <div>
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
          <h4 className='font-poppins font-medium text-2xl text-[#1D2433]'>Calculate Your Energy Savings</h4>
          <p className='font-poppins font-medium text-lg text-[#1D2433CC] max-w-2xl mt-3'>
            Estimate the energy savings and costs of switching to solar. Simply enter your energy usage details to see how solar power can work for you.
          </p>
        </div>
        <section className='flex flex-col lg:grid lg:grid-cols-2 gap-6 mx-6'>
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
          <div className='bg-white shadow-lg lg:w-[40vw] h-[40vh]'>
            <h3 className='flex justify-center my-7 font-medium text-xl'>Total Load</h3>
            <h3 className='flex justify-center  font-medium text-lg'>300 Watts</h3>
            <div className='flex  flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Total watt Hours per day</p>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>30w</p>
            </div>
            <div className='flex  flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Kilowatt Hours Per Month</p>
            <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>130kWh/mo</p>
            </div>
            <div className='w-full my-9 flex justify-center'>
                <button className='w-[80%] bg-blue-700 py-2 text-white rounded-lg'>View recommended items</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EnergyCalculator;
