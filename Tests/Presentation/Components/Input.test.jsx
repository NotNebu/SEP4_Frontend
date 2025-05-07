import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '@/Presentation/Components/Navbar';

describe('Navbar component', () => {
  // Hjælpefunktion: renderer Navbar i en router-context
  const renderWithRouter = () => render(<Navbar />, { wrapper: MemoryRouter });

  // Tester at logo og app-navn "GroWheat" vises
  test('renders logo and app name', () => {
    renderWithRouter();
    expect(screen.getByText('GroWheat')).toBeInTheDocument();
  });

  // Tester at hovednavigationens links er synlige: Dashboard, Prediction, Forsøg
  test('renders main nav links', () => {
    renderWithRouter();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Prediction')).toBeInTheDocument();
    expect(screen.getByText('Forsøg')).toBeInTheDocument();
  });

  // Tester login-funktionalitet: klik på "Login" skifter teksten til "Log ud"
  test('toggles login/logout state', () => {
    renderWithRouter();
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    expect(screen.getByText('Log ud')).toBeInTheDocument();
  });

  // Tester dropdown: klik på "Forsøg" viser undermenu med "Forsøg 1" og "Forsøg 2"
  test('shows dropdown menu when Forsøg is clicked', () => {
    renderWithRouter();
    const forsøgBtn = screen.getByText('Forsøg');
    fireEvent.click(forsøgBtn);
    expect(screen.getByText('Forsøg 1')).toBeInTheDocument();
    expect(screen.getByText('Forsøg 2')).toBeInTheDocument();
  });

  // Tester at hamburger-menu til mobilvisning findes som sidste <button> i DOM
  test('shows mobile menu button (hamburger style)', () => {
    renderWithRouter();
    const buttons = screen.getAllByRole('button');
    const hamburgerButton = buttons[buttons.length - 1];
    expect(hamburgerButton).toBeInTheDocument();
  });
});
