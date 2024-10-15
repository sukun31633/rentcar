"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa';

function SearchPage() {
    const router = useRouter();
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('10:00');

    const handleSearch = () => {
        // สร้าง query string โดยส่งเฉพาะข้อมูลที่จำเป็น (ถ้ามีการเลือกจังหวัด)
        const query = new URLSearchParams({
            location,
            startDate,
            endDate,
            startTime,
            endTime
        }).toString();

        // นำทางไปยังหน้า datacar พร้อม query string
        router.push(`/datacar?${query}`);
    };

    const handleBack = () => {
        router.back();
    };

    const provinces = [
        "กรุงเทพมหานคร",  "ขอนแก่น", "เชียงใหม่", "นครราชสีมา",  "ภูเก็ต"
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 mb-4 flex items-center justify-between">
                <button onClick={handleBack} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold flex-grow text-center">
                    ค้นหารถเช่า
                </h1>
                <div className="w-6"></div> {/* Placeholder to balance the layout */}
            </header>

            {/* Content */}
            <main className="w-full max-w-md bg-white p-4 rounded shadow space-y-6">
                {/* Dropdown สำหรับเลือกสถานที่ */}
                <div className="relative">
                    <select 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        className="w-full p-3 border rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">ค้นหาตามจังหวัด</option>
                        {provinces.map((province, index) => (
                            <option key={index} value={province}>{province}</option>
                        ))}
                    </select>
                    <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">&#x25BC;</span>
                </div>

                {/* กรอบวันที่รับและวันที่คืนในกรอบเดียวกัน */}
                <div className="border rounded shadow-sm p-4 flex items-center justify-between">
                    <div className="flex-1 flex flex-col items-center">
                        <label className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-500" /> วันที่รับรถ
                        </label>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                            className="p-2 border rounded text-center w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <div className="w-px bg-gray-300 h-full mx-4"></div>
                    <div className="flex-1 flex flex-col items-center">
                        <label className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-500" /> วันที่คืนรถ
                        </label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                            className="p-2 border rounded text-center w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                </div>

                {/* กรอบเวลารับและเวลาคืนในกรอบเดียวกัน */}
                <div className="border rounded shadow-sm p-4 flex items-center justify-between">
                    <div className="flex-1 flex flex-col items-center">
                        <label className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                            <FaClock className="text-blue-500" /> เวลารับรถ
                        </label>
                        <input 
                            type="time" 
                            value={startTime} 
                            onChange={(e) => setStartTime(e.target.value)} 
                            className="p-2 border rounded text-center w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <div className="w-px bg-gray-300 h-full mx-4"></div>
                    <div className="flex-1 flex flex-col items-center">
                        <label className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                            <FaClock className="text-blue-500" /> เวลาคืนรถ
                        </label>
                        <input 
                            type="time" 
                            value={endTime} 
                            onChange={(e) => setEndTime(e.target.value)} 
                            className="p-2 border rounded text-center w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                </div>

                {/* ปุ่มค้นหา */}
                <button 
                    onClick={handleSearch} 
                    className="w-full p-3 bg-blue-500 text-white rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700">
                    ค้นหารถ
                </button>
            </main>
        </div>
    );
}

export default SearchPage;
