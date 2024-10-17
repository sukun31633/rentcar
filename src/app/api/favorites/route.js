// src/app/api/favorites/route.js
import pool from '../../../../lib/mysql';

export async function GET(req) {
    try {
        const [favorites] = await pool.query(`
            SELECT cars.* 
            FROM favorites 
            JOIN cars ON favorites.car_id = cars.id
        `);
        
        return new Response(JSON.stringify(favorites), { status: 200 });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return new Response(JSON.stringify({ error: 'Error fetching favorites' }), { status: 500 });
    }
}
