"use client";

import React, { useState } from 'react';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';

const LanguagePage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('ไทย'); // ภาษาเริ่มต้น
    const [dropdownOpen, setDropdownOpen] = useState(false); // สำหรับเปิด-ปิด dropdown

    const languages = ['ไทย', 'English', '中文', '日本語']; // รายการภาษาที่เลือกได้

    const changeLanguage = (lang) => {
        setSelectedLanguage(lang);
        localStorage.setItem('selectedLanguage', lang); // บันทึกภาษาลง localStorage
        setDropdownOpen(false); // ปิด dropdown หลังจากเลือกภาษา
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => window.history.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">ภาษา / Language</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Content */}
            <main className="w-full max-w-md bg-white p-6 rounded shadow mt-4 flex-grow">
                <h2 className="text-lg font-semibold mb-4">ภาษา / Language</h2>
                <div className="space-y-4">
                    {/* ปุ่มแสดงภาษาและ dropdown */}
                    <div className="relative">
                        <button 
                            className="flex items-center justify-between w-full py-4 px-4 bg-white shadow-sm rounded h-16 border border-gray-200"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="text-gray-700 font-medium">{selectedLanguage}</span>
                            <FaChevronDown className="text-blue-500" />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute w-full bg-white shadow rounded mt-2 border border-gray-200">
                                {languages.map((lang) => (
                                    <div 
                                        key={lang}
                                        onClick={() => changeLanguage(lang)} // เมื่อเลือกภาษา
                                        className={`py-2 px-4 cursor-pointer ${selectedLanguage === lang ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                    >
                                        {lang}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Empty space at the bottom */}
                <div className="h-16"></div>
            </main>
        </div>
    );
};

export default LanguagePage;
