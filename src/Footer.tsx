import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://twitter.com" className="text-accent hover:text-orange-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.228-.616v.06c0 2.385 1.693 4.374 3.946 4.827a4.923 4.923 0 01-2.224.084c.626 1.956 2.444 3.379 4.6 3.419A9.868 9.868 0 010 19.54a13.926 13.926 0 007.548 2.213c9.142 0 14.307-7.721 14.307-14.416 0-.219-.006-.437-.019-.655A10.247 10.247 0 0024 4.59c-.807.357-1.668.596-2.047.697z" />
            </svg>
          </a>
          <a href="https://facebook.com" className="text-accent hover:text-orange-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://instagram.com" className="text-accent hover:text-orange-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.85c-.148 3.252-1.691 4.771-4.919 4.919-1.265.058-1.645.069-4.849.069s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.85c.148-3.252 1.691-4.771 4.919-4.919 1.265-.058 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.668.227 1.981 1.914.136 5.298.014 6.578 0 6.987 0 10.246s.014 3.668.072 4.948c.155 3.384 1.842 5.071 5.226 5.226 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c3.384-.155 5.071-1.842 5.226-5.226.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.155-3.384-1.842-5.071-5.226-5.226C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-accent">Home Page</a></li>
              <li><a href="#about" className="hover:text-accent">About us</a></li>
              <li><a href="#contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">About us</h4>
            <p className="text-sm">
            MovieHub is the platform for cinemalovers to discover the best movies. </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p className="text-sm">E-Mail: info@moviehub.com</p>
            <p className="text-sm">Tel: +90 123 456 7890</p>
          </div>
        </div>
        <p className="text-sm">© 2025 MovieHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;