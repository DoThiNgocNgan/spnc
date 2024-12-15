import React from 'react';
import PDFViewer from '../../components/PDFViewer/PDFViewer';

const ExerciseDetail = ({ exercise }) => {
  return (
    <div>
      <h2>{exercise.title}</h2>
      {exercise.pdfFile && (
        <PDFViewer 
          pdfUrl={`http://localhost:5000${exercise.pdfFile}`}
        />
      )}
      {/* Các phần khác của trang */}
    </div>
  );
};

export default ExerciseDetail; 