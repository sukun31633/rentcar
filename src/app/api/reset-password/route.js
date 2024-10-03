import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../../../lib/mysql'; // เชื่อมต่อ MySQL

export async function POST(req) {
    try {
        const { password, token } = await req.json(); // รับรหัสผ่านใหม่และ token จาก request body

        // เพิ่มการตรวจสอบ token และ password ที่ได้รับมา
        console.log("Received Token:", token);
        console.log("Received Password:", password);

        if (!token) {
            return NextResponse.json({ success: false, error: "Token is missing" }, { status: 400 });
        }

        // ตรวจสอบ JWT และดึงข้อมูลภายใน token เช่น หมายเลขโทรศัพท์
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET); // ตรวจสอบความถูกต้องของ token
            console.log("Decoded Token:", decoded); // บันทึกข้อมูล token ที่ถอดรหัสได้
        } catch (error) {
            console.error("Error decoding token:", error);
            return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 400 });
        }

        // ตรวจสอบว่ามีหมายเลขโทรศัพท์อยู่ใน token หรือไม่
        const phoneNumber = decoded.phoneNumber; 
        if (!phoneNumber) {
            return NextResponse.json({ success: false, error: "Phone number not found in token" }, { status: 400 });
        }

        console.log("Phone number found in token:", phoneNumber);

        // เข้ารหัส (hash) รหัสผ่านใหม่
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // อัปเดตรหัสผ่านใหม่ในฐานข้อมูล
        const [result] = await pool.query(
            'UPDATE login SET password = ? WHERE phone = ?',
            [hashedPassword, phoneNumber]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        console.log("Password updated successfully for phone number:", phoneNumber);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating password:", error); // บันทึกข้อผิดพลาดเพื่อการตรวจสอบ
        return NextResponse.json({ success: false, error: "Failed to update password" }, { status: 500 });
    }
}
