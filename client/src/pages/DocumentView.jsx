"use client";

import React, { useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Sidebar from './Sidebar';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import ChatModal from './ChatModal'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

export default function PDFUploadAndAnalysis() {
  const [docs, setDocs] = useState([]);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }
    
    setError(null);
    setOutput(null);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/upload-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const extractedText = response.data.text;

      const statuteAnalysis = await analyzeStatuteText(extractedText);
      const ipcAnalysis = await analyzeIPCText(extractedText);
      const segmentationAnalysis = await analyzeSemanticSegmentation(extractedText);
      const judgmentAnalysis = await analyzeJudgmentPrediction(extractedText);

      setOutput({
        statuteAnalysis,
        ipcAnalysis,
        segmentationAnalysis,
        judgmentAnalysis
      });

      const newDocs = [{ uri: URL.createObjectURL(file), fileType: "pdf", fileName: file.name }];
      setDocs(newDocs);

    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
    }
  };

  const analyzeStatuteText = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/statute-identification', { text });
      return response.data;
    } catch (error) {
      setError('Error analyzing statute text. Please try again.');
      return null;
    }
  };

  const analyzeIPCText = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/ipc-identification', { text });
      return response.data;
    } catch (error) {
      setError('Error analyzing IPC text. Please try again.');
      return null;
    }
  };

  const analyzeSemanticSegmentation = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/semantic-segmentation', { text });
      return response.data;
    } catch (error) {
      setError('Error analyzing semantic segmentation. Please try again.');
      return null;
    }
  };

  const analyzeJudgmentPrediction = async (text) => {
    try {
      const response = await axios.post('http://localhost:5000/judgment-prediction', { text });
      return response.data;
    } catch (error) {
      setError('Error analyzing judgment prediction. Please try again.');
      return null;
    }
  };

  const renderStatuteIdentification = () => {
    const highestStatute = Object.entries(output.statuteAnalysis)
      .sort(([, a], [, b]) => b - a)[0];
    return (
      <div>
        <h3 className="font-semibold">Statute Identification:</h3>
        <p>Highest Statute: {highestStatute[0]} - {highestStatute[1].toFixed(2)}</p>
      </div>
    );
  };

  const renderIPCIdentification = () => {
    const top3IPC = Object.entries(output.ipcAnalysis)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    return (
      <div>
        <h3 className="font-semibold">Top 3 IPC Sections:</h3>
        <ul className="list-disc pl-5">
          {top3IPC.map(([section, probability]) => (
            <li key={section}>{section} - {probability.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSemanticSegmentation = () => {
    const labels = output.segmentationAnalysis.top_tags.map(tag => tag.tag);
    const data = output.segmentationAnalysis.top_tags.map(tag => tag.count);

    const lineData = {
      labels: labels,
      datasets: [{
        label: 'Tag Count',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    return (
      <div>
        <h3 className="font-semibold">Semantic Segmentation:</h3>
        <Line data={lineData} />
      </div>
    );
  };

  const renderJudgmentPrediction = () => {
    const labels = ['Landlord', 'Tenant', 'Neutral', 'Other'];
    const data = output.judgmentAnalysis.probabilities;

    const barData = {
      labels: labels,
      datasets: [{
        label: 'Probability',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    return (
      <div>
        <h3 className="font-semibold">Judgment Prediction:</h3>
        <p>Prediction: {output.judgmentAnalysis.prediction}</p>
        <Bar data={barData} />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-1/2 bg-gray-100 p-3 h-full">
        <input type="file" accept="application/pdf" onChange={handleFileUpload} />
        {error && <p className="text-red-500">{error}</p>}
        {docs.length > 0 && (
          <DocViewer 
            documents={docs} 
            pluginRenderers={DocViewerRenderers}
            style={{ width: '100%', height: '100vh', overflowY: 'auto' }} 
          />
        )}
      </div>

      <div className="w-1/2 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Document Analysis</h1>
        {output ? (
          <div className='space-y-8'>
            {renderStatuteIdentification()}
            {renderIPCIdentification()}
            {renderSemanticSegmentation()}
            {renderJudgmentPrediction()}
          </div>
        ) : (
          <p className="mb-4">Upload a PDF to see the analysis results.</p>
        )}
      </div>
      <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
        onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="sr-only">Open chat</span>
        </Button>

        <ChatModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </div>
  );
}
