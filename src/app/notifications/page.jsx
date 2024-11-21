"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const NotificationsPage = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">{t('notifications.title')}</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Content */}
            <main className="flex flex-col justify-between w-full max-w-md bg-white p-6 rounded shadow mt-4 flex-grow">
                <h2 className="text-lg font-semibold mb-4">{t('notifications.header')}</h2>
                <div className="space-y-4 flex-grow">
                    <div className="flex items-center justify-between py-4 px-4 bg-white shadow-sm rounded">
                        <span className="text-gray-700">{t('notifications.promotion')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between py-4 px-4 bg-white shadow-sm rounded">
                        <span className="text-gray-700">{t('notifications.messages')}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                </div>

                {/* Empty space at the bottom */}
                <div className="h-12"></div> 
            </main>
        </div>
    );
};

export default NotificationsPage;
