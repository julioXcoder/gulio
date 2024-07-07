import React from "react";

const Features = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
        <div>
          <h4 className="text-lg sm:text-xl font-semibold">
            Customer Satisfaction Rate
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">
            99.95%
          </p>
          <p className="mt-1 text-gray-500 dark:text-neutral-500">
            in fulfilling orders
          </p>
        </div>

        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-neutral-200">
            Products Delivered
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">
            2,000+
          </p>
          <p className="mt-1 text-gray-500 dark:text-neutral-500">
            We've successfully delivered over 2,000 products to homes and
            businesses across Mbeya.
          </p>
        </div>

        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-neutral-200">
            Satisfied Customers Monthly
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">
            10,000+
          </p>
          <p className="mt-1 text-gray-500 dark:text-neutral-500">
            Join over 10,000 happy shoppers every month who trust Gulio for
            their everyday needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
