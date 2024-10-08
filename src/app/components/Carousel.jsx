"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // state สำหรับตรวจสอบว่า mouse โฮเวอร์อยู่หรือไม่

  // ฟังก์ชันเลื่อนภาพอัตโนมัติ
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // เลื่อนภาพทุก 3 วินาที
      return () => clearInterval(interval);
    }
  }, [images.length, isHovered]);

  return (
    <div
      className="carousel relative w-full h-64 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)} // หยุดเลื่อนเมื่อโฮเวอร์
      onMouseLeave={() => setIsHovered(false)} // เริ่มเลื่อนอีกครั้งเมื่อออกจากโฮเวอร์
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="min-w-full">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={1200}
              height={600}
              className="object-cover w-full h-64"
            />
          </div>
        ))}
      </div>
      
      {/* ปุ่มควบคุม */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
