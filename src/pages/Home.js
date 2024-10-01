import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const navigate = useNavigate();

  // Navigate to the GET page
  const handleGet = () => {
    navigate('/get');
  };

  // Navigate to the POST page
  const handlePost = () => {
    navigate('/post');
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Student Management Platform</h1>
      <p>Select an action to continue:</p>

      <div className="mt-4">
        <button className="btn btn-primary btn-lg mx-3" onClick={handleGet}>
          View Students (GET)
        </button>
        <button className="btn btn-success btn-lg mx-3" onClick={handlePost}>
          Add a New Student (POST)
        </button>
      </div>
    </div>
  );
}

export default Home;
