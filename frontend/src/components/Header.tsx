import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">MoviePrice Finder</Link>
          <div>
            <p className="text-sm opacity-80">Find the best movie deals</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;