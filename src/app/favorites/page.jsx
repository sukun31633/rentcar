"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

function CarListPage() {
  const router = useRouter();
  const [favoriteCars, setFavoriteCars] = useState([]);

  // ดึงข้อมูลรายการโปรดจาก API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch('/api/favorites');
        const data = await res.json();
        setFavoriteCars(data);
      } catch (error) {
        console.error('Error fetching favorite cars:', error);
      }
    };

    fetchFavorites();
  }, []);

  // ฟังก์ชัน toggleFavorite สำหรับลบรถจากรายการโปรด
  const toggleFavorite = async (carId) => {
    try {
      const res = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ car_id: carId })
      });

      const result = await res.json();
      if (result.success) {
        setFavoriteCars(prevCars =>
          prevCars.filter(car => car.id !== carId) // ลบรถออกจากรายการโปรดใน state
        );
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          <FaArrowLeft />
        </button>
        <h1 className="text-center text-lg font-semibold flex-grow">รายการโปรด</h1>
      </header>

      <main className="flex-grow w-full max-w-md p-4">
        {favoriteCars.length === 0 ? (
          <p className="text-center">ไม่มีรายการโปรด</p>
        ) : (
          favoriteCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow p-4 flex relative mb-4">
              {/* Badge ส่วนลด */}
              <div className="absolute top-0 left-0 bg-orange-500 text-white px-3 py-1 rounded-tr-lg rounded-br-lg">
                ลด 50%
              </div>

              {/* รูปภาพรถ */}
              <div className="w-1/3">
                <img src={`/image/${car.image}`} alt={car.name} className="w-full h-32 object-cover rounded-lg" />
              </div>

              {/* ข้อมูลรถ */}
              <div className="w-2/3 pl-4 relative">
                {/* ไอคอนหัวใจ สำหรับลบจากรายการโปรด */}
                <button
                  className="absolute top-0 right-0 text-gray-500"
                  onClick={() => toggleFavorite(car.id)}
                >
                  <FaHeart className="text-red-500" size={24} />
                </button>

                <h2 className="text-lg font-semibold">
                  {car.name || 'ไม่ระบุชื่อ'} {car.year && `(${car.year})`}
                </h2>
                <p className="text-sm text-gray-500">รุ่น: {car.model}</p>
                <p className="text-sm text-gray-500">เกียร์: {car.transmission}</p>
                <p className="text-sm text-gray-500">ที่นั่ง: {car.passenger_capacity}</p>
                <p className="text-sm text-gray-500">จังหวัด: {car.province}</p>

                {/* ข้อมูลเจ้าของรถ */}
                <div className="flex items-center mt-2">
                  <img src={`/image/${car.owner_image}`} alt="Owner" className="w-8 h-8 rounded-full object-cover mr-2" />
                  <p className="text-sm text-gray-500">ผู้ลงชื่อ: {car.owner_name || 'ไม่ระบุ'}</p>
                </div>

                {/* ราคาเต็มและราคาหลังลด */}
                <div className="flex flex-col mt-2">
                  <div className="text-gray-400 line-through">
                    {car.rental_price ? `${car.rental_price} บาท/วัน` : 'ไม่ระบุราคา'}
                  </div>
                  <div className="text-green-600 font-semibold">
                    {car.rental_price ? `${Math.floor(car.rental_price * 0.5)} บาท/วัน` : 'ไม่ระบุราคา'}
                  </div>
                </div>

                <button
                  className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md"
                  onClick={() => router.push(`/car-details/${car.id}`)}
                >
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default CarListPage;
