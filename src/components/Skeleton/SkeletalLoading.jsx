const SkeletonLoader = () => (
    <div className="flex flex-wrap justify-center lg:justify-start">
        {[...Array(3)].map((_, index) => (
            <div key={index} className="flex lg:flex-row justify-center my-4 lg:mx-1 w-full lg:w-[30%]">
                <div className="bg-white w-full lg:py-[5rem] py-3 rounded-lg shadow-lg flex flex-col justify-between">
                    <div className="animate-pulse">
                        <div className="h-9 w-9 bg-gray-300 rounded-[50%] mx-3"></div>
                        <div className="h-6 bg-gray-300 my-4 mx-3 rounded-md"></div>
                        <div className="h-4 bg-gray-300 mx-3 rounded-md"></div>
                        <div className="h-4 bg-gray-300 mx-3 mt-3 rounded-md"></div>
                    </div>
                    <div className="mx-4 mt-7 flex flex-col gap-3">
                        <div className="w-full h-12 bg-gray-300 rounded-md"></div>
                        <div className="w-full h-12 bg-gray-300 rounded-md"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
export default SkeletonLoader