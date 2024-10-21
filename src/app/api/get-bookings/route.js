// /app/api/get-bookings/route.js

import pool from '../../../../lib/mysql';

export async function GET(req) {
  try {
    // ดึงข้อมูลทั้งหมดจากตาราง bookings
    const query = `
      SELECT 
        id, 
        car_id, 
        user_first_name, 
        user_last_name, 
        total_price, 
        pickup_date,
        return_date
      FROM bookings
    `;
    const [rows] = await pool.execute(query);

    // ส่งข้อมูลกลับไปในรูปแบบ JSON
    return new Response(JSON.stringify({ success: true, bookings: rows }), { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new Response(JSON.stringify({ error: 'Error fetching bookings' }), { status: 500 });
  }
}
