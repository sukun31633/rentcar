"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

function Header({ session }) {
  return (
    <header className='flex justify-between items-center bg-blue-800 p-4 w-full'>
      <div className='flex items-center space-x-2 flex-1'>
        {/* โลโก้รถเช่า */}
        <Link href="/" className="flex items-center cursor-pointer">
          <Image
            className='object-contain'
            src="/image/car5.png"
            width={70}
            height={70}
            alt='Car Rental Logo'
          />
        </Link>
      </div>

      {/* ไอคอนเพิ่มเติม และการจัดตำแหน่ง */}
      <div className='flex items-center space-x-4'>
        {/* ลิงก์ไปยังหน้า Favorites */}
        <Link href="/favorites" className="relative">
          <Image
            className='object-contain'
            src="/image/h.png"
            width={60}
            height={60}
            alt='Favorites'
          />
        </Link>
        {/* เพิ่มปุ่มออกจากระบบหากมี session */}
        {session && (
          <button 
            onClick={() => signOut()}
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
            ออกจากระบบ
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
