"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // ใช้ useSearchParams
import Container from "../components/Container";

function ResetPasswordPage() {
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 

    const searchParams = useSearchParams();  // ดึงค่า query parameter
    const token = searchParams.get('token');  // ดึง token จาก URL
    console.log("Token from URL: ", token); // ตรวจสอบ token ใน console

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (password !== confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน");
            return;
        }

        console.log("Token from URL: ", token);        // ตรวจสอบ token อีกครั้งใน console
        console.log("Password: ", password);  // ตรวจสอบ password ที่ผู้ใช้กรอก

        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, token }),  // ส่ง password และ token ไปที่ backend
            });

            if (res.ok) {
                setSuccess("รีเซ็ตรหัสผ่านสำเร็จ");
                setError(""); 
                router.push('/login');  // เปลี่ยนไปหน้า login
            } else {
                setError("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
                setSuccess(""); 
            }
        } catch (error) {
            setError("เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน");
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
                        <h1 className="text-center text-lg font-semibold flex-grow">รีเซ็ตรหัสผ่าน</h1>
                    </div>
                </header>

                {/* Form */}
                <main className="p-4 flex flex-col justify-start items-center w-full max-w-[500px] mt-6">
                    <div className="w-full bg-white shadow-md rounded-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">รีเซ็ตรหัสผ่าน</h2>

                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-gray-800 mb-1">
                                    รหัสผ่านใหม่
                                </label>
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
                                <label htmlFor="confirmPassword" className="block text-gray-800 mb-1">
                                    ยืนยันรหัสผ่าน
                                </label>
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

                {/* Footer */}
                <footer className="p-4 bg-white w-full max-w-[500px]">
                </footer>
            </div>
        </Container>
    );
}

export default ResetPasswordPage;
