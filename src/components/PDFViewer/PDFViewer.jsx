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
        const response = await fetch(`http://34.142.187.24:5000/api/exercises/${exerciseId}`, {
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
      
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({data: arrayBuffer});
      const pdf = await loadingTask.promise;
      
      const numPages = pdf.numPages;
      let allText = '';
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        let lastY = null;
        let lastX = null;
        
        const processedText = textContent.items.reduce((text, item) => {
          const currentY = item.transform[5];
          const currentX = item.transform[4];
          
          if (lastY !== null && Math.abs(currentY - lastY) > 5) {
            text += '\n';
          } 
          else if (lastX !== null && text.length > 0 && (currentX - lastX) > 10) {
            text += ' ';
          }
          
          lastY = currentY;
          lastX = currentX + (item.width || 0);
          
          return text + item.str;
        }, '');
        
        allText += processedText + ' ';
      }

      allText = allText
        .replace(/\s+/g, ' ')
        .replace(/\n\s*/g, '\n')
        .trim();

      console.log('Extracted text:', allText);

      const questionRegex = /Câu\s+\d+[:.]\s*(.*?)(?=Câu\s+\d+[:.]\s*|$)/gs;
      const matches = [...allText.matchAll(questionRegex)];
      
      const extractedQuestions = matches.map((match, index) => {
        const fullQuestionText = match[1].trim();
        
        const answerMatch = fullQuestionText.match(/Đáp án:\s*([A-D])/i);
        const correctAnswer = answerMatch ? answerMatch[1] : null;
        
        const questionTextWithOptions = fullQuestionText.split(/Đáp án:/i)[0].trim();
        
        const parts = questionTextWithOptions.split(/(?=[A-D][.)])/);
        const question = parts[0].trim();
        
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

      const response = await fetch('http://34.142.187.24:5000/api/submissions/quiz', {
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

    const score = (answersData.filter(a => a.isCorrect).length ) ;
    setScore(score);
    return score;
  };

  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return '';
    return `http://34.142.187.24:5000/uploads/exercises/${pdfPath}`.replace(/([^:]\/)\/+/g, "$1");
  };

  const handleCodeSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await fetch('http://34.142.187.24:5000/api/submissions/code', {
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
              <div className="question-text">
                <pre>{`Câu ${question.id}: ${question.text}`}</pre>
              </div>
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
                    <pre className="option-text">{text}</pre>
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
              <p>Số câu đúng: {score}/{questions.length}</p>
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
