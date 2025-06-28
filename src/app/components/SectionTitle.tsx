// app/components/SectionTitle.tsx


import React from 'react';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4  pb-2">
      {title}
    </h2>
  );
};
