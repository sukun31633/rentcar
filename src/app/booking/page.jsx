"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCar, FaHeart } from 'react-icons/fa';
import Footer from '../components/Footer';
import Link from 'next/link';

function BookingPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('upcoming');

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

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await fetch(`/api/bookings/cancel-booking?id=${bookingId}`, {
                method: 'POST',
            });
            const result = await response.json();

            if (result.success) {
                alert("ยกเลิกการจองเรียบร้อย");

                // อัปเดตสถานะการจองใน state bookings โดยตรง
                setBookings(prevBookings =>
                    prevBookings.map(booking =>
                        booking.booking_id === bookingId
                            ? { ...booking, status_name: 'ยกเลิก' }
                            : booking
                    )
                );
            } else {
                alert("ไม่สามารถยกเลิกการจองได้");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="bg-blue-50 min-h-screen flex flex-col items-center">
            <header className="w-full max-w-md mx-auto bg-blue-800 text-white shadow p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <FaCar className="text-white mr-2" size={24} />
                    <h1 className="text-lg font-semibold">รถเช่า</h1>
                </div>
                <FaHeart className="text-white" size={24} onClick={() => router.push('/favorites')} />
            </header>

            <div className="bg-white shadow-md mt-4 w-full max-w-md">
                <div className="flex">
                    <button
                        onClick={() => setSelectedTab('upcoming')}
                        className={`flex-grow text-center py-2 ${selectedTab === 'upcoming' ? 'border-b-4 border-blue-600 text-blue-600' : 'border-b-4 border-gray-200 text-gray-500'}`}
                    >
                        กำลังจะมาถึง
                    </button>
                    <button
                        onClick={() => setSelectedTab('completed')}
                        className={`flex-grow text-center py-2 ${selectedTab === 'completed' ? 'border-b-4 border-blue-600 text-blue-600' : 'border-b-4 border-gray-200 text-gray-500'}`}
                    >
                        คืนรถแล้ว/ยกเลิกการจอง
                    </button>
                </div>
            </div>

            <main className="w-full max-w-md mx-auto p-4 bg-white flex-grow">
                {loading ? (
                    <p className="text-center">กำลังโหลดข้อมูล...</p>
                ) : bookings.length === 0 ? (
                    <p className="text-center">ไม่พบการจอง</p>
                ) : (
                    bookings
                        .filter((booking) => {
                            if (selectedTab === 'upcoming') {
                                return booking.status_name !== 'ยกเลิก' && booking.status_name !== 'คืนรถแล้ว';
                            } else {
                                return booking.status_name === 'ยกเลิก' || booking.status_name === 'คืนรถแล้ว';
                            }
                        })
                        .map((booking) => (
                            <div
                                key={booking.booking_id}
                                className="bg-white p-4 mb-4 rounded-lg shadow flex flex-col items-start"
                            >
                                <Link href={`/booking/${booking.booking_id}`}>
                                    <div className="flex items-center cursor-pointer mb-2">
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
                                </Link>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">
                                        <strong>วันที่:</strong> {booking.pickup_date} - {booking.return_date}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>สถานที่รับ-ส่ง:</strong> {booking.pickup_location || 'สถานที่จอง'}
                                    </p>
                                </div>
                                {selectedTab === 'upcoming' && (
                                    <div className="mt-4 flex justify-between items-center w-full">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-1 rounded-lg"
                                            onClick={() => handleCancelBooking(booking.booking_id)}
                                        >
                                            ยกเลิกการจอง
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                )}
            </main>

            <Footer />
        </div>
    );
}

export default BookingPage;