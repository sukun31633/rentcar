"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // ใช้ useRouter จาก next/navigation
import { FaArrowLeft } from 'react-icons/fa'; // ใช้ไอคอนลูกศรย้อนกลับ

function MessagesPage() {
    const router = useRouter();

    // ฟังก์ชันสำหรับย้อนกลับไปยังหน้าก่อนหน้า
    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
            {/* Header พร้อมปุ่มย้อนกลับ */}
            <header className="bg-white shadow p-4 flex items-center justify-between">
                <button onClick={handleBack} className="text-gray-600">
                    ←
                </button>
                <h1 className="text-center text-lg font-semibold flex-grow">
                    ข้อความ
                </h1>
            </header>

            {/* เนื้อหาของหน้าข้อความ */}
            <main className="flex-grow p-4">
                <div className="p-4">
                    <h1 className="text-2xl font-bold">หน้าข้อความ</h1>
                    <p>ดูข้อความของคุณที่นี่</p>
                </div>
            </main>
        </div>
    );
}

export default MessagesPage;
