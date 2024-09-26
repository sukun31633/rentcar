"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const PolicyPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-md bg-white shadow p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="text-gray-600">
                    <FaArrowLeft />
                </button>
                <h1 className="text-lg font-semibold text-center flex-grow">นโยบายความเป็นส่วนตัว</h1>
                <div className="w-5"></div> {/* Spacer */}
            </header>

            {/* Content */}
            <main className="w-full max-w-md bg-white p-6 rounded shadow mt-4 flex-grow overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">นโยบายความเป็นส่วนตัว</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    บริษัทของเราตระหนักถึงความสำคัญของการปกป้องข้อมูลส่วนบุคคลของท่าน และเรามุ่งมั่นที่จะรักษาความเป็นส่วนตัวของข้อมูลผู้ใช้ในทุกๆ การดำเนินการ เราขอชี้แจงรายละเอียดเกี่ยวกับวิธีที่เราจัดเก็บและใช้ข้อมูลส่วนบุคคลของท่าน ดังนี้:
                </p>

                <h3 className="text-md font-semibold mt-4">1. การเก็บรวบรวมข้อมูล</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    เราอาจเก็บข้อมูลส่วนบุคคลของท่านเมื่อท่านทำการสมัครสมาชิก ใช้บริการ หรือทำการติดต่อกับเรา ข้อมูลที่อาจถูกเก็บรวมถึงแต่ไม่จำกัดเฉพาะ ชื่อ-นามสกุล อีเมล ที่อยู่ หมายเลขโทรศัพท์ และข้อมูลการใช้งานของท่าน
                </p>

                <h3 className="text-md font-semibold mt-4">2. การใช้ข้อมูล</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    ข้อมูลที่เรารวบรวมจะถูกใช้เพื่อปรับปรุงการบริการ ประมวลผลคำสั่งซื้อ ส่งข่าวสารและข้อเสนอพิเศษที่เกี่ยวข้องกับบริการของเรา ทั้งนี้ ข้อมูลของท่านจะถูกเก็บไว้เพื่อวัตถุประสงค์ที่ชอบด้วยกฎหมายและไม่เกินกว่าที่จำเป็น
                </p>

                <h3 className="text-md font-semibold mt-4">3. การแบ่งปันข้อมูลกับบุคคลที่สาม</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    เราอาจแบ่งปันข้อมูลของท่านกับบริษัทคู่ค้าและผู้ให้บริการบุคคลที่สามในกรณีที่จำเป็นต้องใช้เพื่อปรับปรุงการบริการ อย่างไรก็ตาม เราจะไม่แบ่งปันหรือขายข้อมูลส่วนบุคคลของท่านให้กับบุคคลที่สามโดยไม่ได้รับการยินยอมจากท่าน
                </p>

                <h3 className="text-md font-semibold mt-4">4. การรักษาความปลอดภัยของข้อมูล</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    เรามุ่งมั่นที่จะปกป้องข้อมูลส่วนบุคคลของท่านโดยใช้มาตรการรักษาความปลอดภัยที่เหมาะสม อย่างไรก็ตาม การส่งข้อมูลผ่านอินเทอร์เน็ตไม่มีการรับประกันว่าจะปลอดภัย 100% ดังนั้นเราขอแนะนำให้ท่านใช้งานอย่างระมัดระวัง
                </p>

                <h3 className="text-md font-semibold mt-4">5. สิทธิของท่าน</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    ท่านมีสิทธิในการเข้าถึงและแก้ไขข้อมูลส่วนบุคคลของท่าน รวมถึงสิทธิในการร้องขอให้ลบข้อมูลหรือหยุดการใช้ข้อมูล หากท่านต้องการใช้สิทธิดังกล่าว ท่านสามารถติดต่อเราได้ผ่านทางข้อมูลติดต่อที่ระบุไว้
                </p>

                <h3 className="text-md font-semibold mt-4">6. การปรับปรุงนโยบาย</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    เราอาจทำการปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว เพื่อให้สอดคล้องกับการเปลี่ยนแปลงของกฎหมายหรือการบริการของเรา ท่านสามารถตรวจสอบนโยบายล่าสุดได้ที่หน้าเว็บไซต์ของเรา
                </p>

                <h3 className="text-md font-semibold mt-4">7. การติดต่อเรา</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                    หากท่านมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ หรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ที่  contact@sc-sparksolution.com
                </p>
            </main>
        </div>
    );
};

export default PolicyPage;
