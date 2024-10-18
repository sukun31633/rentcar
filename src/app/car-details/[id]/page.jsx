"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaHeart, FaUser, FaStar } from 'react-icons/fa';

function CarDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);

  // ฟังก์ชันเพื่อดึงข้อมูลของรถทั้งหมดจาก API และกรองตาม id
  const fetchCarDetails = async () => {
    try {
      const res = await fetch('/api/get-cars');
      const data = await res.json();
      const car = data.find(car => car.id === parseInt(id));
      setCarDetails(car);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  if (!carDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* ส่วนหัว */}
      <header className="bg-white w-full max-w-lg shadow p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold flex-grow text-center">รายละเอียดรถ</h1>
        <button className="text-red-500">
          <FaHeart size={20} />
        </button>
      </header>

      {/* ส่วนรายละเอียดรถ */}
      <main className="w-full max-w-lg bg-white shadow mt-4 p-4 rounded-lg">
        <div className="relative">
          <img src={`/image/${carDetails.image}`} alt={carDetails.name} className="w-full h-64 object-cover rounded-lg" />
          {/* รูปภาพเพิ่มเติม */}
          <div className="flex space-x-2 mt-2">
            {carDetails.additionalImages?.map((img, index) => (
              <img key={index} src={`/image/${img}`} alt={`Additional ${index}`} className="w-16 h-16 object-cover rounded-md" />
            ))}
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4">{carDetails.name} ({carDetails.year})</h2>
        <p className="text-xl text-blue-600 mt-2">{carDetails.rental_price} บาท/วัน</p>

        {/* ข้อมูลรถ */}
        <section className="mt-4">
          <h3 className="font-semibold">ข้อมูลรถ</h3>
          <ul className="text-sm text-gray-700 mt-2">
            <li>ปีจดทะเบียน: {carDetails.year}</li>
            <li>เกียร์: {carDetails.transmission}</li>
            <li>ประเภท: {carDetails.model}</li>
            <li>ที่นั่ง: {carDetails.passenger_capacity}</li>
            <li>กระเป๋าเดินทาง: {carDetails.luggage_capacity}</li>
          </ul>
        </section>

        {/* อุปกรณ์และสิ่งอำนวยความสะดวก */}
        <section className="mt-4">
          <h3 className="font-semibold">อุปกรณ์และสิ่งอำนวยความสะดวก</h3>
          <p className="text-sm text-gray-700 mt-2">
            {typeof carDetails.features === 'string'
              ? carDetails.features.split(',').map(feature => feature.trim()).join(', ')
              : 'ไม่มีข้อมูล'}
          </p>
        </section>

        {/* ข้อมูลเจ้าของรถ */}
        <section className="mt-4 flex items-center">
          <img src={`/image/${carDetails.owner_image}`} alt="Owner" className="w-12 h-12 rounded-full object-cover mr-2" />
          <div>
            <p className="text-sm font-semibold">{carDetails.owner_name}</p>
            <p className="text-xs text-gray-500"><FaStar className="inline-block text-yellow-400 mr-1" />{carDetails.owner_rating} คะแนน ({carDetails.reviews} รีวิว)</p>
          </div>
        </section>

        {/* ปุ่มจองทันที */}
        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg"
          onClick={() => router.push(`/booking?carId=${carDetails.id}`)}
        >
          จองรถทันที
        </button>
      </main>
    </div>
  );
}

export default CarDetailsPage;
