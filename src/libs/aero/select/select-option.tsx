import React from 'react';

type OptionProps = {
  text: React.ReactNode;
  onClick?: () => void;
};

export const SelectOption: React.FC<OptionProps> = ({ text, onClick }) => (
  <p
    className="px-4 py-2 text-sm cursor-pointer hover:bg-muted-hover transition-colors"
    onClick={onClick}
  >
    {text}
  </p>
);
