import pool from '../../../../../lib/mysql';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { searchParams } = new URL(request.url, 'http://localhost');
    const bookingId = searchParams.get('id');

    if (!bookingId) {
        return NextResponse.json({ success: false, error: 'ไม่พบ Booking ID' }, { status: 400 });
    }

    try {
        // อัปเดตสถานะการจองให้เป็น "ยกเลิก"
        const [result] = await pool.query(
            `UPDATE bookings 
            SET status_id = (SELECT status_id FROM booking_status WHERE status_name = "ยกเลิก") 
            WHERE id = ?`,
            [bookingId]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, error: 'ไม่พบการจองที่ตรงกับ ID นี้' });
        }

        return NextResponse.json({ success: true, message: 'การจองถูกยกเลิกเรียบร้อยแล้ว' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาดในการยกเลิกการจอง' }, { status: 500 });
    }
}