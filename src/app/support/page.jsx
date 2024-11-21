"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaPhoneAlt, FaEnvelope, FaGlobe } from 'react-icons/fa'; // เพิ่มไอคอน FaEnvelope, FaGlobe
import { useTranslation } from 'react-i18next'; // นำเข้า useTranslation

const SupportPage = () => {
    const router = useRouter();
    const { t } = useTranslation(); // ใช้ useTranslation สำหรับการแปล

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">{t('support.title')}</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Content */}
            <main className="w-full max-w-md bg-white p-6 rounded shadow mt-4 flex-grow">
                <h2 className="text-lg font-semibold mb-4">{t('support.contactUs')}</h2>
                <div className="space-y-4">
                    {/* เบอร์โทรศัพท์ */}
                    <a href="tel:062-974-9495" className="flex items-center py-4 px-4 bg-white shadow-sm rounded border border-gray-200 hover:bg-gray-50">
                        <FaPhoneAlt className="text-blue-500 text-2xl mr-3" />
                        <span className="text-gray-700 font-medium">{t('support.phoneNumber')}</span>
                    </a>

                    {/* เว็บไซต์ */}
                    <a href="http://www.sc-sparksolution.com" target="_blank" rel="noopener noreferrer" className="flex items-center py-4 px-4 bg-white shadow-sm rounded border border-gray-200 hover:bg-gray-50">
                        <FaGlobe className="text-green-500 text-2xl mr-3" />
                        <span className="text-gray-700 font-medium">http://www.sc-sparksolution.com</span>
                    </a>

                    {/* อีเมล */}
                    <a href="mailto:contact@sc-sparksolution.com" className="flex items-center py-4 px-4 bg-white shadow-sm rounded border border-gray-200 hover:bg-gray-50">
                        <FaEnvelope className="text-red-500 text-2xl mr-3" />
                        <span className="text-gray-700 font-medium">contact@sc-sparksolution.com</span>
                    </a>
                </div>

                {/* Service Time */}
                <p className="text-gray-500 text-sm mt-4">{t('support.serviceTime')}</p>
            </main>
        </div>
    );
};

export default SupportPage;
