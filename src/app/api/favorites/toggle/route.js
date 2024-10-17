// src/app/api/favorites/toggle/route.js
import pool from "../../../../../lib/mysql";

export async function POST(req) {
    try {
        const { car_id } = await req.json();

        if (!car_id) {
            return new Response(JSON.stringify({ success: false, message: 'Missing car_id' }), { status: 400 });
        }

        // ตรวจสอบว่ามีรายการโปรดนี้อยู่ในฐานข้อมูลหรือไม่
        const [favorite] = await pool.query(`SELECT * FROM favorites WHERE car_id = ?`, [car_id]);

        if (favorite.length > 0) {
            // ถ้ามีแล้ว ให้ลบออกจากรายการโปรด
            await pool.query(`DELETE FROM favorites WHERE car_id = ?`, [car_id]);
            return new Response(JSON.stringify({ success: true, removed: true }), { status: 200 });
        } else {
            // ถ้ายังไม่มี ให้เพิ่มรายการโปรด
            await pool.query(`INSERT INTO favorites (car_id) VALUES (?)`, [car_id]);
            return new Response(JSON.stringify({ success: true, added: true }), { status: 200 });
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
        return new Response(JSON.stringify({ success: false, message: 'Error toggling favorite' }), { status: 500 });
    }
}

