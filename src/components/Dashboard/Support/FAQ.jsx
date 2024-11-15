import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'


const FAQ = () => {
  return (
    <div className='bg-white rounded-lg md:p-10 p-5'>
      <div className='space-y-3 mb-10'>
        <h3 className="md:text-4xl text-3xl font-semibold">Frequently Asked Questions</h3>
        <p className='max-w-3xl text-[#1D2433CC]'>We’re here to help! Find answers to some of our most common questions below. If you don’t see your question, feel free to reach out to our support team.</p>
      </div>
      <Disclosure as="div" className="faq-container">
        <DisclosureButton className="faq-question">How do i create an account</DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="faq-answer"
          >
            To create an account, click on the <b>&quot;Sign Up&quot;</b>  button at the top of the page. Fill in your information, agree to our terms, and submit. You’ll receive a confirmation email to activate your account.
          </DisclosurePanel>
        </div>
      </Disclosure>

      <Disclosure as="div" className="faq-container">
        <DisclosureButton className="faq-question">What is the refund policy?</DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="faq-answer"
          >
            Our refund policy allows you to request a refund within 30 days of purchase. Please contact our support team with your order details to initiate the process.
          </DisclosurePanel>
        </div>
      </Disclosure>

      <Disclosure as="div" className="faq-container">
        <DisclosureButton className="faq-question">How can I reset my password?</DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="faq-answer"
          >
            To reset your password, click on the <b>&quot;Forgot Password&quot;</b> link on the login page. Enter your email address, and we will send you instructions to reset your password.
          </DisclosurePanel>
        </div>
      </Disclosure>

      <Disclosure as="div" className="faq-container">
        <DisclosureButton className="faq-question">Can I change my subscription plan?</DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="faq-answer"
          >
            Yes, you can change your subscription plan at any time from your account settings. Select the plan you want to switch to and follow the prompts to update your subscription.
          </DisclosurePanel>
        </div>
      </Disclosure>

      {/* <Disclosure as="div" className="faq-container">
        <DisclosureButton className="faq-question">How do I contact customer support?</DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="faq-answer"
          >
            You can contact our customer support team by clicking on the <b>&quot;Contact Us&quot;</b> link at the bottom of the page. Fill out the form with your query, and our team will get back to you as soon as possible.
          </DisclosurePanel>
        </div>
      </Disclosure>

      <Disclosure as="div" className="faq-container">
        <DisclosureButton className="faq-question">Where can I find my order history?</DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="faq-answer"
          >
            Your order history can be found in the <b>&quot;My Orders&quot;</b> section of your account. Log in to your account and navigate to this section to view all your past orders.
          </DisclosurePanel>
        </div>
      </Disclosure>

      <Disclosure as="div" className="faq-container">
        <DisclosureButton className="faq-question">How do I update my billing information?</DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="faq-answer"
          >
            To update your billing information, go to your account settings and select <b>&quot;Billing Information&quot;</b>. Enter your new billing details and save the changes.
          </DisclosurePanel>
        </div>
      </Disclosure>

      <Disclosure as="div" className="faq-container">
        <DisclosureButton className="faq-question">What payment methods are accepted?</DisclosureButton>
        <div className="overflow-hidden">
          <DisclosurePanel
            transition
            className="faq-answer"
          >
            We accept various payment methods including credit/debit cards, PayPal, and other online payment options. You can select your preferred payment method during the checkout process.
          </DisclosurePanel>
        </div>
      </Disclosure> */}

    </div>
  )
}

export default FAQ