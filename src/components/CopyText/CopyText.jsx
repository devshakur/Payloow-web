import React, {useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'


const CopyText = ({text}) => {
    const [copyStatuss, setCopyStatuss] = useState(false);
    const onCopyText = () => {
        setCopyStatuss(true);
        setTimeout(() => setCopyStatuss(false), 2000); // Reset status after 2 seconds
      };
  return (
    <>
       <CopyToClipboard text={text} onCopy={onCopyText}>
                       <img src="/images/copy.png" className='h-4 w-4 cursor-pointer' alt="copy" />
                   </CopyToClipboard> 
                   {copyStatuss && (
                       <div className="text-green-500 font-medium ml-3">Copied!</div>
                       )} 
    </>
  )
}

export default CopyText
