import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type VerificationResult = {
  isOver18: boolean;
  dob: string;
  age: number;
  faceMatchConfidence: number;
  blurryFeedback?: string;
} | null;

type VerificationCardProps = {
  results: VerificationResult;
};

export default function VerificationCard({ results }: VerificationCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          Verification Results
          {results && (
            <Badge 
              className={`ml-auto ${results.isOver18 ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {results.isOver18 ? 'Verified 18+' : 'Under 18'}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!results ? (
          <div className="h-full flex flex-col items-center justify-center py-10">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-blue-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-1">No Verification Yet</h3>
            <p className="text-gray-500 text-center max-w-xs">
              Upload your Aadhar card and a selfie, then click "Verify Identity" to see results.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
              <p className="text-xl font-semibold">{results.dob}</p>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-500">Age</h3>
              <p className="text-xl font-semibold">{results.age} years</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Face Match Confidence</h3>
                <span className="text-sm font-medium">{results.faceMatchConfidence}%</span>
              </div>
              <Progress value={results.faceMatchConfidence} className="h-2" />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            {/* Blurry feedback warning */}
            {results.blurryFeedback && results.blurryFeedback.trim() !== "" && (
              <div className="p-3 rounded bg-yellow-100 text-yellow-800 border border-yellow-300">
                <strong>Warning:</strong> {results.blurryFeedback}
              </div>
            )}
            
            <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
              <div className="flex space-x-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-blue-500 mt-0.5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Verification Summary</h4>
                  <p className="text-sm text-blue-700">
                    {results.isOver18 
                      ? "Age verification successful. You are 18+ years old." 
                      : "Age verification failed. You are under 18 years old."
                    }
                    {results.faceMatchConfidence >= 50 
                      ? " Face match successful." 
                      : " Face match confidence is low."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}