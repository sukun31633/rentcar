"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from "../components/Container";

function ResetConfirmationPage() {
    const [otp, setOtp] = useState(""); // State สำหรับเก็บรหัส OTP
    const [error, setError] = useState(""); // State สำหรับเก็บข้อความ error
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!otp) {
            setError("กรุณากรอกรหัส OTP");
            return;
        }

        try {
            // คุณสามารถส่ง OTP ไปยัง API เพื่อทำการยืนยัน
            const res = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp }),
            });

            if (res.ok) {
                // หาก OTP ถูกต้อง ทำการเปลี่ยนเส้นทางไปยังหน้ารีเซ็ตรหัสผ่าน
                router.push('/reset-password');
            } else {
                setError("รหัส OTP ไม่ถูกต้อง");
            }
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการยืนยัน OTP");
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
                        ยืนยันรหัส OTP
                    </h1>
                </header>

                {/* Content */}
                <main className="flex-grow p-4">
                    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">กรอกรหัส OTP</h2>
                        {/* แสดงข้อความ error */}
                        {error && <p className="text-red-500">{error}</p>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="otp" className="block text-gray-800 mb-1">
                                    รหัส OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md text-sm"
                                    placeholder="รหัส OTP"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-full text-lg">
                                ยืนยันรหัส OTP
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

export default ResetConfirmationPage;
