import pool from '../../../../lib/mysql'; 

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { otp } = req.body;

        try {
            // ตรวจสอบ OTP จากฐานข้อมูล
            const [rows] = await pool.query('SELECT * FROM login WHERE otp = ?', [otp]);

            if (rows.length === 0) {
                return res.status(400).json({ error: 'OTP ไม่ถูกต้อง' });
            }

            // OTP ถูกต้อง ส่งกลับการตอบรับ
            res.json({ success: true, message: 'OTP ถูกต้อง' });
        } catch (error) {
            console.error('Database query failed:', error);
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการยืนยัน OTP' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
