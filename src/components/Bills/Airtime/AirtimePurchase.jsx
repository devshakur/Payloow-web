import React, { useState } from 'react';
import Airtime from './Airtime'
import ConfirmPurchase from './ConfirmPurchase'
import Approved from './Approved';
import FailedPayment from './FailedPayment';
import BillsLayout from './BillsLayout';
import BillsHeader from '../BillsHeader';
import { useFormik } from 'formik'
import * as Yup from 'yup'


const AirtimePurchase = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const formik = useFormik({
        initialValues: {
            network_id: '',
            amount: '',
            phone: '',
            pin: '',
        },
        validationSchema: Yup.object({
            network_id: Yup.string().required('Required'),
            amount: Yup.string().required('Required'),
            phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits').required('Required'),
            pin: Yup.string().required('required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
                setSubmitting(false);
        },
    })


    const [active, setActive] = useState('page1')
    const handleNextPage = () => {
        setActive('page2')
    }
    const handleThirdPage = () => {
        setActive('page3')
    }
    const handleErrorPage = () => {
        setActive('page4')
    } 
    return (  
        <div className="w-screen h-[100vh] bg-gray-100 overflow-x-hidden overflow-y-auto flex flex-col lg:flex-row">  
        <div className="hidden lg:block">  
            <BillsLayout active={active} isSidebarOpen={isSidebarOpen} />  
        </div>  
    
        {/* Main content */}  
        <div className='lg:flex lg:flex-col flex-1'>  
            <BillsHeader  active={active} /> 
            {active === 'page1' && <Airtime active={active} formik={formik} handleNext={handleNextPage} />}  
            {active === 'page2' && <ConfirmPurchase active={active} setActive={setActive}  formik={formik} handleThirdPage={handleThirdPage} />}  
            {active === 'page3' && <Approved setActive={active} handleErrorPage={handleErrorPage} />}  
            {active === 'page4' && <FailedPayment />}  
        </div>  
    </div>
    );  
}
      

export default AirtimePurchase
