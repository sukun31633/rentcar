// components/DestinationCard.js
import Image from "next/image";

const DestinationCard = ({ name, imageSrc }) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <Image
      src={imageSrc}
      alt={name}
      width={300}
      height={200}
      className="object-cover rounded-lg"
    />
    <h3 className="text-lg font-semibold mt-2">{name}</h3>
    <p className="text-blue-500 cursor-pointer">ค้นหา ทาง เมืองนี้</p>
  </div>
);

export default DestinationCard;
