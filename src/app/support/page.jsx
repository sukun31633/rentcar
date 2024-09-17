// src/app/support/page.jsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaPhoneAlt } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';

const SupportPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">ศูนย์ช่วยเหลือ</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Content */}
            <main className="w-full max-w-md bg-white p-6 rounded shadow mt-4 flex-grow">
                <h2 className="text-lg font-semibold mb-4">ติดต่อเรา</h2>
                <div className="space-y-4">
                    <div className="flex items-center py-4 px-4 bg-white shadow-sm rounded border border-gray-200">
                        <FaPhoneAlt className="text-blue-500 text-2xl mr-3" />
                        <span className="text-gray-700 font-medium">091-234-5678</span>
                    </div>
                    <div className="flex items-center py-4 px-4 bg-white shadow-sm rounded border border-gray-200">
                        <SiLine className="text-green-500 text-2xl mr-3" />
                        <span className="text-gray-700 font-medium">Line id : @xxxxx</span>
                    </div>
                </div>

                {/* Service Time */}
                <p className="text-gray-500 text-sm mt-4">เวลาให้บริการติดต่อ: 9:00น.-21:00น.</p>
            </main>
        </div>
    );
};

export default SupportPage;
