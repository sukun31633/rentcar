// src/app/api/delete-car/route.js
import pool from '../../../../lib/mysql';

export async function POST(req) {
  try {
    const { id } = await req.json();  // รับ id ของรถที่จะลบ

    // ลบข้อมูลรถจากตาราง cars
    const [result] = await pool.query('DELETE FROM cars WHERE id = ?', [id]);

    return new Response(JSON.stringify({ success: true, message: 'Car deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting car:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to delete car' }), { status: 500 });
  }
}
