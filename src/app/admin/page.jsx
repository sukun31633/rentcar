"use client"; // บอก Next.js ว่านี่คือ Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ใช้ next/navigation แทน next/router

function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

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
    transmission: '',
    rentalPrice: '',
    passengerCapacity: '',
    luggageCapacity: '',
    features: '',
    province: '', // เพิ่มฟิลด์ข้อมูลจังหวัด
    image: '', // ฟิลด์เลือกรูปภาพรถ
    ownerName: '', // ฟิลด์ชื่อคนลง
    ownerImage: '', // ฟิลด์เลือกรูปคนลง
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // ส่งข้อมูลไปยัง backend (ปรับ endpoint ตามจริง)
      const res = await fetch('/api/save-car', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carDetails),
      });

      if (res.ok) {
        setMessage({ type: 'success', content: 'บันทึกข้อมูลสำเร็จ!' });

        // รีเซ็ตฟอร์มให้กลับเป็นค่าว่าง
        setCarDetails({
          name: '',
          model: '',
          year: '',
          transmission: '',
          rentalPrice: '',
          passengerCapacity: '',
          luggageCapacity: '',
          features: '',
          province: '',
          image: '',
          ownerName: '',
          ownerImage: '',
        });
      } else {
        setMessage({ type: 'error', content: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์' });
    }

    // ตั้งให้ข้อความแจ้งเตือนหายไปหลังจาก 3 วินาที
    setTimeout(() => {
      setMessage({ type: '', content: '' });
    }, 3000);
  };

  return isAdmin ? (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">เพิ่มข้อมูลรถ</h1>

        {/* การแจ้งเตือน */}
        {message.content && (
          <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
            {message.content}
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* ฟิลด์ ชื่อรถ */}
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

          {/* ฟิลด์ รุ่น */}
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

          {/* ฟิลด์ ปี */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ปี:</label>
            <input 
              type="number" 
              name="year" 
              value={carDetails.year} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกปีของรถ"
            />
          </div>

          {/* ฟิลด์ เกียร์ */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">เกียร์:</label>
            <select
              name="transmission"
              value={carDetails.transmission}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">เลือกเกียร์</option>
              <option value="อัตโนมัติ">อัตโนมัติ</option>
              <option value="ธรรมดา">ธรรมดา</option>
            </select>
          </div>

          {/* ฟิลด์ จังหวัด */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">จังหวัด:</label>
            <select
              name="province"
              value={carDetails.province}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">เลือกจังหวัด</option>
              <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
              <option value="เชียงใหม่">เชียงใหม่</option>
              <option value="ภูเก็ต">ภูเก็ต</option>
              <option value="ขอนแก่น">ขอนแก่น</option>
              <option value="นครราชสีมา">นครราชสีมา</option>
            </select>
          </div>

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

          {/* ฟิลด์ เลือกรูปภาพรถ */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">เลือกรูปภาพรถ:</label>
            <select
              name="image"
              value={carDetails.image}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">เลือกรูปภาพ</option>
              <option value="chonda.png">Honda fl5</option>
              <option value="cmazda2.png">Mazda 2</option>
              <option value="cmazda3.png">Mazda 3</option>
              <option value="ctoyota.png">Toyota altis</option>
            </select>
          </div>

          {/* แสดงภาพตัวอย่างรถ */}
          {carDetails.image && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ภาพตัวอย่างรถ:</label>
              <img 
                src={`/image/${carDetails.image}`}  // ใช้เส้นทาง /image/ ที่ถูกต้อง
                alt="Car" 
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}

          {/* ฟิลด์ ชื่อคนลง */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">ชื่อคนลง:</label>
            <input
              type="text"
              name="ownerName"
              value={carDetails.ownerName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกชื่อคนลง"
            />
          </div>

          {/* ฟิลด์ เลือกรูปภาพคนลง */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">เลือกรูปภาพคนลง:</label>
            <select
              name="ownerImage"
              value={carDetails.ownerImage}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">เลือกรูปภาพ</option>
              <option value="hippo.webp">hippo</option>
              <option value="kit.jpg">kit</option>
            </select>
          </div>

          {/* แสดงภาพตัวอย่างคนลง */}
          {carDetails.ownerImage && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ภาพตัวอย่างคนลง:</label>
              <img 
                src={`/image/${carDetails.ownerImage}`}  // ใช้เส้นทาง /image/ ที่ถูกต้อง
                alt="Owner" 
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              บันทึก
            </button>

            {/* ปุ่มไปยังหน้า DataCar */}
            <button 
              type="button" 
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => router.push('/datacar')} // นำไปยังหน้า DataCar
            >
              ดูข้อมูลรถ
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
