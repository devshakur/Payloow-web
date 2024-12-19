import React, {useState} from 'react'
import Customers from './Customers'
import Analytics from './Analytics';

const ParentCustomer = () => {
    const [step, setStep] = useState('one')
   
    const handleStep = () => {
        setStep('two')
    };
  return (
    <div>
      {step === 'one' && <Customers handleStep={handleStep}/>}
      {step === 'two' && <Analytics/>}
    </div>
  )
}

export default ParentCustomer
