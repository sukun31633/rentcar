"use client"; // ต้องใช้ "client component" สำหรับการจัดการ event

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';  // ใช้ฟังก์ชันใน Next.js 13

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");  // เพิ่ม field สำหรับ OTP
    const [phoneNumber, setPhoneNumber] = useState("");  // เพิ่ม field สำหรับหมายเลขโทรศัพท์
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phoneNumber || !otp) {
            setError("กรุณากรอกหมายเลขโทรศัพท์และรหัส OTP");
            return;
        }

        if (password !== confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน");
            return;
        }

        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp, password }),  // ส่ง phoneNumber, OTP และ password ไปที่ backend
            });

            if (res.ok) {
                setSuccess("รีเซ็ตรหัสผ่านสำเร็จ");
                setError("");
                router.push('/login');  // เปลี่ยนไปหน้า login หลังรีเซ็ตรหัสผ่านสำเร็จ
            } else {
                const data = await res.json();
                setError(data.message || "เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
                setSuccess("");
            }
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
            setSuccess("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <header className="bg-white shadow p-4 w-full max-w-[500px]">
                <div className="flex items-center justify-between">
                    <button onClick={() => router.back()} className="text-gray-600">←</button>
                    <h1 className="text-center text-lg font-semibold flex-grow">รีเซ็ตรหัสผ่าน</h1>
                </div>
            </header>

            <main className="p-4 flex flex-col justify-start items-center w-full max-w-[500px] mt-6">
                <div className="w-full bg-white shadow-md rounded-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">รีเซ็ตรหัสผ่าน</h2>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="phoneNumber" className="block text-gray-800 mb-1">หมายเลขโทรศัพท์</label>
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
                            <label htmlFor="otp" className="block text-gray-800 mb-1">รหัส OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md text-sm"
                                placeholder="กรอกรหัส OTP"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-800 mb-1">รหัสผ่านใหม่</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md text-sm"
                                placeholder="รหัสผ่านใหม่"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-800 mb-1">ยืนยันรหัสผ่าน</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded-md text-sm"
                                placeholder="ยืนยันรหัสผ่าน"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-full text-lg">
                            รีเซ็ตรหัสผ่าน
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ResetPasswordPage;
