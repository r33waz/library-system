import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#07b18a] text-white py-10 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Logo and Social */}
          <div className="space-y-6">
            <div className="flex items-center ">
              <Link to={"/e-book/home"}>
                <img
                  loading="lazy"
                  src="/images/Light mode logo.png"
                  alt="Logo"
                  className=" w-32 h-32 object-contain dark:hidden block"
                />
                <img
                  loading="lazy"
                  src="/images/darkmode.png"
                  alt="Logo"
                  className=" w-32 h-32 object-contain dark:block hidden"
                />
              </Link>
            </div>

            <p className="text-sm">
              Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>

            <div className="flex space-x-4">
              <Link to="#" className="bg-white p-2 rounded-full">
                {/* Facebook SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#07b18a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="bg-white p-2 rounded-full">
                {/* LinkedIn SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#07b18a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link to="#" className="bg-white p-2 rounded-full">
                {/* Twitter SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#07b18a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Middle Column - Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/e-book/home" className="hover:underline">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/e-book/about" className="hover:underline">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/e-book/contact" className="hover:underline">
                  CONTACT US
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  CATEGORY
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  GENRE
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Important Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">IMPORTANT LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row - Copyright and Links */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © 2022 Arihant. All Rights Reserved.
          </div>
          <div className="text-sm">
            <Link to="#" className="hover:underline">
              Privacy
            </Link>
            <span className="mx-2">|</span>
            <Link to="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
