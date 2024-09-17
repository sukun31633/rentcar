"use client";

import React, { useState, useEffect } from 'react';
import Container from "../components/Container";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoginPage() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.replace('/home'); // แก้ไขให้ไปที่หน้า Home
        }
    }, [session, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                phone, // ใช้ phone แทน username
                password, 
                redirect: false
            });

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            router.replace("/home"); // แก้ไขให้ไปที่หน้า Home

        } catch (error) {
            console.error("Error during sign-in: ", error);
            setError("An error occurred while signing in. Please try again.");
        }
    }

    return (
        <Container>
            <div className='flex-grow bg-blue-600 flex justify-center items-center p-4'>
                <div className='w-full max-w-xs bg-transparent'>
                    <h2 className='text-left text-xl font-bold text-white mb-4'>ล็อกอิน</h2>
                    <form onSubmit={handleSubmit} className='space-y-4'>

                        {error && (
                            <div className='bg-red-500 text-white text-center py-1 px-3 rounded-md'>
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="phone" className="block text-white mb-1">หมายเลขโทรศัพท์</label>
                            <input 
                                type="text" 
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} 
                                className='w-full bg-white border-none py-3 px-4 rounded-md text-sm' 
                                placeholder='หมายเลขโทรศัพท์'
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-white mb-1">รหัสผ่าน</label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className='w-full bg-white border-none py-3 px-4 rounded-md text-sm' 
                                placeholder='รหัสผ่าน'
                            />
                            <div className='text-right mt-1'>
                                <Link href="/forgot-password" className='text-sm text-white underline'>
                                    ลืมรหัสผ่าน?
                                </Link>
                            </div>
                        </div>

                        <button 
                            type='submit' 
                            className='w-full bg-blue-700 text-white py-3 rounded-full text-lg mt-4'>
                            ลงชื่อเข้าใช้
                        </button>

                        <div className='flex items-center justify-center mt-4'>
                            <hr className='border-t w-full' />
                            <span className='px-2 text-white'>หรือ</span>
                            <hr className='border-t w-full' />
                        </div>

                        {/* Social Login Buttons */}
                        <div className='flex flex-col gap-2 rounded mt-4'>
                            <button 
                                onClick={() => signIn('facebook')} 
                                className='w-full bg-blue-800 text-white py-2 rounded-full flex items-center justify-center'>
                                <span>เข้าสู่ระบบด้วย Facebook</span>
                            </button>
                            <button 
                                onClick={() => signIn('google')} 
                                className='w-full bg-white text-black border py-2 rounded-full flex items-center justify-center'>
                                <span>เข้าสู่ระบบด้วย Google</span>
                            </button>
                            <button 
                                onClick={() => signIn('apple')} 
                                className='w-full bg-black text-white py-2 rounded-full flex items-center justify-center'>
                                <span>เข้าสู่ระบบด้วย Apple ID</span>
                            </button>
                        </div>

                        {/* Register Button Styled as Other Social Buttons */}
                        <div className='mt-4'>
                            <Link href="/register">
                                <button 
                                    className='w-full bg-white text-black border py-2 rounded-full flex items-center justify-center'>
                                    สมัครสมาชิก
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default LoginPage;
