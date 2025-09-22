import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { products } from "../data/products";

// Flash Sale Banner Component
const FlashSaleBanner = () => {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    // Set target time (example: 9 hours sale from now)
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

  return (
    <div className="relative w-full h-60 sm:h-72 md:h-80 rounded-lg overflow-hidden mb-6">
      {/* Background Image */}
      <img
        src="/assets/banners/shoes.png"
        alt="Flash Sale"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Super Flash Sale
        </h2>
        <p className="text-lg sm:text-xl font-semibold mb-4">50% Off</p>

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
  );
};

const ProductListing = () => {
  const [allProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [view, setView] = useState("grid");
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    sizes: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
  });

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  useEffect(() => {
    let result = allProducts;

    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.colors.length > 0) {
      result = result.filter((product) =>
        filters.colors.some((color) =>
          product.colors
            .map((c) => c.toLowerCase())
            .includes(color.toLowerCase())
        )
      );
    }

    if (filters.minPrice) {
      result = result.filter(
        (product) => product.discountPrice >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(
        (product) => product.discountPrice <= Number(filters.maxPrice)
      );
    }

    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        filters.brands.some((brand) =>
          product.name.toLowerCase().includes(brand.toLowerCase())
        )
      );
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.discountPrice - b.discountPrice;
        case "price-high":
          return b.discountPrice - a.discountPrice;
        case "rating":
          return b.ratingValue - a.ratingValue;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, sortBy, allProducts]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "clear") {
      setFilters({
        categories: [],
        colors: [],
        sizes: [],
        brands: [],
        minPrice: "",
        maxPrice: "",
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar (Mobile collapsible, Desktop fixed) */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Flash Sale Banner */}
          <FlashSaleBanner />

          {/* Products Count and Sort Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-gray-100 p-3 rounded-lg">
            {/* Left: Items count + Sort + Show */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <p className="text-gray-600 text-sm md:text-base">
                {filteredProducts.length} Items
              </p>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Sort By</span>
                <select
                  className="border border-gray-300 rounded-md py-1 px-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Show */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Show</span>
                <select className="border border-gray-300 rounded-md py-1 px-2 text-sm">
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                  <option value="24">24</option>
                </select>
              </div>
            </div>

            {/* Right: View Icons */}
            <div className="flex items-center gap-3 text-gray-500">
              {/* Grid View */}
              <button
                className={`p-1 ${
                  view === "grid" ? "text-blue-500" : "hover:text-blue-500"
                }`}
                onClick={() => setView("grid")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h4v4H4V6zM10 6h4v4h-4V6zM16 6h4v4h-4V6zM4 12h4v4H4v-4zM10 12h4v4h-4v-4zM16 12h4v4h-4v-4zM4 18h4v4H4v-4zM10 18h4v4h-4v-4zM16 18h4v4h-4v-4z"
                  />
                </svg>
              </button>

              {/* List View */}
              <button
                className={`p-1 ${
                  view === "list" ? "text-blue-500" : "hover:text-blue-500"
                }`}
                onClick={() => setView("list")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Products Grid/List */}
          {currentProducts.length > 0 ? (
            <>
              {view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row items-center sm:items-start border p-4 rounded-lg shadow-sm"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                      />
                      <div className="sm:ml-4 mt-3 sm:mt-0 text-center sm:text-left">
                        <h3 className="text-base md:text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base">
                          {product.category}
                        </p>
                        <p className="text-blue-600 font-bold text-sm md:text-base">
                          ₹{product.discountPrice}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500">
                          Rating: ⭐ {product.ratingValue}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your filters.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => handleFilterChange("clear")}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
