import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center py-10 px-4 flex-1">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
            Help &amp; User Guide
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Welcome to <span className="font-semibold text-blue-600">VerifyMe AI</span>! This page will guide you through using the platform for quick and secure identity verification.
          </p>

          <ol className="space-y-6 text-gray-800">
            <li>
              <h2 className="text-xl font-semibold text-blue-600 mb-1">1. Create an Account</h2>
              <ul className="list-disc ml-6">
                <li>Go to the <Link to="/signup" className="text-blue-500 underline">Sign Up</Link> page.</li>
                <li>Enter your email and a secure password.</li>
                <li>Click <span className="font-semibold">Sign Up</span> to create your account.</li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-blue-600 mb-1">2. Login</h2>
              <ul className="list-disc ml-6">
                <li>Go to the <Link to="/login" className="text-blue-500 underline">Login</Link> page.</li>
                <li>Enter your registered email and password.</li>
                <li>Click <span className="font-semibold">Sign In</span> to access your dashboard.</li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-blue-600 mb-1">3. Start Verification</h2>
              <ul className="list-disc ml-6">
                <li>Navigate to the <Link to="/dashboard" className="text-blue-500 underline">Verification</Link> page.</li>
                <li>Upload your <span className="font-semibold">Aadhar card</span> (image or scan).</li>
                <li>Capture or upload a <span className="font-semibold">live selfie</span>.</li>
                <li>Click <span className="font-semibold">Verify</span> to start the process.</li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-blue-600 mb-1">4. View Results</h2>
              <ul className="list-disc ml-6">
                <li>After processing, you will see:</li>
                <ul className="list-disc ml-6">
                  <li>Date of Birth extracted from your Aadhar card.</li>
                  <li>Your calculated age and 18+ status.</li>
                  <li>Face match result and confidence score.</li>
                  <li>Blurriness warnings if any image is unclear.</li>
                </ul>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-blue-600 mb-1">5. Profile &amp; Logout</h2>
              <ul className="list-disc ml-6">
                <li>Click the <span className="font-semibold">profile icon</span> in the top right to view your email and logout.</li>
                <li>Always logout after use for security.</li>
              </ul>
            </li>
          </ol>

          <div className="mt-10">
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Tips for Best Results</h2>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Ensure your Aadhar card image is clear and well-lit.</li>
              <li>Take your selfie in good lighting, facing the camera directly.</li>
              <li>Use recent and valid documents for verification.</li>
              <li>If you see a blurriness warning, retake the photo for better accuracy.</li>
            </ul>
          </div>

          <div className="mt-10 text-center">
            <span className="text-gray-600">Still need help? Contact support at </span>
            <a href="mailto:support@verifymeai.com" className="text-blue-500 underline">support@verifymeai.com</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}