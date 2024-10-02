import React, { useRef, useEffect } from 'react';  
import '../auth.css';  
import { useRouter } from '../../../Routes/router'; 

const Verification = () => {  
  const router = useRouter();  
  const inputRefs = useRef([]);  

  useEffect(() => {  
    if (inputRefs.current[0]) {  
      inputRefs.current[0].focus();  
    }  
  }, []);  

  const verifyCode = (e) => {  
    e.preventDefault();  
    //collect input value
    router.push('/success');  
  };  

  const handleKeyDown = (event, index) => {  
    if (event.key === 'Backspace') {   
      if (event.target.value === '' && index > 0) {  
        inputRefs.current[index - 1].focus();  
      }  
    }  
  };  

  const handleChange = (event, index) => {  
    const value = event.target.value;  

    if (value.length > 1) {  
      event.target.value = value.slice(0, 1);  
    }  

    if (/^\d$/.test(value) && index < inputRefs.current.length - 1) {  
      inputRefs.current[index + 1].focus();  
    }  
  };  

  return (  
    <div>  
      <main className='bg h-screen w-screen overflow-y-auto flex items-center justify-center'>  
        <div className='vector'>  
          <div className='flex justify-center p-6 items-center'>  
            <span><img src="images/pay.png" alt="" /></span>  
            <span className='font-sans font-bold text-[32px] text-[#3369F4] mt-3'>ayloow</span>  
          </div>  
          <div className='bg-white w-[90vw] h-[400px] max-w-lg p-6 rounded-lg shadow-lg flex flex-col items-center'>  
            <header className='my-9'>  
              <h4 className='flex justify-center font-poppins text-2xl font-semibold text-primary-text leading-9'>Verification</h4>  
              <h6 className='flex justify-center text-lg font-poppins leading-7 font-medium text-primary-text'>Kindly enter the code we sent you</h6>  
            </header>  
            <main className='flex flex-row gap-3 mt-4'>  
              {Array.from({ length: 4 }, (_, index) => (  
                <div className='code' key={index}>  
                  <input  
                    type="text"  
                    className='circle'  
                    maxLength="1"  
                    ref={(el) => (inputRefs.current[index] = el)}  
                    onKeyDown={(e) => handleKeyDown(e, index)}  
                    onChange={(e) => handleChange(e, index)}  
                  />  
                </div>  
              ))}  
            </main>  
            <div className='w-full flex justify-center mt-6'>  
              <button type="submit" onClick={verifyCode} className="h-[55px] w-[80%] bg-[#3369F4] rounded-lg p-4 text-white py-2">  
                Next  
              </button>  
            </div>  
          </div>  
        </div>  
      </main>  
    </div>  
  );  
};  

export default Verification;