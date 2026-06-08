import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <section className="w-full px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl text-center">
        
        {/* Heading */}
        <p className="text-lg font-semibold text-gray-700 sm:text-xl">
          Trusted by Learners From
        </p>

        {/* Company Logos */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
          
          <img
            src={assets.microsoft_logo}
            alt="Microsoft"
            className="h-6 sm:h-8 object-contain"
          />

          <img
            src={assets.adobe_logo}
            alt="Adobe"
            className="h-6 sm:h-8 object-contain"
          />

          <img
            src={assets.walmart_logo}
            alt="Walmart"
            className="h-6 sm:h-8 object-contain"
          />

          <img
            src={assets.accenture_logo}
            alt="Accenture"
            className="h-6 sm:h-8 object-contain"
          />

          <img
            src={assets.paypal_logo}
            alt="PayPal"
            className="h-6 sm:h-8 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Companies;