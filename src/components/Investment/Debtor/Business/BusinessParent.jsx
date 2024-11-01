import React, {useState} from 'react'
import Business from './Business'
import BusinessStep2 from './BusinessStep2'
import BusinessStep3 from './BusinessStep3'
import BusinessStep4 from './BusinessStep4'

const BusinessParent = () => {
    const [step, setStep] = useState('step1')
    const nextStep = ()=>{
        setStep('step2')
      }
      const stepThree = ()=>{
        setStep('step3')
      }
      const stepFour = ()=>{
        setStep('step4')
      }
  return (
    <>
        {step === 'step1' &&  <Business nextStep={nextStep} /> }
        {step === 'step2' && <BusinessStep2 stepThree={stepThree} />}
        {step === 'step3' && <BusinessStep3 stepFour={stepFour} />}
        {step === 'step4' && <BusinessStep4 />}
        </>
  )
}

export default BusinessParent
