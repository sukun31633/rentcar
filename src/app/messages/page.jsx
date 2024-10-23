"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaCar } from 'react-icons/fa';
import Footer from '../components/Footer';

function MessagesPage() {
    const router = useRouter();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/get-bookings');
                const data = await res.json();
                if (data.success) {
                    setMessages(data.bookings);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleChatOpen = (id) => {
        router.push(`/messages/${id}`);
    };

    const handleHeartClick = () => {
        router.push('/favorites');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md mx-auto bg-blue-800 text-white shadow p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <FaCar className="text-white mr-2" size={24} />
                    <h1 className="text-lg font-semibold">รถเช่า</h1>
                </div>
                <FaHeart className="text-white" size={24} onClick={handleHeartClick} />
            </header>

            {/* Message List */}
            <main className="w-full max-w-md mx-auto p-4 bg-white flex-grow">
                {messages.length === 0 ? (
                    <p className="text-center">ไม่พบการจอง</p>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.booking_id}
                            className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50"
                            onClick={() => handleChatOpen(message.booking_id)}
                        >
                            <img
                                src={`/image/${message.car_image}`}
                                alt={message.car_name}
                                className="w-16 h-16 rounded-lg mr-4"
                            />
                            <div>
                                <h2 className="text-gray-800 font-semibold">
                                    {message.car_name} ({message.car_year})
                                </h2>
                                <p className="text-gray-500">หมายเลขการจอง : {message.booking_id}</p>
                            </div>
                        </div>
                    ))
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default MessagesPage;
