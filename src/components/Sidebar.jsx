import { useState, useEffect } from "react";
import PriceRangeSlider from "./PriceRangeSlider"; // path adjust karo apke folder ke hisaab se

const Sidebar = ({ filters, onFilterChange }) => {
  // State for dynamic data
  const [hotDeals, setHotDeals] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [brands, setBrands] = useState([]);

  // Fetch data on component mount (simulating API call)
  useEffect(() => {
    // Simulate API call with timeout
    const fetchData = () => {
      // Data from the image (could come from an API)
      setHotDeals([
        { name: "Nike", count: 2 },
        { name: "Afrmax", count: 48 },
        { name: "Nike", count: 14 },
        { name: "Adidas", count: 15 },
        { name: "Vans", count: 23 },
        { name: "All Stars", count: 1 },
        { name: "Adidas", count: 95 },
      ]);

      setPriceRange({ min : 13.33, max: 25.33 });

      setBrands([
        { name: "Nike", count: 99 },
        { name: "Nike", count: 99 },
        { name: "Adidas", count: 99 },
        { name: "Siemens", count: 99 },
      ]);
    };

    fetchData();
  }, []);

  // State to track if sidebar is visible on mobile
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Sidebar */}
      <div
        className={`
          w-64 bg-white p-4 fixed lg:static h-full lg:h-auto overflow-y-auto
          transition-transform duration-300 z-40
          ${
            isSidebarVisible
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Hot Deals Section */}
        <div className="mb-6 p-4 rounded-md bg-[#F3F4F6]">
          <h3 className="font-bold text-lg mb-3">Hot Deals</h3>
          <div className="space-y-2">
            {hotDeals.map((deal, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span>{deal.name}</span>
                <span className="text-gray-500">{deal.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <PriceRangeSlider
          priceRange={priceRange}
          onFilterChange={onFilterChange}
          filters={filters}
        />

        {/* Color Section */}
        <div className="mb-6 p-4 rounded-md bg-[#F3F4F6]">
          <h3 className="font-bold text-lg mb-3">COLOR</h3>
          <div className="flex flex-wrap gap-1">
            {[
              { name: "Red", value: "red" },
              { name: "Blue", value: "blue" },
              { name: "Green", value: "green" },
              { name: "Black", value: "black" },
              { name: "White", value: "white" },
              { name: "Yellow", value: "yellow" },
              { name: "Purple", value: "purple" },
            ].map((color) => (
              <button
                key={color.value}
                className={`w-6 h-6 rounded-full border ${
                  filters.colors.includes(color.value)
                    ? "ring-2 ring-blue-500 ring-offset-1"
                    : ""
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
                onClick={() => {
                  if (filters.colors.includes(color.value)) {
                    onFilterChange(
                      "colors",
                      filters.colors.filter((c) => c !== color.value)
                    );
                  } else {
                    onFilterChange("colors", [...filters.colors, color.value]);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Brand Section */}
        <div className="mb-6 p-4 rounded-md bg-[#F3F4F6]">
          <h3 className="font-bold text-lg mb-3">BRAND</h3>
          <div className="space-y-2">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span>{brand.name}</span>
                <span className="text-gray-500">{brand.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* More Section */}
        <div className="mb-6 p-4 rounded-md bg-[#F3F4F6]">
          <h3 className="font-bold text-lg mb-3">MORE</h3>
          <div className="text-sm">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="free-shipping"
                className="mr-2 h-4 w-4 text-blue-500"
                checked={filters.freeShipping || false}
                onChange={(e) =>
                  onFilterChange("freeShipping", e.target.checked)
                }
              />
              <label htmlFor="free-shipping">Free Shipping</label>
            </div>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="on-sale"
                className="mr-2 h-4 w-4 text-blue-500"
                checked={filters.onSale || false}
                onChange={(e) => onFilterChange("onSale", e.target.checked)}
              />
              <label htmlFor="on-sale">On Sale</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="in-stock"
                className="mr-2 h-4 w-4 text-blue-500"
                checked={filters.inStock || false}
                onChange={(e) => onFilterChange("inStock", e.target.checked)}
              />
              <label htmlFor="in-stock">In Stock</label>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          className="w-full py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 transition-colors"
          onClick={() => onFilterChange("clear")}
        >
          Clear All Filters
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarVisible(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
