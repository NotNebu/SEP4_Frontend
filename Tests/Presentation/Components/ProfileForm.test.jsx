import { render, screen } from '@testing-library/react';
import ProfileForm from '@/Presentation/Components/Profile/ProfileForm';

describe('ProfileForm component', () => {
  // Tester at alle labels vises i DOM
  test('renders all input labels', () => {
    render(<ProfileForm />);
    expect(screen.getByText('Fornavn')).toBeInTheDocument();
    expect(screen.getByText('Efternavn')).toBeInTheDocument();
    expect(screen.getByText('Brugernavn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Fødselsdag')).toBeInTheDocument();
    expect(screen.getByText('Land')).toBeInTheDocument();
    expect(screen.getByText('Vejnavn')).toBeInTheDocument();
    expect(screen.getByText('Husnummer')).toBeInTheDocument();
    expect(screen.getByText('By')).toBeInTheDocument();
  });

  // Tester at inputfeltet for "Fødselsdag" har typen "date"
  test('renders Fødselsdag input with type date', () => {
    render(<ProfileForm />);
    const label = screen.getByText('Fødselsdag');
    const input = label.nextElementSibling;
    expect(input).toHaveAttribute('type', 'date');
  });

  // Tester antal inputfelter
  test('renders 9 input fields', () => {
    render(<ProfileForm />);
    const inputs = screen.getAllByRole('textbox'); // fanger text inputs
    const allInputs = screen.getAllByRole('textbox', { hidden: true });
    const inputTags = screen.getAllByRole('textbox', { name: '' }); // evt. fallback
    const dateInputs = document.querySelectorAll('input[type="date"]');
    expect(inputs.length + dateInputs.length).toBe(9);
  });
});
