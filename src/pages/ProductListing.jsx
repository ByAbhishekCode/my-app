import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { products } from "../data/products";
import shoeImg from "../assets/banners/shoes.png";

const ProductListing = () => {
  const [allProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [view, setView] = useState("grid"); // 👈 New state for view toggle
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Adidas Sale Banner */}
          <div
            className="mb-8 overflow-hidden shadow-lg w-full max-w-6xl mx-auto"
            style={{ height: "350px" }}
          >
            <div
              className="h-full flex flex-col md:flex-row"
              style={{ backgroundColor: "rgba(64, 191, 255, 1)" }}
            >
              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center p-9 md:pl-12 text-white">
                <div className="mb-8">
                  <h1 className="text1xl md:text-2xl lg:text-3xl font-bold mb-2 mt-15">
                    Adidas Men Running
                  </h1>
                  <h2 className="text-sm md:text-xl lg:text-2xl font-semibold">
                    Sneakers
                  </h2>
                  <p className="text-sm md:text-sm max-w-md">
                    Performance and design. Taken right to the edge.
                  </p>
                </div>
                <button className="bg-transparent border-none text-white font-bold text-base md:text-lg p-0 m-0 -ml-80 cursor-pointer">
                  SHOP NOW
                </button>
                <div className="w-16 h-0.5 bg-white -mt-1.9"></div>
              </div>

              {/* Shoe Image */}
              <div className="flex-1 flex items-center justify-center relative p-4">
                <img
                  src={shoeImg}
                  alt="Adidas Men Running Sneakers"
                  className="relative z-10 w-64 h-48 md:w-80 md:h-60 lg:w-96 lg:h-72 object-contain transform mt-10"
                  style={{
                    filter: "drop-shadow(0px 15px 25px rgba(0, 0, 0, 0.4))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Products Count and Sort Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-4 gap-4 bg-[#F3F4F6] p-3">
            {/* Left: Items count + Sort + Show */}
            <div className="flex items-center gap-12 flex-wrap">
              {/* Items count */}
              <p className="text-gray-600">{filteredProducts.length} Items</p>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Sort By</span>
                <select
                  className="border border-gray-200 rounded-md py-1 px-2 text-sm"
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
                <span className="text-gray-600">Show</span>
                <select
                  className="border border-gray-200 rounded-md py-1 px-2 text-sm"
                  defaultValue="12"
                >
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                  <option value="24">24</option>
                </select>
              </div>
            </div>

            {/* Right: View Icons */}
            <div className="flex items-center gap-2 text-gray-500">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center border p-4 rounded-lg shadow-sm"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-contain"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="text-gray-600">{product.category}</p>
                        <p className="text-blue-600 font-bold">
                          ₹{product.discountPrice}
                        </p>
                        <p className="text-sm text-gray-500">
                          Rating: ⭐ {product.ratingValue}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your filters.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
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
