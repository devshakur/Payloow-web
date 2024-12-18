import React, { useState, useEffect } from 'react';
import InvestorLayoutPage from './InvestorLayoutPage';
import { Sort, SliderVertical1, Book1, Box2, Bubble, Bucket, BuyCrypto, ChartCircle, Drop, Bank, Decred, OceanProtocol } from 'iconsax-react';
import useInvestment from '../../../hooks/useInvetment';
import Modal from '../Debtor/Business/BusinessModal/Modal'; 
import StageTwo from '../Debtor/Business/BusinessModal/StageTwo';
import Loan from '../Debtor/Business/BusinessModal/Loan';
import SkeletonLoader from '../../Skeleton/SkeletalLoading';
import { Toaster, toast } from 'react-hot-toast';
import InvestDialogModal from './InvestDialogModal';


const InvestorBusiness = () => {
    const { GetLoanBusiness, GetFilteredLoanBusiness, InvestInBusiness, getBusinessInfo, getUserDetails } = useInvestment();
    const [data, setData] = useState([]); // For all businesses
    const [businesses, setBusinesses] = useState([]); // Filtered businesses
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState('one');
    const [activeModal, setActiveModal] = useState(null);
    const [businessData, setBusinessData] = useState(null);
    const [user, setUser] = useState({});
    const [links, setLinks] = useState({});
    const [eachId, setEachId] = useState(null); 
    const [businessLinks, setBusinessLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedField, setSelectedField] = useState(null);
    const [users, setUsers] = useState({});
    const [clicked, setClicked] = useState(false);
    const [formData, setFormData] = useState({
        business_id: '',
        investment_amount: 0,
        expected_roi: 0,
        repayment_term: 0
    });

    const field = [
        { name: 'Technology', icon: OceanProtocol },
        { name: 'Finance', icon: Box2 },
        { name: 'HealthCare', icon: Decred },
        { name: 'Education', icon: Book1 },
        { name: 'Agriculture', icon: Bank },
        { name: 'Real Estate', icon: Drop },
        { name: 'Retail', icon: BuyCrypto },
        { name: 'Manufacturing', icon: Bubble },
        { name: 'Construction', icon: ChartCircle },
        { name: 'Transportation', icon: Bucket },
        { name: 'Energy', icon: BuyCrypto },
        { name: 'Food', icon: Decred },
        { name: 'Entertainment', icon: OceanProtocol },
        { name: 'Media', icon: Book1 },
        { name: 'Non-Profit', icon: Drop },
    ];
    useEffect(() => {
        const userDetails = async () => {
            try {
                const resp = await getUserDetails();
                let info = resp?.data?.data?.user;
    
                if(info){
                    setUsers(info)
                }
            } catch (error) {
                console.error("Failed to fetch information on User:", error);
            }
        };

        userDetails();
    }, []);

    useEffect(() => {
        const businessInfo = async () => {
            try {
                if (!eachId) return; 
                const resp = await getBusinessInfo(eachId); 
                const info = resp.data?.data?.business;
                const SocialLinks = info.online;
                const documentLinks = info.business_details;
                const users = resp.data?.data?.user;

                if (info) {
                    setBusinessData(info);
                    setUser(users);
                    setLinks(SocialLinks);
                    setBusinessLinks(documentLinks);
                } else {
                    setBusinessData(null);
                    setLinks({});
                    setBusinessLinks([]);
                }
            } catch (error) {
                console.error('Failed to fetch business info:', error);
                setBusinessData(null);
            }
        };

        businessInfo();
    }, [eachId]);

    // Fetch all businesses on initial load
    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const resp = await GetLoanBusiness();
                setData(resp.data.data.businesses);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching businesses:', error);
                setIsLoading(false);
            }
        };

        fetchBusinessDetails();
    }, []); 


    useEffect(() => {
        const fetchFilteredBusinesses = async () => {
            if (selectedField) {
                try {
                    const resp = await GetFilteredLoanBusiness(selectedField);
                    setBusinesses(resp.data.data.businesses);
                } catch (error) {
                    console.error('Error fetching filtered businesses:', error);
                    toast.error('Error fetching businesses.');
                }
            } else {
                setBusinesses(data); 
            }
        };

        fetchFilteredBusinesses();
    }, [selectedField, data]);

    // Handle field click to filter by industry
    const handleFieldClick = (industry) => {
        setSelectedField(industry);
    };

    // Handle input change for investment form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle investment submission
    const handleInvest = async () => {
        try {
            const resp = await InvestInBusiness(formData);
            if (resp?.data?.data) {
                toast.success('Investment successful');
                setIsOpen(false);
            }
        } catch (error) {
            console.error("Error investing:", error);
            if (error?.response) {
                toast.error(error.response?.data?.message || 'Unknown error occurred');
            }
            setIsOpen(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(0);
    const startupsPerPage = 3; 
    const totalPages = Math.ceil(businesses.length / startupsPerPage);
    const displayStartups = businesses.slice().reverse().slice(currentPage * startupsPerPage, (currentPage + 1) * startupsPerPage);

    // Handle page change for pagination
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleInvestClick = (business) => {
        setFormData({
            ...formData,
            business_id: business.business_id,
        });
        setActiveModal('invest'); 
        setIsOpen(true);
    };

    const handleViewBusinessClick = (businessId) => {
        setEachId(businessId);
        setActiveModal('view'); 
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    return (
        <InvestorLayoutPage>
            <header className="flex justify-between mx-2 my-5 items-center">
                <div>
                    <h3 className="font-poppins text-2xl font-semibold">Welcome {users.first_name}</h3>
                    <p className="font-poppins font-normal my-1 leading-6 text-lg text-[#000000]">
                        Find opportunities and invest in businesses you're passionate about.
                    </p>
                </div>
                <button className="px-5 flex justify-center gap-2 items-center py-3 rounded-xl border border-blue-400">
                    <Sort size="20" color="blue" />
                    <p className="text-lg text-blue-600 font-semibold font-poppins">Filter</p>
                </button>
            </header>

            <section>
                <h3 className="font-poppins font-semibold text-[#1D2433] text-2xl">Explore</h3>
                <ul className="w-[100%] flex-wrap justify-start flex my-3 gap-6">
                    {field.map((item) => (
                        <div
                            key={item.name}
                            className={`flex items-center border-2 border-[#E1E6EF] px-4 py-2 cursor-pointer ${selectedField === item.name ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 text-black'}`}
                            onClick={() => handleFieldClick(item.name)}
                        >
                            <div className="h-11 w-11 mx-3 flex justify-center items-center bg-[#DBE7FE] rounded-[50%]">
                                <item.icon size={18} color={'blue'} />
                            </div>
                            <li className="font-poppins font-medium text-xl text-[#000000]">{item.name}</li>
                        </div>
                    ))}
                </ul>
            </section>

            <article className="my-6">
                <h3 className="font-semibold text-xl text-[#000000] font-poppins">Featured Businesses</h3>
                {isLoading ? (
                    <SkeletonLoader />
                ) : (
                    <div className="flex flex-wrap justify-center lg:justify-start">
                        {displayStartups.length > 0 ? displayStartups.map((startup) => (
                            <article key={startup.business_id} className="flex lg:flex-row justify-center my-4 lg:mx-1 w-full lg:w-[30%]">
                                <div className="bg-white w-full lg:py-[5rem] py-3 rounded-lg shadow-lg flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between mx-3 lg:-mt-12">
                                            <div className="h-9 w-9 flex justify-center items-center bg-gray-300 rounded-[50%]">
                                                <SliderVertical1 size="22" color="blue" />
                                            </div>
                                        </div>
                                        <h3 className="font-poppins font-semibold mt-7 text-2xl text-[#1D2433] mx-3">{startup.business_name}</h3>
                                        <p className="font-poppins capitalize font-semibold mt-2 text-xl tracking-wide mx-3 text-[#1D2433CC]">{startup.industry}</p>
                                        <p className="font-medium font-poppins mt-2 text-xl tracking-wide mx-3 text-[#1D2433CC]">{startup.business_description}</p>
                                    </div>
                                    <div className="mx-4 mt-7 flex flex-col gap-3">
                                        <button onClick={() => handleInvestClick(startup)} className="w-full bg-[#3369F4] py-3 rounded-md text-white font-semibold">
                                            Invest Now
                                        </button>
                                        <button onClick={() => handleViewBusinessClick(startup.business_id)} className="w-full bg-white border border-blue-600 py-3 rounded-md text-blue-600 font-semibold">
                                            View Business
                                        </button>
                                    </div>
                                </div>
                            </article>
                        )) : (
                            <div className="my-6 text-xl font-semibold text-gray-600 flex justify-center">No businesses found for {selectedField}</div>
                        )}
                    </div>
                )}
            </article>

            {/* Pagination controls */}
            <div className="flex justify-center my-4">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Previous
                </button>
                <span className="mx-3">{currentPage + 1} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Next
                </button>
            </div>

            {/* Modal logic */}
            {isOpen && activeModal === 'invest' && (
                <InvestDialogModal
                    click={clicked}
                    setClicked={setClicked}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleInvest={handleInvest}
                    handleModalClose={handleModalClose}
                />
            )}

            {isOpen && activeModal === 'view' && (
                <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    user={user}
                    businessData={businessData}
                    setIsActive={setIsActive}
                />
            )}

            {/* StageTwo and Loan */}
            {isOpen && isActive === 'two' && (
                <StageTwo
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setIsActive={setIsActive}
                    links={links}
                    businesslinks={businessLinks}
                />
            )}

            {isOpen && isActive === 'three' && (
                <Loan
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setIsActive={setIsActive}
                    user={user}
                    businessData={businessData}
                />
            )}

            <Toaster />
        </InvestorLayoutPage>
    );
};
export default InvestorBusiness;