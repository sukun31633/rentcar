"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // ใช้ useRouter จาก next/navigation
import { FaHeart } from 'react-icons/fa'; // ใช้ไอคอนรูปหัวใจ
import Footer from '../components/Footer';

function MessagesPage() {
    const router = useRouter();

    // ข้อมูลตัวอย่างของรายการข้อความ
    const messages = [
        { id: 1, title: "Mazda 2 2017", bookingNumber: "0123456789", imageUrl: "/car-placeholder.png" },
        { id: 2, title: "Mazda 2 2017", bookingNumber: "0123456789", imageUrl: "/car-placeholder.png" },
        { id: 3, title: "Mazda 2 2017", bookingNumber: "0123456789", imageUrl: "/car-placeholder.png" },
        { id: 4, title: "Mazda 2 2017", bookingNumber: "0123456789", imageUrl: "/car-placeholder.png" },
    ];

    // ฟังก์ชันสำหรับเปิดหน้าการสนทนา
    const handleChatOpen = (id) => {
        router.push(`/messages/${id}`); // นำทางไปยังหน้าการสนทนา
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            {/* Header */}
            <header className="w-full max-w-md bg-blue-500 text-white shadow p-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold">รถเช่า</h1>
                <FaHeart className="text-white" />
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-md p-4 bg-white">
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
            <div className="w-full max-w-md flex justify-center bg-white p-4">
                <Footer />
            </div>
        </div>
    );
}

export default MessagesPage;
