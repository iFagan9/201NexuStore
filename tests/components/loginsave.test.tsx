import React from "react";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../../pages/login'; // Adjust the import path 
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

  jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

describe("Log in saving tests", () => {
    beforeEach(() => {
        // Provide the mock implementation for useRouter
        useRouter.mockImplementation(() => ({
          push: jest.fn(),
          // Add other properties and methods you use from the router
        }));
      });

    test('Should save the username', () => {
        render(<Login />)

        const username = "Mod Account";
        const password = "Mod";

        fireEvent.change(screen.getByLabelText(/Username:/i), {target: {value: username}});
        fireEvent.change(screen.getByLabelText(/Password:/i), {target: {value: password}});
        fireEvent.click(screen.getByLabelText(/Submit/i));
        const getUsername = getCookie(username);
        expect(getUsername == username);
    })
})