import React, { useState, useEffect } from 'react';
import { SliderVertical1 } from 'iconsax-react';
import clsx from 'clsx';
import DebtorLayoutPage from '../Debtor/DebtorLayoutPage';
import { Button, Dialog, DialogPanel, DialogTitle, Field, Input } from '@headlessui/react';
import { CloseCircle } from 'iconsax-react';
import Success from './Success';
import useInvestment from './../../../hooks/useInvetment';
import Modal from '../Debtor/Business/BusinessModal/Modal';
import StageTwo from '../Debtor/Business/BusinessModal/StageTwo';
import Loan from '../Debtor/Business/BusinessModal/Loan';
import { Toaster, toast } from 'react-hot-toast';

const Loans = () => {
  const { AddLoan, ViewBusiness, getBusinessInfo } = useInvestment();
  const [data, setData] = useState({
    loan_amount: 0,
    collateral: '',
  });
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [active, setActive] = useState('one'); // To toggle between stages (one and two)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [businessData, setBusinessData] = useState({});
  const [user, setUser] = useState({});
  const [links, setLinks] = useState({});
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [businesslinks, setBusinessLinks] = useState([])

  useEffect(() => {
    const businessDetails = async () => { 
      try {
        const resp = await ViewBusiness();
        let result = resp.data.data.businesses;
        setBusiness(result);
  
        // Fetch loan details for each business as well
        for (let business of result) {
          const loanData = await getBusinessInfo(business.business_id);
          // Add loan data to each business object if available
          const businessWithLoan = {
            ...business,
            loan: loanData?.data?.data?.business?.loan || null,
          };
          setBusiness((prevBusiness) => {
            return prevBusiness.map((item) =>
              item.business_id === businessWithLoan.business_id ? businessWithLoan : item
            );
          });
        }
      } catch (error) {
        console.error('Failed to fetch information on business:', error);
      }
    };
  
    businessDetails();
  }, []);
  

  useEffect(() => {
    if (selectedBusinessId) {
      const businessInfo = async () => { //this get all information on a specific business
        try {
          const resp = await getBusinessInfo(selectedBusinessId);
          const info = resp.data?.data?.business;
          const businessLinks = info.online;
          const documentLinks = info.business_details;
          const users = resp.data?.data?.user;

          if (info) {
            setBusinessData(info);
            setUser(users);
            setLinks(businessLinks);
            setBusinessLinks(documentLinks)
          } else {
            console.error('No business data found.');
            setBusinessData({});
          }
        } catch (error) {
          console.error('Failed to fetch business info:', error);
          setBusinessData({});
        }
      };

      businessInfo();
    }
  }, [selectedBusinessId]);

  // const [selectedBusinessId, setSelectedBusinessId] = useState(null); 

  const addingLoan = async () => {
    const loanData = {
      loan_amount: parseFloat(data.loan_amount),
      collateral: data.collateral,
    };
  
    if (isNaN(loanData.loan_amount) || loanData.collateral.trim() === '') {
      setError('Please fill in all fields correctly');
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
  
      if (!selectedBusinessId) {
        setError('Please select a business first');
        return;
      }
  
      console.log('Selected Business ID:', selectedBusinessId);
      const resp = await AddLoan(selectedBusinessId, loanData);
      if (resp) {
        openSuccessModal();
      }
  
    } catch (error) {
      if (error?.response?.data?.message) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleView = (id) => {
    setSelectedBusinessId(id); // Set the selected business Id
    
   setIsOpen(true); // Open the modal
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openDialog = () => setIsOpened(true);
  const closeDialog = () => setIsOpened(false);

  const openSuccessModal = () => {
    closeDialog();
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  // For stage navigation (One -> Two)
  const goToStageTwo = () => setActive('two');
  const goToStageOne = () => setActive('one');
const openAddLoan = ()=>{
  toast.error('View your business info before adding Loan')
  openDialog();
}
  return (
    <DebtorLayoutPage>
      <main>
        <header className="bg-[#DBE7FE] px-12 shadow-lg rounded-md">
          <h1 className="font-poppins text-[28px] py-4 font-semibold">Add a Loan to Fuel Your Business Growth</h1>
          <p className="lg:w-[70%] my-5 lg:-my-0 text-[22px] font-medium text-black font-poppins">
            Secure the funding your business needs to thrive. Provide the loan details, and take a step closer to bringing your vision to life.
          </p>
          <div className="flex justify-center lg:justify-end lg:relative lg:-top-[9rem]">
            <img src="/images/loan.png" className="h-[15rem]" alt="person" />
          </div>
          <div className="my-9 lg:-my-[12rem]">
            <Button
              onClick={openDialog}
              className="w-full lg:w-1/6 font-poppins rounded-lg bg-[#3369F4] py-3 lg:mb-4 my-5 px-4 mb-4 text-white mt-6 text-xl"
            >
              Add Loan
            </Button>
            <Dialog open={isOpened} as="div" className="relative z-10 focus:outline-none" onClose={closeDialog}>
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-1 lg:inset-x-[5rem] xl:-inset-[-6rem] z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center">
                  <DialogPanel
                    transition
                    className="w-full h-auto mx-4 p-5 max-w-xl rounded-xl bg-white duration-300 ease-out"
                  >
                    <div className="flex justify-between">
                      <DialogTitle as="h3" className="font-semibold text-xl">
                        Add Loan
                      </DialogTitle>
                      <div className="mb-3">
                        <CloseCircle size="30" color="black" onClick={closeDialog} />
                      </div>
                    </div>
                    <form>
                      <Field>
                        <label htmlFor="loan_amount" className="font-poppins text-lg font-semibold">
                          Loan Amount
                        </label>
                        <Input
                          type="number"
                          name="loan_amount"
                          value={data.loan_amount}
                          onChange={handleInputChange}
                          placeholder="Loan Amount"
                          className={clsx(
                            'block w-full border border-black rounded-md bg-[#F1F3F9] py-2 mb-8 px-2 text-xl font-medium cursor-pointer',
                          )}
                        />
                        <label htmlFor="interest_rate" className="font-poppins text-lg font-semibold">
                          Interest Rate
                        </label>
                        <Input
                          type="number"
                          name="interest_rate"
                          placeholder="Interest Rate"
                          className={clsx(
                            'block w-full border border-black rounded-md bg-[#F1F3F9] py-2 mb-8 px-2 text-xl font-medium cursor-pointer',
                          )}
                        />
                        <label htmlFor="collateral" className="font-poppins text-lg font-semibold">
                          Collateral
                        </label>
                        <Input
                          type="text"
                          name="collateral"
                          value={data.collateral}
                          onChange={handleInputChange}
                          placeholder="Collateral"
                          className={clsx(
                            'block w-full border border-black rounded-md bg-[#F1F3F9] py-2 mb-8 px-2 text-xl font-medium cursor-pointer',
                          )}
                        />
                      </Field>
                      <div className="w-full flex lg:flex-row gap-5">
                        <Button
                          onClick={closeDialog}
                          autoFocus
                          className="w-full rounded-lg border border-blue-500 py-3 px-4 text-md text-blue-500 mt-6"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={addingLoan}
                          disabled={loading || !selectedBusinessId} // Disable if no business is selected
                          autoFocus
                          className="w-full rounded-lg bg-[#3369F4] py-3 px-4 text-md text-white mt-6"
                        >
                          {loading ? 'Submitting...' : 'Add Now'}
                        </Button>
                      </div>
                    </form>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
            <Success isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
          </div>
        </header>
        <section className="lg:my-[15rem]">
          <div className="flex justify-between mx-6">
            <h3 className="font-poppins font-medium text-xl">My Businesses</h3>
            <p className="font-poppins text-blue-500 font-medium text-xl">See all</p>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start">
            {business && business.length > 0 ? (
              business.map((startup) => (
                <article key={startup.business_id} className="flex lg:flex-row justify-center my-4 lg:mx-4 w-full lg:w-[30%]">
                  <div className="bg-white w-full lg:py-[5rem] py-3 rounded-lg shadow-lg">
                    <div className="flex justify-between mx-3 lg:-mt-12">
                      <div className="h-10 w-10 flex justify-center items-center bg-gray-300 rounded-[50%]">
                        <SliderVertical1 size="17" color="blue" />
                      </div>
                      <div className="bg-green-200 rounded-md flex justify-center items-center py-3 px-3">
                        <img src="/images/Approved.png" alt={startup.business_name} />
                      </div>
                    </div>
                    <h3 className="font-poppins font-semibold mt-7 text-2xl text-[#1D2433] mx-3">{startup.business_name}</h3>
                    <p className="font-medium font-poppins mt-2 text-xl truncate tracking-wide mx-3 text-[#1D2433CC]">
                      {startup.business_description}
                    </p>
                    <div className="flex my-4 mx-3 justify-between gap-3 lg:mt-9">
                      <h4 className="font-medium font-poppins text-xl">Loans:</h4>
                      <p className="font-semibold font-poppins text-lg"><p className="font-semibold font-poppins text-xl">
                      {startup.loan ? startup.loan.loan_amount : <p className='text-gray-400'>No Available Loan</p>}
                      </p>
                      </p>
                    </div>
                    <div className="mx-4 mt-9 flex gap-4 flex-col lg:-mb-[3rem]">
                      <button onClick={() => openAddLoan()}    className="w-full bg-[#3369F4] py-3 rounded-md text-white font-semibold font-poppins">
                        Add Loan
                      </button>
                      <Button
                        onClick={() => handleView(startup.business_id)}
                        className="w-full border border-blue-300 py-3 rounded-md text-blue-500 font-semibold"
                      >
                        View Business
                      </Button>
                    </div>
                    <Toaster />
                    {active === 'one' && (
                      <Modal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        user={user}
                        setIsActive={setActive}
                        businessData={businessData}
                      />
                    )}
                    {active === 'two' && (
                      <StageTwo
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        setIsActive={setActive}
                        links={links}
                        businesslinks={businesslinks}
                      />
                    )}
                    {active === 'three' && (
                      <Loan
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        setIsActive={setActive}
                        user={user}
                        businessData={businessData} />

                    )}

                  </div>
                </article>
              ))
            ) : (
              <div className="w-full my-4 flex justify-center">
                <p className="text-xl font-semibold font-poppins">No Available Business...</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </DebtorLayoutPage>
  );
};

export default Loans;


