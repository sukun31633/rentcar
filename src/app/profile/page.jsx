// src/app/profile/page.jsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const ProfilePage = () => {
    const router = useRouter();

    const handleSave = () => {
        // Logic สำหรับการบันทึกข้อมูล เช่น การส่งข้อมูลไปยัง backend
        console.log('Saving profile...');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">ข้อมูลของฉัน</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Content */}
            <main className="flex flex-col justify-between w-full max-w-md bg-white p-6 rounded shadow mt-4 flex-grow">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold mb-4">ข้อมูลของฉัน</h2>
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-gray-600">ชื่อ</label>
                            <input
                                type="text"
                                placeholder="ชื่อ"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600">นามสกุล</label>
                            <input
                                type="text"
                                placeholder="นามสกุล"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600">อีเมล</label>
                            <input
                                type="email"
                                placeholder="อีเมลสำหรับยืนยันการจอง"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-600">เบอร์โทร</label>
                            <input
                                type="tel"
                                placeholder="หมายเลขโทรศัพท์มือถือ 10 หลัก"
                                className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </form>
                </div>

                {/* Save Button */}
                <button
                    type="button"
                    onClick={handleSave}
                    className="w-full p-3 bg-blue-500 text-white rounded-md font-semibold mt-6 focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                    บันทึก
                </button>
            </main>
        </div>
    );
};

export default ProfilePage;
