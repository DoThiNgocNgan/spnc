import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const createExercise = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}/exercises`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating exercise:', error.response?.data || error.message);
        throw error;
    }
};

export const getExercisesByLesson = async (lessonId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/exercises/lesson/${lessonId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return [];
    }
};

export const getExerciseById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/exercises/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching exercise:', error);
        throw error;
    }
}; 