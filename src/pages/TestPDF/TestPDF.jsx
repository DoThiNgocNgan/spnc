import React, { useState } from 'react';
import PDFViewer from '../../components/PDFViewer/PDFViewer';
import './TestPDF.css';

const TestPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      // Tạo URL cho file đã chọn
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
    } else {
      alert('Vui lòng chọn file PDF');
    }
  };

  return (
    <div className="test-pdf-container">
      <h2>Test Đọc File PDF</h2>
      
      <div className="upload-section">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>

      {pdfUrl && (
        <div className="pdf-section">
          <PDFViewer pdfUrl={pdfUrl} />
        </div>
      )}

      {/* Test với PDF có sẵn */}
      <div className="sample-pdf-section">
        <h3>Hoặc xem PDF mẫu:</h3>
        <button 
          onClick={() => setPdfUrl('http://34.142.187.24:5000/uploads/exercises/sample.pdf')}
          className="sample-button"
        >
          Xem PDF mẫu
        </button>
      </div>
    </div>
  );
};

export default TestPDF; 