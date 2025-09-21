import { useState } from "react";

const PriceRangeSlider = ({ priceRange }) => {
  const [filters, setFilters] = useState({
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
  });

  const onFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const minPercent =
    ((filters.minPrice - priceRange.min) / (priceRange.max - priceRange.min)) *
    100;
  const maxPercent =
    ((filters.maxPrice - priceRange.min) / (priceRange.max - priceRange.min)) *
    100;

  return (
    <div className="mb-6 p-4 rounded-md bg-[#F3F4F6] relative">
      <h3 className="font-bold text-lg mb-3">PRICES</h3>

      {/* Live range display */}
      <div className="text-sm mb-4">
        Range: ${filters.minPrice.toFixed(2)} - ${filters.maxPrice.toFixed(2)}
      </div>

      {/* Track background */}
      <div className="absolute w-full h-2 bg-gray-300 rounded-lg top-10 z-0"></div>

      {/* Selected range fill */}
      <div
        className="absolute h-2 bg-blue-500 rounded-lg top-10 z-0"
        style={{
          left: `${minPercent}%`,
          right: `${100 - maxPercent}%`,
        }}
      ></div>

      {/* Min slider */}
      <input
        type="range"
        min={priceRange.min}
        max={priceRange.max}
        step="0.01"
        value={filters.minPrice}
        onChange={(e) => {
          const value = Math.min(
            Number(e.target.value),
            filters.maxPrice - 0.01
          );
          onFilterChange("minPrice", value);
        }}
        className="absolute w-full h-2 appearance-none bg-transparent z-10"
        style={{ pointerEvents: "auto" }}
      />

      {/* Max slider */}
      <input
        type="range"
        min={priceRange.min}
        max={priceRange.max}
        step="0.01"
        value={filters.maxPrice}
        onChange={(e) => {
          const value = Math.max(
            Number(e.target.value),
            filters.minPrice + 0.01
          );
          onFilterChange("maxPrice", value);
        }}
        className="absolute w-full h-2 appearance-none bg-transparent z-20"
        style={{ pointerEvents: "auto" }}
      />

      {/* Thumb styling */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #007bff;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          margin-top: -62px; /* center on track */
        }
        input[type="range"]::-moz-range-thumb {
          width: 10px;
          height: 10px;
          background: #007bff;
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }   
      `}</style>
    </div>
  );
};

export default PriceRangeSlider;
