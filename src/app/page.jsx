"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import { FaCar } from "react-icons/fa";  // นำเข้าไอคอน FaCar
import Container from "./components/Container";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container>
      <main className="min-h-screen flex justify-center items-center" 
        style={{ background: 'linear-gradient(#0068F9, #00347D)' }}> {/* ใช้ linear-gradient สำหรับไล่สี */}
        <div className="flex flex-col items-center justify-center p-6">
          {/* ใช้ไอคอน FaCar แทนรูปภาพ */}
          <FaCar className="text-white text-9xl mb-2" /> {/* ขนาดและสีของไอคอน */}
        </div>
      </main>
    </Container>
  );
}
