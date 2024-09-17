// src/app/language/page.jsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const LanguagePage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">ภาษา / Language</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Content */}
            <main className="w-full max-w-md bg-white p-6 rounded shadow mt-4 flex-grow">
                <h2 className="text-lg font-semibold mb-4">ภาษา / Language</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 px-4 bg-white shadow-sm rounded h-16 border border-gray-200">
                        <span className="text-gray-700 font-medium">โปรโมชั่น</span>
                        <span className="text-blue-500 cursor-pointer font-medium">ไทย</span>
                    </div>
                </div>

                {/* Empty space at the bottom */}
                <div className="h-16"></div>
            </main>
        </div>
    );
};

export default LanguagePage;
