// Đợi PDF.js được load
const waitForPdfjs = () => {
  return new Promise((resolve) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
    } else {
      // Kiểm tra mỗi 100ms
      const interval = setInterval(() => {
        if (window.pdfjsLib) {
          clearInterval(interval);
          resolve(window.pdfjsLib);
        }
      }, 100);
    }
  });
};

export const extractTextFromPDF = async (pdfUrl) => {
  try {
    // Đợi PDF.js load xong
    const pdfjsLib = await waitForPdfjs();
    
    // Sử dụng worker từ CDN với cùng phiên bản
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Tải PDF document
    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      isEvalSupported: false,
      useSystemFonts: true
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';
    
    // Lặp qua từng trang của PDF
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
};

export const extractQuestionsFromPDF = async (pdfUrl) => {
  try {
    const fullText = await extractTextFromPDF(pdfUrl);
    return parseTextToQuestions(fullText);
  } catch (error) {
    console.error('Error extracting questions from PDF:', error);
    throw error;
  }
};

// Hàm phân tích text thành câu hỏi trắc nghiệm
const parseTextToQuestions = (text) => {
  try {
    const questions = [];
    // Tách các câu hỏi bằng "Câu" hoặc số đầu câu
    const questionBlocks = text.split(/(?=Câu \d+:)|(?=\d+\.)/);

    for (let block of questionBlocks) {
      if (!block.trim()) continue;

      // Tìm nội dung câu hỏi và các đáp án
      const questionMatch = block.match(/(Câu \d+:|^\d+\.)(.*?)(?=[A-D][\.\)])/s);
      if (!questionMatch) continue;

      const questionText = questionMatch[0].trim();
      
      // Tìm các đáp án (không lấy phần đáp án đúng màu đỏ)
      const options = [];
      const optionMatches = block.matchAll(/([A-D])[\.\)]([^A-D\n]+?)(?=(?:[A-D][\.\)]|Đáp án:|$))/g);
      
      for (const match of optionMatches) {
        const optionText = match[2].trim();
        // Chỉ lấy phần text không phải màu đỏ
        if (!optionText.includes('color: red')) {
          options.push({
            label: match[1],
            text: optionText
          });
        }
      }

      // Tìm đáp án đúng từ phần "Đáp án:"
      const answerMatch = block.match(/Đáp án:?\s*([A-D])/);
      const correctAnswer = answerMatch ? answerMatch[1] : null;

      if (options.length === 4) { // Chỉ thêm câu hỏi nếu có đủ 4 đáp án
        questions.push({
          question: questionText,
          options: options,
          correctAnswer: correctAnswer
        });
      }
    }

    return questions;
  } catch (error) {
    console.error('Error parsing text to questions:', error);
    return [];
  }
};