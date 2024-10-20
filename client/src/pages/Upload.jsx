import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CheckCircle, X } from 'lucide-react';  // Import tick and close icon

import axios from 'axios';
import Sidebar from './Sidebar';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission
  const [uploadStatus, setUploadStatus] = useState(null); // Status for upload feedback
  const [category, setCategory] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false
  });

  const removeFile = (file) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const uploadFile = async () => {
    if (files.length === 0) {
      setUploadStatus('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', files[0]);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://127.0.0.1:5000/upload-pdf', formData);

      setUploadStatus('File uploaded successfully');
      console.log(response.data);
      setIsSubmitted(true);  // Show success modal after upload

      const text = response.data.text;

      const response2 = await axios.post("http://127.0.0.1:5000/statute-identification", { text })
      console.log(response2.data)
      
      const data = response2.data;

      // maxEntry will now hold the key-value pair with the max value
      const maxEntry = Object.keys(data).reduce((max, key) => {
        return data[key] > data[max] ? key : max;
      }, Object.keys(data)[0]);
      
      // maxEntry will hold the key with the max value
      const maxValue = data[maxEntry];

      console.log(maxEntry)
      setCategory(maxEntry);

      // Clear the files data after successful upload
      setFiles([]); 

    } catch (error) {
      if (error.response) {
        setUploadStatus(`Upload failed: ${error.response.data.error || 'Server error'}`);
      } else if (error.request) {
        setUploadStatus('Upload failed: No response from server');
      } else {
        setUploadStatus(`Upload failed: ${error.message}`);
      }
    }
  };

  const closeModal = () => {
    setIsSubmitted(false);  // Close modal on clicking close button or outside
  };

  return (
    <>
      <div className='flex'>
        <Sidebar />
        <div className="w-full h-full mx-auto p-8">
          {/* Heading */}
          <h3 className="text-gray-700 text-3xl font-medium ml-5">Upload Documents</h3>
          <p className=' mt-6 ml-5 mb-5 text-justify text-gray-500'>
            Please upload your legal documents. You can drag and drop files or click to select from your device.
          </p>

          <div
            {...getRootProps()}
            className={`ml-5 border-2 border-dashed  border-custom-yellow w-[70%] rounded-lg p-20 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-black'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-500">Drop the files here ...</p>
            ) : (
              <p>Drag and drop some files here, or click to select files</p>
            )}
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
              <div className="grid grid-cols-2 grid-rows-0 md:grid-cols-3 gap-4">
                {files.map((file) => (
                  <div key={file.name} className="relative group">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-28 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-28 flex items-center justify-center bg-gray-100 rounded-lg">
                        <span className="text-4xl">📄</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => removeFile(file)}
                        className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-2 text-sm truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {files.length > 0 && (
            <div className="mt-6">
              <button
                onClick={uploadFile}
                className="px-4 py-2 bg-custom-green text-white rounded hover:bg-green-600 transition-colors"
              >
                Submit
              </button>
            </div>
          )}

          {/* Success modal */}
          {isSubmitted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 text-center">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <p className="mt-4 text-lg text-gray-700">Files uploaded successfully!</p>
                <button
                  onClick={closeModal}
                  className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Upload Status */}
          {uploadStatus && (
            <div className={`mt-4 p-2 rounded ${uploadStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {uploadStatus}
            </div>
          )}

          {category && (
            <div className='mt-10' >
              We can classify the given uploaded document in the following category: <span className='font-semibold' >{category}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Upload;
