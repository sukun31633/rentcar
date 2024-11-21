"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'; // เพิ่ม useTranslation สำหรับการแปลข้อความ

const PolicyPage = () => {
    const router = useRouter();
    const { t } = useTranslation(); // ใช้ useTranslation เพื่อดึงข้อความที่แปล

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">{t('policy.title')}</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Content */}
            <main className="w-full max-w-md bg-white p-6 rounded shadow mt-4 flex-grow overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">{t('policy.title')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{t('policy.introduction')}</p>

                <h3 className="text-md font-semibold mt-4">{t('policy.section1.title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{t('policy.section1.content')}</p>

                <h3 className="text-md font-semibold mt-4">{t('policy.section2.title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{t('policy.section2.content')}</p>

                <h3 className="text-md font-semibold mt-4">{t('policy.section3.title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{t('policy.section3.content')}</p>

                <h3 className="text-md font-semibold mt-4">{t('policy.section4.title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{t('policy.section4.content')}</p>

                <h3 className="text-md font-semibold mt-4">{t('policy.section5.title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{t('policy.section5.content')}</p>

                <h3 className="text-md font-semibold mt-4">{t('policy.section6.title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{t('policy.section6.content')}</p>

                <h3 className="text-md font-semibold mt-4">{t('policy.section7.title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{t('policy.section7.content')}</p>
            </main>
        </div>
    );
};

export default PolicyPage;
