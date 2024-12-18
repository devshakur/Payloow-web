import React, {useState} from 'react'
import Registration from './Registration'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

const StepParent = () => {
    const [step, setStep] = useState('zero')
    const openStepTwo = ()=>{
        setTimeout(() => {
            setStep('one')          
        }, 200);
    }
    const openStepThree = ()=>{
            setStep('two')          
      
    }
  return (
    <div>
      {step === 'zero' && <Registration openStepTwo={openStepTwo} />}
      {step === 'one' && <StepTwo openStepThree={openStepThree} />}
      {step === 'two' && <StepThree />}
    </div>
  )
}

export default StepParent
