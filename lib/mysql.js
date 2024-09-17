// lib/mysql.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  // ใส่ชื่อผู้ใช้ MySQL ของคุณ
  password: '',  // ใส่รหัสผ่าน MySQL ของคุณ
  database: 'rentcar',  // ชื่อฐานข้อมูล
});

// ฟังก์ชันสำหรับตรวจสอบการเชื่อมต่อ
async function checkConnection() {
  try {
    // สร้างการเชื่อมต่อเพื่อทดสอบ
    const connection = await pool.getConnection();

    // ปิดการเชื่อมต่อหลังการตรวจสอบ
    connection.release();

    console.log('MySQL connection successful!');
  } catch (error) {
    console.error('MySQL connection failed:', error);
  }
}

// เรียกใช้ฟังก์ชันตรวจสอบการเชื่อมต่อ
checkConnection();

export default pool;


