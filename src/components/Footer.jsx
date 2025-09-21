const Footer = () => {
  return (
    <footer
      className="text-black py-12 mt-16"
      style={{ backgroundColor: "#BCDDFE" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-black hover:text-gray-200">
                  Law Enforcement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">
              Install App
            </h3>
            <p className="text-black mb-4">Get the app and shop on the go</p>
            <div className="space-y-2">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
