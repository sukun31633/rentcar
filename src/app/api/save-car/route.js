// src/app/api/save-car/route.js
import pool from '../../../../lib/mysql';

export async function POST(req) {
    try {
        // รับข้อมูลจาก request body
        const { name, model, year, transmission, rentalPrice, passengerCapacity, luggageCapacity, features, image } = await req.json();

        // บันทึกข้อมูลลงในตาราง cars
        const [result] = await pool.query(
            'INSERT INTO cars (name, model, year, transmission, rental_price, passenger_capacity, luggage_capacity, features, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, model, year, transmission, rentalPrice, passengerCapacity, luggageCapacity, features, image]
        );

        return new Response(JSON.stringify({ success: true, message: 'Car added successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error saving car:', error);
        return new Response(JSON.stringify({ success: false, message: 'Failed to add car' }), { status: 500 });
    }
}
