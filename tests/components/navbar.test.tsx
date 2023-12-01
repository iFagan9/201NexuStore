import { Navbar } from "../../components/Navbar";
import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

jest.mock('next/router', () => require('next-router-mock'));

describe('Navbar for navigation', () => {
    it('Should contain the products name', () => {
        const container = render(<Navbar />);
        const productName = "NexuStore";

        const reference = screen.getByText(productName);

        expect(reference).toBeInTheDocument();
        
    });

    it('Should contain a link to the home page', () => {
        const container = render(<Navbar />);
        const homePage = "Home";

        const reference = screen.getByText(homePage);
        expect(reference).toBeInTheDocument();
    });

    it('Should contain a link to the Apps page', () => {
        const container = render(<Navbar />);
        const appsLink = "Apps";

        const reference = screen.getByText(appsLink);
        expect(reference).toBeInTheDocument();
    });

    it('Should contain a link to the Developer page', () => {
        const container = render(<Navbar />);
        const developerPage = "Develop";

        const reference = screen.getByText(developerPage);
        expect(reference).toBeInTheDocument();
    });

    it('Should contain a link to the Profile page', () => {
        // Test code here
        const container = render(<Navbar />);
        const profilePage = "Profile";

        const reference = screen.getByText(profilePage);
        expect(reference).toBeInTheDocument();
    });
})
