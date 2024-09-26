import pool from '../../../../lib/mysql'; // นำเข้า pool จาก mysql.js
import twilio from 'twilio'; // นำเข้า Twilio

// กำหนดค่า Twilio โดยใช้ Account SID และ Auth Token ของคุณ
const accountSid = 'AC457e9fc76fb7b7da96fe7e8eead858a7';  // Account SID จาก Twilio Dashboard
const authToken = '5d90eebf4a8cccd8509f78cbbd75a652';     // Auth Token จาก Twilio Dashboard
const client = twilio(accountSid, authToken);

// Named export สำหรับ POST method
export async function POST(req, res) {
    const { phoneNumber } = await req.json(); // ใช้ await เพื่อดึงข้อมูลจาก request

    try {
        // Query ข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้หมายเลขโทรศัพท์
        const [rows] = await pool.query('SELECT * FROM login WHERE phone = ?', [phoneNumber]);

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // สร้างรหัส OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // OTP 6 หลัก

        // อัปเดตรหัส OTP ลงในฐานข้อมูล
        await pool.query('UPDATE login SET otp = ? WHERE phone = ?', [otp, phoneNumber]);

        // ส่ง OTP ไปยังหมายเลขโทรศัพท์ผู้ใช้ผ่าน Twilio
        await client.messages.create({
            body: `Your OTP for password reset is: ${otp}`,
            from: '+19252483182', // หมายเลขโทรศัพท์ที่คุณได้จาก Twilio
            to: +66999719451 // หมายเลขโทรศัพท์ของผู้ใช้
        });

        return new Response(JSON.stringify({ success: true, message: 'OTP sent successfully' }), { status: 200 });
    } catch (error) {
        console.error('Failed to send OTP:', error);
        return new Response(JSON.stringify({ error: 'Failed to send OTP' }), { status: 500 });
    }
}
