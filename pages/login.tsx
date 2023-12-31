//Login page
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import Link from 'next/link';


const LoginPage = () => {
	//creates artributes
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	//handles logging and checks if it is successful
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
				document.cookie = "userName = " + username;
				const response2 = await fetch('/api/isMod', {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username }),
				  });
				  const data2 = await response2.json();
				  if (data2.success) {
					document.cookie = "accessLevel = 1";
				  } else {
					const response3 = await fetch('/api/isAdmin', {
						method: 'POST',
						headers: {
						  'Content-Type': 'application/json',
						},
						body: JSON.stringify({ username }),
					  });
					  const data3 = await response3.json();
					  if (data3.success) {
						document.cookie = "accessLevel = 2";
					  } else {
						document.cookie = "accessLevel = 0";
					  }
				  }
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
