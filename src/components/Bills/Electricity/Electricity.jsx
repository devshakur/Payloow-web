import React, {useState} from 'react'
import BillsLayout from '../Airtime/BillsLayout'
import BillsHeader from '../BillsHeader'
import PurchaseElectricity from './PurchaseElectricity'
import ConfirmElectricity from './ConfirmElectricity'
import ApproveElectricity from './ApproveElectricity'
import FailedElectricity from './FailedElectricity'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Electricity = () => {
    const formik = useFormik({
        initialValues: {
            phone: '',
            meter_number: '',
            service_id: '',
            variation_id: '',
            amount: '',
            pin: '',
           
        },
        validationSchema: Yup.object({
            phone: Yup.number().integer('Phone number must be digits').required('Required'),
            meter_number: Yup.number().min(11, 'meter number must be 11 digits').required('Required'),
            service_id: Yup.string().required('Required'),
            variation_id: Yup.string().required('Required'),
            amount: Yup.number().required('Required'),
            pin: Yup.string().required('Required'),
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
    <div>
    <div className="w-screen h-[100vh] bg-gray-100 overflow-x-hidden overflow-y-auto flex flex-col lg:flex-row">  
 <div className="hidden lg:block">  
     <BillsLayout />   
 </div>  

 {/* Main content */}  
 <div className='lg:flex lg:flex-col flex-1'>  
 <BillsHeader active={active} />
 {active === 'page1' && <PurchaseElectricity active={active} formik={formik} handleNext={handleNextPage} />}  
 {active === 'page2' && <ConfirmElectricity setActive={setActive} formik={formik} handleThirdPage={handleThirdPage} />}  
 {active === 'page3' && <ApproveElectricity active={active} handleErrorPage={handleErrorPage} />} 
 {active === 'page4' && <FailedElectricity active={active} handleErrorPage={handleErrorPage} />} 
 </div>
 </div>
</div>
  )
}

export default Electricity
