import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

function FormPagePost() {
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [dob, setDob] = useState('');
    const [course, setCourse] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!name || !surname || !dob || !course) {
            setError("All fields are required.");
            return;
        }

        try {
            const payload = {
                name,
                surname,
                dob,
                course
            };

            console.log("Sending payload:", payload); 
            await addUser(payload);   
            setSuccessMessage("Student added successfully!");
           
            setName('');
            setSurname('');
            setDob('');
            setCourse('');
            setError(null); 

        } catch (error) {
            console.error("Error details:", error); 
            setError(`Failed to fetch: ${error.response ? error.response.data : error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add Student</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Surname</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={dob} 
                        onChange={(e) => setDob(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Course</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={course} 
                        onChange={(e) => setCourse(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">Add Student</button>
            </form>
            <div className="mt-3">
                <button className="btn btn-outline-warning" onClick={() => navigate('/')}>
                    Back to Home
                </button>
                <button className="btn btn-outline-success" onClick={() => navigate('/get')}>
                    View Student List
                </button>
            </div>
        </div>
    );
}


async function  addUser(user){
    const response =  await axios.post('https://api.barcelos.dev/lasalle-student/', user);
    return response.data;
}
export default FormPagePost;
