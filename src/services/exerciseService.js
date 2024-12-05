import axios from 'axios';
import { API_URLS } from '../api/api';

export const createExerciseWithTestcases = async (exerciseData, testCases) => {
    const token = localStorage.getItem('token');
    
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        // Gộp exercise data và test cases vào cùng một request
        const requestData = {
            ...exerciseData,
            testCases: testCases.map(tc => ({
                input: tc.input,
                output: tc.output
            }))
        };

        const response = await axios.post(API_URLS.createExercise, requestData, config);
        return response.data;
    } catch (error) {
        console.error('Error in createExerciseWithTestcases:', error);
        throw error;
    }
}; 