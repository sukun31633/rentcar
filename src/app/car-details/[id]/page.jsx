"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

function CarDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // ฟังก์ชันเพื่อดึงข้อมูลของรถทั้งหมดจาก API และกรองตาม id
  const fetchCarDetails = async () => {
    try {
      const res = await fetch('/api/get-cars');
      const data = await res.json();
      const car = data.find(car => car.id === parseInt(id));
      setCarDetails(car);

      // ตรวจสอบว่ารถคันนี้เป็น favorite หรือไม่
      const favoritesRes = await fetch('/api/favorites');
      const favoritesData = await favoritesRes.json();
      setIsFavorite(favoritesData.some(fav => fav.car_id === car.id));
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  // ฟังก์ชันเพื่อบันทึก/ลบรายการโปรด
  const toggleFavorite = async () => {
    try {
      const res = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ car_id: carDetails.id })
      });

      const result = await res.json();
      if (result.success) {
        setIsFavorite(!isFavorite); // สลับสถานะ favorite
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
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

  // คำนวณราคาหลังลด (สมมติลด 50%)
  const discountedPrice = carDetails.rental_price * 0.5;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* ส่วนหัว */}
      <header className="bg-white w-full max-w-lg shadow p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold flex-grow text-center">รายละเอียดรถ</h1>
        <button onClick={toggleFavorite} className="text-red-500">
          {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
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

        {/* แสดงราคาพร้อมลดราคา */}
        <div className="mt-2">
          <p className="text-gray-500 line-through">{carDetails.rental_price} บาท/วัน</p>
          <p className="text-xl text-blue-600 font-bold">{discountedPrice} บาท/วัน (ลด 50%)</p>
        </div>

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

        {/* ข้อมูลควรรู้ */}
        <section className="mt-4">
          <h3 className="font-semibold">ข้อมูลควรรู้</h3>
          <ul className="text-sm text-gray-700 mt-2 space-y-1">
            <li>1. จองง่ายๆ เพียงกดปุ่ม จองรถคันนี้ และกรอกข้อมูลไม่เกิน 1 นาที</li>
            <li>2. รับหมายเลขการจอง: แต่การจองของคุณยังไม่สำเร็จหากไม่มีผู้ให้บริการติดต่อกลับ</li>
            <li>3. ชำระเงินโดยตรงกับผู้ให้บริการ: โดยจะมีบทมาคิดล่วงหน้าหากมีบริการเพิ่มเติม</li>
            <li>4. ยืนยันการจองโดยผู้ให้บริการ: คุณจะได้รับการยืนยันผ่าน SMS และ email</li>
            <li>5. รับรถ: ตามสถานที่นัดหมายที่ผู้ให้บริการกำหนด</li>
          </ul>
        </section>

         {/* ข้อมูลเจ้าของรถ */}
         <section className="mt-4 flex items-center">
          <img src={`/image/${carDetails.owner_image}`} alt="Owner" className="w-12 h-12 rounded-full object-cover mr-2" />
          <div>
            <p className="text-sm font-semibold">{carDetails.owner_name}</p>
            <p className="text-xs text-gray-500"><FaStar className="inline-block text-yellow-400 mr-1" />{carDetails.owner_rating} คะแนน ({carDetails.reviews} รีวิว)</p>
          </div>
        </section>

        {/* ข้อมูลเพิ่มเติมตามรูปภาพ */}
        <section className="mt-4">
          <h3 className="font-semibold">เวลาทำการ</h3>
          <p className="text-sm text-gray-700 mt-2">8.00-21.00 น.</p>

          <h3 className="font-semibold mt-4">รับส่งนอกเวลาทำการ</h3>
          <p className="text-sm text-gray-700 mt-2">นอกเวลาทำการคิดค่าบริการเพิ่มเติมเที่ยวละ 200 บาท</p>

          <h3 className="font-semibold mt-4">การชำระเงิน</h3>
          <p className="text-sm text-gray-700 mt-2">รับบัตรเครดิต และเงินสด</p>

          <h3 className="font-semibold mt-4">ประกันเสริม</h3>
          <p className="text-sm text-gray-700 mt-2">ไม่มีบริการขายประกันเสริม</p>

          <h3 className="font-semibold mt-4">อุปกรณ์เสริม</h3>
          <p className="text-sm text-gray-700 mt-2">มีบริการเสริม baby seat ฟรี (จำนวนจำกัด)</p>
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
