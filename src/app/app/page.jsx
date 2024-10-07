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
        <section className="w-full h-64">
          <Carousel images={['/image/bgon1.png', '/image/bgon2.png', '/image/bgon3.png']} />
        </section>

        {/* Latest Cars Section */}
        <section className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">เข้าสู่ล่าสุด</h2>
          <div className="grid grid-cols-2 gap-4">
            <CarCard name="Mazda 3" year="2021" imageSrc="/image/cmazda3.png" />
            <CarCard name="Toyota Altis" year="2019" imageSrc="/image/ctoyota.png" />
          </div>
        </section>

        {/* Popular Cars Section */}
        <section className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">ได้รับความนิยม</h2>
          <div className="grid grid-cols-2 gap-4">
            <CarCard name="Mazda 2" year="2020" imageSrc="/image/cmazda2.png" />
            <CarCard name="Toyota Vios" year="2018" imageSrc="/image/ctoyota.png" />
            <CarCard name="Honda civic fl5" year="2024" imageSrc="/image/chonda.png" />
          </div>
        </section>

        {/* Recommended Destinations Section */}
        <section className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">ปลายทางแนะนำ</h2>
          <div className="grid grid-cols-2 gap-4">
            <DestinationCard name="กรุงเทพ" imageSrc="/image/travelbangkok.png" />
            <DestinationCard name="พิษณุโลก" imageSrc="/image/travelphit.png" />
            <DestinationCard name="ภูเก็ต" imageSrc="/image/travelphuket.png" />
            <DestinationCard name="ทะเลหมอก" imageSrc="/image/travelsee.png" />
            <DestinationCard name="พัทยา" imageSrc="/image/travelya.png" />
          </div>
        </section>

        {/* Promotions Section */}
        <section className="p-4 w-full">
          <h2 className="text-2xl font-bold mb-4">กิจกรรมพิเศษ</h2>
          <div className="grid grid-cols-2 gap-4">
            <PromotionCard title="ลดราคาเหลือ 10000 ฿/day" imageSrc= "/image/honda.png" />
            <PromotionCard title="ลดราคาเหลือ 1000 ฿/day" imageSrc= "/image/mazda2.png" />
            <PromotionCard title="ลดราคาเหลือ 1800 ฿/day" imageSrc="/image/mazda3.png" />
            <PromotionCard title="ลดราคาเหลือ 500 ฿/day" imageSrc= "/image/toyota.png" />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </Container>
  );
}
