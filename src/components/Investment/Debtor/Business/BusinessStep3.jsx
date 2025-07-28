import React from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessStep3 = ({ nextStep, stepFour, formik }) => {
    const navigate = useNavigate()
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
                    <p onClick={()=>navigate(-1)} className='font-poppins font-medium text-2xl text-blue-600 cursor-pointer'>Exit</p>
                </div>
            </header>
            <main className='w-[100vw] bg-blue-50'>
                <div className='flex justify-center'>
                    <ul className='flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4'>
                        <li onClick={nextStep} className='font-plus-jakarta text-[16px] lg:text-xl font-medium cursor-pointer'>Account Information</li>
                        <li className='font-plus-jakarta text-[16px] lg:text-xl  font-medium text-blue-600 cursor-pointer'>Online</li>
                        <li onClick={stepFour} className='font-plus-jakarta text-[16px] lg:text-xl  font-medium cursor-pointer'>Business Details</li>
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
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2 focus:outline-none'
                                placeholder='Website link...'
                                onChange={formik.handleChange}
                                value={formik.values.website}
                            />
                            {formik.touched.website && formik.errors.website && (
                                <div className="text-red-500">{formik.errors.website}</div>
                            )}

                            {/* Twitter URL */}
                            <label htmlFor="twitterUrl" className='mt-4 mx-6 font-semibold text-lg'>Twitter</label>
                            <input 
                                type="text" 
                                id="twitterUrl"
                                name="twitterUrl"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2 focus:outline-none'
                                placeholder='Twitter handle'
                                onChange={formik.handleChange}
                                value={formik.values.twitterUrl}
                            />
                            {formik.touched.twitterUrl && formik.errors.twitterUrl && (
                                <div className="text-red-500">{formik.errors.twitterUrl}</div>
                            )}

                            {/* LinkedIn URL */}
                            <label htmlFor="linkedInUrl" className='mt-4 mx-6 font-semibold text-lg'>LinkedIn</label>
                            <input 
                                type="text" 
                                id="linkedInUrl"
                                name="linkedInUrl"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2 focus:outline-none'
                                placeholder='LinkedIn link...'
                                onChange={formik.handleChange}
                                value={formik.values.linkedInUrl}
                            />
                            {formik.touched.linkedInUrl && formik.errors.linkedInUrl && (
                                <div className="text-red-500">{formik.errors.linkedInUrl}</div>
                            )}

                            {/* Facebook URL */}
                            <label htmlFor="facebookUrl" className='mt-4 mx-6 font-semibold text-lg'>Facebook</label>
                            <input 
                                type="text" 
                                id="facebookUrl"
                                name="facebookUrl"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2 focus:outline-none'
                                placeholder='Facebook username'
                                onChange={formik.handleChange}
                                value={formik.values.facebookUrl}
                            />
                            {formik.touched.facebookUrl && formik.errors.facebookUrl && (
                                <div className="text-red-500">{formik.errors.facebookUrl}</div>
                            )}

                            {/* YouTube URL */}
                            <label htmlFor="youTubeUrl" className='mt-4 mx-6 font-semibold text-lg'>YouTube</label>
                            <input 
                                type="text" 
                                id="youTubeUrl"
                                name="youTubeUrl"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2 focus:outline-none'
                                placeholder='YouTube link'
                                onChange={formik.handleChange}
                                value={formik.values.youTubeUrl}
                            />
                            {formik.touched.youTubeUrl && formik.errors.youTubeUrl && (
                                <div className="text-red-500">{formik.errors.youTubeUrl}</div>
                            )}

                            {/* Instagram URL */}
                            <label htmlFor="instagramUrl" className='mt-4 mx-6 font-semibold text-lg'>Instagram</label>
                            <input 
                                type="text" 
                                id="instagramUrl"
                                name="instagramUrl"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2 focus:outline-none'
                                placeholder='Instagram link'
                                onChange={formik.handleChange}
                                value={formik.values.instagramUrl}
                            />
                            {formik.touched.instagramUrl && formik.errors.instagramUrl && (
                                <div className="text-red-500">{formik.errors.instagramUrl}</div>
                            )}

                            {/* TikTok URL */}
                            <label htmlFor="tikTokUrl" className='mt-4 mx-6 font-semibold text-lg'>TikTok</label>
                            <input 
                                type="text" 
                                id="tikTokUrl"
                                name="tikTokUrl"
                                className='py-3 mx-6 border-2 border-[#D0D5DD] rounded-md mb-3 px-2 focus:outline-none'
                                placeholder='TikTok username'
                                onChange={formik.handleChange}
                                value={formik.values.tikTokUrl}
                            />
                            {formik.touched.tikTokUrl && formik.errors.tikTokUrl && (
                                <div className="text-red-500">{formik.errors.tikTokUrl}</div>
                            )}

                            {/* Next Button */}
                            <div className="flex justify-center">
                            <button 
                                type="button" 
                                onClick={stepFour} 
                                className='w-[40%] py-2 mx-8 my-5 bg-blue-600 text-white rounded-lg'
                            >
                                NEXT
                            </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BusinessStep3;
