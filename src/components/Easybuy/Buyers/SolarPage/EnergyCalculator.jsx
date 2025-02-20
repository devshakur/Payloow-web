import React, { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { useRouter } from '../../../../Routes/router';

const EnergyCalculator = () => {
  const [items, setItems] = useState([
    { id: 1, quantity: 1, power: 100, hoursPerDay: 1 },
  ]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const router = useRouter();

  // Add a new item
  const addItem = () => {
    const newItem = { id: Date.now(), quantity: 1, power: 100, hoursPerDay: 1 };
    setItems([...items, newItem]);
  };

  // Adjust quantity
  const incrementQuantity = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ));
  };

  // Adjust power
  const incrementPower = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, power: item.power + 50 } : item
    ));
  };

  const decrementPower = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, power: Math.max(50, item.power - 50) } : item
    ));
  };

  // Adjust hours per day
  const updateHoursPerDay = (id, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, hoursPerDay: Math.max(1, parseInt(value) || 1) } : item
    ));
  };

  // Calculate totals
  const totalLoad = items.reduce((sum, item) => sum + item.quantity * item.power, 0); // Watts
  const totalWattHoursPerDay = items.reduce((sum, item) => sum + item.quantity * item.power * item.hoursPerDay, 0); // Watt-hours
  const kilowattHoursPerMonth = (totalWattHoursPerDay * 30) / 1000; // kWh

  // Solar Recommendations
  const calculateRecommendations = () => {
    const batteryCapacity = totalWattHoursPerDay * 1.5; // 1.5x for backup (Watt-hours)
    const solarPanelCapacity = Math.ceil(totalLoad / 300); // Assuming each panel provides 300W
    const inverterCapacity = totalLoad * 1.25; // 1.25x safety margin
    const chargeController = totalLoad * 1.2; // 1.2x safety margin for charge controller

    return {
      batteryCapacity: Math.ceil(batteryCapacity / 1000), // Convert to kWh
      solarPanelCapacity,
      inverterCapacity: Math.ceil(inverterCapacity / 1000), // Convert to kW
      chargeController: Math.ceil(chargeController / 1000), // Convert to kW
    };
  };

  const recommendations = calculateRecommendations();

  // Exit function
  const handleExit = () => {
    router.back();
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
          <p onClick={handleExit} className='font-plus-jakarta font-medium text-xl text-blue-600 cursor-pointer'>Exit</p>
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
            <div className='bg-white shadow-lg mb-4 p-5'>
              {items.map(item => (
                <div className="container" key={item.id}>
                  <div className="mx-4">
                    <div className="md:flex gap-6 md:justify-between">
                      <select name="light" id="light" className='w-full lg:w-[300px] p-2 rounded-lg border border-gray-300 mt-3'>
                        <option value="Light bulb">Light bulb</option>
                        <option value="Fan">Fan</option>
                        <option value="Television">Television</option>
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
                          <p className='font-bold text-xl'>{item.power}W</p>
                          <button type="button" onClick={() => incrementPower(item.id)} className='font-bold'>
                            <GoPlus className='w-8 h-8' />
                          </button>
                        </div>
                      </div>
                      <div className='mt-4'>
                        <input
                          type="number"
                          value={item.hoursPerDay}
                          onChange={(e) => updateHoursPerDay(item.id, e.target.value)}
                          className='w-[140px] p-2 rounded-lg border border-gray-300'
                          min="1"
                        />
                        <p className='text-sm'>Hours/Day</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className='mx-5 mt-6'>
                <button onClick={addItem} className="w-[9rem] py-1 rounded-lg flex items-center gap-3 border border-blue-700 text-blue-600">
                  <GoPlus className='w-5 h-5 ml-2' /> Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Second column */}
          <div className='bg-white shadow-lg lg:w-[40vw] h-[40vh]'>
            <h3 className='flex justify-center my-7 font-medium text-xl'>Total Load</h3>
            <h3 className='flex justify-center font-medium text-lg'>{totalLoad} Watts</h3>
            <div className='flex flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
              <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Total Watt Hours Per Day</p>
              <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>{totalWattHoursPerDay} Wh</p>
            </div>
            <div className='flex flex-col justify-center items-center md:flex-row md:justify-between md:mx-4'>
              <p className='font-poppins font-medium text-[16px] text-[#1D2433A6]'>Kilowatt Hours Per Month</p>
              <p className='font-poppins font-medium text-[16px] text-[#1D2433]'>{kilowattHoursPerMonth.toFixed(2)} kWh/mo</p>
            </div>
            <div className='w-full my-9 flex justify-center'>
              <button
                className='w-[80%] bg-blue-700 py-2 text-white rounded-lg'
                onClick={() => setShowRecommendations(true)}
              >
                View Recommended Items
              </button>
            </div>
          </div>
        </section>

        {showRecommendations && (
          <section className='bg-white shadow-xl p-6 mx-6 mt-4'>
            <h3 className='font-medium text-xl text-center'>Recommended Solar Items</h3>
            <p className='text-center mt-3'>Based on your energy usage, we recommend:</p>
            <ul className='mt-4 list-disc pl-6'>
              <li>Batteries: {recommendations.batteryCapacity} kWh</li>
              <li>Solar Panels: {recommendations.solarPanelCapacity} panels (300W each)</li>
              <li>Inverter: {recommendations.inverterCapacity} kW</li>
              <li>Charge Controller: {recommendations.chargeController} kW</li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default EnergyCalculator;
