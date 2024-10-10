"use client"; // บอก Next.js ว่านี่คือ Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation แทน next/router
import Header from '../components/Header';  // นำเข้า Header
import Container from '../components/Container'; // นำเข้า Container
import Carousel from '../components/Carousel'; // นำเข้า Carousel

function DataCar() {
  const router = useRouter();
  const [carData, setCarData] = useState([]);

  // ฟังก์ชันเพื่อดึงข้อมูลจาก API
  const fetchCars = async () => {
    try {
      const res = await fetch('/api/get-cars'); // เรียก API ที่สร้าง
      const data = await res.json(); // เปลี่ยนข้อมูลจาก JSON ให้เป็น array
      setCarData(data); // เก็บข้อมูลใน state
    } catch (error) {
      console.error('Error fetching cars data:', error);
    }
  };

  useEffect(() => {
    fetchCars(); // เรียกฟังก์ชันดึงข้อมูลเมื่อโหลดหน้า component
  }, []);

  return (
    <Container>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-0"> 
        {/* ส่วนหัว - ทำให้ Header เต็มความกว้าง */}
        <Header className="w-full" /> 

        {/* ส่วน Carousel - ทำให้ Carousel เต็มความกว้าง */}
        <section className="w-full h-72 mb-8">
          <Carousel images={['/image/bgon1.png', '/image/bgon2.png', '/image/bgon3.png']} />
        </section>

        {/* เนื้อหากลาง - ช่องข้อมูลรถ */}
        <section className="w-full p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">ข้อมูลรถ</h2>

            {/* ปุ่มไปยังหน้า AdminPage */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => router.push('/admin')}
            >
              เพิ่มข้อมูลรถ
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {carData.length === 0 ? (
              <p className="text-center">กำลังโหลดข้อมูล...</p> // ข้อความแจ้งเมื่อข้อมูลยังไม่ถูกโหลด
            ) : (
              carData.map((car) => (
                <div key={car.id} className="bg-gray-200 p-4 rounded-lg flex items-center shadow-md">
                  <img src={`/image/${car.image}`} alt={car.name} className="w-32 h-32 object-cover rounded-md mr-4" />
                  <div>
                    <p className="text-lg font-semibold">ชื่อ: {car.name || 'กรุณาใส่ข้อมูล'}</p>
                    <p>รุ่น: {car.model || 'กรุณาใส่ข้อมูล'}</p>
                    <p>ปี: {car.year || 'กรุณาใส่ข้อมูล'}</p>
                    <p>เกียร์: {car.transmission || 'กรุณาใส่ข้อมูล'}</p>
                    <p>ราคาเช่าต่อวัน: {car.rental_price || 'กรุณาใส่ข้อมูล'} บาท</p>
                    <p>จำนวนที่นั่ง: {car.passenger_capacity || 'กรุณาใส่ข้อมูล'}</p>
                    <p>ความจุกระเป๋า: {car.luggage_capacity || 'กรุณาใส่ข้อมูล'} กระเป๋า</p>
                    <p>อุปกรณ์ภายในรถ: {car.features || 'กรุณาใส่ข้อมูล'}</p>
                    <p>จังหวัด: {car.province || 'กรุณาใส่ข้อมูล'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </Container>
  );
}

export default DataCar;
