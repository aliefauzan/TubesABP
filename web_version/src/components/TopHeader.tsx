'use client';

import Link from 'next/link';

const TopHeader = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">KeretaXpress</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
