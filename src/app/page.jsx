"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import Image from "next/image";
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
      <main className="bg-blue-800 min-h-screen flex justify-center items-center"> {/* ปรับสีพื้นหลัง */}
        <div className="flex flex-col items-center justify-center p-6">
          <Image
            src="/image/car4.png"  // ตรวจสอบเส้นทางให้ถูกต้อง
            alt="Car Image"
            width={400} 
            height={400} 
            className="object-contain mb-2"
          />
        </div>
      </main>
    </Container>
  );
}
