"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import for translation

function ProfilePage() {
    const router = useRouter();
    const { t } = useTranslation(); // Initialize translation hook
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const phone = "0968707777"; // Replace with the phone number in use
                const res = await fetch(`/api/get-user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ phone }),
                });

                const data = await res.json();

                if (data.success) {
                    setUserData(data.user);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError(t("profile.errorFetchingUser")); // Use translated error message
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [t]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-lg font-medium text-gray-600">{t("profile.loading")}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-lg font-medium text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white text-black shadow p-4 flex items-center justify-between">
                <button onClick={() => window.history.back()} className="text-black text-lg">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">{t("profile.title")}</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Profile Information */}
            <main className="w-full max-w-md bg-white shadow-lg mt-6 rounded-lg px-6 py-8">
                <h2 className="text-lg font-bold text-gray-700 mb-4">{t("profile.header")}</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-600">{t("profile.firstName")}:</p>
                        <p className="text-gray-700">{userData.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-600">{t("profile.lastName")}:</p>
                        <p className="text-gray-700">{userData.surname}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-600">{t("profile.email")}:</p>
                        <p className="text-gray-700">{userData.email}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-600">{t("profile.phone")}:</p>
                        <p className="text-gray-700">{userData.phone}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;
