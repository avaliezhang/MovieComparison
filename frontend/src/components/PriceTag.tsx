import React from 'react';

interface PriceTagProps {
  price: number;
  isBest: boolean;
  provider: string;
  isAvailable: boolean;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, isBest, provider, isAvailable }) => {
  if (!isAvailable) {
    return <p className="text-gray-500 italic">Currently unavailable</p>;
  }

  return (
    <div className="flex items-center">
      <span className={`font-bold text-lg ${isBest ? 'text-green-600' : 'text-gray-700'}`}>
        ${price.toFixed(2)}
      </span>
      {isBest && (
        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
          Best Deal
        </span>
      )}
    </div>
  );
};

export default PriceTag;