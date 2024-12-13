import React, { useState } from 'react'
import BuyersLayout from '../EasyBuyRegistration/BuyersLayout'
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import { useRouter } from '../../../Routes/router';

const items = [
  {
    id: 1,
    img: '/images/iphon-green.png',
    productName: 'Iphone 11',
    price: "$80",
    orginalPrice: "$100",
    color: 'Green',
  },
  {
    id: 2,
    img: '/images/iphon-black.png',
    productName: 'Iphone 11',
    price: "$70",
    orginalPrice: "$200",
    color: 'Black',
  }
];

const Cart = () => {
    const router = useRouter();
    const [quantities, setQuantities] = useState({
        1: 0, 
        2: 0, 
    });
    const handleCompare  = ()=>{
        router.push('/comapare-product')
    }
  
    const handleIncrease = (id) => {
        setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
    }

    const handleDecrease = (id) => {
        setQuantities(prev => ({ ...prev, [id]: prev[id] - 1 }));
    }
    
  return (
    <BuyersLayout>
      <div>
        <header className='text-xl font-semibold font-plus-jakarta'>
          My Cart
        </header>
        <main className='flex flex-col lg:grid lg:grid-cols-2'>
            <section className='flex flex-col gap-6'>
          {items.map((item) => {
            return ( 
                <div key={item.id} className="flex flex-row">
                  <div >
                    <img className='w-full'src={item.img} alt={item.productName} />
                  </div>
                  <div className='ml-4'>
                    <h4 className='text-lg font-medium'>{item.productName}</h4>
                    <p className='font-plus-jakarta font-medium text-lg text-black'>{item.price}<span className='text-red-400 line-through ml-3'>{item.orginalPrice}</span></p>
                    <p className='font-poppins text-[16px] font-normal text-black mt-1'>
                      Color: <span>{item.color}</span>
                    </p>
                    <div className='justify-between px-2 mt-3 flex w-[7rem] py-1 gap-6 bg-[#DBE7FE] rounded-lg'>
                      <button onClick={()=>handleDecrease(item.id)}  className='font-bold'>
                        <AiOutlineMinus className='w-5 h-5 text-blue-700'/>
                      </button>
                      <p className='font-bold font-plus-jakarta text-lg -ml-8 text-blue-800'>{quantities[item.id]}</p>
                      <button onClick={()=>handleIncrease(item.id)} className='font-bold -ml-7'>
                        <GoPlus className='w-5 h-5 text-blue-800' />
                      </button>
                    </div>
                    <p className='text-blue-700 mt-3 text-[14px]'>Remove</p>
                  </div>
                </div>
            );
        })}
        </section>
        <article className='bg-white'>
       <h3 className='text-xl font-semibold font-poppins mb-3 mx-2'>Total</h3>
        <div className='flex justify-between p-3'>
            <h3 className='font-semibold'>Original Price</h3>
           <h5 className='font-semibold'>₦89,900</h5>
        </div>
           <p className='border-2 border-top border-dashed mt-5'></p>
           <div className='flex justify-between mt-4 p-3'>
            <h3 className='font-bold'>Total Price</h3>
           <h5 className='font-bold'>₦89,900</h5>
           </div>
           <div className='w-full my-5 flex justify-center'>
            <button onClick={handleCompare} className='bg-blue-800  text-white w-[95%] py-2 rounded-lg'>Proceed to Checkout</button>
           </div>
        </article>
        </main>
      </div>
    </BuyersLayout>
  );
}

export default Cart;
