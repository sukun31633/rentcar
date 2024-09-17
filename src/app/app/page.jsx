// src/app/page.js
import React from 'react';
import Header from '../components/Header'; // เปลี่ยนจาก Navbar เป็น Header
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import CarCard from '../components/CarCard';
import DestinationCard from '../components/DestinationCard';
import PromotionCard from '../components/PromotionCard';
import Container from '../components/Container'; // ตรวจสอบการ import ว่าอยู่ที่ถูกต้อง

export const metadata = {
  title: 'หน้าแรก | Rent A Car',
  description: 'เว็บไซต์สำหรับการเช่ารถที่ดีที่สุด',
};

export default function Home() {
  return (
    <Container>
      <main className="bg-gray-100 min-h-screen flex flex-col items-center w-full">
        {/* ใช้ Header แทน Navbar */}
        <Header />

        {/* Carousel Section */}
        <Carousel images={['/image1.jpg', '/image2.jpg', '/image3.jpg']} />

        {/* Latest Cars Section */}
        <section className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">เข้าสู่ล่าสุด</h2>
          <div className="grid grid-cols-2 gap-4">
            <CarCard name="Mazda 3" year="2021" imageSrc="/car1.jpg" />
            <CarCard name="Toyota Altis" year="2019" imageSrc="/car2.jpg" />
          </div>
        </section>

        {/* Popular Cars Section */}
        <section className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">ได้รับความนิยม</h2>
          <div className="grid grid-cols-2 gap-4">
            <CarCard name="Mazda 2" year="2020" imageSrc="/car3.jpg" />
            <CarCard name="Toyota Vios" year="2018" imageSrc="/car4.jpg" />
            {/* เพิ่มรถใหม่ด้วยภาพ car4.png */}
            <CarCard name="New Car" year="2022" imageSrc="/image/car4.png" />
          </div>
        </section>

        {/* Recommended Destinations Section */}
        <section className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">ปลายทางแนะนำ</h2>
          <div className="grid grid-cols-2 gap-4">
            <DestinationCard name="พัทยา" imageSrc="/destination1.jpg" />
            <DestinationCard name="เชียงใหม่" imageSrc="/destination2.jpg" />
          </div>
        </section>

        {/* Promotions Section */}
        <section className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">กิจกรรมพิเศษ</h2>
          <div className="grid grid-cols-2 gap-4">
            <PromotionCard title="ลดราคา 250 บาท" imageSrc="/promo1.jpg" />
            <PromotionCard title="ลดราคา 250 บาท" imageSrc="/promo2.jpg" />
          </div>
        </section>

        <Footer />
      </main>
    </Container>
  );
}
