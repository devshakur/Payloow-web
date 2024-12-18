import React, {useState} from 'react'
import BillsLayout from '../Airtime/BillsLayout'
import BillsHeader from '../BillsHeader'
import DataBundles from './DataBundles'
import Confirm from './Confirm'
import ApprovedData from './ApprovedData'
import DataPurchaseFailed from './DataPurchaseFailed'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Data = () => {
    const [selectedPlan, setSelectedPlan] = useState('');
    const formik = useFormik({
        initialValues: {
            phone: '',
            network_id: '',
            variation_id: '',
            amount: '',
            pin: '',
           
        },
        validationSchema: Yup.object({
            network_id: Yup.string().required('Required'),
            amount: Yup.string().required('Required'),
            phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits').required('Required'),
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
    <div className="w-screen h-[100vh] bg-gray-100 overflow-x-hidden overflow-y-auto flex flex-col lg:flex-row">  
    <div className="hidden lg:block">  
        <BillsLayout />   
    </div>  

    {/* Main content */}  
    <div className='lg:flex lg:flex-col flex-1'>  
    <BillsHeader active={active} />
    {active === 'page1' && <DataBundles active={active} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} formik={formik} handleNext={handleNextPage} />}  
    {active === 'page2' && <Confirm selectedPlan={selectedPlan} setActive={setActive} formik={formik} handleThirdPage={handleThirdPage} />}
    {active === 'page3' && <ApprovedData active={active}  />} 
    {active === 'page4' && <DataPurchaseFailed />}   
    </div>
    </div>
  )
}

export default Data
