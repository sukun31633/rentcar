"use client"; // บอก Next.js ว่านี่คือ Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation แทน next/router

function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = "admin"; // ตัวอย่าง role ของ user
    if (userRole !== 'admin') {
      router.push('/'); // ถ้าไม่ใช่ admin จะ redirect ไปหน้าแรก
    } else {
      setIsAdmin(true); // ถ้าเป็น admin สามารถเข้าถึงได้
    }
  }, [router]);

  const [carDetails, setCarDetails] = useState({
    name: '',
    model: '',
    year: '',
<<<<<<< HEAD
    rentalPrice: '',
    passengerCapacity: '',
    luggageCapacity: '',
    features: '',
=======
>>>>>>> 6c6427cc5a0bad81bcb76af083dac59a1ce3b6fa
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleImageUpload = (e) => {
    setCarDetails({ ...carDetails, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(carDetails);
  };

  return isAdmin ? (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">เพิ่มข้อมูลรถ</h1>
        <form onSubmit={handleSave}>
<<<<<<< HEAD
          {/* ฟิลด์ ชื่อรถ */}
=======
>>>>>>> 6c6427cc5a0bad81bcb76af083dac59a1ce3b6fa
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ชื่อรถ:</label>
            <input 
              type="text" 
              name="name" 
              value={carDetails.name} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกชื่อรถ"
            />
          </div>
<<<<<<< HEAD

          {/* ฟิลด์ รุ่น */}
=======
>>>>>>> 6c6427cc5a0bad81bcb76af083dac59a1ce3b6fa
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">รุ่น:</label>
            <input 
              type="text" 
              name="model" 
              value={carDetails.model} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกรุ่นรถ"
            />
          </div>
<<<<<<< HEAD

          {/* ฟิลด์ ปี */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ปี:</label>
            <input 
              type="number" 
=======
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ปี:</label>
            <input 
              type="text" 
>>>>>>> 6c6427cc5a0bad81bcb76af083dac59a1ce3b6fa
              name="year" 
              value={carDetails.year} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกปีของรถ"
            />
          </div>
<<<<<<< HEAD

          {/* ฟิลด์ ราคาเช่าต่อวัน */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ราคาเช่าต่อวัน:</label>
            <input 
              type="number" 
              name="rentalPrice" 
              value={carDetails.rentalPrice} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกราคาเช่าต่อวัน"
            />
          </div>

          {/* ฟิลด์ จำนวนที่นั่ง */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">จำนวนที่นั่ง:</label>
            <input 
              type="number" 
              name="passengerCapacity" 
              value={carDetails.passengerCapacity} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกจำนวนที่นั่ง"
            />
          </div>

          {/* ฟิลด์ ความจุกระเป๋า */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ความจุกระเป๋า:</label>
            <input 
              type="number" 
              name="luggageCapacity" 
              value={carDetails.luggageCapacity} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกความจุกระเป๋า"
            />
          </div>

          {/* ฟิลด์ อุปกรณ์ภายในรถ */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">อุปกรณ์ภายในรถ:</label>
            <textarea
              name="features"
              value={carDetails.features}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกอุปกรณ์ภายในรถ"
            />
          </div>

          {/* ฟิลด์ อัปโหลดรูปภาพ */}
=======
>>>>>>> 6c6427cc5a0bad81bcb76af083dac59a1ce3b6fa
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">อัปโหลดรูปภาพ:</label>
            <input 
              type="file" 
              onChange={handleImageUpload} 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
<<<<<<< HEAD
              multiple  // รองรับอัปโหลดหลายรูป
            />
            {carDetails.image && <img src={carDetails.image} alt="car" className="mt-4 w-32 h-32 object-cover rounded-md" />}
          </div>

=======
            />
            {carDetails.image && <img src={carDetails.image} alt="car" className="mt-4 w-32 h-32 object-cover rounded-md" />}
          </div>
>>>>>>> 6c6427cc5a0bad81bcb76af083dac59a1ce3b6fa
          <div className="flex justify-between items-center">
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <p className="text-center mt-10">กำลังตรวจสอบสิทธิ์...</p>
  );
}

export default AdminPage;
