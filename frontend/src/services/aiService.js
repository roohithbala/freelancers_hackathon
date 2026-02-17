const API_URL = 'http://localhost:5000/api';

export const generateProjectIdea = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to generate blueprint. Please try again.');
        }

        const data = await response.json();
        return data.blueprint;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};
