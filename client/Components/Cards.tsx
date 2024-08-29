import React from "react";
import CardSpotlight from "./ui/CardSpotlight";

const Cards = () => {
  return (
    <div className="py-6 sm:py-8 lg:py-12 mx-auto">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-black dark:text-white mb-5">Pricing Plans</h3>
        <div className="lg:translate-x-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          <CardSpotlight
            name="Basic Plan"
            price="$19"
            features={[
              "Access to basic features",
              "Standard support",
              "Limited usage",
            ]}
          />
          <CardSpotlight
            name="Premium Plan"
            price="$49"
            features={[
              "Access to all features",
              "Priority support",
              "Unlimited usage",
            ]}
          />
          <CardSpotlight
            name="Enterprise Plan"
            price="$99"
            features={[
              "Access to all features",
              "24/7 support",
              "Custom solutions",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
