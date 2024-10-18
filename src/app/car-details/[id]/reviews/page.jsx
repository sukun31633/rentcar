"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

function ReviewsPage() {
  const router = useRouter();
  

  // สร้างข้อมูลรีวิวปลอมๆ
  const [reviews] = useState([
    { user: 'posidon a.', comment: 'เจ้าของพูดดี', date: 'กุมภาพันธ์ 2019', rating: 5 },
    { user: 'nancy p.', comment: 'เยี่ยม', date: 'เมษายน 2022', rating: 5 },
    { user: 'viva m.', comment: 'เจ้าของเช็คดี', date: 'กุมภาพันธ์ 2019', rating: 5 },
    { user: 'yoba a.', comment: 'รถใหม่สะอาด ', date: 'มกราคม 2020', rating: 5 },
    { user: 'benjita a.', comment: 'สุภาพมากครับ', date: 'กุมภาพันธ์ 2016', rating: 5 },
  ]);

  // คะแนนเฉลี่ย
  const [averageRating] = useState(4.8);
  
  // สถิติการให้คะแนน
  const [ratingBreakdown] = useState({
    ดีมาก: 50,
    ปานกลาง: 30,
    น้อย: 10
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="bg-white w-full max-w-lg shadow p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold flex-grow text-center">คะแนนและรีวิว</h1>
      </header>

      <main className="w-full max-w-lg bg-white shadow mt-4 p-4 rounded-lg">
        {/* แสดงคะแนนเฉลี่ย */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center">
            <FaStar className="text-yellow-400" size={24} />
            <div className="ml-2">
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              <p className="text-sm text-gray-500">รีวิว: {reviews.length}</p>
            </div>
          </div>
        </div>

        {/* แสดงสถิติการให้คะแนน */}
        <div className="border-b pb-4 mb-4">
          {Object.keys(ratingBreakdown).map((key) => (
            <div key={key} className="flex items-center mb-2">
              <span className="text-sm w-16">{key}</span>
              <div className="bg-gray-200 rounded-full w-full h-2 mx-2">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${(ratingBreakdown[key] / 80) * 100}%` }} // สมมติว่ารีวิวทั้งหมดมี 80 รีวิว
                />
              </div>
              <span className="text-sm">{ratingBreakdown[key]}</span>
            </div>
          ))}
        </div>

        {/* รายการรีวิว */}
        <section className="mt-4">
          {reviews.map((review, index) => (
            <div key={index} className="mt-4 border-b pb-4">
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400" />
                <span className="ml-2 font-semibold">{review.user}</span>
              </div>
              <p className="text-xs text-gray-500">รับรถ: {review.date}</p>
              <p className="text-sm mt-1">{review.comment}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default ReviewsPage;
