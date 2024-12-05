import React, { useState } from 'react';
import './TestEditer.css'; // Đảm bảo bạn có file CSS để định dạng

const TestEditer = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const runCode = () => {
        // Logic để chạy mã code và hiển thị output
        // ... 
    };

    const submitExercise = () => {
        // Logic để nộp bài
        // ...
    };

    return (
        <div className="programming-exercise">
            <div className="sidebar">
                {/* Nội dung sidebar */}
                <h2>Sidebar</h2>
                {/* Thêm các liên kết hoặc thông tin cần thiết */}
            </div>
            <div className="main-content">
                <h1>Python Online Editor</h1>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Nhập mã Python của bạn ở đây..."
                    rows="10"
                    style={{ width: '100%' }}
                />
                <button onClick={runCode}>Run</button>
                <div className="output">
                    <h2>Output:</h2>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
};
export default TestEditer;
