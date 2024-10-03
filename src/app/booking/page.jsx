import React from 'react';
import Footer from '../components/Footer'; // นำเข้า Footer
import Container from '../components/Container';
import Header from '../components/Header'; // นำเข้า Header
import Link from 'next/link'; // นำเข้า Link จาก Next.js

function BookingPage() {
    return (
        <Container>
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <Header />

                {/* Tabs */}
                <div className="bg-white shadow-md mt-4">
                    <div className="flex">
                        <button className="flex-grow text-center py-2 border-b-4 border-blue-600">
                            กำลังจะมาถึง
                        </button>
                        <Link href="/returncar">
                            <button className="flex-grow text-center py-2 border-b-4 border-gray-200">
                                คืนรถแล้ว/ยกเลิกการจอง
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Booking Details */}
                <main className="flex-grow p-6">
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
                        <div className="flex items-center">
                            <img
                                src="/image/mazda2.png"
                                alt="Mazda 2 2021"
                                className="w-24 h-24 rounded-md object-cover"
                            />
                            <div className="ml-4">
                                <h2 className="text-lg font-bold text-gray-700">Mazda 2 2021</h2>
                                <p className="text-gray-600">หมายเลขการจอง: <strong>0123456789</strong></p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-600">
                                <strong>วันที่:</strong> 15/07/22 10:00 - 16/07/22 10:00
                            </p>
                            <p className="text-gray-600">
                                <strong>สถานที่รับ-ส่งรถ:</strong> สถานที่จอง
                            </p>
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <span className="text-sm text-gray-500">ระยะเวลา: 1 วัน</span>
                            
                            {/* ปุ่มยกเลิกการจองเชื่อมโยงไปหน้า ReturnCarPage */}
                            <Link href="/returncar">
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                    ยกเลิกการจอง
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t py-2 w-full fixed bottom-0 left-0 z-50">
                    <Footer />
                </footer>
            </div>
        </Container>
    );
}

export default BookingPage;
