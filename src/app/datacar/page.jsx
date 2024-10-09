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
      </div>
    </Container>
  );
}

export default DataCar;
