import pool from '../../../../lib/mysql';

export async function GET(req) {
  try {
    const url = new URL(req.url, 'http://localhost');
    const id = url.searchParams.get('id');

    if (id) {
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid booking ID' }), { status: 400 });
      }

      const query = `
        SELECT 
          bookings.id AS booking_id,
          bookings.car_id,
          bookings.user_first_name,
          bookings.user_last_name,
          bookings.user_email,
          bookings.user_phone,
          bookings.pickup_date,
          bookings.return_date,
          bookings.pickup_time,
          bookings.return_time,
          bookings.pickup_location,
          bookings.return_location,
          bookings.payment_method,
          bookings.credit_card_number,
          bookings.total_price,
          bookings.number_of_days,
          bookings.discount_code,
          bookings.status_id,
          booking_status.status_name,
          cars.name AS car_name,
          cars.year AS car_year,
          cars.image AS car_image
        FROM bookings
        JOIN cars ON bookings.car_id = cars.id
        LEFT JOIN booking_status ON bookings.status_id = booking_status.status_id
        WHERE bookings.id = ?
      `;

      const [rows] = await pool.execute(query, [parsedId]);

      if (rows.length > 0) {
        return new Response(JSON.stringify({ success: true, booking: rows[0] }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ success: false, error: 'ไม่พบข้อมูลการจอง' }), { status: 404 });
      }
    } else {
      const query = `
        SELECT 
          bookings.id AS booking_id,
          bookings.car_id,
          bookings.user_first_name,
          bookings.user_last_name,
          bookings.user_email,
          bookings.user_phone,
          bookings.pickup_date,
          bookings.return_date,
          bookings.pickup_time,
          bookings.return_time,
          bookings.pickup_location,
          bookings.return_location,
          bookings.payment_method,
          bookings.credit_card_number,
          bookings.total_price,
          bookings.number_of_days,
          bookings.discount_code,
          bookings.status_id,
          booking_status.status_name,
          cars.name AS car_name,
          cars.year AS car_year,
          cars.image AS car_image
        FROM bookings
        JOIN cars ON bookings.car_id = cars.id
        LEFT JOIN booking_status ON bookings.status_id = booking_status.status_id
      `;

      const [rows] = await pool.execute(query);

      return new Response(JSON.stringify({ success: true, bookings: rows }), { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}