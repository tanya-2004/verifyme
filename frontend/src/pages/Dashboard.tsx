import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VerificationCard from '@/components/VerificationCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Webcam from 'react-webcam';

const API_URL = "http://localhost:5000/verify";

export default function Dashboard() {
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [aadharBase64, setAadharBase64] = useState<string | null>(null);
  const [aadharPreview, setAadharPreview] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfieBase64, setSelfieBase64] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [showAadharWebcam, setShowAadharWebcam] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [verificationResults, setVerificationResults] = useState<null | {
    isOver18: boolean;
    dob: string;
    age: number;
    faceMatchConfidence: number;
    matchResult?: string;
    blurryFeedback?: string;
  }>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const aadharWebcamRef = useRef<Webcam>(null);
  const webcamRef = useRef<Webcam>(null);

  // Aadhar handlers
  const handleAadharUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAadharFile(file);
      setAadharBase64(null);
      const reader = new FileReader();
      reader.onload = () => setAadharPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleCaptureAadhar = () => {
    if (aadharWebcamRef.current) {
      const imageSrc = aadharWebcamRef.current.getScreenshot();
      if (imageSrc) {
        setAadharPreview(imageSrc);
        setAadharBase64(imageSrc);
        setAadharFile(null);
        setShowAadharWebcam(false);
      }
    }
  };

  // Selfie handlers
  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelfieFile(file);
      setSelfieBase64(null);
      const reader = new FileReader();
      reader.onload = () => setSelfiePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleCaptureSelfie = () => {
    setShowWebcam(true);
  };
  const handleTakePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setSelfiePreview(imageSrc);
        setSelfieBase64(imageSrc);
        setSelfieFile(null);
        setShowWebcam(false);
      }
    }
  };

  function getAuthToken() {
    const authData = localStorage.getItem('verifyme_auth');
    if (!authData) return null;
    try {
      const { token } = JSON.parse(authData);
      return token || null;
    } catch {
      return null;
    }
  }

  // Verification
  const handleVerify = async () => {
    if ((!aadharFile && !aadharBase64) || (!selfieFile && !selfieBase64)) {
      alert('Please provide both Aadhar card and selfie (upload or capture)');
      return;
    }
    setIsVerifying(true);
    setVerificationResults(null);

    const formData = new FormData();
    if (aadharBase64) {
      formData.append('aadhar_capture', aadharBase64);
    } else if (aadharFile) {
      formData.append('aadhar_file', aadharFile);
    }
    if (selfieBase64) {
      formData.append('selfie_capture', selfieBase64);
    } else if (selfieFile) {
      formData.append('selfie_capture', await fileToBase64(selfieFile));
    }

    try {
      const token = getAuthToken();
      const res = await fetch(API_URL, {
        method: "POST",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();

      // Parse DOB and age from age_status string
      let dob = "Unknown";
      let age = "Unknown";
      if (data.age_status && data.age_status.includes("(")) {
        const dobMatch = data.age_status.match(/^(\d{2}-\d{2}-\d{4})/);
        if (dobMatch) dob = dobMatch[1];
        const ageMatch = data.age_status.match(/\(Age: (\d+)\)/);
        if (ageMatch) age = ageMatch[1];
      }

      setVerificationResults({
        isOver18: data.age_status?.includes("18+"),
        dob,
        age: typeof age === "string" && !isNaN(parseInt(age)) ? parseInt(age) : 0,
        faceMatchConfidence: data.confidence || 0,
        matchResult: data.match_result,
        blurryFeedback: data.blurry_feedback,
      });
    } catch (error) {
      console.error('Verification error:', error);
      alert('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Helper to convert file to base64 for selfie_capture
  async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Identity Verification Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Please upload your Aadhar card and take a selfie for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="aadhar" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="aadhar">Aadhar Card</TabsTrigger>
                  <TabsTrigger value="selfie">Selfie</TabsTrigger>
                </TabsList>
                {/* Aadhar Tab */}
                <TabsContent value="aadhar" className="space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50">
                    {aadharPreview ? (
                      <div className="w-full relative">
                        <img
                          src={aadharPreview}
                          alt="Aadhar Preview"
                          className="mx-auto max-h-48 rounded"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setAadharPreview(null);
                            setAadharFile(null);
                            setAadharBase64(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : showAadharWebcam ? (
                      <div className="flex flex-col items-center">
                        <Webcam
                          audio={false}
                          ref={aadharWebcamRef}
                          screenshotFormat="image/jpeg"
                          width={320}
                          height={240}
                          videoConstraints={{ facingMode: "environment" }}
                        />
                        <Button className="mt-2" onClick={handleCaptureAadhar}>
                          Capture Aadhar
                        </Button>
                        <Button className="mt-2" variant="outline" onClick={() => setShowAadharWebcam(false)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-500 mb-2">Click or drag file to upload</p>
                        <p className="text-xs text-gray-400 mb-4">For demo purposes only. PNG, JPG</p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button
                            variant="outline"
                            className="relative"
                            onClick={() => document.getElementById('aadhar-upload')?.click()}
                          >
                            Upload File
                            <input
                              id="aadhar-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleAadharUpload}
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowAadharWebcam(true)}
                          >
                            Capture via Webcam
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
                {/* Selfie Tab */}
                <TabsContent value="selfie" className="space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50">
                    {selfiePreview ? (
                      <div className="w-full relative">
                        <img
                          src={selfiePreview}
                          alt="Selfie Preview"
                          className="mx-auto max-h-48 rounded"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setSelfiePreview(null);
                            setSelfieFile(null);
                            setSelfieBase64(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : showWebcam ? (
                      <div className="flex flex-col items-center">
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width={320}
                          height={240}
                          videoConstraints={{ facingMode: "user" }}
                        />
                        <Button className="mt-2" onClick={handleTakePhoto}>
                          Capture Photo
                        </Button>
                        <Button className="mt-2" variant="outline" onClick={() => setShowWebcam(false)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button
                            variant="outline"
                            className="relative"
                            onClick={() => document.getElementById('selfie-upload')?.click()}
                          >
                            Upload Photo
                            <input
                              id="selfie-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleSelfieUpload}
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleCaptureSelfie}
                          >
                            Take Photo
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              <Button
                className="w-full mt-6"
                disabled={(!aadharFile && !aadharBase64) || (!selfieFile && !selfieBase64) || isVerifying}
                onClick={handleVerify}
              >
                {isVerifying ? 'Verifying...' : 'Verify Identity'}
              </Button>
            </CardContent>
          </Card>
          {/* Results Section */}
          <VerificationCard results={verificationResults} />
        </div>
      </main>
      <Footer />
    </div>
  );
}