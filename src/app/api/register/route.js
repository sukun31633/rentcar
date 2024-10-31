// src/app/api/register/route.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/mysql'; // ใช้การเชื่อมต่อ MySQL
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        // ดึงข้อมูลจาก body ของคำขอ
        const { firstName, lastName, email, phone, password } = await req.json();

        // เข้ารหัสรหัสผ่านเพื่อความปลอดภัย
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้างการเชื่อมต่อกับฐานข้อมูลและบันทึกข้อมูลผู้ใช้
        const [result] = await pool.query(
            'INSERT INTO users (name, surname, email, phone, password) VALUES (?, ?, ?, ?, ?)', 
            [firstName, lastName, email, phone, hashedPassword]
        );

        // ส่ง response กลับพร้อมข้อความสำเร็จ
        return NextResponse.json({ message: "ลงทะเบียนผู้ใช้แล้ว" }, { status: 201 });

    } catch (error) {
        // จัดการข้อผิดพลาดที่เกิดขึ้นในกระบวนการลงทะเบียน
        console.error('Error registering user:', error);
        return NextResponse.json({ message: "เกิดข้อผิดพลาดขณะลงทะเบียนผู้ใช้" }, { status: 500 });
    }
}
