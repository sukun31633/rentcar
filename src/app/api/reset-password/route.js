import bcrypt from 'bcryptjs';
import pool from '../../../../lib/mysql';  // การเชื่อมต่อฐานข้อมูล

export async function POST(req) {
    try {
        const { phoneNumber, otp, password } = await req.json();  // รับ OTP, phoneNumber และ password จาก body

        if (!phoneNumber || !otp || !password) {
            return new Response(JSON.stringify({ message: "ข้อมูลไม่ครบถ้วน" }), { status: 400 });
        }

        // ดึงข้อมูล OTP จากฐานข้อมูล
        const [user] = await pool.query('SELECT otp, otp_expires_at FROM login WHERE phone = ?', [phoneNumber]);

        if (user.length === 0) {
            return new Response(JSON.stringify({ message: "ไม่พบผู้ใช้" }), { status: 404 });
        }

        const now = new Date();
        const userOtp = user[0].otp;
        const otpExpiresAt = new Date(user[0].otp_expires_at);

        // ตรวจสอบว่า OTP ถูกต้องและยังไม่หมดอายุ
        if (userOtp !== otp || now > otpExpiresAt) {
            return new Response(JSON.stringify({ message: "OTP ไม่ถูกต้องหรือหมดอายุ" }), { status: 400 });
        }

        // แฮชรหัสผ่านใหม่ก่อนบันทึกลงฐานข้อมูล
        const hashedPassword = await bcrypt.hash(password, 10);

        // อัปเดตรหัสผ่านใหม่ในฐานข้อมูล
        const [result] = await pool.query('UPDATE login SET password = ? WHERE phone = ?', [hashedPassword, phoneNumber]);

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ message: "ไม่พบผู้ใช้" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "รีเซ็ตรหัสผ่านสำเร็จ" }), { status: 200 });
    } catch (error) {
        console.error("Error resetting password:", error);
        return new Response(JSON.stringify({ message: "เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน" }), { status: 500 });
    }
}
