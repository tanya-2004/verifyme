import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-white py-8 shadow-inner">
      <div className="container mx-auto px-4">
        <Separator className="mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-blue-600">VerifyMe AI</h3>
            <p className="text-gray-500 text-sm">
              Identity verification made simple, secure and reliable.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-blue-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-blue-600 text-sm">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-blue-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-blue-600 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-blue-600">Terms and Conditions</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              This tool is for demonstration purposes only. Do not use real Aadhar cards.
              All verification is simulated, and no data is stored or shared.
              Results are not legally binding. Use ethically as part of Zynga Hackathon 2025 only.
            </p>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <p className="text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} VerifyMe AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}