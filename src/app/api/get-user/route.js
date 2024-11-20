import pool from "../../../../lib/mysql";

export async function POST(req) {
    try {
        const body = await req.json();
        const phone = body.phone;

        if (!phone) {
            return new Response(
                JSON.stringify({ success: false, error: "เบอร์โทรเป็นข้อมูลจำเป็น" }),
                { status: 400 }
            );
        }

        // ตรวจสอบเบอร์โทรในฐานข้อมูล
        const query = "SELECT name, surname, email, phone FROM users WHERE phone = ? LIMIT 1";
        const [rows] = await pool.query(query, [phone]);

        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ success: false, error: "ไม่พบข้อมูลผู้ใช้" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, user: rows[0] }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(
            JSON.stringify({ success: false, error: "เกิดข้อผิดพลาดภายในระบบ" }),
            { status: 500 }
        );
    }
}
