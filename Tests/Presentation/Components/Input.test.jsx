import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/Presentation/Components/Shared/UI/Input';
import { describe, it, expect, vi } from 'vitest';

describe('Input component', () => {
  it('renders label and input', () => {
    render(<Input label="Brugernavn" name="username" />);
    expect(screen.getByLabelText('Brugernavn')).toBeInTheDocument();
  });

  it('sets the correct input type', () => {
    render(<Input label="Email" name="email" type="email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('sets the value and calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(
      <Input
        label="Navn"
        name="name"
        value="Test"
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText('Navn');
    expect(input).toHaveValue('Test');
    fireEvent.change(input, { target: { value: 'Ny værdi' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies the "auth" variant style', () => {
    render(<Input label="Adgangskode" name="password" variant="auth" />);
    const input = screen.getByLabelText('Adgangskode');
    expect(input.className).toMatch(/rounded-full/); // auth-variant bruger det
  });
});
