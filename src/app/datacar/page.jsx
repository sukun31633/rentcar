<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // ใช้ useSearchParams เพื่อดึงข้อมูลจาก query string
import Header from '../components/Header';  // นำเข้า Header
import Container from '../components/Container'; // นำเข้า Container
import Carousel from '../components/Carousel'; // นำเข้า Carousel

function DataCar() {
  const searchParams = useSearchParams(); // ใช้เพื่อดึงข้อมูลจาก query string
  const location = searchParams.get('location');
  
  const [carData, setCarData] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]); // เก็บข้อมูลรถที่กรองตาม location

  useEffect(() => {
    // เรียก API เพื่อดึงข้อมูลรถทั้งหมด
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/get-cars'); // ดึงข้อมูลจาก API
        const data = await res.json();
        setCarData(data); // เก็บข้อมูลทั้งหมดใน state
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    // กรองข้อมูลรถตามจังหวัด ถ้าไม่มีจังหวัดที่เลือกแสดงข้อมูลทั้งหมด
    if (location) {
      const filtered = carData.filter(car => car.province === location);
      setFilteredCars(filtered);
    } else {
      setFilteredCars(carData); // ถ้าไม่ได้เลือกจังหวัด ให้แสดงข้อมูลทั้งหมด
    }
  }, [location, carData]);
=======
"use client"; // บอก Next.js ว่านี่คือ Client Component

import React from 'react';
import Header from '../components/Header';  // นำเข้า Header
import Container from '../components/Container'; // นำเข้า Container
import Carousel from '../components/Carousel'; // นำเข้า Carousel
import Footer from '../components/Footer'; // นำเข้า Footer (ถ้ามี)

function DataCar() {
  const carData = [
    { id: 1, name: '', model: '', year: '', details: '', image: '/image/placeholder.png' },
    { id: 2, name: '', model: '', year: '', details: '', image: '/image/placeholder.png' },
    { id: 3, name: '', model: '', year: '', details: '', image: '/image/placeholder.png' },
    { id: 4, name: '', model: '', year: '', details: '', image: '/image/placeholder.png' },
    { id: 5, name: '', model: '', year: '', details: '', image: '/image/placeholder.png' }
  ];
>>>>>>> a5f73163ce99ca9eb31f4faaaebb9de83eead620

  return (
    <Container>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-0"> 
<<<<<<< HEAD
        {/* ส่วนหัว */}
        <Header className="w-full" /> 

        {/* ส่วน Carousel */}
=======
        {/* ส่วนหัว - ทำให้ Header เต็มความกว้าง */}
        <Header className="w-full" /> 

        {/* ส่วน Carousel - ทำให้ Carousel เต็มความกว้าง */}
>>>>>>> a5f73163ce99ca9eb31f4faaaebb9de83eead620
        <section className="w-full h-72 mb-8">
          <Carousel images={['/image/bgon1.png', '/image/bgon2.png', '/image/bgon3.png']} />
        </section>

<<<<<<< HEAD
        {/* แสดงข้อมูลรถ */}
        <section className="w-full p-4">
          <h2 className="text-2xl font-bold mb-4">
            {location ? `รถเช่าในจังหวัด ${location}` : 'รถเช่าทั้งหมด'}
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {filteredCars.length === 0 ? (
              <p className="text-center">ไม่พบข้อมูลรถเช่า</p>
            ) : (
              filteredCars.map((car) => (
                <div key={car.id} className="bg-gray-200 p-4 rounded-lg flex items-center shadow-md">
                  {/* รูปภาพของรถ */}
                  <img src={`/image/${car.image}`} alt={car.name} className="w-32 h-32 object-cover rounded-md mr-4" />
                  
                  {/* ข้อมูลของรถ */}
                  <div className="flex-grow text-sm">
                    <p className="font-semibold">ชื่อ: {car.name}</p>
                    <p>รุ่น: {car.model}</p>
                    <p>ปี: {car.year}</p>
                    <p>เกียร์: {car.transmission}</p>
                    <p>ราคาเช่าต่อวัน: {car.rental_price} บาท</p>
                    <p>จำนวนที่นั่ง: {car.passenger_capacity}</p>
                    <p>ความจุกระเป๋า: {car.luggage_capacity}</p>
                    <p>อุปกรณ์ภายในรถ: {car.features}</p>
                    <p>จังหวัด: {car.province}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
=======
        {/* เนื้อหากลาง - ช่องข้อมูลรถ */}
        <section className="w-full p-4">
          <h2 className="text-2xl font-bold mb-4">ข้อมูลรถ</h2>
          <div className="grid grid-cols-1 gap-6">
            {carData.map((car) => (
              <div key={car.id} className="bg-gray-200 p-4 rounded-lg flex items-center shadow-md">
                <img src={car.image} alt="Placeholder" className="w-32 h-32 object-cover rounded-md mr-4" />
                <div>
                  <p className="text-lg font-semibold">ชื่อ: {car.name || 'กรุณาใส่ข้อมูล'}</p>
                  <p>รุ่น: {car.model || 'กรุณาใส่ข้อมูล'}</p>
                  <p>ปี: {car.year || 'กรุณาใส่ข้อมูล'}</p>
                  <p>รายละเอียด: {car.details || 'กรุณาใส่ข้อมูล'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer (ถ้ามี) */}
        <Footer />
>>>>>>> a5f73163ce99ca9eb31f4faaaebb9de83eead620
      </div>
    </Container>
  );
}

export default DataCar;
