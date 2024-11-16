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
                            {/* Website */}
                            <label htmlFor="website" className='mt-4 mx-6 font-semibold text-lg'>Website***</label>
                            <input 
                                type="text" 
                                id="website"
                                name="website"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='Website link...'
                                onChange={formik.handleChange}
                                value={formik.values.website}
                            />
                            {formik.touched.website && formik.errors.website && (
                                <div className="text-red-500">{formik.errors.website}</div>
                            )}

                            {/* Twitter URL */}
                            <label htmlFor="twitter_url" className='mt-4 mx-6 font-semibold text-lg'>Twitter</label>
                            <input 
                                type="text" 
                                id="twitter_url"
                                name="twitter_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='Twitter handle'
                                onChange={formik.handleChange}
                                value={formik.values.twitter_url}
                            />
                            {formik.touched.twitter_url && formik.errors.twitter_url && (
                                <div className="text-red-500">{formik.errors.twitter_url}</div>
                            )}

                            {/* LinkedIn URL */}
                            <label htmlFor="linkedIn_url" className='mt-4 mx-6 font-semibold text-lg'>LinkedIn</label>
                            <input 
                                type="text" 
                                id="linkedIn_url"
                                name="linkedIn_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='LinkedIn link...'
                                onChange={formik.handleChange}
                                value={formik.values.linkedIn_url}
                            />
                            {formik.touched.linkedIn_url && formik.errors.linkedIn_url && (
                                <div className="text-red-500">{formik.errors.linkedIn_url}</div>
                            )}

                            {/* Facebook URL */}
                            <label htmlFor="facebook_url" className='mt-4 mx-6 font-semibold text-lg'>Facebook</label>
                            <input 
                                type="text" 
                                id="facebook_url"
                                name="facebook_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='Facebook username'
                                onChange={formik.handleChange}
                                value={formik.values.facebook_url}
                            />
                            {formik.touched.facebook_url && formik.errors.facebook_url && (
                                <div className="text-red-500">{formik.errors.facebook_url}</div>
                            )}

                            {/* YouTube URL */}
                            <label htmlFor="youTube_url" className='mt-4 mx-6 font-semibold text-lg'>YouTube</label>
                            <input 
                                type="text" 
                                id="youTube_url"
                                name="youTube_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='YouTube link'
                                onChange={formik.handleChange}
                                value={formik.values.youTube_url}
                            />
                            {formik.touched.youTube_url && formik.errors.youTube_url && (
                                <div className="text-red-500">{formik.errors.youTube_url}</div>
                            )}

                            {/* Instagram URL */}
                            <label htmlFor="instagram_url" className='mt-4 mx-6 font-semibold text-lg'>Instagram</label>
                            <input 
                                type="text" 
                                id="instagram_url"
                                name="instagram_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='Instagram link'
                                onChange={formik.handleChange}
                                value={formik.values.instagram_url}
                            />
                            {formik.touched.instagram_url && formik.errors.instagram_url && (
                                <div className="text-red-500">{formik.errors.instagram_url}</div>
                            )}

                            {/* TikTok URL */}
                            <label htmlFor="tikTok_url" className='mt-4 mx-6 font-semibold text-lg'>TikTok</label>
                            <input 
                                type="text" 
                                id="tikTok_url"
                                name="tikTok_url"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2'
                                placeholder='TikTok username'
                                onChange={formik.handleChange}
                                value={formik.values.tikTok_url}
                            />
                            {formik.touched.tikTok_url && formik.errors.tikTok_url && (
                                <div className="text-red-500">{formik.errors.tikTok_url}</div>
                            )}

                            {/* Next Button */}
                            <button 
                                type="button" 
                                onClick={stepFour} 
                                className='w-[90%] py-2 mx-8 my-5 bg-blue-600 text-white rounded-lg'
                            >
                                NEXT
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BusinessStep3;
