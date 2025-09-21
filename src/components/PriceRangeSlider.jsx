import { useState } from "react";

const PriceRangeSlider = ({ min = 0, max = 100, step = 1}) => {
  const [minValue, setMinValue] = useState(30);
  const [maxValue, setMaxValue] = useState(70);

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="w-full p-4 bg-gray-100 rounded-md mb-6">
      <h3 className="font-bold text-lg mb-3">PRICES</h3>

      <p className="mb-4 text-sm">
        Range: ${minValue} - ${maxValue}
      </p>

      <div className="relative w-full h-8">
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 rounded-full transform -translate-y-1/2" />

        {/* Selected range */}
        <div
          className="absolute top-1/2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) =>
            setMinValue(Math.min(Number(e.target.value), maxValue - step))
          }
          className="range-thumb"
          style={{
            zIndex: minValue >= maxValue - step ? 5 : 3, // only bring forward if overlapping
          }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) =>
            setMaxValue(Math.max(Number(e.target.value), minValue + step))
          }
          className="range-thumb"
          style={{ zIndex: 4 }}
        />
      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-700">
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>

      {/* Styling thumbs */}
      <style jsx>{`
        .range-thumb {
          -webkit-appearance: none;
          appearance: none;
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 40px;
          background: transparent;
          pointer-events: auto;
        }

        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #2563eb;
          border: 3px solid #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }

        .range-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #2563eb;
          border: 3px solid #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PriceRangeSlider;
