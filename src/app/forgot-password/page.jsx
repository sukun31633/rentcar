"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from "../components/Container";

function ForgotPasswordPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset requested for:", phoneNumber);
        // Logic for handling password reset request
        router.push('/reset-confirmation'); // Adjust as needed
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
                        </form>
                    </div>
                </main>

                {/* ปุ่มที่อยู่ล่างสุด */}
                <footer className="p-4 bg-white shadow-t">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-full text-lg">
                        ขอรหัสผ่าน
                    </button>
                </footer>
            </div>
        </Container>
    );
}

export default ForgotPasswordPage;
