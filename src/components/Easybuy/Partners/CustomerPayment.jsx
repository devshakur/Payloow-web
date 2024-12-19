import React from 'react'

const orders = [{
    id: 1,
    productName: 'Iphone Xr',
    ProductImg: '/images/iphon-black.png',
    productStatus: 'paid',
    orderDate: '04/10/2024',
},
{
    id: 2,
    productName: 'Iphone 12',
    ProductImg: '/images/iphon-black.png',
    productStatus: 'pending',
    orderDate: '04/10/2024',
},
{
    id: 3,
    productName: 'Iphone 8',
    ProductImg: '/images/iphon-black.png',
    productStatus: 'paid',
    orderDate: '04/10/2024',
},
{
    id: 4,
    productName: 'Iphone 14',
    ProductImg: '/images/iphon-yellow.png',
    productStatus: 'pending',
    orderDate: '04/10/2024',
},
{
    id: 5,
    productName: 'Iphone 13',
    ProductImg: '/images/iphon-green.png',
    productStatus: 'overdue',
    orderDate: '04/10/2024',
},
]

const CustomerPayment = () => {
    return (
        <div className='bg-white mt-6 p-3 rounded-lg'>
            <div className="flex flex-col gap-4">
                <header className='border-b flex justify-between items-center p-3'>
                    <h3 className='font-poppins font-medium text-[16px]'>Payment Status</h3>
                    <h4 className='bg-red-200 text-red-600 px-6 py-2 rounded-lg text-sm'>{'overdue'}</h4>
                </header>
                <header className='border-b flex justify-between items-center p-3'>
                    <h3 className='font-poppins font-medium text-[16px]'>Total Balance</h3>
                    <h4 className='font-poppins font-medium text-[14px] text-[#000]'>- ₦200,000.00</h4>
                </header>
            </div>

            <div className="mt-5">
                <h4 className='font-poppins font-semibold text-lg'>Payment Dates</h4>
            </div>

            <div className="mt-4">
                <article className="bg-white w-full mx-4 lg:mx-0 rounded-lg p-4 shadow-lg">
                    <ul className="lg:flex justify-between bg-white hidden border-b pb-3">
                        <li className="font-medium text-md">Product Name</li>
                        <li className="font-medium text-md relative lg:-left-6 xl:-left-[3rem]">Status</li>
                        <li className="font-medium text-md relative lg:-left-6 xl:-left-[6rem]">Date</li>
                    </ul>

                    {orders.map(item => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4 mb-4 shadow-md lg:shadow-sm">
                            <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                                <div className="flex items-center gap-3 mb-3 lg:mb-0">
                                    <img src={item.ProductImg} alt={item.productName} className="w-12 h-12 object-cover rounded-lg" />
                                    <span className="text-sm font-poppins font-medium">{item.productName}</span>
                                </div>

                                 <div className="flex items-center gap-3 mb-3 lg:mb-0">
                                    <span
                                        className={`text-sm font-poppins font-medium py-1 px-3 rounded-full ${item.productStatus.toLowerCase() === 'overdue' ? 'bg-red-100 text-red-600' : item.productStatus.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}
                                    >
                                        {item.productStatus}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 mb-3 lg:mb-0">
                                    <span className="text-sm font-poppins">{item.orderDate}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-poppins font-semibold cursor-pointer text-blue-500 hover:underline">...</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </article>
            </div>
        </div>
    )
}

export default CustomerPayment
