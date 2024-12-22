import React, {useState} from 'react'
import Registration from './Registration'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import { useRouter } from '../../../Routes/router'

const StepParent = () => {
    const [step, setStep] = useState('zero')
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const openStepTwo = ()=>{
        setTimeout(() => {
          setActiveIndex(0);
            setStep('one')          
        }, 200);
    }
    const openStepThree = ()=>{
      setActiveIndex(1);
            setStep('two')          
      
    }
 

    const handleExit = ()=>{
      router.reload()
    }
  return (
    <div>
            {step === 'zero' && <Registration openStepTwo={openStepTwo} />}
            
       <header className='flex justify-between items-center mx-8 mt-8 border-b-4'>
                <div className="flex shrink-0 items-center">
                    <img
                        alt="Paylow Logo"
                        src="/images/logo.svg"
                        className="h-14 w-auto"
                    />
                </div>
                <div className='mt-2'>
                    <p onClick={handleExit} className='font-poppins font-medium text-2xl text-blue-600 cursor-pointer'>Exit</p>
                </div>
            </header>
            <div className='flex justify-center'>
            <ul className='flex gap-4 my-4 border-b-2 border-blue-500 py-3 px-4 cursor-pointer'>
                <li 
                    onClick={openStepTwo} 
                    className={`font-poppins text-lg font-medium ${activeIndex === 0 ? 'text-blue-700' : ''} focus:text-blue-700 active:text-blue-700`}>
                    Personal Info
                </li>
                <li 
                    onClick={openStepThree} 
                    className={`font-poppins text-lg font-medium ${activeIndex === 1 ? 'text-blue-700' : ''}`}>
                    Financial Info
                </li>
            </ul>
        </div>

      {step === 'one' && <StepTwo openStepThree={openStepThree} />}
      {step === 'two' && <StepThree />}
    </div>
  )
}

export default StepParent
