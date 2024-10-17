"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

function RecommendedFilterPage() {
  const router = useRouter();

  const handleApplyFilter = () => {
    // เมื่อประมวลผลฟิลเตอร์เสร็จจะกลับไปหน้าผลการค้นหา
    router.back();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* โมดอลตัวเลือกการเรียงที่อยู่ตรงกลาง */}
      <div className="bg-white w-72 p-4 rounded-lg shadow-lg">
        {/* ส่วนหัว */}
        <header className="flex items-center justify-between">
          <h1 className="text-lg font-bold">เรียงตาม</h1>
          <button onClick={() => router.back()} className="text-gray-600">
            <FaArrowLeft size={20} />
          </button>
        </header>

        {/* ตัวเลือกการเรียง */}
        <ul className="mt-4 space-y-4">
          <li className="flex justify-between items-center cursor-pointer">
            รถเช่าแนะนำ
            <FaArrowLeft />
          </li>
          <li className="flex justify-between items-center cursor-pointer">
            ราคาต่ำสุด
            <FaArrowLeft />
          </li>
          <li className="flex justify-between items-center cursor-pointer">
            ราคาสูงสุด
            <FaArrowLeft />
          </li>
          <li className="flex justify-between items-center cursor-pointer">
            คะแนนรีวิวสูงสุด
            <FaArrowLeft />
          </li>
          <li className="flex justify-between items-center cursor-pointer">
            ใกล้ที่สุด
            <FaArrowLeft />
          </li>
        </ul>

        {/* ปุ่มใช้ตัวกรอง */}
        <button
          onClick={handleApplyFilter}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md w-full"
        >
          ใช้ตัวกรอง
        </button>
      </div>
    </div>
  );
}

export default RecommendedFilterPage;
