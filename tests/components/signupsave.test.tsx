import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUp from '../../pages/signup'; // Adjust the import path
import { useRouter } from 'next/router';

function getCookie(cookieName: string) {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
	  const cookie = cookies[i].trim();
	  if (cookie.startsWith(`${cookieName}=`)) {
		return cookie.substring(cookieName.length + 1);
	  }
	}
	return null;
  }

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SignUpPage Component', () => {
  beforeEach(() => {
    // Provide the mock implementation for useRouter
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
      // Add other properties and methods you use from the router
    }));
  });


describe('SignUp Component', () => {

  test('allows the user to enter username and password', () => {
    render(<SignUp />);
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'testpass' } });
    fireEvent.click(screen.getByRole('button'));
    const username = getCookie("testuser");
    expect(username == "testuser");
  });
});
});