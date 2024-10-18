import pool from '../../../../lib/mysql';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location'); // รับพารามิเตอร์ 'location' จาก query string
    const carId = searchParams.get('car_id'); // รับพารามิเตอร์ 'car_id' จาก query string

    let query = "SELECT * FROM cars";
    let queryParams = [];

    if (location) {
      query += " WHERE province = ?";
      queryParams.push(location);
    }

    if (carId) {
      query += location ? " AND id = ?" : " WHERE id = ?"; // ตรวจสอบว่ามีเงื่อนไข province หรือไม่
      queryParams.push(carId);
    }

    const [cars] = await pool.query(query, queryParams);
    
    // ถ้าเป็นการค้นหาตาม carId ให้ส่งข้อมูลของรถเดียว ไม่ต้องส่งทั้ง array
    if (carId && cars.length > 0) {
      return new Response(JSON.stringify(cars[0]), { status: 200 });
    }

    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (error) {
    console.error('Error fetching cars data:', error);
    return new Response(JSON.stringify({ error: "Error fetching cars data" }), { status: 500 });
  }
}
