import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '../../pages/login'; // Adjust the import path
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    // Provide the mock implementation for useRouter
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
      // Add other properties and methods you use from the router
    }));
  });

  test('renders the login form with all fields', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('allows the user to enter username and password', () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'testpass' } });
    expect(screen.getByLabelText(/Username:/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/Password:/i)).toHaveValue('testpass');
  });
});