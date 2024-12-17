import React, { useState, useEffect } from 'react';
import { extractQuestionsFromPDF } from '../../services/pdfService';
import CodeEditor from '../CodeEditor/CodeEditor';
import './PDFViewer.css';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const PDFViewer = ({ pdfUrl, exerciseId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [code, setCode] = useState('');
  const [pdfDoc, setPdfDoc] = useState(null);
  const [exerciseType, setExerciseType] = useState(null);

  useEffect(() => {
    const fetchExerciseType = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/exercises/${exerciseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setExerciseType(data.type);
      } catch (error) {
        console.error('Error fetching exercise type:', error);
        setError('Error fetching exercise type');
      }
    };

    if (exerciseId) {
      fetchExerciseType();
    }
  }, [exerciseId]);

  useEffect(() => {
    if (pdfUrl && exerciseType) {
      if (exerciseType === 'multiple_choice') {
        loadPDF();
      } else if (exerciseType === 'coding') {
        loadPDFDoc();
      }
    }
  }, [pdfUrl, exerciseType]);

  const loadPDF = async () => {
    try {
      console.log('Loading PDF from:', pdfUrl);
      
      // Tải PDF từ URL
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({data: arrayBuffer});
      const pdf = await loadingTask.promise;
      
      // Lấy tất cả các trang của PDF
      const numPages = pdf.numPages;
      let allText = '';
      
      // Đọc text từ tất cả các trang
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        allText += pageText + ' ';
      }

      console.log('Extracted text:', allText); // Debug log

      // Tìm tất cả các câu hỏi trong văn bản
      const questionRegex = /Câu\s+\d+[:.]\s*(.*?)(?=Câu\s+\d+[:.]\s*|$)/gs;
      const matches = [...allText.matchAll(questionRegex)];
      
      // Xử lý từng câu hỏi
      const extractedQuestions = matches.map((match, index) => {
        const questionText = match[1].trim();
        
        // Tách phần câu hỏi và các đáp án
        const parts = questionText.split(/(?=[A-D][.)])/);
        const question = parts[0].trim();
        
        // Tìm đáp án đúng (thường được đánh dấu ở cuối với format "Đáp án: X")
        const answerMatch = questionText.match(/Đáp án:\s*([A-D])/i);
        const correctAnswer = answerMatch ? answerMatch[1] : null;

        // Xử lý các đáp án
        const options = {};
        parts.slice(1).forEach(opt => {
          const [label, ...textParts] = opt.trim().split(/[.)](.+)/);
          if (label && textParts.length > 0) {
            options[label.trim()] = textParts.join('').trim();
          }
        });

        return {
          id: index + 1,
          text: question,
          options: options,
          correctAnswer: correctAnswer
        };
      });

      console.log('Extracted questions with answers:', extractedQuestions); // Debug log
      setQuestions(extractedQuestions);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setError(`Error loading PDF: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadPDFDoc = async () => {
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setLoading(false);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setError(`Error loading PDF: ${error.message}`);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = {
        exercise_id: exerciseId,
        answers: selectedAnswers,
        score: calculateScore()
      };

      console.log('Submitting payload:', payload);

      const response = await fetch('http://localhost:5000/api/submissions/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }

      console.log('Submission response:', data);
      setShowResults(true);
      alert('Nộp bài thành công!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert(`Có lỗi xảy ra khi nộp bài: ${error.message}`);
    }
  };

  const calculateScore = () => {
    const answersData = questions.map((question, index) => ({
      questionIndex: index,
      selectedAnswer: selectedAnswers[index],
      isCorrect: selectedAnswers[index] === question.correctAnswer
    }));

    const score = (answersData.filter(a => a.isCorrect).length / questions.length) * 10;
    setScore(score);
    return score;
  };

  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return '';
    return `http://localhost:5000/uploads/exercises/${pdfPath}`.replace(/([^:]\/)\/+/g, "$1");
  };

  const handleCodeSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await fetch('http://localhost:5000/api/submissions/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          exercise_id: exerciseId,
          code: code
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert('Nộp bài thành công!');
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitError('Có lỗi xảy ra khi nộp bài');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    console.log('Component is loading...');
    return <div className="loading">Đang tải...</div>;
  }
  if (error) return <div className="error">{error}</div>;

  console.log('Rendering with type:', exerciseType);

  return (
    <div className="exercise-container">
      {exerciseType === 'multiple_choice' ? (
        // Phần render cho bài trắc nghiệm
        <div className="quiz-container">
          {questions.map((question, index) => (
            <div key={index} className="question-box">
              <h3>Câu {question.id}: {question.text}</h3>
              <div className="options">
                {Object.entries(question.options || {}).map(([label, text]) => (
                  <label
                    key={`${index}-${label}`}
                    className={`option-label ${
                      showResults
                        ? label === question.correctAnswer
                          ? 'correct'
                          : selectedAnswers[index] === label && selectedAnswers[index] !== question.correctAnswer
                            ? 'incorrect'
                            : ''
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={label}
                      checked={selectedAnswers[index] === label}
                      onChange={() => handleAnswerSelect(index, label)}
                      disabled={showResults}
                    />
                    <span className="option-text">
                      {label}. {text}
                    </span>
                  </label>
                ))}
              </div>
              {showResults && (
                <div className="answer-feedback">
                  <p>Đáp án đúng: {question.correctAnswer}</p>
                </div>
              )}
            </div>
          ))}
          
          {questions.length > 0 && !showResults && (
            <button 
              className="submit-button" 
              onClick={submitQuiz}
              disabled={submitting}
            >
              {submitting ? 'Đang nộp bài...' : 'Nộp bài'}
            </button>
          )}

          {submitError && (
            <div className="error-message">
              {submitError}
            </div>
          )}

          {showResults && (
            <div className="results">
              <h2>Kết quả</h2>
              <p>S�� câu đúng: {score}/{questions.length}</p>
              <p>Điểm: {((score/questions.length) * 10).toFixed(2)}</p>
              <button onClick={() => window.location.reload()}>Làm lại</button>
            </div>
          )}
        </div>
      ) : (
        // Phần render cho bài coding
        <div className="coding-container">
          {/* Hiển thị PDF */}
          <div className="pdf-display">
            {pdfDoc && (
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                width="100%"
                height="500px"
                title="PDF Viewer"
                className="pdf-frame"
              />
            )}
          </div>
          
          {/* Code Editor */}
          <div className="editor-section">
            <CodeEditor
              code={code}
              onChange={(newCode) => setCode(newCode)}
              language="python"
            />
            <button 
              className="submit-button"
              onClick={handleCodeSubmit}
              disabled={submitting}
            >
              {submitting ? 'Đang nộp bài...' : 'Nộp bài'}
            </button>
            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer; 