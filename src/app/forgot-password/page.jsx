"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from "../components/Container";

function ForgotPasswordPage() {
    const [phoneNumber, setPhoneNumber] = useState(""); // state สำหรับเก็บหมายเลขโทรศัพท์
    const [error, setError] = useState(""); // state สำหรับเก็บข้อความ error
    const [success, setSuccess] = useState(""); // state สำหรับเก็บข้อความ success
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกันการ reload หน้า

        // ตรวจสอบว่าหมายเลขโทรศัพท์ไม่ว่างเปล่า
        if (!phoneNumber) {
            setError("กรุณากรอกหมายเลขโทรศัพท์");
            return;
        }

        try {
            // ส่งคำขอไปยัง API
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }), // ส่งหมายเลขโทรศัพท์ไปยัง API
            });

            if (res.ok) {
                // ถ้าส่ง OTP สำเร็จ
                setSuccess("รหัส OTP ถูกส่งไปยังโทรศัพท์ของคุณแล้ว");
                setError(""); // เคลียร์ข้อความ error
                router.push('/reset-confirmation'); // เปลี่ยนเส้นทางไปยังหน้า reset-confirmation
            } else {
                // ถ้าไม่พบผู้ใช้ที่มีหมายเลขนี้
                setError("ไม่พบผู้ใช้ที่มีหมายเลขนี้");
                setSuccess(""); // เคลียร์ข้อความ success
            }
        } catch (error) {
            // เกิดข้อผิดพลาดในการเรียก API
            setError("เกิดข้อผิดพลาดในการส่ง OTP");
            setSuccess("");
        }
    };

    return (
        <Container>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
                {/* Header */}
                <header className="bg-white shadow p-4 flex items-center justify-between">
                    <button onClick={() => router.back()} className="text-gray-600">
                        ←
                    </button>
                    <h1 className="text-center text-lg font-semibold flex-grow">
                        ลืมรหัสผ่าน
                    </h1>
                </header>

                {/* Content */}
                <main className="flex-grow p-4">
                    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">ลืมรหัสผ่าน</h2>
                        {/* แสดงข้อความ error หรือ success */}
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="phoneNumber" className="block text-gray-800 mb-1">
                                    หมายเลขโทรศัพท์
                                </label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md text-sm"
                                    placeholder="หมายเลขโทรศัพท์"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-full text-lg">
                                ขอรหัสผ่าน
                            </button>
                        </form>
                    </div>
                </main>

                {/* ปุ่มที่อยู่ล่างสุด */}
                <footer className="p-4 bg-white shadow-t">
                </footer>
            </div>
        </Container>
    );
}

export default ForgotPasswordPage;

