import React, { useEffect, useState } from 'react';
import { API_URLS } from '../../api/api'; // Adjust the import path as necessary

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URLS.courses);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Danh sách khóa học</h2>
      <ul>
        {courses.map(course => (
          <li key={course.course_id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses; 