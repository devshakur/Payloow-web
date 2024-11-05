import React from 'react';
import Select from 'react-select';


const Airtime = ({ handleNext, formik }) => {
    const Networks = [
        { value: 'MTN', label: 'MTN' },
        { value: 'Airtel', label: 'Airtel' },
        { value: 'Glo', label: 'Glo' },
        { value: 'etisalat', label: 'etisalat' }
    ];
    const amounts = ['₦100', '₦200', '₦500', '₦1000'];

    const handlePick = (value) => {
        formik.setFieldValue('amount', value);
    };

    const validateFields = () => {
        const { values } = formik;
        const { network_id, amount, phone } = values;

        
        if (network_id && amount && phone) {
            handleNext(); 
        } else {
            formik.setFieldTouched('network_id', true);
            formik.setFieldTouched('amount', true);
            formik.setFieldTouched('phone', true);
        }
    };

    return (
        <div>
            <main className='pb-[40px]'>
                <div className='w-[100vw] xl:-mt-12 flex justify-center lg:-ml-[-10vw] xl:justify-center'>
                    <div className='w-[95%] md:w-[500px] lg:w-[650px] bg-[#FFFFFF] pb-4 shadow-md rounded-xl overflow-hidden'>
                        <h4 className='flex justify-center text-xl leading-5 font-poppins font-bold my-4'>Buy Airtime</h4>
                        <article className='mx-3 my-12'>
                            <h4 className='text-lg leading-5 font-poppins text-[#000000] font-[550] mx-1'>Most recent</h4>
                            <section className='flex flex-row gap-6 my-4'>
                                <div className='flex flex-col gap-2'>
                                    <img src="./images/mtn.jpg" className='w-[40px] h-[40px] ml-4' alt="mtn" />
                                    <span className='text-[13px] ml-1 font-medium font-poppins leading-5'>07083175021</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <img src="./images/airtel.jpg" alt="airtel" className='w-[40px] h-[40px] ml-4' />
                                    <span className='text-[13px] ml-1 font-medium font-poppins leading-5'>07083175021</span>
                                </div>
                            </section>
                        </article>
                        <form className='w-[95%] mt-5 mx-2 overflow-y-auto'>
                            <label htmlFor="network_id" className='text-[#101928] text-[14px] font-bold mb-2'>Choose Network</label>
                            <Select
                                id="network_id"
                                name="network_id"
                                options={Networks}
                                getOptionValue={(option) => option.value}
                                getOptionLabel={(option) => option.label}
                                onChange={(option) => {
                                    formik.setFieldValue('network_id', option.value);
                                }}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        height: '56px',
                                        width: '95%',
                                        fontWeight: '800',
                                        padding: '5px',
                                        marginBottom: '3vh'
                                    }),
                                }}
                            />
                            <div className='flex flex-row gap-2 py-3'>
                                {amounts.map((item, index) => (
                                    <span 
                                        key={index} 
                                        onClick={() => handlePick(item)} 
                                        className='p-4 rounded-lg leading-5 text-[#000000] flex justify-center items-center text-[16px] font-bold bg-blue-100'
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <label htmlFor="amount" className='text-[#101928] text-[14px] font-bold mb-2'>Amount</label>
                            <input
                                id="outlined-required-2"
                                placeholder='Amount'
                                type='text'
                                name='amount'
                                autoComplete='off'
                                {...formik.getFieldProps('amount')}
                                className='border h-[60px] w-[95%] rounded-lg text-[16px] pl-2 mb-5'
                            />
                            {formik.touched.amount && formik.errors.amount ? (
                                <div style={{ color: 'red', marginTop: "-5px" }}>{formik.errors.amount}</div>
                            ) : null}

                            <label htmlFor="phone" className='text-[#101928] text-[14px] font-bold mb-2'>Phone Number</label>
                            <input
                                id="outlined-required-3"
                                placeholder='PhoneNumber'
                                type='tel'
                                name='phone'
                                autoComplete='off'
                                {...formik.getFieldProps('phone')}
                                className='border h-[60px] w-[95%] rounded-lg text-[14px] pl-2 mb-5'
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div style={{ color: 'red', marginTop: "-5px" }}>{formik.errors.phone}</div>
                            ) : null}

                            <button
                                type="button"
                                className='w-full p-2 bg-blue-600 text-white font-bold rounded-lg mt-4'
                                onClick={validateFields}
                            >
                                Buy Airtime
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Airtime;












