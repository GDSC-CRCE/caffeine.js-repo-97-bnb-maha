'use client';

import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from 'react-dropzone';
import Sidebar from './Sidebar';
import axios from 'axios';

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setError('');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5002/extract-text', formData);

      setExtractedText(response.data.extracted_text);
    } catch (error) {
      console.error('Error:', error);
      if (error.message === 'Network Error') {
        setError('Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while processing the file. Please try again.');
      }
      setExtractedText('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Document OCR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the file here ...</p>
                ) : (
                  <p>Drag 'n' drop an image or PDF file here, or click to select a file</p>
                )}
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button onClick={handleUpload} disabled={!file || isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                Upload
              </Button>
              {extractedText && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Extracted Text
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={extractedText}
                      readOnly
                      className="min-h-[200px] text-sm"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
