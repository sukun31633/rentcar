"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

function PaymentMethodPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [driverDetails, setDriverDetails] = useState(null);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // ดึงข้อมูลจาก URL และเก็บลง state
    const carId = searchParams.get('carId');
    const location = searchParams.get('location');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');
    const totalPrice = searchParams.get('totalPrice');
    const numberOfDays = searchParams.get('numberOfDays');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    // ตรวจสอบว่าข้อมูลมีครบถ้วนก่อนเก็บใน state
    if (carId && location && startDate && endDate && startTime && endTime && totalPrice && numberOfDays && firstName && lastName && email && phone) {
      const driverData = {
        firstName,
        lastName,
        email,
        phone,
      };
      const reservationData = {
        carId,
        location,
        startDate,
        endDate,
        startTime,
        endTime,
        totalPrice,
        numberOfDays,
      };

      setDriverDetails(driverData);
      setReservationDetails(reservationData);

      // เก็บข้อมูลลงใน localStorage
      localStorage.setItem('driverDetails', JSON.stringify(driverData));
      localStorage.setItem('reservationDetails', JSON.stringify(reservationData));
    }
  }, [searchParams]);

  const handleConfirm = async () => {
    if (paymentMethod === 'creditCard' && (!/^\d{16}$/.test(creditCardNumber))) {
      setErrorMessage('กรุณากรอกเลขบัตรเครดิต 16 หลักที่ถูกต้อง');
      return;
    }

    // สร้างข้อมูลการจอง
    const bookingData = {
      car_id: reservationDetails?.carId,
      user_first_name: driverDetails?.firstName,
      user_last_name: driverDetails?.lastName,
      user_email: driverDetails?.email,
      user_phone: driverDetails?.phone,
      pickup_date: reservationDetails?.startDate,
      return_date: reservationDetails?.endDate,
      pickup_time: reservationDetails?.startTime,
      return_time: reservationDetails?.endTime,
      pickup_location: reservationDetails?.location,
      return_location: reservationDetails?.location,
      payment_method: paymentMethod,
      credit_card_number: paymentMethod === 'creditCard' ? creditCardNumber : null,
      total_price: reservationDetails?.totalPrice,
      number_of_days: reservationDetails?.numberOfDays,
    };

    // ตรวจสอบค่าที่จำเป็นก่อนส่ง
    if (!bookingData.car_id || !bookingData.user_first_name || !bookingData.user_last_name || !bookingData.pickup_date || !bookingData.return_date) {
      setErrorMessage('ข้อมูลการจองไม่ครบถ้วน กรุณาตรวจสอบ');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        router.push('/confirmation');
      } else {
        setErrorMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  if (!driverDetails || !reservationDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="bg-white w-full max-w-lg shadow p-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold flex-grow text-center">วิธีชำระเงิน</h1>
      </header>

      <main className="w-full max-w-lg bg-white shadow mt-4 p-4 rounded-lg">
        <h3 className="text-md font-bold mb-4">เลือกวิธีการชำระเงิน</h3>
        
        <button
          className={`w-full py-3 rounded-lg mb-4 flex items-center justify-center ${paymentMethod === 'cash' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => {
            setPaymentMethod('cash');
            setErrorMessage('');
          }}
        >
          <FaMoneyBillWave className="mr-2" />
          ชำระเป็นเงินสด
        </button>

        <button
          className={`w-full py-3 rounded-lg mb-4 flex items-center justify-center ${paymentMethod === 'creditCard' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => {
            setPaymentMethod('creditCard');
            setErrorMessage('');
          }}
        >
          <FaCreditCard className="mr-2" />
          Credit Card
        </button>

        {paymentMethod === 'creditCard' && (
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2">เลขบัตรเครดิต</label>
            <input
              type="text"
              placeholder="กรอกเลขบัตรเครดิต 16 หลัก"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)}
              maxLength="16"
              className="w-full border px-3 py-2 rounded"
            />
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="text-sm font-semibold mb-2">ออนไลน์แบงค์กิ้ง</h4>
          <div className="flex justify-between space-x-2">
            <div className="w-1/5 p-2 flex items-center justify-center rounded-md" style={{ backgroundColor: '#007DC5' }}>
              <img src="/image/bbl.png" alt="BBL" className="w-2/3" />
            </div>
            <div className="w-1/5 p-2 flex items-center justify-center rounded-md" style={{ backgroundColor: '#007E3A' }}>
              <img src="/image/kbank.png" alt="KBank" className="w-2/3" />
            </div>
            <div className="w-1/5 p-2 flex items-center justify-center rounded-md" style={{ backgroundColor: '#00AEEF' }}>
              <img src="/image/ktb.png" alt="KTB" className="w-2/3" />
            </div>
            <div className="w-1/5 p-2 flex items-center justify-center rounded-md" style={{ backgroundColor: '#FFD100' }}>
              <img src="/image/bay.png" alt="BAY" className="w-2/3" />
            </div>
            <div className="w-1/5 p-2 flex items-center justify-center rounded-md" style={{ backgroundColor: '#2C2A8C' }}>
              <img src="/image/scb.png" alt="SCB" className="w-2/3" />
            </div>
          </div>
        </div>

        <button
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg"
          onClick={handleConfirm}
          disabled={!paymentMethod || (paymentMethod === 'creditCard' && creditCardNumber.length !== 16)}
        >
          ยืนยันการจอง
        </button>
      </main>
    </div>
  );
}

export default PaymentMethodPage;
