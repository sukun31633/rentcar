"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // นำเข้า useRouter
import { FaHeart, FaCar } from 'react-icons/fa'; // นำเข้า FaCar และ FaHeart ไอคอน
import { signOut } from 'next-auth/react';
import Link from 'next/link'; // นำเข้า Link จาก Next.js
import { useTranslation } from 'react-i18next'; // ใช้ i18next สำหรับการแปลภาษา

function Header({ session }) {
  const router = useRouter(); // เรียกใช้ useRouter
  const { t } = useTranslation(); // ใช้ useTranslation hook เพื่อดึงข้อความที่แปล

  // ฟังก์ชันสำหรับนำทางไปยังหน้าแรก
  const handleLogoClick = () => {
    router.push('/'); // นำทางไปยังหน้า Home
  };

  return (
    <header className='flex justify-between items-center bg-blue-800 p-4 w-full'>
      {/* โลโก้รถเช่า คลิกแล้วกลับไปหน้าแรก */}
      <div className='flex items-center space-x-2 flex-1 cursor-pointer' onClick={handleLogoClick}>
        <FaCar className="text-white text-3xl" /> {/* ใช้ไอคอน FaCar แทนโลโก้ */}
        <span className="ml-2 text-white text-lg font-semibold">{t('carRental')}</span> {/* ข้อความโลโก้ แปลภาษา */}
      </div>

      {/* ไอคอนเพิ่มเติม และการจัดตำแหน่ง */}
      <div className='flex items-center space-x-4'>
        {/* ลิงก์ไปยังหน้า Favorites */}
        <Link href="/favorites">
          <FaHeart className="text-white text-3xl relative" /> {/* ใช้ FaHeart สำหรับลิงก์ Favorites */}
        </Link>

        {/* เพิ่มปุ่มออกจากระบบถ้ามี session */}
        {session && (
          <button 
            onClick={() => signOut()}
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
            {t('signOut')} {/* แปลคำว่า "ออกจากระบบ" */}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
