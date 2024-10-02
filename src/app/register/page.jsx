"use client";

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Container from "../components/Container";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // ฟิลด์ยืนยันรหัสผ่าน
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ฟิลด์แสดง/ซ่อนยืนยันรหัสผ่าน
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) router.replace('/login');
    }, [session, router]);

    // ฟังก์ชันสำหรับสลับการแสดง/ซ่อนรหัสผ่าน
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // ฟังก์ชันสำหรับสลับการแสดง/ซ่อนยืนยันรหัสผ่าน
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // การตรวจสอบและส่งข้อมูลไปยัง API
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ตรวจสอบให้แน่ใจว่าฟิลด์ทั้งหมดถูกกรอก
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }

        // ตรวจสอบรูปแบบเบอร์โทรศัพท์
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setError("กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง 10 หลัก");
            return;
        }

        // ตรวจสอบว่ารหัสผ่านและการยืนยันรหัสผ่านตรงกันหรือไม่
        if (password !== confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน");
            return;
        }

        try {
            // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
            const resCheckUser = await fetch("http://localhost:3000/api/usercheck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone })
            });

            const { user } = await resCheckUser.json();
            if (user) {
                setError("มีผู้ใช้อยู่แล้ว");
                return;
            }

            // เรียก API ลงทะเบียนผู้ใช้
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password
                })
            });

            // ตรวจสอบสถานะการตอบกลับจาก API
            if (res.ok) {
                setSuccess("การลงทะเบียนผู้ใช้สำเร็จ!");
                setError("");
                // นำผู้ใช้ไปยังหน้า login หลังจากลงทะเบียนสำเร็จ
                router.replace('/login');
            } else {
                setError("การลงทะเบียนล้มเหลว");
            }
        } catch (error) {
            setError("เกิดข้อผิดพลาดระหว่างการลงทะเบียน");
        }
    };

    return (
        <Container>
            {/* Back Navigation Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b shadow-sm">
                <button onClick={() => router.push('/login')} className="text-xl">
                    ←
                </button>
                <h3 className="text-xl font-bold">สร้างบัญชี</h3>
                <div className="w-6"></div> {/* Placeholder for alignment */}
            </div>

            <div className="flex-grow bg-gray-100 flex flex-col justify-between">
                <div className="flex justify-center items-center">
                    <div className="w-full max-w-md p-5 mt-5 bg-white shadow-md rounded-lg border">
                        <h4 className="text-lg font-semibold mb-4">ข้อมูลส่วนตัว</h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-500 text-white text-center py-2 rounded">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-500 text-white text-center py-2 rounded">
                                    {success}
                                </div>
                            )}

                            <div>
                                <label htmlFor="firstName" className="block text-gray-700 mb-1">ชื่อ</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="ชื่อ"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-gray-700 mb-1">นามสกุล</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="นามสกุล"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-1">อีเมล</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="อีเมล"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-gray-700 mb-1">เบอร์โทร</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="หมายเลขโทรศัพท์มือถือ 10 หลัก"
                                />
                            </div>

                            {/* ฟิลด์รหัสผ่าน */}
                            <div>
                                <label htmlFor="password" className="block text-gray-700 mb-1">รหัสผ่าน</label>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder="รหัสผ่าน"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* ฟิลด์ยืนยันรหัสผ่าน */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">ยืนยันรหัสผ่าน</label>
                                <div className="relative w-full">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder="ยืนยันรหัสผ่าน"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="terms" required />
                                <label htmlFor="terms" className="text-sm text-gray-700">
                                    ในการสมัครสมาชิก ฉันยอมรับ
                                    <Link href="#" className="text-cyan-500 hover:underline">ข้อกำหนดและเงื่อนไข</Link> และ
                                    <Link href="#" className="text-cyan-500 hover:underline">นโยบายความเป็นส่วนตัว</Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 text-lg font-bold"
                            >
                                ยืนยัน
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default RegisterPage;
