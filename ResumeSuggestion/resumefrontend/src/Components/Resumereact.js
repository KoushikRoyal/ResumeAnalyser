import React, { useState } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [recommendations, setRecommendations] = useState({ skills: [], jobs: [] });

    const uploadResume = async () => {
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post('/upload-resume', formData);
            setRecommendations(response.data.recommendations || { skills: [], jobs: [] });
        } catch (error) {
            console.error("Error uploading resume:", error);
            setRecommendations({ skills: [], jobs: [] });
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Upload Your Resume</h2>
            <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])} 
                style={styles.fileInput}
            />
            <button onClick={uploadResume} style={styles.uploadButton}>
                Upload Resume
            </button>

            {recommendations && (
                <div style={styles.recommendationContainer}>
                    <h3 style={styles.subHeader}>Recommended Skills and Courses</h3>
                    <ul style={styles.list}>
                        {recommendations.skills.length > 0 ? (
                            recommendations.skills.map(skill => (
                                <li key={skill} style={styles.listItem}>{skill}</li>
                            ))
                        ) : (
                            <li style={styles.noRecommendation}>No skills recommendations available</li>
                        )}
                    </ul>

                    <h3 style={styles.subHeader}>Job Role Recommendations</h3>
                    <ul style={styles.list}>
                        {recommendations.jobs.length > 0 ? (
                            recommendations.jobs.map(job => (
                                <li key={job} style={styles.listItem}>{job}</li>
                            ))
                        ) : (
                            <li style={styles.noRecommendation}>No job recommendations available</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '50px auto'
    },
    header: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px'
    },
    fileInput: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        marginBottom: '20px',
        width: '100%',
        fontSize: '16px',
        cursor: 'pointer'
    },
    uploadButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    uploadButtonHover: {
        backgroundColor: '#0056b3',
    },
    recommendationContainer: {
        marginTop: '30px',
        width: '100%',
    },
    subHeader: {
        fontSize: '20px',
        color: '#555',
        marginBottom: '10px',
    },
    list: {
        listStyleType: 'none',
        paddingLeft: '0',
        marginBottom: '30px',
    },
    listItem: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '10px',
        fontSize: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    noRecommendation: {
        color: '#999',
        fontSize: '16px',
    }
};

export default ResumeUpload;
