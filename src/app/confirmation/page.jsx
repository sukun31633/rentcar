"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaHome } from 'react-icons/fa';

function ConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // ตั้งเวลารอ 3 วินาทีเพื่อกลับไปยังหน้าแรก
    const timer = setTimeout(() => {
      router.push('/app');
    }, 3000);

    // ล้าง timer เมื่อ component ถูก unmount เพื่อป้องกันการ memory leak
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white max-w-md w-full shadow-lg p-6 rounded-lg flex flex-col items-center">
        <FaCheckCircle size={80} className="text-blue-500 mb-6" />
        <h2 className="text-2xl font-bold text-blue-600 mb-4">ยืนยันการจองรถสำเร็จ</h2>
        <p className="text-gray-600 text-center mb-8">
          กรุณาดูหน้า <span className="font-semibold">การจอง</span> เพื่อตรวจสอบวันเวลานัดหมาย
        </p>
        <button
          onClick={() => router.push('/app')}
          className="bg-blue-500 text-white flex items-center px-6 py-3 rounded-full mb-4"
        >
          <FaHome className="mr-2" />
          กลับหน้าหลัก
        </button>
        <p className="text-gray-400 text-xs">
          ระบบจะกลับหน้าหลักโดยอัตโนมัติ (3 วินาที)
        </p>
      </div>
    </div>
  );
}

export default ConfirmationPage;
