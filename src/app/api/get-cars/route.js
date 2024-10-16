import pool from '../../../../lib/mysql';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url); // ใช้ searchParams เพื่อดึง query string
    const location = searchParams.get('location'); // รับพารามิเตอร์ 'location' จาก query string

    let query = "SELECT * FROM cars"; // query พื้นฐาน
    let queryParams = [];

    if (location) {
      query += " WHERE province = ?"; // เพิ่มเงื่อนไขการกรองตามจังหวัด
      queryParams.push(location);
    }

    const [cars] = await pool.query(query, queryParams); // ใช้ query และส่ง queryParams ไปเพื่อป้องกัน SQL injection
    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    console.error('Error fetching cars data:', error);
    return new Response(JSON.stringify({ error: "Error fetching cars data" }), { status: 500 });
  }
}
