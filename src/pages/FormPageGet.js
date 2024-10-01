import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../api/axios'; // Import your axios instance

function FormPageGet() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(1); // Total pages from API
    const navigate = useNavigate();

    const fetchStudents = async (page) => {
        try {
            const response = await axios.get(`https://api.barcelos.dev/lasalle-student/?page=${page}`);
            const data = response.data;

            // Log the data to understand its structure
            console.log(data);

            // Set students and totalPages based on the API response
            setStudents(data.students);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents(currentPage); // Fetch students based on current page
    }, [currentPage]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Student List</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Date of Birth</th>
                            <th>Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.surname}</td>
                                <td>{new Date(student.dob).toLocaleDateString()}</td>
                                <td>{student.course}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between">
                <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1} // Disable if on the first page
                >
                    Previous Page
                </button>
                <button 
                    className="btn btn-outline-secondary" 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages} // Disable if on the last page
                >
                    Next Page
                </button>
            </div>
            <button className="btn btn-outline-warning mt-3" onClick={() => navigate('/')}>
                Back to Home
            </button>
        </div>
    );
}

export default FormPageGet;
