import pool from '../../../../lib/mysql';

export async function POST(req) {
    try {
        // รับข้อมูลจาก request body
        const { name, model, year, transmission, rentalPrice, passengerCapacity, luggageCapacity, features, province, image, ownerName, ownerImage } = await req.json();

        // ตรวจสอบว่าข้อมูลที่จำเป็นครบถ้วนหรือไม่
        if (!name || !model || !year || !transmission || !rentalPrice || !passengerCapacity || !luggageCapacity || !features || !province || !image || !ownerName || !ownerImage) {
            return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), { status: 400 });
        }

        // บันทึกข้อมูลลงในตาราง cars
        const [result] = await pool.query(
            'INSERT INTO cars (name, model, year, transmission, rental_price, passenger_capacity, luggage_capacity, features, province, image, owner_name, owner_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, model, year, transmission, rentalPrice, passengerCapacity, luggageCapacity, features, province, image, ownerName, ownerImage]
        );

        // ตรวจสอบว่าการบันทึกสำเร็จหรือไม่
        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({ success: true, message: 'Car added successfully' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, message: 'Failed to add car' }), { status: 500 });
        }

    } catch (error) {
        console.error('Error saving car:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
}
