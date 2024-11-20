import pool from "../../../../lib/mysql";
import jwt from "jsonwebtoken"; // ใช้ JWT สำหรับสร้าง token

const SECRET_KEY = "your-secret-key"; // คีย์สำหรับสร้าง JWT (ควรเก็บไว้ใน ENV)

export async function POST(req) {
    try {
        const body = await req.json();
        const { phone, password } = body;

        if (!phone || !password) {
            return new Response(
                JSON.stringify({ success: false, error: "กรุณากรอกเบอร์โทรและรหัสผ่าน" }),
                { status: 400 }
            );
        }

        // ค้นหาผู้ใช้ในฐานข้อมูล
        const query = "SELECT * FROM users WHERE phone = ? LIMIT 1";
        const [rows] = await pool.query(query, [phone]);

        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ success: false, error: "ไม่พบผู้ใช้ในระบบ" }),
                { status: 404 }
            );
        }

        const user = rows[0];

        // ตรวจสอบรหัสผ่าน (สมมติว่า password ถูกแฮชแล้ว)
        const isPasswordValid = password === user.password; // ใช้ bcrypt.compare() หากแฮช
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ success: false, error: "รหัสผ่านไม่ถูกต้อง" }),
                { status: 401 }
            );
        }

        // สร้าง token
        const token = jwt.sign({ id: user.id, phone: user.phone }, SECRET_KEY, { expiresIn: "1h" });

        // บันทึก token ลงฐานข้อมูล
        const updateQuery = "UPDATE users SET token = ? WHERE id = ?";
        await pool.query(updateQuery, [token, user.id]);

        return new Response(
            JSON.stringify({ success: true, token, user: { id: user.id, name: user.name, phone: user.phone } }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during login:", error);
        return new Response(
            JSON.stringify({ success: false, error: "เกิดข้อผิดพลาดภายในระบบ" }),
            { status: 500 }
        );
    }
}
