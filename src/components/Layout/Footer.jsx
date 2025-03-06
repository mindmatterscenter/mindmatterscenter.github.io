import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-earth-800 text-earth-100">
      <div className="container mx-auto p-4 md:pb-4 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-center text-md">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Mind Matters Center</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="underline text-earth-200 hover:bg-gray-300/20 transition-colors">
              Privacy policy
            </Link>
            <a href="https://www.cms.gov/nosurprises" target='blank' className="underline text-earth-200 hover:bg-gray-300/20 transition-colors">
              No surprises act
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;