const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Law Enforcement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Install App</h3>
            <p className="text-gray-300 mb-4">Get the app and shop on the go</p>
            <div className="space-y-2">
              <button className="w-full bg-black text-white py-2 px-4 rounded">
                Download on the App Store
              </button>
              <button className="w-full bg-black text-white py-2 px-4 rounded">
                Get it on Google Play
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2023 SoftDef. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
