// /app/api/bookings/route.js
import pool from '../../../../lib/mysql';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      car_id,
      user_name,
      user_surname,
      user_email,
      user_phone,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      pickup_location,
      return_location,
      payment_method,
      total_price,
      discount_code
    } = body;

    // บันทึกข้อมูลการจองลงในตาราง bookings
    const query = `
      INSERT INTO bookings (car_id, user_name, user_surname, user_email, user_phone, 
        pickup_date, return_date, pickup_time, return_time, pickup_location, 
        return_location, payment_method, total_price, discount_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      car_id,
      user_name,
      user_surname,
      user_email,
      user_phone,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      pickup_location,
      return_location,
      payment_method,
      total_price,
      discount_code
    ]);

    return new Response(JSON.stringify({ success: true, bookingId: result.insertId }), { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({ error: 'Error creating booking' }), { status: 500 });
  }
}
