"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

function BookingPage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
            {/* Header */}
            <header className="bg-white shadow p-4 flex items-center justify-between">
                <button onClick={handleBack} className="text-gray-600">
                    ←
                </button>
                <h1 className="text-center text-lg font-semibold flex-grow">
                    จองรถเช่า
                </h1>
            </header>

            {/* Content */}
            <main className="flex-grow p-4">
                <div className="p-4">
                    <h1 className="text-2xl font-bold">หน้าการจอง</h1>
                    <p>จองรถของคุณได้ที่นี่</p>
                </div>
            </main>
        </div>
    );
}

export default BookingPage;
