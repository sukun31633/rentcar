"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // นำเข้า useRouter เพื่อใช้การนำทาง
import { FaHeart, FaCar } from 'react-icons/fa';
import Footer from '../components/Footer'; // Footer ที่คุณใช้ในโปรเจกต์

function MessagesPage() {
    const router = useRouter();

    // ข้อมูลตัวอย่างของรายการข้อความ
    const messages = [
        { id: 1, title: "Mazda 2 2017", bookingNumber: "0123456789", imageUrl: "/image/cmazda2.png" },
        { id: 2, title: "Mazda 2 2017", bookingNumber: "0123456789", imageUrl: "/image/cmazda2.png" },
        { id: 3, title: "Mazda 2 2017", bookingNumber: "0123456789", imageUrl: "/image/cmazda2.png" },
        { id: 4, title: "Mazda 2 2017", bookingNumber: "0123456789", imageUrl: "/image/cmazda2.png" },
    ];

    // ฟังก์ชันสำหรับเปิดหน้าการสนทนา
    const handleChatOpen = (id) => {
        router.push(`/messages/${id}`); // นำทางไปยังหน้าการสนทนา
    };

    // ฟังก์ชันสำหรับนำทางไปหน้า Messages เมื่อคลิกรูปหัวใจ
    const handleHeartClick = () => {
        router.push('/favorites'); // นำทางไปยังหน้า favorites หรือ message
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* ปรับ Header */}
            <header className="w-full max-w-md mx-auto bg-blue-800 text-white shadow p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <FaCar className="text-white mr-2" size={24} /> {/* ไอคอนรถ ขนาด 24 */}
                    <h1 className="text-lg font-semibold">รถเช่า</h1>
                </div>
                <FaHeart className="text-white" size={24} onClick={handleHeartClick}  /> {/* ไอคอนหัวใจ ขนาด 24 ที่คลิกได้ */}
            </header>

            {/* Message List */}
            <main className="w-full max-w-md mx-auto p-4 bg-white flex-grow">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50"
                        onClick={() => handleChatOpen(message.id)}
                    >
                        <img src={message.imageUrl} alt={message.title} className="w-16 h-16 rounded-lg mr-4" />
                        <div>
                            <h2 className="text-gray-800 font-semibold">{message.title}</h2>
                            <p className="text-gray-500">หมายเลขการจอง : {message.bookingNumber}</p>
                        </div>
                    </div>
                ))}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default MessagesPage;
