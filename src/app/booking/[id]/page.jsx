"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

function BookingDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(`/api/get-bookings?id=${id}`);
                if (!response.ok) {
                    throw new Error('Error fetching booking details');
                }
                const data = await response.json();
                if (data.success && data.booking) {
                    setBookingDetails(data.booking);
                } else {
                    setError(data.error || 'ไม่พบข้อมูลการจอง');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError('ไม่สามารถดึงข้อมูลการจองได้');
                setLoading(false);
            }
        };

        if (id) {
            fetchBookingDetails();
        } else {
            setError('ไม่พบ Booking ID');
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div>กำลังโหลดข้อมูล...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Format dates for better readability
    const formatDate = (date) => new Date(date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <main className="w-full max-w-lg bg-white shadow mt-4 p-4 rounded-lg">
                {/* Header Section */}
                <button onClick={() => router.back()} className="flex items-center text-gray-600 mb-4">
                    <FaArrowLeft className="mr-2" />
                    <span className="flex-grow text-center font-bold text-lg">การจองของฉัน</span>
                </button>

                {/* Booking ID Section */}
                <h2 className="text-center font-bold text-blue-600 mb-4">
                    หมายเลขการจอง: {bookingDetails.booking_id}
                </h2>

                {/* Car Image and Details Section */}
                <div className="flex items-center mb-4">
                    <img
                        src={`/image/${bookingDetails.car_image}`}
                        alt={bookingDetails.car_name}
                        className="w-24 h-24 rounded-lg object-cover mr-4"
                    />
                    <div className="ml-4">
                        <h2 className="text-md font-bold">{bookingDetails.car_name} {bookingDetails.car_year}</h2>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-4" />

                {/* Booking Details Section */}
                <section className="mb-4">
                    <h3 className="text-md font-bold mb-2">รายละเอียดการจอง</h3>
                    <div className="grid grid-cols-6 items-center gap-y-2">
                        <FaCalendarAlt className="text-blue-500" />
                        <p className="col-span-5 text-sm">
                            {formatDate(bookingDetails.pickup_date)} - {formatDate(bookingDetails.return_date)} 
                        </p>

                        <FaMapMarkerAlt className="text-blue-500" />
                        <p className="col-span-5 text-sm text-blue-600">
                            สถานที่รับ-ส่ง: {bookingDetails.pickup_location}
                        </p>

                        <FaInfoCircle className="text-blue-500" />
                        <div className="col-span-5">
                            <button className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                                รอการติดต่อกลับจากบริษัท
                            </button>
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <hr className="my-4" />

                {/* Payment Details */}
                <section className="mb-4">
                    <h3 className="text-md font-bold mb-2">รายละเอียดการชำระ</h3>
                    <div className="bg-blue-100 p-3 rounded-lg mb-4">
                        <p className="text-md">
                            <strong>ราคาทั้งหมด:</strong> ฿{parseFloat(bookingDetails.total_price).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                            * ชำระ ณ วันที่รับรถเท่านั้น และจะคืนเมื่อส่งคืนรถ
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2">
                        <p className="text-sm font-medium text-gray-600">วิธีการชำระ:</p>
                        <p className="text-sm">{bookingDetails.payment_method}</p>
                        {bookingDetails.payment_method === 'creditCard' && (
                            <>
                                <p className="text-sm font-medium text-gray-600">บัตรเครดิต:</p>
                                <p className="text-sm">**** **** **** {bookingDetails.credit_card_number.slice(-4)}</p>
                            </>
                        )}
                    </div>
                </section>

                {/* Divider */}
                <hr className="my-4" />

                {/* Cancel Button */}
                <button className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg">
                    ยกเลิกการจอง
                </button>
            </main>
        </div>
    );
}

export default BookingDetailPage;