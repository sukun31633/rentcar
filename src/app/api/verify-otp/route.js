import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import pool from '../../../../lib/mysql'; // การเชื่อมต่อ MySQL

export async function POST(req) {
    const { phoneNumber, otp } = await req.json(); // รับ OTP และเบอร์โทรจากคำขอ

    try {
        // ดึงข้อมูล OTP และเวลาหมดอายุจากฐานข้อมูล
        const [rows] = await pool.query(
            'SELECT otp, otp_expires_at FROM login WHERE phone = ?',
            [phoneNumber]
        );

        if (rows.length === 0) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        const user = rows[0];
        const now = new Date();

        // ตรวจสอบว่า OTP ถูกต้องและยังไม่หมดอายุ
        if (user.otp !== otp || now > user.otp_expires_at) {
            return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
        }

        // สร้าง JWT ที่เก็บเบอร์โทรศัพท์
        const token = jwt.sign({ phoneNumber }, process.env.JWT_SECRET, { expiresIn: '15m' }); // JWT หมดอายุใน 15 นาที

        // ส่ง JWT กลับไปยัง frontend
        return NextResponse.json({ success: true, token });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ success: false, error: "Failed to verify OTP" }, { status: 500 });
    }
}
