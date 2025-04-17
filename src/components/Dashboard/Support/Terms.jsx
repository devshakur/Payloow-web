import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const Terms = () => {
  return (
    <>
      <div className="bg-white rounded-lg md:p-10 p-5">
        <div className="space-y-3 mb-10">
          <h3 className="md:text-4xl text-3xl font-semibold">
            Terms and Condition
          </h3>
          <p className="max-w-3xl text-[#1D2433CC]">
            These Terms and Conditions govern your use of PayLoow's services,
            including bills payment, sales of data and airtime, EasyBuy on solar
            and phone, e-learning, and investment. By accessing or using
            PayLoow's services, you agree to be bound by these Terms.
          </p>
        </div>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">Keynotes</DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              "PayLoow" refers to the PayLoow platform, its affiliates, and
              subsidiaries. - "User" refers to you, the individual or
              organization using PayLoow's services. - "Services" refers to the
              various services offered by PayLoow, including bills payment,
              sales of data and airtime, EasyBuy on solar and phone, e-learning,
              and investment.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Bills Payment
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow allows users to pay bills for various services, including
              electricity, water, and cable TV. Users must provide accurate and
              complete information for bill payments. PayLoow is not responsible
              for any errors or delays in bill payments due to user error or
              incomplete information.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Sales of Data and Airtime
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow allows users to purchase data and airtime for various
              mobile networks. Users must provide accurate and complete
              information for data and airtime purchases. PayLoow is not
              responsible for any errors or delays in data and airtime purchases
              due to user error or incomplete information.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            EasyBuy on Solar and Phone
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow offers EasyBuy services for solar and phone purchases.
              Users can purchase solar panels and phones through PayLoow's
              platform. PayLoow may offer financing options for EasyBuy
              purchases.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            E-Learning
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow offers e-learning services, including online courses and
              tutorials. Users can access e-learning content through PayLoow's
              platform. PayLoow is not responsible for the quality or accuracy
              of e-learning content provided by third-party providers.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Investment
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow offers investment services, allowing users to invest in
              various assets. Users can invest in assets through PayLoow's
              platform. PayLoow is not responsible for any losses or risks
              associated with investments.
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>
      <div className="bg-white rounded-lg mt-6 md:p-10 p-5">
        <div className="space-y-3 mb-10">
          <h3 className="md:text-4xl text-3xl font-semibold">
            Responsibilities
          </h3>
          <p className="max-w-3xl text-[#1D2433CC]">
            Payloow and Users Responsiblities
          </p>
        </div>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            PayLoow Responsibilities
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow is responsible for providing secure and reliable services.
              PayLoow will take reasonable steps to protect user information and
              prevent unauthorized access. PayLoow is not responsible for any
              losses or damages caused by circumstances beyond its control.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Users Responsibilities
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              Users are responsible for maintaining the confidentiality and
              security of their account information. Users are responsible for
              ensuring the accuracy and completeness of information provided for
              transactions. -Users must comply with all applicable laws and
              regulations when using PayLoow's services.
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>
      <div className="bg-white rounded-lg mt-6 md:p-10 p-5">
        <div className="space-y-3 mb-10">
          <h3 className="md:text-4xl text-3xl font-semibold">Refund Policy</h3>
          <p className="max-w-3xl text-[#1D2433CC]">
            At PayLoow, we strive to provide our users with a seamless and
            hassle-free experience. However, we understand that there may be
            instances where a refund is necessary. This Refund Policy outlines
            the procedures and guidelines for requesting and processing refunds.
          </p>
        </div>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Scope of Refund Policy
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              This Refund Policy applies to all services offered by PayLoow,
              including: 1.Bills payment 2.Sales of data and airtime 3. EasyBuy
              on solar and phone 4.E-learning 5.Investment
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Refund Eligibility
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              To be eligible for a refund, users must meet the following
              conditions: 1. Incorrect transaction: The transaction was made in
              error or due to technical issues. 2. Failed transaction: The
              transaction failed due to technical issues or insufficient funds.
              3. Cancellation request: The user requests to cancel a transaction
              before it is processed.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Refund Process
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              To request a refund, users can follow these steps: 1. Contact
              customer support: Reach out to PayLoow's customer support team
              through our website, email, or phone. 2. Provide transaction
              details: Provide the transaction reference number, date, and
              amount. 3. Reason for refund: Specify the reason for the refund
              request.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Refund Methods
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              Refunds will be made using the same payment method used for the
              original transaction.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Fees and Charges
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              1. Transaction fees: Refunds may not include transaction fees. 2.
              Cancellation fees: PayLoow may charge a cancellation fee for
              certain services.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Exceptions
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              1. Irreversible transactions: Refunds may not be possible for
              irreversible transactions, such as data and airtime purchases. 2.
              Investment transactions: Refunds for investment transactions may
              be subject to specific terms and conditions.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            User Responsibilities on Refund
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              1. Provide accurate information: Users must provide accurate and
              complete information for refund requests. 2. Cooperate with
              PayLoow: Users must cooperate with PayLoow's customer support team
              to facilitate the refund process.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Changes to Refund Policy
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow reserves the right to change this Refund Policy at any
              time. Users will be notified of any changes.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Contact Us
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              If you have any questions or concerns about our Refund Policy,
              please contact our customer support team:
              <li> Email: payloow4s@gmail.com</li>
              <li> Phone: 09078959999,09069999463,08098001999 </li>
              <li>Website: www.payloow.com </li>
              By using PayLoow's services, you acknowledge that you have read,
              understand, and agree to be bound by this Refund Policy.
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>
      <div className="bg-white rounded-lg mt-6 md:p-10 p-5">
        <div className="space-y-3 mb-10">
          <h3 className="md:text-4xl text-3xl font-semibold">Privacy Policy</h3>
          <p className="max-w-3xl text-[#1D2433CC]">
            At PayLoow, we are committed to protecting your privacy and ensuring
            the security of your personal information. This Privacy Policy
            outlines how we collect, use, and protect your data when you use our
            services.
          </p>
        </div>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Information We Collect
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              We collect various types of information, including: 1. Personal
              data: Name, email address, phone number, and other contact
              information. 2. Financial data: Bank account details, payment
              information, and transaction history. 3. Transaction data: Records
              of transactions made through our platform. 4. Usage data:
              Information about how you use our services, including login
              history and activity logs.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            How We Use Your Information
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              We use your information to: 1. Provide services: Process
              transactions, manage accounts, and deliver services. 2. Improve
              services: Analyze usage data to enhance our platform and services.
              3. Communicate with you: Respond to inquiries, provide updates,
              and send notifications. 4. Comply with laws: Meet regulatory
              requirements and prevent financial crimes.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Data Sharing and Disclosure
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              We may share your information with: 1. Third-party service
              providers: To facilitate transactions, manage accounts, and
              provide services. 2. Regulatory authorities: To comply with laws
              and regulations. 3. Partners: To offer joint services or
              promotions.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Data Security
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              We implement robust security measures to protect your data,
              including: 1. Encryption: Protecting data in transit and at rest.
              2. Secure servers: Storing data on secure servers with access
              controls. 3. Regular audits: Conducting regular security audits
              and penetration testing.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Your Rights
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              You have the right to: 1. Access your data: Request a copy of your
              personal data. 2. Correct your data: Update or correct
              inaccuracies in your personal data. 3. Delete your data: Request
              deletion of your personal data. 4. Opt-out of marketing:
              Unsubscribe from marketing communications.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Cookies and Tracking
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              We use cookies and tracking technologies to: 1. Enhance user
              experience: Improve navigation and functionality. 2. Analyze
              usage: Track usage patterns and trends. 3. Targeted advertising:
              Display relevant ads based on user behavior.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Changes to Privacy Policy
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow reserves the right to change this Privacy Policy at any
              time. Users will be notified of any changes.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Contact Us
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              If you have any questions or concerns about our Privacy Policy,
              please contact our customer support team:
              <li> Email: payloow4s@gmail.com</li>
              <li> Phone: 09078959999,09069999463,08098001999 </li>
              <li>Website: www.payloow.com </li>
              By using PayLoow's services, you acknowledge that you have read,
              understand, and agree to be bound by this Refund Policy.
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>
      <div className="bg-white rounded-lg mt-6 md:p-10 p-5">
        <div className="space-y-3 mb-10">
          <h3 className="md:text-4xl text-3xl font-semibold">
            Fees and Charges
          </h3>
          <p className="max-w-3xl text-[#1D2433CC]">
            PayLoow may charge fees for its services, including transaction fees
            and service fees. Users are responsible for paying all applicable
            fees and charges. PayLoow reserves the right to change its fees and
            charges at any time.
          </p>
        </div>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Termination
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow reserves the right to terminate or suspend user accounts
              at any time. Users can terminate their accounts by contacting
              PayLoow's customer support.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Dispute Resolution
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              Any disputes or claims arising out of or in connection with these
              Terms shall be resolved through arbitration. Users agree to submit
              to the jurisdiction of the courts in the event of a dispute.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Changes to Terms
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              PayLoow reserves the right to change these Terms at any time.
              Users will be notified of any changes to the Terms.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Governing Law
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              These Terms shall be governed by and construed in accordance with
              the laws of Nigeria.
            </DisclosurePanel>
          </div>
        </Disclosure>
        <Disclosure as="div" className="faq-container">
          <DisclosureButton className="faq-question">
            Entire Agreement
          </DisclosureButton>
          <div className="overflow-hidden">
            <DisclosurePanel transition className="faq-answer">
              These Terms constitute the entire agreement between PayLoow and
              the user. By using PayLoow's services, you acknowledge that you
              have read, understand, and agree to be bound by these Terms
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>
    </>
  );
};

export default Terms;
