import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-gray-700 mb-6 text-center">
            Have questions, feedback, or need support? Reach out to us!
          </p>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Email</h2>
            <a href="mailto:support@verifymeai.com" className="text-blue-500 underline text-lg">
              support@verifymeai.com
            </a>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Hackathon Team</h2>
            <p className="text-gray-700">
              Zynga Hackathon 2025<br />
              <span className="text-sm text-gray-500">Demo Project Only</span>
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Connect</h2>
            <ul className="list-disc ml-6 text-gray-700">
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.zynga.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Zynga Website
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}