const API_BASE_URL = "http://34.142.187.24:5000/api";

export const API_URLS = {
  // Authentication
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
  resetPassword: `${API_BASE_URL}/auth/reset-password`,

  // Courses
  courses: `${API_BASE_URL}/courses`,
  createCourse: `${API_BASE_URL}/courses`,
  getCourses: `${API_BASE_URL}/courses`,

  // Lessons
  createLesson: `${API_BASE_URL}/lessons`,
  getLessonsByCourse: (courseId) => `${API_BASE_URL}/lessons/course/${courseId}`,
  getLesson: (lessonId) => `${API_BASE_URL}/lessons/${lessonId}`,
  updateLesson: (lessonId) => `${API_BASE_URL}/lessons/${lessonId}`,
  deleteLesson: (lessonId) => `${API_BASE_URL}/lessons/${lessonId}`,

  // Documents
  uploadDocument: (lessonId) => `${API_BASE_URL}/documents/upload/${lessonId}`,
  getDocumentById: (documentId) => `${API_BASE_URL}/documents/${documentId}`,

  // Thêm endpoint mới
  getLessonsAndDocumentsByCourse: (courseId) => `${API_BASE_URL}/lessons/documents/${courseId}`, // Get lessons and documents by course ID

  // Exercises
  createExercise: `${API_BASE_URL}/exercises`,
  createTestcase: `${API_BASE_URL}/exercise-testcases`,

  // Add more endpoints as needed
  deleteDocument: (docId) => `${API_BASE_URL}/documents/${docId}`,
  deleteExercise: (exerciseId) => `${API_BASE_URL}/exercises/${exerciseId}`,
};
