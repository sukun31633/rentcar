// components/Carousel.js
import Image from "next/image";

const Carousel = ({ images }) => (
  <div className="carousel flex overflow-hidden">
    {images.map((src, index) => (
      <Image key={index} src={src} alt={`Slide ${index + 1}`} width={300} height={200} className="w-full object-cover" />
    ))}
  </div>
);

export default Carousel;
