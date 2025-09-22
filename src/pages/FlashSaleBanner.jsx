import { useState, useEffect } from "react";

const FlashSaleBanner = () => {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Countdown Timer
  useEffect(() => {
    const target = new Date().getTime() + 9 * 60 * 60 * 1000;

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTime({ h: "00", m: "00", s: "00" });
        return;
      }

      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      );
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      );
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTime({ h: hours, m: minutes, s: seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Banner data
  const banners = [
    {
      id: 1,
      img: "/assets/banners/sale1.png",
      title: "Super Flash Sale",
      discount: "50% Off",
    },
    {
      id: 2,
      img: "/assets/banners/sale2.png",
      title: "Mega Deal",
      discount: "40% Off",
    },
    {
      id: 3,
      img: "/assets/banners/sale3.png",
      title: "Weekend Sale",
      discount: "60% Off",
    },
    {
      id: 4,
      img: "/assets/banners/sale4.png",
      title: "Festive Offer",
      discount: "70% Off",
    },
    {
      id: 5,
      img: "/assets/banners/sale5.png",
      title: "Hot Deals",
      discount: "30% Off",
    },
  ];

  // Auto Slide
  useEffect(() => {
    const slide = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(slide);
  }, [banners.length]);

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative w-full h-60 sm:h-72 md:h-80 rounded-lg overflow-hidden">
        <img
          src={banners[currentIndex].img}
          alt={banners[currentIndex].title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {banners[currentIndex].title}
          </h2>
          <p className="text-lg sm:text-xl font-semibold mb-4">
            {banners[currentIndex].discount}
          </p>

          {/* Timer */}
          <div className="flex space-x-3">
            <span className="bg-white text-blue-900 font-bold px-3 py-2 rounded-md text-lg">
              {time.h}
            </span>
            <span className="bg-white text-blue-900 font-bold px-3 py-2 rounded-md text-lg">
              {time.m}
            </span>
            <span className="bg-white text-blue-900 font-bold px-3 py-2 rounded-md text-lg">
              {time.s}
            </span>
          </div>
        </div>
      </div>

      {/* Dots alag div me (overlay ke bahar) */}
      <div className="flex justify-center mt-3 space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-blue-600 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashSaleBanner;
