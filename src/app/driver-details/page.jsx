"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

function DriverDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ดึงข้อมูลจาก searchParams
  const carId = searchParams.get('carId');
  const location = searchParams.get('location');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');
  const totalPrice = searchParams.get('totalPrice');
  const numberOfDays = searchParams.get('numberOfDays');

  const [driverDetails, setDriverDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // ฟังก์ชันเพื่อจัดการการเปลี่ยนแปลงในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails({ ...driverDetails, [name]: value });
  };

  // ฟังก์ชันเพื่อจัดการการกดปุ่ม "ถัดไป"
  const handleNext = () => {
    if (driverDetails.firstName && driverDetails.lastName && driverDetails.email && driverDetails.phone) {
      // สร้าง URL พร้อมกับ query parameters
      const query = new URLSearchParams({
        carId,
        location,
        startDate,
        endDate,
        startTime,
        endTime,
        totalPrice,
        numberOfDays,
        firstName: driverDetails.firstName,
        lastName: driverDetails.lastName,
        email: driverDetails.email,
        phone: driverDetails.phone
      }).toString();
      
      router.push(`/payment-method?${query}`);
    } else {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="bg-white w-full max-w-lg shadow p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold flex-grow text-center">จองรถเช่า</h1>
      </header>

      <main className="w-full max-w-lg bg-white shadow mt-4 p-4 rounded-lg">
        <h3 className="text-md font-bold mb-4">รายละเอียดของผู้ขับรถ</h3>

        <div className="mb-4">
          <label className="block text-sm font-semibold">ชื่อ</label>
          <input
            type="text"
            name="firstName"
            placeholder="ชื่อ"
            value={driverDetails.firstName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">นามสกุล</label>
          <input
            type="text"
            name="lastName"
            placeholder="นามสกุล"
            value={driverDetails.lastName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">อีเมล</label>
          <input
            type="email"
            name="email"
            placeholder="อีเมลสำหรับยืนยันการจอง"
            value={driverDetails.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">เบอร์โทร</label>
          <input
            type="tel"
            name="phone"
            placeholder="หมายเลขโทรศัพท์มือถือ 10 หลัก"
            value={driverDetails.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* ปุ่มถัดไป */}
        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg"
          onClick={handleNext}
        >
          ถัดไป
        </button>
      </main>
    </div>
  );
}

export default DriverDetailsPage;
