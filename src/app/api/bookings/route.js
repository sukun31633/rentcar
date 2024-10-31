import pool from '../../../../lib/mysql';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      car_id,
      user_first_name,
      user_last_name,
      user_email,
      user_phone,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      pickup_location,
      return_location,
      payment_method,
      credit_card_number,
      total_price,
      number_of_days,
      discount_code
    } = body;

    // ตรวจสอบว่าค่าที่สำคัญไม่เป็น null หรือ undefined
    if (!car_id || !user_first_name || !user_last_name || !pickup_date || !return_date) {
      console.error('Missing required fields in booking data');
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const safeValues = [
      car_id,
      user_first_name,
      user_last_name,
      user_email || null,
      user_phone || null,
      pickup_date,
      return_date,
      pickup_time || null,
      return_time || null,
      pickup_location || null,
      return_location || null,
      payment_method || null,
      credit_card_number || null,
      total_price || null,
      number_of_days || null,
      discount_code || null,
    ];

    const query =  `
      INSERT INTO bookings ( 
        car_id, user_first_name, user_last_name, user_email, user_phone,
        pickup_date, return_date, pickup_time, return_time, pickup_location,
        return_location, payment_method, credit_card_number, total_price,
        number_of_days, discount_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     `;

    const [result] = await pool.execute(query, safeValues);

    return new Response(JSON.stringify({ success: true, bookingId: result.insertId }), { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return new Response(JSON.stringify({ error: 'Error creating booking' }), { status: 500 });
  }
}