// Mock analysis function
function analyzeResume(filePath) {
    // For simplicity, let's mock the analysis process
    const skills = ['JavaScript', 'React', 'Node.js']; // Mocked based on resume content
    const courses = ['Advanced React', 'Node.js Certification']; // Mocked for recommendations
    const jobs = ['Full Stack Developer', 'Front End Developer']; // Mocked job roles

    return {
        skills,
        jobs
    };
}

module.exports = { analyzeResume };
