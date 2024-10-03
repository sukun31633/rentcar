import React from 'react';
import Footer from '../components/Footer'; // นำเข้า Footer
import Container from '../components/Container';
import Header from '../components/Header'; // นำเข้า Header
import Link from 'next/link'; // นำเข้า Link จาก Next.js

function ReturnCarPage() {
    return (
        <Container>
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <Header />

                {/* Tabs */}
                <div className="bg-white shadow-md mt-4">
                    <div className="flex">
                        <Link href="/booking">
                            <button className="flex-grow text-center py-2 border-b-4 border-gray-200">
                                กำลังจะมาถึง
                            </button>
                        </Link>
                        <button className="flex-grow text-center py-2 border-b-4 border-blue-600">
                            คืนรถแล้ว
                        </button>
                    </div>
                </div>

                {/* Return Car Details */}
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
                                <strong>คืนรถเมื่อ:</strong> 16/07/22 10:00
                            </p>
                            <p className="text-gray-600">
                                <strong>สถานที่คืนรถ:</strong> สถานที่จอง
                            </p>
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <span className="text-sm text-gray-500">ระยะเวลาการเช่า: 1 วัน</span>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                รายงานปัญหาการคืนรถ
                            </button>
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

export default ReturnCarPage;
