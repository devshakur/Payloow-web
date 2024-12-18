import React from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input } from '@headlessui/react';
import ReactSearchBox from "react-search-box";
import { SearchNormal1, Clock } from 'iconsax-react';
import clsx from 'clsx';
const ViewRequestLoan = (isOpen, setIsOpen, current, setCurrent) => {
  
    return (
        <div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10 focus:outline-none">
                <div className="fixed inset-0 z-10 bg-black/30 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            className="w-[550px] shadow-md space-y-4 border bg-[#FFFFFF] p-12 duration-300 ease-out"
                        >
                            <div className='flex justify-start'>
                                <DialogTitle as="h3" className="text-2xl relative -top-9 text-[#1D2433] font-medium">
                                    Pay Loan For this Business
                                </DialogTitle>

                            </div>
                            <div className="relative -top-8">
                                <ReactSearchBox
                                    placeholder="Tap here to search business"
                                    value="Doe"
                                    // data={this.data}
                                    callback={(record) => console.log(record)}
                                />
                                <div className='relative -top-8 left-2'>
                                    <SearchNormal1 size="18" color="gray" />
                                </div>
                            </div>
                            <div className='relative -top-14'>
                                <p className='text-[#1D2433] text-xl font-medium'>Your Top Businesses</p>
                            </div>
                            <form className='relative -top-12'>
                                <Field>
                                    <Input
                                        defaultValue={'Startup A'}
                                        readOnly
                                        className={clsx(
                                            'focus mt-3 block w-full rounded-lg bg-[#F1F3F9] py-4 mb-8 px-5 text-xl font-bold cursor-pointer',
                                        )}
                                    />
                                    <Input
                                        defaultValue={'Boutique Bliss'}
                                        readOnly
                                        className={clsx(
                                            'focus mt-3 block w-full rounded-lg bg-[#F1F3F9] py-4 px-5 text-xl font-bold cursor-pointer',
                                        )}
                                    />
                                    <div className='flex justify-between'>
                                        <Input
                                            defaultValue={'Vehance Technology limited'}
                                            readOnly
                                            className={clsx(
                                                'focus mt-5 block w-full text-white rounded-lg bg-blue-700 py-4 px-5 text-md font-bold cursor-pointer',
                                            )}
                                        />
                                        <span className='relative -left-8 top-10'><Clock size="18" color="white" /></span>
                                    </div>
                                </Field>
                            </form>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    onClick={() => {
                                        setCurrent('two')
                                    }}
                                    className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-[5rem] text-sm/6 font-semibold text-white shadow-inner"
                                >
                                    Next
                                </Button>
                            </div>
                            {current === 'two' && <PayLoanModal isOpen={isOpen} onClose={close} setCurrent={setCurrent} />}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ViewRequestLoan
