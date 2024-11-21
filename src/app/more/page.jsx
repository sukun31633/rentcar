"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../components/Header';
import Container from '../components/Container';
import Footer from '../components/Footer';
import { FaUser, FaBell, FaLanguage, FaRegFileAlt, FaHeadset } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function MorePage() {
    const router = useRouter();
    const { t, i18n } = useTranslation(); // Translation hook for dynamic translations
    const [selectedLanguage, setSelectedLanguage] = useState('ไทย'); // Default language

    // Load saved language from localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'th'; // Default to 'th'
        setSelectedLanguage(savedLanguage === 'th' ? 'ไทย' : 'English');
        if (i18n.changeLanguage) {
          i18n.changeLanguage(savedLanguage); // Change the language dynamically
        }
    }, [i18n]);

    // Handle language change
    const handleLanguageChange = (language) => {
        const newLanguage = language === 'ไทย' ? 'th' : 'en';
        localStorage.setItem('selectedLanguage', newLanguage);
        if (i18n.changeLanguage) {
          i18n.changeLanguage(newLanguage);
        }
        setSelectedLanguage(language);
    };

    // Handle logout
    const handleLogout = () => {
        console.log('Logging out...');
        router.push('/login'); // Navigate to login page
    };

    // Menu items
    const menuItems = [
        { icon: <FaUser className="text-orange-500" />, text: t('more.myProfile'), link: "/profile" },
        { icon: <FaBell className="text-red-500" />, text: t('more.notifications'), link: "/notifications" },
        { icon: <FaLanguage className="text-blue-500" />, text: t('more.language'), extra: selectedLanguage, link: "/language", onClick: () => handleLanguageChange(selectedLanguage === 'ไทย' ? 'English' : 'ไทย') },
        { icon: <FaRegFileAlt className="text-purple-500" />, text: t('more.policy'), link: "/policy" },
        { icon: <FaHeadset className="text-yellow-500" />, text: t('more.support'), link: "/support" },
    ];

    return (
        <Container>
            <Header />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
                <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-center">
                    <h1 className="text-lg font-semibold text-center">{t('more.title')}</h1>
                </header>

                {/* Content */}
                <main className="w-full max-w-md bg-white p-4 rounded shadow space-y-6">
                    {/* Menu Items */}
                    <ul className="divide-y divide-gray-200">
                        {menuItems.map((item, index) => (
                            <Link href={item.link} key={index}>
                                <li className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer" onClick={item.onClick}>
                                    <div className="flex items-center space-x-3">
                                        {item.icon}
                                        <span className="text-gray-700">{item.text}</span>
                                    </div>
                                    {item.extra && <span className="text-gray-500">{item.extra}</span>}
                                    <span className="text-gray-500">→</span>
                                </li>
                            </Link>
                        ))}
                    </ul>

                    {/* Logout Button */}
                    <button 
                        onClick={handleLogout} 
                        className="w-full p-3 bg-blue-500 text-white rounded font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 mt-4">
                        {t('more.logout')}
                    </button>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Container>
    );
}

export default MorePage;
