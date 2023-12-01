import React, { useState } from 'react';
import { useRouter } from 'next/router';
import clientPromise from '../lib/mongodb';
import { Navbar } from '../components/Navbar';
import Link from 'next/link';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link href="/login">Login</Link></p>
      </div>
      <style jsx>{`
        .signup-page {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .signup-page h1 {
          text-align: center;
          color: #333;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        form label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        form input[type="text"],
        form input[type="password"] {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 7px;
        }

        form button {
          background-color: #0056b3;
          color: white;
          padding: 0.7rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        form button:hover {
          background-color: #004494;
        }
    	`}</style>
		</>
	);
};

export default SignUpPage;