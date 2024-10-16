"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // ดึง useSearchParams เพื่อใช้ดึงข้อมูลจาก query
import { FaArrowLeft, FaFilter } from 'react-icons/fa'; // ใช้ icon

function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ใช้ดึง query string
  const [carData, setCarData] = useState([]);

  // ดึงข้อมูลจาก query string
  const location = searchParams.get('location');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');

  // ฟังก์ชันเพื่อดึงข้อมูลจาก API
  const fetchCars = async () => {
    try {
      const res = await fetch(`/api/get-cars`); // ดึงข้อมูลรถทั้งหมดจาก API
      const data = await res.json();

      // กรองข้อมูลเฉพาะรถที่อยู่ในจังหวัดที่เลือก
      const filteredCars = data.filter(car => car.province === location);

      setCarData(filteredCars); // เก็บข้อมูลรถที่กรองแล้วใน state
    } catch (error) {
      console.error('Error fetching cars data:', error);
    }
  };

  useEffect(() => {
    fetchCars(); // ดึงข้อมูลรถเมื่อโหลดหน้า
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* ส่วนหัว */}
      <header className="bg-white w-full max-w-lg shadow p-4 flex flex-col items-start justify-between">
        <div className="flex justify-between w-full items-center mb-2">
          <button onClick={() => router.back()} className="text-gray-600">
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold">จองรถเช่า</h1>
        </div>

        {/* แสดงสถานที่, วันที่และเวลา */}
        <div className="w-full bg-gray-100 rounded-md p-3 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {location}
            <p className="text-xs">
              {startDate} {startTime} - {endDate} {endTime}
            </p>
          </div>
          {/* แสดงเฉพาะไอคอนกรองสีส้ม */}
          <button className="text-orange-500">
            <FaFilter size={18} />
          </button>
        </div>

        {/* ปุ่มตัวเลือก 'รถทั้งหมด' */}
        <div className="mt-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            รถทั้งหมด
          </button>
        </div>
      </header>

      {/* ผลการค้นหา */}
      <div className="w-full max-w-lg mt-4 space-y-4">
        {carData.length === 0 ? (
          <p className="text-center">ไม่พบรถใน {location}</p>
        ) : (
          carData.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow p-4 flex relative">
              {/* Badge ส่วนลด */}
              {car.discount && (
                <div className="absolute top-0 left-0 bg-orange-500 text-white px-3 py-1 rounded-tr-lg rounded-br-lg">
                  ลด {car.discount}%
                </div>
              )}
              
              {/* รูปภาพรถ */}
              <div className="w-1/3">
                <img src={`/image/${car.image}`} alt={car.name} className="w-full h-32 object-cover rounded-lg" />
              </div>

              {/* ข้อมูลรถ */}
              <div className="w-2/3 pl-4">
                <h2 className="text-lg font-semibold">{car.name || 'ไม่ระบุชื่อ'}</h2>
                <p className="text-sm text-gray-500">รุ่น: {car.model}</p>
                <p className="text-sm text-gray-500">เกียร์: {car.transmission}</p>
                <p className="text-sm text-gray-500">ที่นั่ง: {car.passengerCapacity}</p>
                <p className="text-sm text-gray-500">จังหวัด: {car.province}</p>

                {/* ราคาและปุ่มดูรายละเอียด */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-green-600 font-semibold">
                    {car.rentalPrice} บาท/วัน
                  </p>
                  <button
                    className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md"
                    onClick={() => router.push(`/car-details/${car.id}`)}
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
