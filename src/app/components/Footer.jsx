import React from 'react';
import { FaCar, FaHome, FaClipboardList, FaEnvelope, FaUser } from 'react-icons/fa';
import Link from 'next/link'; // Import Link จาก Next.js

function Footer() {
  return (
    <footer className="bg-white border-t py-2 fixed bottom-0 w-full shadow-lg z-50">
      <div className="container max-w-screen-lg mx-auto px-4 flex justify-between items-center relative">
        {/* เมนูด้านข้าง */}
        <Link href="/app" className="text-sm text-center flex-1">
          <div className="flex flex-col items-center">
            <FaHome className="h-6 w-6 mb-1 text-gray-600" /> {/* ปรับสีของไอคอน */}
            <span className="text-gray-600">หน้าแรก</span>
          </div>
        </Link>

        <Link href="/booking" className="text-sm text-center flex-1">
          <div className="flex flex-col items-center">
            <FaClipboardList className="h-6 w-6 mb-1 text-gray-600" /> {/* ปรับสีของไอคอน */}
            <span className="text-gray-600">การจอง</span>
          </div>
        </Link>

        {/* ปุ่มค้นหารถเช่า */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 p-3 rounded-full shadow-lg flex items-center justify-center"> {/* ลอยขึ้นมาด้วย -top-10 */}
          <Link href="/search" className="text-white flex flex-col items-center">
            <FaCar className="h-6 w-6 mb-1" /> {/* ขนาดไอคอนรถ */}
            <span className="text-sm">ค้นหารถเช่า</span>
          </Link>
        </div>

        <Link href="/messages" className="text-sm text-center flex-1">
          <div className="flex flex-col items-center">
            <FaEnvelope className="h-6 w-6 mb-1 text-gray-600" /> {/* ปรับสีของไอคอน */}
            <span className="text-gray-600">ข้อความ</span>
          </div>
        </Link>

        <Link href="/more" className="text-sm text-center flex-1">
          <div className="flex flex-col items-center">
            <FaUser className="h-6 w-6 mb-1 text-gray-600" /> {/* ปรับสีของไอคอน */}
            <span className="text-gray-600">อื่นๆ</span>
          </div>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
