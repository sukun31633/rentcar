import pool from '../../../../lib/mysql';

export async function GET(req) {
  try {
    const [cars] = await pool.query("SELECT * FROM cars"); // cars คือชื่อตารางที่เก็บข้อมูลรถ
    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching cars data" }), { status: 500 });
  }
}
