"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ฟังก์ชันเลื่อนภาพ
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // ทุก 3 วินาทีจะเลื่อนไปยังภาพถัดไป
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel relative w-full h-64 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // คำนวณการเลื่อนภาพ
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
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2"
        onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2"
        onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;

