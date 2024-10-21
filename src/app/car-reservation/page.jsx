"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';

function CarReservationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ดึงข้อมูลจาก searchParams
  const carId = searchParams.get('carId');
  const location = searchParams.get('location') || 'ไม่ระบุสถานที่';
  const startDate = searchParams.get('startDate') || 'ไม่ระบุวันที่เริ่มต้น';
  const endDate = searchParams.get('endDate') || 'ไม่ระบุวันที่สิ้นสุด';
  const startTime = searchParams.get('startTime') || 'ไม่ระบุเวลาเริ่มต้น';
  const endTime = searchParams.get('endTime') || 'ไม่ระบุเวลาสิ้นสุด';

  const [carDetails, setCarDetails] = useState(null);
  const [discountCode, setDiscountCode] = useState(''); // เก็บรหัสส่วนลดที่ผู้ใช้กรอก
  const [discountAmount, setDiscountAmount] = useState(0); // เก็บจำนวนเงินส่วนลด
  const [discountError, setDiscountError] = useState(''); // เก็บข้อความแจ้งเตือนเมื่อรหัสส่วนลดไม่ถูกต้อง

  const fetchCarDetails = async () => {
    try {
      const res = await fetch(`/api/get-cars`);
      const data = await res.json();
      const car = data.find((car) => car.id === parseInt(carId));
      setCarDetails(car);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  useEffect(() => {
    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  // ฟังก์ชันตรวจสอบรหัสส่วนลด
  const applyDiscount = () => {
    if (discountCode === 'HAPPY99') {
      setDiscountAmount(200);
      setDiscountError(''); // ล้างข้อความแจ้งเตือนเมื่อรหัสถูกต้อง
    } else {
      setDiscountAmount(0);
      setDiscountError('ไม่สามารถใช้ส่วนลดนี้ได้ กรุณาลองอีกครั้ง');
    }
  };

  if (!carDetails) {
    return <p>Loading...</p>;
  }

  // คำนวณจำนวนวันจาก startDate และ endDate
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // คำนวณความต่างของวัน (รวมวันที่สิ้นสุดด้วย)
    const timeDiff = (end.getTime() - start.getTime())+1;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // แปลงเป็นวัน
    return daysDiff;
  };

  const numberOfDays = calculateDays(); // จำนวนวันที่คำนวณได้

  // คำนวณราคาต่อวันหลังลดราคา (สมมติว่าลด 50% เป็นราคาตั้งต้น)
  const discountedPricePerDay = carDetails.rental_price * 0.5;

  // คำนวณยอดรวมสุทธิหลังหักส่วนลดและคูณด้วยจำนวนวัน
  const totalPrice = (discountedPricePerDay * numberOfDays) - discountAmount;

  // Format วันที่และเวลาให้อยู่ในรูปแบบที่ต้องการ
  const formattedStartDate = `${startDate} ${startTime}`;
  const formattedEndDate = `${endDate} ${endTime}`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="bg-white w-full max-w-lg shadow p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold flex-grow text-center">สรุปรายการ</h1>
      </header>

      {/* ส่วนหัวของรถ */}
      <div className="w-full max-w-lg bg-white shadow mt-4 p-4 rounded-lg flex">
        <div className="w-1/3">
          <img
            src={`/image/${carDetails.image}`}
            alt={carDetails.name}
            className="w-full h-24 object-cover rounded-lg"
          />
        </div>
        <div className="ml-4 w-2/3">
          <h2 className="text-md font-bold">{carDetails.name} ({carDetails.year})</h2>
          <p className="text-sm text-gray-500">รุ่น: {carDetails.model}</p>
          <p className="text-sm text-gray-500">เกียร์: {carDetails.transmission}</p>
          <p className="text-sm text-gray-500">จังหวัด: {carDetails.province}</p>
          <div className="flex items-center mt-2">
            <img src={`/image/${carDetails.owner_image}`} alt="Owner" className="w-8 h-8 rounded-full object-cover mr-2" />
            <p className="text-sm text-gray-500">ผู้ลงชื่อ: {carDetails.owner_name || 'ไม่ระบุ'}</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-400 line-through">{carDetails.rental_price} บาท/วัน</p>
            <p className="text-green-600 font-semibold">{discountedPricePerDay} บาท/วัน</p>
          </div>
        </div>
      </div>

      {/* รายละเอียดการจอง */}
      <main className="w-full max-w-lg bg-white shadow mt-4 p-4 rounded-lg">
        <section className="mt-4">
          <h3 className="text-md font-bold mb-2">รายละเอียดการจอง</h3>
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            <div className="flex flex-col">
              <p className="text-sm">{formattedStartDate} - {formattedEndDate}</p>
              <p className="text-xs text-blue-600">{numberOfDays} วัน x {discountedPricePerDay} บาท</p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center border-t border-gray-200 py-2">
              <p className="text-sm">สถานที่รับ-ส่งรถ</p>
              <p className="text-sm text-blue-600">{location}</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 py-2">
              <p className="text-sm">ค่าบริการรับ-ส่งรถ</p>
              <p className="text-sm text-blue-600">ฟรี</p>
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 py-2">
              <p className="text-sm">ค่าบริการนอกเวลาทำการ</p>
              <p className="text-sm text-blue-600">ฟรี</p>
            </div>
          </div>
        </section>

        {/* ป้อนโค้ดส่วนลด */}
        <section className="mt-4">
          <h3 className="text-sm font-semibold mb-2">ใส่รหัสส่วนลด</h3>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="ใส่รหัสส่วนลด"
              className="w-full border rounded px-2 py-2 mr-2"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              style={{ height: '40px' }}
            />
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded whitespace-nowrap"
              style={{ fontSize: '12px', height: '40px' }}
              onClick={applyDiscount}
            >
              ใช้ส่วนลด
            </button>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between items-center text-green-600 text-sm mt-2">
              <p>ส่วนลด:</p>
              <p>-฿{discountAmount}</p>
            </div>
          )}
          {discountError && (
            <div className="flex items-center text-red-500 text-xs mt-2">
              <FaExclamationCircle className="mr-1" />
              {discountError}
            </div>
          )}
        </section>

        {/* ยอดรวมสุทธิ */}
        <div className="mt-4 flex justify-between items-center border-t border-gray-200 py-2">
          <p className="text-sm font-bold">ยอดรวมสุทธิ</p>
          <p className="text-blue-600 font-bold text-lg">฿{totalPrice}</p>
        </div>

        {/* ค่าใช้จ่าย */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm">ค่ามัดจำเพื่อประกันความเสียหาย</p>
          <p className="text-gray-500 text-xs">
            ชำระ ณ วันที่รับรถเท่านั้น และได้รับคืนเมื่อคืนสภาพรถ
          </p>
          <p className="text-blue-600 font-bold mt-2">฿3,000</p>
        </div>

        {/* ปุ่มยืนยันการจอง */}
        <button
  className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg"
  onClick={() =>
    router.push(`/driver-details?carId=${carId}&location=${location}&startDate=${startDate}&endDate=${endDate}&startTime=${startTime}&endTime=${endTime}&totalPrice=${totalPrice}&numberOfDays=${numberOfDays}`)
  }
>
  ถัดไป
</button>
      </main>
    </div>
  );
}

export default CarReservationPage;
