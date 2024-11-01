import React from 'react'

const BusinessStep3 = ({stepFour}) => {
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
            <main className='w-[100vw] h-screen'>
            <div className='flex justify-center'>
                    <ul className='flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4'>
                        <li className='font-poppins text-xl font-medium'>Account Information</li>
                        <li className='font-poppins text-xl font-medium text-blue-600'>Online </li>
                        <li className='font-poppins text-xl font-medium'>Business Details</li>
                    </ul>
                </div>
                <section className='flex justify-center'>
                <div className='bg-white w-full lg:w-1/2 mx-4 rounded-lg shadow-md'>
                <form action="" className='flex flex-col'>
                            <label htmlFor="website" className='mt-4 mx-6 font-semibold text-lg'>Website</label>
                            <input type="text" className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2' placeholder='Website link...' />

                            <label htmlFor="Twitter" className='mt-4 mx-6 font-semibold text-lg'>Twitter</label>
                            <input type="text" className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2' placeholder='Twitter handle' />

                            <label htmlFor="Linkdeln" className='mt-4 mx-6 font-semibold text-lg'>Linkedln</label>
                            <input type="text" className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2' placeholder='Linkedln link...' />

                            <label htmlFor="Facebook" className='mt-4 mx-6 font-semibold text-lg'>Facebook</label>
                            <input type="text" className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2' placeholder='Facebook username' />

                            <label htmlFor="Youtube" className='mt-4 mx-6 font-semibold text-lg'>Youtube</label>
                            <input type="text" className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2' placeholder='Youtube link' />

                            <label htmlFor="Instagram" className='mt-4 mx-6 font-semibold text-lg'>Instagram</label>
                            <input type="text" className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2' placeholder='Instagram link' />

                            <label htmlFor="Tiktok" className='mt-4 mx-6 font-semibold text-lg'>Tiktok</label>
                            <input type="text" className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2' placeholder='Tiktok username' />
                            <button onClick={stepFour}  className='w-[90%] py-2 mx-8 my-5 bg-blue-600 text-white rounded-lg'>NEXT</button>
                            </form>
                </div>
                </section>
            </main>
    </div>
  )
}

export default BusinessStep3
