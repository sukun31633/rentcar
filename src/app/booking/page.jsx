"use client";

import React from 'react';
import { FaHeart } from 'react-icons/fa';
import Footer from '../components/Footer';
import Container from '../components/Container';
import Header from '../components/Header'; // นำเข้า Header

function BookingPage() {
    return (
        <Container>
            <div className="min-h-screen flex flex-col justify-between bg-gray-100">
                {/* นำเข้า Header */}
                <Header />

                {/* Tabs */}
                <div className="bg-white shadow-md">
                    <div className="flex">
                        <button className="flex-grow text-center py-2 border-b-4 border-blue-600">
                            กำลังจะมาถึง
                        </button>
                        <button className="flex-grow text-center py-2 border-b-4 border-gray-200">
                            คืนรถแล้ว/ยกเลิกการจอง
                        </button>
                    </div>
                </div>

                {/* Booking Details */}
                <main className="flex-grow p-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center">
                            <img
                                src="/car-image.png"
                                alt="Mazda 2 2017"
                                className="w-24 h-24 rounded-md object-cover"
                            />
                            <div className="ml-4">
                                <h2 className="text-lg font-bold">Mazda 2 2017</h2>
                                <p>หมายเลขการจอง : 0123456789</p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <p>
                                <strong>วันที่:</strong> 15/07/22 10:00 - 16/07/22 10:00
                            </p>
                            <p>
                                <strong>สถานที่รับ-ส่งรถ:</strong> สถานที่จอง
                            </p>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm text-gray-500">1 วัน</span>
                            <button className="bg-yellow-400 text-white px-4 py-2 rounded">
                                แจ้งรายละเอียดยานพาหนะมีปัญหา
                            </button>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Container>
    );
}

export default BookingPage;
