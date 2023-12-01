import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUp from '../../pages/signup'; // Adjust the import path
import { useRouter } from 'next/router';

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

  test('renders the signup form with all fields', () => {
    render(<SignUp />);
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });


describe('SignUp Component', () => {
  test('renders the signup form with all fields', () => {
    render(<SignUp />);
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('allows the user to enter username and password', () => {
    render(<SignUp />);
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'testpass' } });
    expect(screen.getByLabelText(/Username:/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/Password:/i)).toHaveValue('testpass');
  });
});
});