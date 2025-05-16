'use client';

import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { CiCircleInfo } from 'react-icons/ci';

// Color map for plan types
const colorMap = {
  individual: '#377CFD',
  enterprise: '#46ba3c',
  pro: '#6f42c1',
  business: '#ff7f50',
  free: '#17a2b8',
  basic: '#20c997',
  professional: '#6610f2',
  agency: '#e83e8c',
  starter: '#fd7e14',
};

// Descriptions for plan types
const descriptionMap = {
  individual: 'Create an account for yourself and start using.',
  enterprise: 'Create an account for your Organization and start using.',
  pro: 'Professional-grade tools for power users.',
  business: 'Tailored solutions for business teams.',
  free: 'Get started with basic features at no cost.',
  basic: 'Start simple and upgrade when ready.',
  professional: 'Advanced features for professionals.',
  agency: 'Perfect for agencies managing multiple clients.',
  starter: 'All the essentials to get going quickly.',
};

const PlansFeatures = ({ title, plansBenefits }) => {
  const planEntries = Object.entries(plansBenefits || {});
  const gridColsClass = `grid-cols-${Math.min(planEntries.length, 3)}`;

  return (
    <div className="text-[#F4F4F4] p-6 gap-6 flex flex-col bg-[#131314] rounded-3xl border border-[#D0D5DD1A]">
      <div className="flex justify-start items-center">
        <p className="font-bold text-[22.46px] leading-[33.7px]">Deal Terms and Conditions</p>
      </div>

      <div className={`mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:${gridColsClass} gap-6`}>
        {planEntries.map(([planKey, benefits], index) => {
          const color = colorMap[planKey] || '#377CFD'; // fallback color
          const capitalizedName = planKey.charAt(0).toUpperCase() + planKey.slice(1);
          const description = descriptionMap[planKey] || 'Explore this plan and start using.';

          return (
            <div
              key={index}
              className="rounded-3xl flex flex-col gap-16 border border-card p-9 bg-custom-gradient backdrop-blur-custom"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <span className="text-4xl font-medium" style={{ color }}>
                    {capitalizedName}
                  </span>
                  <span className="text-[#AFAFAF]">{description}</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {benefits?.length > 0 ? (
                    benefits.map((benefit, i) => (
                      <li key={i} className="flex flex-row gap-6 items-center">
                        <FaRegCheckCircle className="w-8 h-8" style={{ color }} />
                        <span className="flex flex-row gap-2 items-center">
                          {benefit} <CiCircleInfo />
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-[#AFAFAF] italic">None for this plan</li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlansFeatures;
