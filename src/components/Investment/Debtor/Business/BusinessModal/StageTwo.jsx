import React, {useState} from 'react'
import { Button,Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyText from '../../../../CopyText/CopyText';


const StageTwo = ({isOpen,  setIsOpen, setIsActive, links, businesslinks,}) => {
  const { website, twitter_url, linkedIn_url, facebook_url, youTube_url, instagram_url, tikTok_url } = links
  const {
    financial_statements,
    growth_plans,
loan_requirements

    } = businesslinks

    function open() {
        setIsOpen(false)  
      }
    
      function close() {
        setIsOpen(false)
      }
      function stageOne() {
        setIsActive('one')
      }
      function stageThree() {
        setIsActive('three')
      } 
     
  return (
    <div>
         <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 ">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-[500px] lg:w-[650px] shadow-md space-y-4 border bg-[#FFFFFF] p-12 ">
            
            <DialogTitle className="w-full font-bold flex flex-row">
              <Button onClick={stageOne} className='border border-gray-400 flex-1 py-2 rounded-l-lg text-[#475367] font-poppins font-medium text-lg hover:bg-blue-700 active:bg-blue-700 hover:text-white px-3'>Overview</Button>
              <Button className='border border-gray-400 flex-1  font-poppins font-medium text-l bg-blue-700 text-white'>Links</Button>
              <Button onClick={stageThree} className='border border-gray-400 flex-1 rounded-r-lg text-[#475367] font-poppins font-medium text-lg hover:bg-blue-700 hover:text-white px-3 active:bg-blue-700'>Loan</Button>
            </DialogTitle>
            <div className='border border-[#E1E6EF] py-5 px-2'>
            <Description className=''>
              <p className='font-poppins text-xl text-[#1D2433] font-medium'>Website Link</p>
            </Description>
            <div className='flex justify-between rounded-sm border border-[#E1E6EF] my-4'>
           <p   
        className='text-lg font-semibold text-[#0E3B5D] mx-2 py-1'>{website}</p>
           <div className='flex items-center mx-6 text-black'>
            <CopyText text={website} />
           </div> 
            </div>
            <div className='my-4 flex flex-col gap-4 mx-2'>
           <h4>Social Media Links</h4>
           <div>
            <ul className='flex gap-6 cursor-pointer'>
              <div className='h-14 w-14 rounded-[50%] bg-[#DBE7FE] flex items-center justify-center hover:bg-green-200'>
              <a href={twitter_url} target="_blank" rel="noopener noreferrer">
              <li><img src="/images/X.png" className='h-6' alt="X" /></li>
              </a>
              </div>
              <div className='h-14 w-14 rounded-[50%] bg-[#DBE7FE] flex items-center justify-center hover:bg-green-200'>
              <a href={linkedIn_url} target="_blank" rel="noopener noreferrer">
              <li><img src="/images/Linkdeln.png" className='h-6' alt="Linkedln" /></li>
              </a>
              </div>
              <div className='h-14 w-14 rounded-[50%] bg-[#DBE7FE] flex items-center justify-center hover:bg-green-200'>
              <a href={facebook_url} target="_blank" rel="noopener noreferrer">
              <li><img src="/images/facebook.png" className='h-6' alt="facebook" /></li>
              </a>
              </div>
              <div className='h-14 w-14 rounded-[50%] bg-[#DBE7FE] flex items-center justify-center hover:bg-green-200'>
              <a href={youTube_url} target="_blank" rel="noopener noreferrer">
              <li><img src="/images/Youtube.png" className='h-6' alt="Youtube" /></li>
              </a>
              </div>
              <div className='h-14 w-14 rounded-[50%] bg-[#DBE7FE] flex items-center justify-center hover:bg-green-200'>
              <a href={instagram_url} target="_blank" rel="noopener noreferrer">
              <li><img src="/images/instagram.png" className='h-6' alt="instagram" /></li>
              </a>
              </div>
              <div className='h-14 w-14 rounded-[50%] bg-[#DBE7FE] flex items-center justify-center hover:bg-green-200'>
              <a href={tikTok_url} target="_blank" rel="noopener noreferrer">
              <li><img src="/images/TikTok.png" className='h-6' alt="tiktok" /></li>
              </a>
              </div>
            </ul>
           </div>
            </div>
            <div>
              <h4 className='font-poppins font-semibold text-lg text-[#1D2433] mx-2'>Document Link </h4>
              <div className=''>
              <div className='flex justify-between rounded-sm border border-[#E1E6EF] my-4'>
           <p className='text-lg font-semibold text-[#0E3B5D] mx-2 truncate w-60  py-1'>{financial_statements}</p>
           <div className='flex items-center mx-6 text-black'>
            <CopyText text={financial_statements} />
           </div> 
            </div>
            <div className='flex justify-between rounded-sm border border-[#E1E6EF] my-4'>
           <p className='text-lg font-semibold text-[#0E3B5D] mx-2 py-1 truncate w-60'>{growth_plans}</p>
           <div className='flex items-center mx-6 text-black'>
           <CopyText text={growth_plans} />
           </div>
            </div>
            <div className='flex justify-between rounded-sm border border-[#E1E6EF] my-4'>
           <p className='text-lg font-semibold text-[#0E3B5D] mx-2 truncate w-60  py-1'>{loan_requirements}</p>
           <div className='flex items-center mx-6 text-black'>
           <CopyText text={loan_requirements} />
           </div>
            </div>  
              </div>
            </div>
            </div>
            <div className="flex justify-end">
         <Button onClick={() => setIsOpen(false)} className='w-full lg:w-1/2 rounded-lg bg-[#3369F4] py-3 px-4 text-md text-white text-xl data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500}'>Done</Button>
       </div>
          </DialogPanel>
        </div>
        </div>
      </Dialog>
    </div>
  )
}

export default StageTwo 




