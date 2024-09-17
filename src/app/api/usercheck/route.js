// src/app/api/usercheck/route.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/mysql'; // ใช้การเชื่อมต่อ MySQL

export async function POST(req) {
    try {
        // ดึงข้อมูลเบอร์โทรจากคำขอ
        const { phone } = await req.json();

        // ค้นหาผู้ใช้ในฐานข้อมูลด้วยเบอร์โทร
        const [rows] = await pool.query('SELECT id FROM login WHERE phone = ?', [phone]);
        const user = rows[0] ? { id: rows[0].id } : null; // ถ้ามีผู้ใช้ ให้ส่ง id กลับไป

        console.log("User: ", user);

        // ส่งข้อมูลผู้ใช้กลับไปยังผู้ร้องขอ
        return NextResponse.json({ user });

    } catch (error) {
        // จัดการกับข้อผิดพลาด
        console.error('Error checking user:', error);
        return NextResponse.json({ message: "An error occurred while checking the user." }, { status: 500 });
    }
}
