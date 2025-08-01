import React from 'react';
import { useRouter } from '../Routes/router';

const items = [
  {
    id: 1,
    img: '/images/iphone.png',
    name: 'Apple IPhone XS',
    amount: '₦3,499',
    descrp: '5.8 Inches - 64GB ROM 4GB RAM - Space Grey',
  },
  {
    id: 2,
    img: '/images/solar.png',
    name: 'Solar Panel 100W',
    amount: '₦80,499',
    descrp: '7/ 5.8 Inches - Reliable power wherever ...',
  },
  {
    id: 3,
    img: '/images/inverter.png',
    name: 'Rich Solar',
    amount: '₦400,000',
    descrp: '1000W 48V 120VAC Solar Cabin kit',
  },
  {
    id: 4,
    img: '/images/inverter-two.png',
    name: 'UltraSolar Inverter 5kW',
    amount: '₦100,000',
    descrp: 'Solar Hybrid Inverter AC220V Pure Sine ...',
  },
  {
    id: 5,
    img: '/images/galaxy.png',
    name: 'Galaxy S21',
    amount: '₦800,499',
    descrp: '7/ 5.8 Inches - Reliable power wherever ...',
  },
  {
    id: 6,
    img: '/images/camera.png',
    name: 'Solar Led Landscape',
    amount: '₦60,000',
    descrp: '1000W 48V 120VAC Solar Cabin kit',
  },
];

const PayloowEasybuySlider = () => {
  const router = useRouter();
  return (
    <div className="w-full overflow-hidden bg-white py-6 px-4 rounded-lg shadow-md">

      <div className="relative">
        {/* Scrolling container */}
        <div className="flex animate-slide gap-6 w-max hover:pause group">
          {[...items, ...items].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={()=>router.push('/easybuy/home')}
              className="min-w-[200px] max-w-[200px] cursor-pointer bg-gray-100 rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-105"
            >
              <img src={item.img} alt={item.name} className="w-full h-36 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-600">{item.descrp}</p>
                <p className="text-sm font-bold text-primary mt-1">{item.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayloowEasybuySlider;
