//Login page
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import Link from 'next/link';


const LoginPage = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type' : 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (data.success) {
				router.push('/');
			} else {
				console.error(data.error);
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<>
			<Navbar />
			<div className="login-page">
				<h1>Login</h1>
				<form onSubmit={handleLogin}>
					<div>
						<label>Username:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Login</button>
				</form>
				<p>New? Create an account! <Link href="/signup">Sign Up</Link></p>
			</div>
			<style jsx>{`
        .login-page {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .login-page h1 {
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

export default LoginPage
