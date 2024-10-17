"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

function MainFilterPage() {
  const router = useRouter();
  const [price, setPrice] = useState(1000); // ช่วงราคาที่เลือก
  const [selectedStar, setSelectedStar] = useState(3); // ระดับดาวที่เลือก
  const [selectedReviewScore, setSelectedReviewScore] = useState("ดีเยี่ยม"); // คะแนนรีวิวที่เลือก
  const [carType, setCarType] = useState(""); // ประเภทของรถ
  const [selectedPayment, setSelectedPayment] = useState(""); // ตัวเลือกการชำระเงิน
  const [includeBreakfast, setIncludeBreakfast] = useState(false); // รวมอาหารเช้า toggle

  const handleApplyFilter = () => {
    // ประมวลผลฟิลเตอร์และย้อนกลับไปหน้าผลการค้นหาพร้อมผลการกรอง
    router.back();
  };

  const handleClearFilter = () => {
    // รีเซ็ตค่าฟิลเตอร์ทั้งหมด
    setPrice(1000);
    setSelectedStar(3);
    setSelectedReviewScore("ดีเยี่ยม");
    setCarType("");
    setSelectedPayment("");
    setIncludeBreakfast(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      {/* ตัวกรองที่มีขนาดพอดีกับหน้าต่าง */}
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        {/* ส่วนหัว */}
        <header className="flex items-center">
          <button onClick={() => router.back()} className="text-gray-600">
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold ml-4">ตัวกรองการค้นหา</h1>
        </header>

        {/* เนื้อหาตัวกรอง */}
        <div className="mt-6 space-y-4">
          {/* เรียงตาม */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>เรียงตาม</p>
            <select className="w-full p-2 mt-2 border border-gray-300 rounded-md">
              <option>รถเช่าแนะนำ</option>
              <option>ราคาต่ำสุด</option>
              <option>ราคาสูงสุด</option>
              <option>คะแนนรีวิวสูงสุด</option>
              <option>ใกล้ที่สุด</option>
            </select>
          </div>

          {/* ประเภทของรถ */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>ประเภทของรถ</p>
            <select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            >
              <option value="">ประเภทรถ</option>
              <option value="รถเก๋ง">รถเก๋ง</option>
              <option value="รถกระบะ">รถกระบะ</option>
              <option value="รถตู้">รถตู้</option>
            </select>
          </div>

          {/* ระดับดาว */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>ระดับดาว</p>
            <div className="flex justify-between mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedStar(star)}
                  className={`p-2 rounded-md border ${
                    selectedStar === star
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  {star} ★
                </button>
              ))}
            </div>
          </div>

          {/* คะแนนรีวิว */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>คะแนนรีวิว</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => setSelectedReviewScore("ดี")}
                className={`py-2 px-4 rounded-md ${
                  selectedReviewScore === "ดี"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-500 border"
                }`}
              >
                ดี
              </button>
              <button
                onClick={() => setSelectedReviewScore("ปานกลาง")}
                className={`py-2 px-4 rounded-md ${
                  selectedReviewScore === "ปานกลาง"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-500 border"
                }`}
              >
                ปานกลาง
              </button>
              <button
                onClick={() => setSelectedReviewScore("ดีเยี่ยม")}
                className={`py-2 px-4 rounded-md ${
                  selectedReviewScore === "ดีเยี่ยม"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-500 border"
                }`}
              >
                ดีเยี่ยม
              </button>
            </div>
          </div>

          {/* ช่วงราคา */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>ช่วงราคา</p>
            <input
              type="range"
              min="200"
              max="20000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mt-2"
            />
            <div className="flex justify-between mt-2">
              <span>฿200</span>
              <span>฿{price.toLocaleString()}</span> {/* แสดงราคาที่เลื่อน */}
            </div>
          </div>

          {/* ข้อเสนอพิเศษ */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>ข้อเสนอของที่พัก</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                className={`py-2 px-4 rounded-md ${
                  includeBreakfast ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setIncludeBreakfast(!includeBreakfast)} // Toggle รวมอาหารเช้า
              >
                รวมอาหารเช้า
              </button>
            </div>
          </div>

          {/* การชำระเงิน */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>การชำระเงิน</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                className={`py-2 px-4 rounded-md ${
                  selectedPayment === "ชำระเงินวันรับรถ"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedPayment("ชำระเงินวันรับรถ")}
              >
                ชำระเงินวันรับรถ
              </button>
              <button
                className={`py-2 px-4 rounded-md ${
                  selectedPayment === "จ่ายทันที"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedPayment("จ่ายทันที")}
              >
                จ่ายทันที
              </button>
              <button
                className={`py-2 px-4 rounded-md ${
                  selectedPayment === "ยกเลิกการจองฟรี"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedPayment("ยกเลิกการจองฟรี")}
              >
                ยกเลิกการจองฟรี
              </button>
              <button
                className={`py-2 px-4 rounded-md ${
                  selectedPayment === "ไม่ต้องใช้บัตรเครดิตในการจอง"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setSelectedPayment("ไม่ต้องใช้บัตรเครดิตในการจอง")}
              >
                ไม่ต้องใช้บัตรเครดิตในการจอง
              </button>
            </div>
          </div>

          {/* ปุ่มล้างและใช้ตัวกรอง */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleClearFilter}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md"
            >
              ล้าง
            </button>
            <button
              onClick={handleApplyFilter}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              ใช้ตัวกรอง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFilterPage;
