import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">
            Terms and Conditions
          </h1>
          <p className="text-gray-700 mb-4">
            Welcome to <span className="font-semibold text-blue-600">VerifyMe AI</span>. Please read these terms and conditions carefully before using our platform.
          </p>
          <ul className="list-decimal ml-6 space-y-3 text-gray-800">
            <li>
              <span className="font-semibold">Demo Use Only:</span> This tool is for demonstration purposes as part of Zynga Hackathon 2025. Do not use real Aadhar cards or sensitive personal information.
            </li>
            <li>
              <span className="font-semibold">No Data Storage:</span> We do not store, share, or process any uploaded data beyond the current session. All verification is simulated.
            </li>
            <li>
              <span className="font-semibold">No Legal Validity:</span> Results provided by VerifyMe AI are not legally binding and should not be used for official verification.
            </li>
            <li>
              <span className="font-semibold">Ethical Use:</span> Use this platform ethically and responsibly. Do not attempt to misuse or exploit the system.
            </li>
            <li>
              <span className="font-semibold">No Liability:</span> The creators of VerifyMe AI are not responsible for any misuse or consequences arising from the use of this tool.
            </li>
          </ul>
          <p className="mt-6 text-gray-600 text-sm text-center">
            By using this website, you agree to these terms. For questions, contact us at <a href="mailto:support@verifymeai.com" className="text-blue-500 underline">support@verifymeai.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}