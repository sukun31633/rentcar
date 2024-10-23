import pool from '../../../../lib/mysql';

export async function GET(req) {
  try {
    // SQL query to join bookings and cars tables to retrieve booking and car details
    const query = `
      SELECT 
        bookings.id AS booking_id,
        bookings.car_id,
        bookings.user_first_name,
        bookings.user_last_name,
        bookings.pickup_date,
        bookings.return_date,
        bookings.total_price,
        cars.name AS car_name,
        cars.year AS car_year,
        cars.image AS car_image
      FROM bookings
      JOIN cars ON bookings.car_id = cars.id
    `;
    const [rows] = await pool.execute(query);

    return new Response(JSON.stringify({ success: true, bookings: rows }), { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new Response(JSON.stringify({ error: 'Error fetching bookings' }), { status: 500 });
  }
}
