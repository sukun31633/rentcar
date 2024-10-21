"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { FaArrowLeft, FaFilter, FaHeart, FaRegHeart } from 'react-icons/fa'; 

function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const [carData, setCarData] = useState([]);
  const [favorites, setFavorites] = useState([]);  // เก็บข้อมูลรถที่ถูกบันทึกเป็น Favorite

  // ดึงข้อมูลจาก query string
  const location = searchParams.get('location');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const startTime = searchParams.get('startTime');
  const endTime = searchParams.get('endTime');

  // ฟังก์ชันเพื่อจัดรูปแบบวันที่เป็น DD-MM-YYYY
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  // ฟังก์ชันเพื่อดึงข้อมูลจาก API
  const fetchCars = async () => {
    try {
      const res = await fetch(`/api/get-cars`); // ดึงข้อมูลรถทั้งหมดจาก API
      const data = await res.json();
      const filteredCars = data.filter(car => car.province === location);
      setCarData(filteredCars); // เก็บข้อมูลรถที่กรองแล้วใน state
    } catch (error) {
      console.error('Error fetching cars data:', error);
    }
  };

  // ดึงข้อมูลรายการโปรดจากฐานข้อมูล
  const fetchFavorites = async () => {
    try {
      const res = await fetch('/api/favorites');
      const data = await res.json();
      setFavorites(data.map(fav => fav.id));  // เก็บเฉพาะ id ของรถที่เป็น favorite
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // ฟังก์ชันเพื่อบันทึก/ลบรายการโปรด
  const toggleFavorite = async (carId) => {
    try {
      const res = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ car_id: carId })
      });

      const result = await res.json();
      if (result.success) {
        setFavorites(prevFavorites =>
          prevFavorites.includes(carId)
            ? prevFavorites.filter(id => id !== carId) // ลบออกจากรายการโปรด
            : [...prevFavorites, carId] // เพิ่มในรายการโปรด
        );
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // โหลดข้อมูลรถและรายการโปรดเมื่อหน้าโหลด
  useEffect(() => {
    fetchCars();
    fetchFavorites();
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
              {startDate && endDate 
                ? `${formatDate(startDate)} ${startTime} - ${formatDate(endDate)} ${endTime}`
                : 'ไม่มีข้อมูล'}
            </p>
          </div>
          <button 
            className="text-orange-500"
            onClick={() => router.push('/main-filter')}  // นำทางไปหน้าฟิลเตอร์
          >
            <FaFilter size={18} />
          </button>
        </div>
        <div className="mt-2">
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={() => router.push('/recommended-filter')} // นำทางไปหน้าตัวกรองการค้นหา
          >
            รถเช่าแนะนำ
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
              <div className="absolute top-0 left-0 bg-orange-500 text-white px-3 py-1 rounded-tr-lg rounded-br-lg">
                ลด 50%
              </div>

              <div className="w-1/3">
                <img src={`/image/${car.image}`} alt={car.name} className="w-full h-32 object-cover rounded-lg" />
              </div>

              <div className="w-2/3 pl-4 relative">
                <button
                  className="absolute top-0 right-0 text-gray-500"
                  onClick={() => toggleFavorite(car.id)} // เรียกฟังก์ชัน toggleFavorite เมื่อคลิก
                >
                  {favorites.includes(car.id) ? (
                    <FaHeart className="text-red-500" size={24} />
                  ) : (
                    <FaRegHeart className="text-gray-500" size={24} />
                  )}
                </button>

                <h2 className="text-lg font-semibold">
                  {car.name || 'ไม่ระบุชื่อ'} {car.year && `(${car.year})`}
                </h2>
                <p className="text-sm text-gray-500">รุ่น: {car.model}</p>
                <p className="text-sm text-gray-500">เกียร์: {car.transmission}</p>
                <p className="text-sm text-gray-500">ที่นั่ง: {car.passenger_capacity}</p>
                <p className="text-sm text-gray-500">จังหวัด: {car.province}</p>

                <div className="flex items-center mt-2">
                  <img src={`/image/${car.owner_image}`} alt="Owner" className="w-8 h-8 rounded-full object-cover mr-2" />
                  <p className="text-sm text-gray-500">ผู้ลงชื่อ: {car.owner_name || 'ไม่ระบุ'}</p>
                </div>

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
                   onClick={() =>
                   router.push(
                   `/car-details/${car.id}?location=${encodeURIComponent(location)}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`
                   )
                  }
                >
                ดูรายละเอียด
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
