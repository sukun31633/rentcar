"use client";

import { useSearchParams, useRouter } from 'next/navigation';

function Cencel() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const bookingId = searchParams.get('bookingId'); // ดึง bookingId จาก query parameters

    const handleCancel = async () => {
        try {
            const response = await fetch( `/api/bookings /cancel-booking?id=${bookingId} `, {
                method: 'POST',
            });
            const result = await response.json();

            if (result.success) {
                alert("ยกเลิกการจองเรียบร้อย");
                router.push('/booking'); // กลับไปที่หน้าการจอง
            } else {
                alert("ไม่สามารถยกเลิกการจองได้");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-lg font-semibold mb-4">ยกเลิกการจอง</h1>
                <p>คุณแน่ใจหรือไม่ว่าจะยกเลิกการจองหมายเลข {bookingId}?</p>
                <button
                    onClick={handleCancel}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                    style={{ cursor: 'pointer' }}
                >
                    ยืนยันการยกเลิก
                </button>
            </div>
        </div>
    );
}

export default Cencel;