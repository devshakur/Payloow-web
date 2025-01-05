
import { useState } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop, } from '@headlessui/react'

export default function AddProductModal({ isOpen, close, productId, formik }) {


    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full mt-10 lg:mt-14  max-w-xl rounded-xl bg-white shadow-lg p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                <h3 className='text-lg font-poppins font-medium text-gray-600'>Enter Product Details</h3>
                            </DialogTitle>
                            <form action="" className='flex flex-col gap-4'>
                                <div className="w-full">
                                    <label htmlFor="name" className='font-medium text-[14px] font-poppins'>Product Name</label>
                                    <input
                                        name='name'
                                        type="text"
                                        placeholder='Phone Name'
                                        className='w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-red-500">{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="category" className='font-medium text-[14px] font-poppins'>Product Category</label>
                                    <select
                                        name="category"
                                        id="category"
                                        className='w-[98%] border border-gray-300 py-3 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
                                        onChange={formik.handleChange}
                                        value={formik.values.category}
                                    >
                                        {productId?.map((item) => (

                                            <option value={item._id}>{item.name}</option>


                                        ))}
                                    </select>
                                    {formik.touched.category && formik.errors.category ? (
                                        <div className="text-red-500">{formik.errors.category}</div>
                                    ) : null}
                                </div>
                                <div className="w-full -mt-2">
                                    <label htmlFor="price" className='font-medium text-[14px] font-poppins'>Price</label>
                                    <input
                                        name='price'
                                        type="number"
                                        placeholder='Phone Price'
                                        className='w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                    />
                                    {formik.touched.price && formik.errors.price ? (
                                        <div className="text-red-500">{formik.errors.price}</div>
                                    ) : null}
                                </div>
                                <div className="w-full -mt-2">
                                    <label htmlFor="stock" className='font-medium text-[14px] font-poppins'>Stock</label>
                                    <input
                                        name='stock'
                                        type="number"
                                        placeholder='How many stock available'
                                        className='w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
                                        onChange={formik.handleChange}
                                        value={formik.values.stock}
                                    />
                                    {formik.touched.stock && formik.errors.stock ? (
                                        <div className="text-red-500">{formik.errors.stock}</div>
                                    ) : null}
                                </div>
                                <div className="w-full -mt-2">
                                    <label htmlFor="colors" className='font-medium text-[14px] font-poppins'>Colors</label>
                                    <input
                                        name="color"
                                        type="text"
                                        placeholder="Enter available colors (e.g., red,blue,green)"
                                        className='w-[98%] border border-gray-300 py-2 focus:outline-none pl-3 rounded-md text-[14px] font-normal'
                                        onChange={(e) => {
                                            const value = e.target.value.split(',').map(color => color.trim());
                                            formik.setFieldValue('color', value);
                                        }}
                                        value={formik.values.color.join(',')} // Join array into a string for display
                                    />
                                    {formik.touched.color && formik.errors.color ? (
                                        <div className="text-red-500">{formik.errors.color}</div>
                                    ) : null}
                                </div>
                                <label htmlFor="description" className='font-medium text-[14px] font-poppins'>Product Description</label>
                                <div className="w-full">
                                    <textarea
                                        name="description"
                                        id="note"
                                        placeholder='Describe the device'
                                        className='border-2 pl-2 rounded-md focus:outline-none -mt-4 border-gray-300 w-[98%]'
                                        cols="20" rows="3"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                    ></textarea>
                                    {formik.touched.description && formik.errors.description ? (
                                        <div className="text-red-500">{formik.errors.description}</div>
                                    ) : null}
                                </div>

                            </form>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={close}
                                >
                                    Got it, thanks!
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}