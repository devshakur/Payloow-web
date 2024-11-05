import React from 'react';

const BusinessStep3 = ({ stepFour, formik }) => {
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
                        <li className='font-poppins text-xl font-medium text-blue-600'>Online</li>
                        <li className='font-poppins text-xl font-medium'>Business Details</li>
                    </ul>
                </div>
                <section className='flex justify-center'>
                    <div className='bg-white w-full lg:w-1/2 mx-4 rounded-lg shadow-md'>
                        <form onSubmit={formik.handleSubmit} className='flex flex-col'>
                            <label htmlFor="website" className='mt-4 mx-6 font-semibold text-lg'>Website</label>
                            <input 
                                type="text" 
                                id="website"
                                name="online.website"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='Website link...'
                                onChange={formik.handleChange}
                                value={formik.values.online.website}
                            />
                            {formik.touched.online?.website && formik.errors.online?.website ? (
                                <div className="text-red-500">{formik.errors.online.website}</div>
                            ) : null}

                            <label htmlFor="twitter_url" className='mt-4 mx-6 font-semibold text-lg'>Twitter</label>
                            <input 
                                type="text" 
                                id="twitter_url"
                                name="online.twitter_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='Twitter handle'
                                onChange={formik.handleChange}
                                value={formik.values.online.twitter_url}
                            />
                            {formik.touched.online?.twitter_url && formik.errors.online?.twitter_url ? (
                                <div className="text-red-500">{formik.errors.online.twitter_url}</div>
                            ) : null}

                            <label htmlFor="linkedIn_url" className='mt-4 mx-6 font-semibold text-lg'>LinkedIn</label>
                            <input 
                                type="text" 
                                id="linkedIn_url"
                                name="online.linkedIn_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='LinkedIn link...'
                                onChange={formik.handleChange}
                                value={formik.values.online.linkedIn_url}
                            />
                            {formik.touched.online?.linkedIn_url && formik.errors.online?.linkedIn_url ? (
                                <div className="text-red-500">{formik.errors.online.linkedIn_url}</div>
                            ) : null}

                            <label htmlFor="facebook_url" className='mt-4 mx-6 font-semibold text-lg'>Facebook</label>
                            <input 
                                type="text" 
                                id="facebook_url"
                                name="online.facebook_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='Facebook username'
                                onChange={formik.handleChange}
                                value={formik.values.online.facebook_url}
                            />
                            {formik.touched.online?.facebook_url && formik.errors.online?.facebook_url ? (
                                <div className="text-red-500">{formik.errors.online.facebook_url}</div>
                            ) : null}

                            <label htmlFor="youTube_url" className='mt-4 mx-6 font-semibold text-lg'>YouTube</label>
                            <input 
                                type="text" 
                                id="youTube_url"
                                name="online.youTube_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='YouTube link'
                                onChange={formik.handleChange}
                                value={formik.values.online.youTube_url}
                            />
                            {formik.touched.online?.youTube_url && formik.errors.online?.youTube_url ? (
                                <div className="text-red-500">{formik.errors.online.youTube_url}</div>
                            ) : null}

                            <label htmlFor="instagram_url" className='mt-4 mx-6 font-semibold text-lg'>Instagram</label>
                            <input 
                                type="text" 
                                id="instagram_url"
                                name="online.instagram_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='Instagram link'
                                onChange={formik.handleChange}
                                value={formik.values.online.instagram_url}
                            />
                            {formik.touched.online?.instagram_url && formik.errors.online?.instagram_url ? (
                                <div className="text-red-500">{formik.errors.online.instagram_url}</div>
                            ) : null}

                            <label htmlFor="tikTok_url" className='mt-4 mx-6 font-semibold text-lg'>TikTok</label>
                            <input 
                                type="text" 
                                id="tikTok_url"
                                name="online.tikTok_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='TikTok username'
                                onChange={formik.handleChange}
                                value={formik.values.online.tikTok_url}
                            />
                            {formik.touched.online?.tikTok_url && formik.errors.online?.tikTok_url ? (
                                <div className="text-red-500">{formik.errors.online.tikTok_url}</div>
                            ) : null}

                            <button type="button" onClick={stepFour} className='w-[90%] py-2 mx-8 my-5 bg-blue-600 text-white rounded-lg'>NEXT</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BusinessStep3;
