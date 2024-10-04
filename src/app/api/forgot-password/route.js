import { NextResponse } from 'next/server';
import twilio from 'twilio';
import pool from '../../../../lib/mysql'; // ใช้การเชื่อมต่อ MySQL

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req) {
    const { phoneNumber } = await req.json(); // รับหมายเลขโทรศัพท์จากคำขอ

    // ตรวจสอบและแปลงเบอร์โทรศัพท์ให้อยู่ในรูปแบบ E.164 สำหรับประเทศไทย
    const formattedPhoneNumber = phoneNumber.startsWith('0')
        ? `+66${phoneNumber.slice(1)}` // แปลง 099971XXXX -> +6699971XXXX
        : phoneNumber;

    // สร้างรหัส OTP แบบสุ่ม 6 หลัก
    const otp = Math.floor(100000 + Math.random() * 900000);

    // กำหนดเวลาหมดอายุของ OTP (5 นาที)
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP หมดอายุใน 5 นาที

    try {
        // ส่งรหัส OTP ไปยังหมายเลขโทรศัพท์ที่ผู้ใช้กรอก
        await client.messages.create({
            body: `Your OTP code is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER, // เบอร์ที่ส่งจาก Twilio
            to: formattedPhoneNumber, // ส่งไปยังหมายเลขโทรศัพท์ที่แปลงแล้ว
        });

        // บันทึก OTP และเวลาหมดอายุในฐานข้อมูล
        const [result] = await pool.query(
            'UPDATE login SET otp = ?, otp_expires_at = ? WHERE phone = ?',
            [otp, otpExpiresAt, phoneNumber]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ success: false, error: "Failed to send OTP" }, { status: 500 });
    }
}
