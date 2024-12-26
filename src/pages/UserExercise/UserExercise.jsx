import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PDFViewer from '../../components/PDFViewer/PDFViewer';
import { getExercisesByLesson } from '../../services/exerciseService';
import './UserExercise.css';
import AccountDropdown from '../../components/AccountDropdown/AccountDropdown';

const UserExercise = () => {
    const [exercises, setExercises] = useState([]);
    const [courses, setCourses] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedLesson, setSelectedLesson] = useState('');
    const [showPDFViewer, setShowPDFViewer] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Lấy danh sách khóa học
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://34.142.187.24:5000/api/courses', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    // Lấy danh sách bài học khi chọn khóa học
    useEffect(() => {
        const fetchLessons = async () => {
            if (selectedCourse) {
                try {
                    const response = await fetch(`http://34.142.187.24:5000/api/lessons/course/${selectedCourse}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();
                    setLessons(data);
                } catch (error) {
                    console.error('Error fetching lessons:', error);
                }
            }
        };
        fetchLessons();
    }, [selectedCourse]);

    // Lấy danh sách bài tập khi chọn bài học
    useEffect(() => {
        const fetchExercises = async () => {
            if (selectedLesson) {
                setLoading(true);
                try {
                    const exerciseData = await getExercisesByLesson(selectedLesson);
                    setExercises(exerciseData);
                } catch (error) {
                    console.error('Error fetching exercises:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchExercises();
    }, [selectedLesson]);

    const handleStartExercise = (exercise) => {
        const baseUrl = 'http://34.142.187.24:5000';
        const pdfPath = exercise.pdfFile.startsWith('/') 
            ? exercise.pdfFile 
            : `/${exercise.pdfFile}`;
        
        setSelectedExercise({
            ...exercise,
            pdfUrl: `${baseUrl}${pdfPath}`
        });
        setShowPDFViewer(true);
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <h2>Newlearning</h2>
                <nav>
                    <ul>
                        <li><Link to="/user-dashboard">🏠 Bảng điều khiển</Link></li>
                        <li><Link to="/user-course">📚 Khóa học</Link></li>
                        <li><Link to="/user-exercise">📝 Bài tập</Link></li>
                        <li><Link to="/user-messages">💬 Tin nhắn</Link></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <a href="#settings">⚙️ Cài đặt</a>
                    <AccountDropdown />
                </div>
            </aside>

            <div className="main-content">
                {!showPDFViewer ? (
                    <>
                        <div className="filters">
                            <select 
                                value={selectedCourse}
                                onChange={(e) => {
                                    setSelectedCourse(e.target.value);
                                    setSelectedLesson('');
                                }}
                                className="course-select"
                            >
                                <option value="">Chọn khóa học</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>

                            <select 
                                value={selectedLesson}
                                onChange={(e) => setSelectedLesson(e.target.value)}
                                className="lesson-select"
                                disabled={!selectedCourse}
                            >
                                <option value="">Chọn bài học</option>
                                {lessons.map(lesson => (
                                    <option key={lesson._id} value={lesson._id}>
                                        {lesson.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {loading ? (
                            <div className="loading">Đang tải bài tập...</div>
                        ) : (
                            <div className="exercise-grid">
                                {exercises.map((exercise) => (
                                    <div key={exercise._id} className="exercise-card">
                                        <div className="exercise-content">
                                            <h3>{exercise.title}</h3>
                                            <p>{exercise.description}</p>
                                            <button 
                                                className="start-button"
                                                onClick={() => handleStartExercise(exercise)}
                                            >
                                                Làm bài
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="back-button"> 
                            <button onClick={() => setShowPDFViewer(false)}>
                                ← Quay lại
                            </button>
                        </div>
                        <div className="pdf-viewer-container">
                            <PDFViewer 
                                pdfUrl={selectedExercise.pdfUrl}
                                exerciseId={selectedExercise._id}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserExercise;
