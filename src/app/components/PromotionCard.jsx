// components/PromotionCard.js
import Image from "next/image";

const PromotionCard = ({ title, discount, imageSrc }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <Image
      src={imageSrc}
      alt={title}
      width={300}
      height={200}
      className="object-cover rounded-lg"
    />
    <h3 className="text-lg font-semibold mt-2">{title}</h3>
    <p className="text-red-500 font-bold">ลดราคา {discount} บาท</p>
    <p className="text-gray-500 text-sm">BEST PRODUCT ON THE ROAD</p>
  </div>
);

export default PromotionCard;
