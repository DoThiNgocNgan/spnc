import React, { useState } from "react";
import "./AddAssignment.css";
import { Link } from "react-router-dom"; // Thêm import Link

const AddAssignment = () => {
  const [assignmentCode, setAssignmentCode] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [score, setScore] = useState("");
  const [content, setContent] = useState("");
  const [testCases, setTestCases] = useState(Array(10).fill(""));

  const handleAssignmentCodeChange = (e) => {
    setAssignmentCode(e.target.value);
  };

  const handleAssignmentNameChange = (e) => {
    setAssignmentName(e.target.value);
  };

  const handleAssignmentTypeChange = (e) => {
    setAssignmentType(e.target.value);
  };

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTestCasesChange = (index, e) => {
    const updatedTestCases = testCases.map((testCase, idx) => {
      if (idx === index) {
        return e.target.value;
      }
      return testCase;
    });
    setTestCases(updatedTestCases);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    if (
      !assignmentCode ||
      !assignmentName ||
      !assignmentType ||
      !score ||
      !content
    ) {
      alert("Please fill in all the required fields.");
      return;
    }
    // Assuming there's a function to handle the form submission
    // handleSubmitForm(assignmentCode, assignmentName, assignmentType, score, content, testCases);
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="logo">
          <span>Newlearning</span>
        </div>
        <ul>
          <li className="active">
            <Link to="/admin-home">
              <i className="icon">📊</i> Bảng điều khiển
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <i className="icon">📚</i> Khóa học
            </Link>
          </li>
          <li>
            <Link to="/list-homework">
              <i className="icon">📝</i> Bài tập
            </Link>
          </li>
          <li>
            <Link to="/view-progress">
              <i className="icon">🚀</i> Đánh giá
            </Link>
          </li>
        </ul>
        <div className="nav-footer">
          <Link to="#settings">
            <i className="icon">⚙️</i> Cài đặt
          </Link>
          <Link to="#account">
            <i className="icon">👤</i> Tài khoản
          </Link>
        </div>
      </nav>
      <main className="main-content">
        <h2>Tạo bài tập mới</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="assignmentCode">Mã bài:</label>
            <input
              type="text"
              id="assignmentCode"
              name="assignmentCode"
              value={assignmentCode}
              onChange={handleAssignmentCodeChange}
              required
            />
          </div>
          <div>
            <label htmlFor="assignmentName">Tên bài:</label>
            <input
              type="text"
              id="assignmentName"
              name="assignmentName"
              value={assignmentName}
              onChange={handleAssignmentNameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="assignmentType">Dạng bài:</label>
            <select
              id="assignmentType"
              name="assignmentType"
              value={assignmentType}
              onChange={handleAssignmentTypeChange}
              required
            >
              <option value="">None selected</option>
              <option value="stack_queue">Ngăn xếp và hàng đợi</option>
              <option value="binary_search_tree">Cây nhị phân tìm kiếm</option>
              <option value="graph_theory">Lý thuyết đồ thị</option>
            </select>
          </div>
          <div>
            <label htmlFor="score">Thang điểm:</label>
            <input
              type="number"
              id="score"
              name="score"
              value={score}
              onChange={handleScoreChange}
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="content">Nội dung bài tập:</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={handleContentChange}
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <h3>Test Cases</h3>
            <div className="test-cases-container">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="test-case-row">
                  <div className="test-case-input">
                    <label htmlFor={`testCase${index + 1}`}>
                      Input {index + 1}:
                    </label>
                    <input
                      type="text"
                      id={`testCase${index + 1}`}
                      name={`testCase${index + 1}`}
                      value={testCases[index]}
                      onChange={(e) => handleTestCasesChange(index, e)}
                    />
                  </div>
                  <div className="test-case-output">
                    <label htmlFor={`output${index + 1}`}>
                      Output {index + 1}:
                    </label>
                    <input
                      type="text"
                      id={`output${index + 1}`}
                      name={`output${index + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-button">
            Thêm bài tập
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddAssignment;
