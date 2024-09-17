"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Container from '../components/Container';
import Footer from '../components/Footer';
import { FaUser, FaBell, FaLanguage, FaRegFileAlt, FaHeadset } from 'react-icons/fa';

function MorePage() {
    const router = useRouter();

    const handleLogout = () => {
        // Logic for logout (เช่น การล้าง session หรือ token)
        console.log('Logging out...');
        router.push('/login'); // นำทางไปยังหน้า login
    };

    const menuItems = [
        { icon: <FaUser className="text-orange-500" />, text: "ข้อมูลของฉัน", link: "/profile" },
        { icon: <FaBell className="text-red-500" />, text: "การแจ้งเตือนของแอพ", link: "/notifications" },
        { icon: <FaLanguage className="text-blue-500" />, text: "ภาษา / Language", extra: "ไทย", link: "/language" },
        { icon: <FaRegFileAlt className="text-purple-500" />, text: "นโยบาย", link: "/policy" },
        { icon: <FaHeadset className="text-yellow-500" />, text: "ศูนย์ช่วยเหลือ", link: "/support" },
    ];

    return (
        <Container>
            <Header />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
                <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-center">
                    <h1 className="text-lg font-semibold text-center">
                        หน้าอื่นๆ
                    </h1>
                </header>

                {/* Content */}
                <main className="w-full max-w-md bg-white p-4 rounded shadow space-y-6">
                    {/* Menu Items */}
                    <ul className="divide-y divide-gray-200">
                        {menuItems.map((item, index) => (
                            <Link href={item.link} key={index}>
                                <li className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        {item.icon}
                                        <span className="text-gray-700">{item.text}</span>
                                    </div>
                                    {item.extra && <span className="text-gray-500">{item.extra}</span>}
                                    <span className="text-gray-500">→</span>
                                </li>
                            </Link>
                        ))}
                    </ul>

                    {/* Logout Button */}
                    <button 
                        onClick={handleLogout} 
                        className="w-full p-3 bg-blue-500 text-white rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 mt-4">
                        ออกจากระบบ
                    </button>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Container>
    );
}

export default MorePage;

