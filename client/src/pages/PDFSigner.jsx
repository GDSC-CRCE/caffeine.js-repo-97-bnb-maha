'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import SignatureCanvas from 'react-signature-canvas'
import { PDFDocument, rgb } from 'pdf-lib'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Sidebar from './Sidebar'
import { useDropzone } from 'react-dropzone'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function PDFSigner() {
  const [pdfFile, setPdfFile] = useState(null)
  const [signatureImage, setSignatureImage] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const signatureRef = useRef()
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
      const url = URL.createObjectURL(file)
      setPdfUrl(url)
    } else {
      alert('Please upload a valid PDF file')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  })

  const handleClearSignature = () => {
    signatureRef.current.clear()
    setSignatureImage(null)
  }

  const handleSaveSignature = () => {
    if (signatureRef.current.isEmpty()) {
      alert('Please provide a signature')
      return
    }
    setSignatureImage(signatureRef.current.getTrimmedCanvas().toDataURL('image/png'))
  }

  const handleSignPDF = async () => {
    if (!pdfFile || !signatureImage) {
      alert('Please upload a PDF and create a signature')
      return
    }

    const existingPdfBytes = await pdfFile.arrayBuffer()
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const pages = pdfDoc.getPages()
    const lastPage = pages[pages.length - 1]

    const pngImage = await pdfDoc.embedPng(signatureImage)
    const pngDims = pngImage.scale(0.3)

    lastPage.drawImage(pngImage, {
      x: lastPage.getWidth() - pngDims.width - 50,
      y: 50,
      width: pngDims.width,
      height: pngDims.height,
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'signed_document.pdf'
    link.click()
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow flex justify-center items-center">
        <Card className="p-6 max-w-4xl w-full">
          <h1 className="text-2xl font-bold mb-4">PDF E-Signature Tool</h1>
          <div className="mb-4">
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer">
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the PDF file here ...</p> :
                  <p>Drag 'n' drop a PDF file here, or click to select a file</p>
              }
            </div>
            {pdfUrl && (
              <div style={{ height: '500px' }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                </Worker>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Signature</h2>
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                width: 500,
                height: 200,
                className: 'border border-gray-300 rounded',
              }}
            />
            <div className="mt-2 space-x-2">
              <Button onClick={handleClearSignature}>Clear</Button>
              <Button onClick={handleSaveSignature}>Save Signature</Button>
            </div>
          </div>
          {signatureImage && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <img src={signatureImage} alt="Signature Preview" className="border border-gray-300 rounded" />
            </div>
          )}
          <Button onClick={handleSignPDF} disabled={!pdfFile || !signatureImage}>
            Sign and Download PDF
          </Button>
        </Card>
      </div>
    </div>
  )
}