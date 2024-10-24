"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCar, FaHeart } from 'react-icons/fa';
import Footer from '../components/Footer'; // นำเข้า Footer ที่สร้างไว้

function BookingPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/get-bookings');
                const data = await res.json();
                if (data.success) {
                    setBookings(data.bookings);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancelBooking = (bookingId) => {
        console.log(`Cancel booking ID: ${bookingId}`);
    };

    const handleViewDetails = (bookingId) => {
        router.push(`/booking/${bookingId}`); // ไปที่หน้า Booking Detail พร้อมส่ง bookingId
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md mx-auto bg-blue-800 text-white shadow p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <FaCar className="text-white mr-2" size={24} />
                    <h1 className="text-lg font-semibold">การจองของคุณ</h1>
                </div>
                <FaHeart className="text-white" size={24} onClick={() => router.push('/favorites')} />
            </header>

            {/* Content */}
            <main className="w-full max-w-md mx-auto p-4 bg-white flex-grow">
                {loading ? (
                    <p className="text-center">กำลังโหลดข้อมูล...</p>
                ) : bookings.length === 0 ? (
                    <p className="text-center">ไม่พบการจอง</p>
                ) : (
                    bookings.map((booking) => (
                        <div
                            key={booking.booking_id}
                            className="bg-white p-4 mb-4 rounded-lg shadow flex flex-col items-start"
                        >
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => handleViewDetails(booking.booking_id)} // กดที่รูปจะนำไปหน้า Booking Detail
                            >
                                <img
                                    src={`/image/${booking.car_image}`}
                                    alt={booking.car_name}
                                    className="w-20 h-20 rounded-lg object-cover mr-4"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">{booking.car_name} {booking.car_year}</h2>
                                    <p className="text-sm text-gray-500">หมายเลขการจอง: {booking.booking_id}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    <strong>วันที่:</strong> {booking.pickup_date} - {booking.return_date}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>สถานที่รับ-ส่ง:</strong> {booking.pickup_location || 'สถานที่จอง'}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-between items-center w-full">
                                <span className="text-sm text-gray-500">ระยะเวลา: {booking.number_of_days} วัน</span>
                                <button
                                    className="bg-red-500 text-white px-4 py-1 rounded-lg"
                                    onClick={() => handleCancelBooking(booking.booking_id)}
                                >
                                    ยกเลิกการจอง
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </main>

            {/* Footer */}
            <Footer /> {/* ใช้ Footer Component */}
        </div>
    );
}

export default BookingPage;