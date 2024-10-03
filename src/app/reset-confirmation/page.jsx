"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from "../components/Container";

function ResetConfirmationPage() {
    const [otp, setOtp] = useState(""); 
    const [phoneNumber, setPhoneNumber] = useState(""); 
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // ตรวจสอบว่ามีการกรอกรหัส OTP และหมายเลขโทรศัพท์หรือไม่
        if (!otp || !phoneNumber) {
            setError("กรุณากรอกหมายเลขโทรศัพท์และรหัส OTP");
            return;
        }

        try {
            const res = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp, phoneNumber }), 
            });

            if (res.ok) {
                setSuccess("ยืนยันรหัส OTP สำเร็จ");
                setError(""); 
                router.push('/reset-password'); // เปลี่ยนเส้นทางไปหน้า reset-password
            } else {
                setError("รหัส OTP ไม่ถูกต้อง");
                setSuccess(""); 
            }
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการยืนยันรหัส OTP");
            setSuccess("");
        }
    };

    return (
        <Container>
            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-white shadow p-4 w-full max-w-[500px]">
                    <div className="flex items-center justify-between">
                        <button onClick={() => router.back()} className="text-gray-600">
                            ←
                        </button>
                        <h1 className="text-center text-lg font-semibold flex-grow">ยืนยันรหัส OTP</h1>
                    </div>
                </header>

                {/* กล่องฟอร์ม */}
                <main className="p-4 flex flex-col justify-start items-center w-full max-w-[500px] mt-6">
                    <div className="w-full bg-white shadow-md rounded-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">ยืนยันรหัส OTP</h2>

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
                                    placeholder="กรอกรหัส OTP"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-full text-lg">
                                ยืนยันรหัส
                            </button>
                        </form>
                    </div>
                </main>

                {/* ปุ่มที่อยู่ล่างสุด */}
                <footer className="p-4 bg-white w-full max-w-[500px]">
                </footer>
            </div>
        </Container>
    );
}

export default ResetConfirmationPage;
