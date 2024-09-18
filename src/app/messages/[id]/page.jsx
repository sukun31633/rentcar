"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ใช้สำหรับการนำทางกลับ
import { FaArrowLeft } from 'react-icons/fa';

const ChatPage = ({ params }) => {
    const router = useRouter();
    const { id } = params; // ดึงค่า id จาก URL

    // State สำหรับเก็บข้อความในแชท
    const [messages, setMessages] = useState([
        { id: 1, sender: 'user', message: 'ข้อความแรก', time: '10/07/2020 14:51' },
        { id: 2, sender: 'admin', message: 'ตอบกลับจากผู้ให้บริการ', time: '10/07/2020 14:53' },
        { id: 3, sender: 'user', message: 'ข้อความต่อไป', time: '10/07/2020 14:55' }
    ]);

    // State สำหรับเก็บข้อความใน input
    const [inputMessage, setInputMessage] = useState('');

    // ฟังก์ชันสำหรับการส่งข้อความ
    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return; // ถ้าไม่มีข้อความให้ return

        // เพิ่มข้อความใหม่เข้าไปใน array ของ messages
        setMessages([...messages, { id: messages.length + 1, sender: 'user', message: inputMessage, time: new Date().toLocaleString() }]);
        setInputMessage(''); // ล้าง input หลังจากส่งข้อความ
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md mx-auto bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">หมายเลขการจอง : {id}</h1>
            </header>

            {/* แสดงเนื้อหาของแชท */}
            <main className="flex-grow w-full max-w-md mx-auto p-4 bg-white overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`p-3 rounded-lg shadow ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            <p>{msg.message}</p>
                            <small className="text-xs">{msg.time}</small>
                        </div>
                    </div>
                ))}
            </main>

            {/* Input สำหรับพิมพ์ข้อความ */}
            <footer className="w-full max-w-md mx-auto p-4 flex items-center border-t bg-white">
                <input
                    type="text"
                    placeholder="กรอกข้อความ"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                >
                    ส่ง
                </button>
            </footer>
        </div>
    );
};

export default ChatPage;
