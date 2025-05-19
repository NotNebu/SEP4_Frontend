import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '@/Presentation/Layout/Navbar';

describe('Navbar component', () => {
  // Wrapper for at give router context
  const renderWithRouter = () => render(<Navbar />, { wrapper: MemoryRouter });

  test('renders logo and app name', () => {
    renderWithRouter();
    expect(screen.getByText('GroWheat')).toBeInTheDocument();
  });

  test('renders main nav links', () => {
    renderWithRouter();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Prediction')).toBeInTheDocument();
    expect(screen.getByText('Forsøg')).toBeInTheDocument();
  });

  test('toggles login/logout state', () => {
    renderWithRouter();
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    expect(screen.getByText('Log ud')).toBeInTheDocument();
  });

  test('shows dropdown menu when Forsøg is clicked', () => {
    renderWithRouter();
    const forsøgBtn = screen.getByText('Forsøg');
    fireEvent.click(forsøgBtn);
    expect(screen.getByText('Forsøg 1')).toBeInTheDocument();
    expect(screen.getByText('Forsøg 2')).toBeInTheDocument();
  });

  test('shows mobile menu button (hamburger style)', () => {
    renderWithRouter();
    const buttons = screen.getAllByRole('button');
    const hamburgerButton = buttons[buttons.length - 1]; 
    expect(hamburgerButton).toBeInTheDocument();
  });
});
