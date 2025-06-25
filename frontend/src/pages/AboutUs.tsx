import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
            About Us
          </h1>
          <p className="text-gray-700 mb-6 text-center">
            <span className="font-semibold text-blue-600">VerifyMe AI</span> is a project built for the Zynga Hackathon 2025 to demonstrate secure, AI-powered identity verification.
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Our Mission</h2>
            <p className="text-gray-700">
              To make identity verification simple, fast, and accessible using modern AI technologies, while prioritizing user privacy and ethical use.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">How It Works</h2>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Extracts Date of Birth from Aadhar using OCR.</li>
              <li>Matches your selfie with the Aadhar photo using face recognition.</li>
              <li>Checks if you are 18+ and provides instant results.</li>
              <li>All processing is simulated for demo purposes; no data is stored.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Our Team</h2>
            <p className="text-gray-700">
              Built by passionate developers and AI enthusiasts at Zynga Hackathon 2025.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}