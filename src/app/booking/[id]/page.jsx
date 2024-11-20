"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

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

    const handleCancelBooking = async () => {
        try {
            const response = await fetch(`/api/bookings/cancel-booking?id=${bookingDetails.booking_id}`, {
                method: 'POST',
            });
            const result = await response.json();

            if (result.success) {
                alert("ยกเลิกการจองเรียบร้อยแล้ว");
                setBookingDetails(prevDetails => ({
                    ...prevDetails,
                    status_name: 'ยกเลิก'
                }));
            } else {
                alert("ไม่สามารถยกเลิกการจองได้");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleRebook = async () => {
        try {
            const response = await fetch(`/api/bookings/rebook-booking?id=${bookingDetails.booking_id}`, {
                method: 'POST',
            });
            const result = await response.json();

            if (result.success) {
                alert("จองอีกครั้งเรียบร้อยแล้ว");
                setBookingDetails(prevDetails => ({
                    ...prevDetails,
                    status_name: 'กำลังจะมาถึง'
                }));
            } else {
                alert("ไม่สามารถจองอีกครั้งได้");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const formatDate = (date) => new Date(date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    if (loading) {
        return <div>กำลังโหลดข้อมูล...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const isCanceled = bookingDetails?.status_name === 'ยกเลิก';

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <main className={`w-full max-w-md bg-white shadow-lg mt-4 p-4 rounded-lg border ${isCanceled ? 'border-red-400' : 'border-green-400'}`}>
                <button onClick={() => router.back()} className="flex items-center text-gray-600 mb-4">
                    <FaArrowLeft className="mr-2" />
                    <span className="flex-grow text-center font-bold text-lg">การจองของฉัน</span>
                </button>

                <h2 className={`text-center font-bold mb-2 text-lg ${isCanceled ? 'text-red-600' : 'text-blue-600'}`}>
                    หมายเลขการจอง : {bookingDetails?.booking_id}
                </h2>
                <p className={`text-center mb-4 ${isCanceled ? 'text-red-500' : 'text-blue-500'}`}>
                    {isCanceled ? 'ยกเลิกการจอง' : 'กำลังจะมาถึง'}
                </p>

                <div className="flex items-center mb-4">
                    <img
                        src={`/image/${bookingDetails?.car_image}`}
                        alt={bookingDetails?.car_name}
                        className="w-24 h-24 rounded-lg object-cover mr-4"
                    />
                    <div className="ml-4">
                        <h2 className="text-md font-bold">{bookingDetails?.car_name} {bookingDetails?.car_year}</h2>
                    </div>
                </div>

                <hr className="my-4" />

            <section className="mb-4">
                <h3 className="text-md font-bold mb-2">รายละเอียดการจอง</h3>
                <div className="flex items-center gap-4 mb-2">
                    <FaCalendarAlt className="text-blue-500 flex-none" />
                    <span className="flex-grow text-right text-blue-500">{formatDate(bookingDetails?.pickup_date)}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                    <FaMapMarkerAlt className="text-blue-500 flex-none" />
                    <span className="flex-grow text-right text-blue-500">{formatDate(bookingDetails?.return_date)}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                    <FaUser className="text-blue-500 flex-none" />
                    <span className="flex-grow text-right text-blue-500">{bookingDetails?.user_first_name} {bookingDetails?.user_last_name}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                    <FaEnvelope className="text-blue-500 flex-none" />
                    <span className="flex-grow text-right text-blue-500">{bookingDetails?.user_email}</span>
                </div>
                <div className="flex items-center gap-4 mb-2">
                    <FaPhone className="text-blue-500 flex-none" />
                    <span className="flex-grow text-right text-blue-500">{bookingDetails?.user_phone}</span>
                </div>
            </section>



                <hr className="my-4" />

                <section className="mb-4">
                    <h3 className="text-md font-bold mb-2">ยอดรวมสุทธิ</h3>
                    <div className="bg-blue-100 p-3 rounded-lg mb-4 flex justify-between items-center">
                        <p className="text-md font-bold text-blue-500 text-right">฿{parseFloat(bookingDetails?.total_price).toFixed(2)}</p>
                        <p className="text-xs text-gray-500">*ชำระเงิน ณ วันที่รับรถเท่านั้น</p>
                    </div>
                </section>

                <hr className="my-4" />

                <section className="mb-4">
                    <h3 className="text-md font-bold mb-2">สถานะการจอง</h3>
                    {isCanceled ? (
                        <div className="flex items-center gap-2 text-red-500">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <p>ยกเลิกการจอง</p>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2 text-green-500">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <p>ทำการจอง</p>
                            </div>
                            <div className="flex items-center gap-2 text-orange-500">
                                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                <p>รอติดต่อกลับจากบริษัท</p>
                            </div>
                        </div>
                    )}
                </section>

                <hr className="my-4" />

                {isCanceled ? (
                    <button
                        onClick={handleRebook}
                        className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg"
                    >
                        จองอีกครั้ง
                    </button>
                ) : (
                    <button
                        onClick={handleCancelBooking}
                        className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg"
                    >
                        ยกเลิกการจอง
                    </button>
                )}
            </main>
        </div>
    );
}

export default BookingDetailPage;