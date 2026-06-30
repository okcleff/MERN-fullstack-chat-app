import React from 'react';

interface GenderCheckboxProps {
  onCheckboxChange: (gender: string) => void;
  selectedGender: string;
}

const GENDERS = ['male', 'female'];

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({
  onCheckboxChange,
  selectedGender,
}) => {
  return (
    <div className="flex gap-2">
      {GENDERS.map((gender) => {
        const isSelected = selectedGender === gender;
        return (
          <button
            type="button"
            key={gender}
            onClick={() => onCheckboxChange(gender)}
            className={`flex-1 rounded-full py-2.5 text-sm capitalize border transition ${
              isSelected
                ? 'bg-brand text-brand-ink border-brand'
                : 'bg-surface text-muted border-line hover:border-brand/40 hover:text-ink'
            }`}
          >
            {gender}
          </button>
        );
      })}
    </div>
  );
};

export default GenderCheckbox;
