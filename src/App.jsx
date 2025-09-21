import Navbar from "./components/Navbar";
import ProductListing from "./pages/ProductListing";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <ProductListing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
