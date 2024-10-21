"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaCar } from 'react-icons/fa';
import Footer from '../components/Footer';

function MessagesPage() {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [cars, setCars] = useState([]);

    // ดึงข้อมูลการจอง
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/bookings/get-bookings');
                const data = await res.json();
                if (data.success) {
                    setMessages(data.bookings);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        // ดึงข้อมูลรถ
        const fetchCars = async () => {
            try {
                const res = await fetch('/api/get-cars');
                const data = await res.json();
                setCars(data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchBookings();
        fetchCars();
    }, []);

    // ฟังก์ชันสำหรับค้นหารูปรถตาม car_id ในการจอง
    const findCarDetails = (carId) => {
        const car = cars.find((car) => car.id === parseInt(carId));
        return car ? car : { image: '/image/default-car.png', name: 'ไม่ระบุชื่อ', year: '' };
    };

    // ฟังก์ชันสำหรับเปิดหน้าการสนทนา
    const handleChatOpen = (id) => {
        router.push(`/messages/${id}`);
    };

    // ฟังก์ชันสำหรับนำทางไปหน้า Favorites เมื่อคลิกรูปหัวใจ
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
                    messages.map((message) => {
                        const carDetails = findCarDetails(message.car_id);
                        return (
                            <div
                                key={message.id}
                                className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50"
                                onClick={() => handleChatOpen(message.id)}
                            >
                                <img
                                    src={`/image/${carDetails.image}`}
                                    alt={carDetails.name}
                                    className="w-16 h-16 rounded-lg mr-4"
                                />
                                <div>
                                    <h2 className="text-gray-800 font-semibold">
                                        {carDetails.name} ({carDetails.year})
                                    </h2>
                                    <p className="text-gray-500">หมายเลขการจอง : {message.id}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default MessagesPage;
