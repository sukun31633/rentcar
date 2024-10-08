import Image from "next/image";

const CarCard = ({ name, year, imageSrc }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    {/* ใช้ Image component ของ Next.js เพื่อเพิ่มประสิทธิภาพในการโหลด */}
    <Image
      src={imageSrc}
      alt={`${name} ${year}`}
      width={150}
      height={100}
      className="object-cover rounded-md"
    />
    <h3 className="text-lg font-semibold mt-2">{name} {year}</h3>
    <p className="text-sm text-gray-500">เพิ่มเติม</p>
  </div>
);

export default CarCard;
