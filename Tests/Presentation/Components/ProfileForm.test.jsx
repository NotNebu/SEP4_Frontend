import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ProfileForm from '@/Presentation/Components/Profile/ProfileForm';

describe('ProfileForm component', () => {
  const mockProfile = {
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    birthday: '1990-01-01',
    country: 'Denmark',
    street: 'Main St.',
    houseNumber: '10',
    city: 'Copenhagen',
  };

  test('renders all input labels', () => {
    render(<ProfileForm profile={mockProfile} onChange={() => {}} />);
    
    const labels = [
      'Fornavn',
      'Efternavn',
      'Brugernavn',
      'Email',
      'Fødselsdag',
      'Land',
      'Vejnavn',
      'Husnummer',
      'By',
    ];

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('renders Fødselsdag input with type date', () => {
    render(<ProfileForm profile={mockProfile} onChange={() => {}} />);
    const dateInput = screen.getByLabelText('Fødselsdag');
    expect(dateInput).toHaveAttribute('type', 'date');
  });

  test('renders 9 input fields', () => {
    render(<ProfileForm profile={mockProfile} onChange={() => {}} />);
    
    // Vigtigt: kun tælle faktiske <input> elementer
    const allInputs = screen.getAllByRole('textbox');
    const dateInput = screen.getByLabelText('Fødselsdag');

    // `getAllByRole('textbox')` fanger ikke <input type="date">, så vi lægger 1 til
    expect(allInputs.length + 1).toBe(9);
    expect(dateInput).toBeInTheDocument();
  });
});
