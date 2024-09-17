// app/favorites/page.jsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaThumbsUp, FaHeart, FaUser } from 'react-icons/fa';

function CarListPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const cars = [
    {
      id: 1,
      name: "Mazda 2 2017",
      image: "/car-image.jpg",
      price: "1,999",
      discount: "48%",
      services: [
        "บริการรับส่งสนามบิน",
        "ขับฟรีในพื้นที่",
        "ไม่ต้องใช้บัตรเครดิต"
      ],
      rating: 4.5,
      reviews: 123,
      likes: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <button onClick={handleBack} className="text-gray-600">
          ←
        </button>
        <h1 className="text-center text-lg font-semibold flex-grow">
          รายการโปรด
        </h1>
      </header>

      <main className="flex-grow p-4">
        {cars.map(car => (
          <div key={car.id} className="bg-white shadow-md rounded-md overflow-hidden mb-4 flex">
            <div className="relative w-1/3">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                ลด {car.discount}
              </div>
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">{car.name}</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="flex items-center mr-2"><FaUser className="mr-1" />{car.rating} คะแนน</span>
                  <span className="flex items-center mr-2"><FaThumbsUp className="mr-1" />{car.likes}</span>
                  <span className="flex items-center"><FaHeart className="mr-1" />{car.reviews}</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {car.services.map((service, index) => (
                    <li key={index}>• {service}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-blue-600">{car.price} บาท/วัน</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">ดูรายละเอียด</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default CarListPage;
