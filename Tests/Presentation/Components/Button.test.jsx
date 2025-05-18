import { render, screen } from '@testing-library/react';
import Button from '@/Presentation/Components/Shared/UI/Button';

// Tester at Button-komponenten renderer korrekt med label-prop.
// Den sikrer at teksten bliver vist i DOM'en, og validerer både rendering og props-håndtering.
test('renders Button correctly with label', () => {
  render(<Button label="Test-knap" />);
  expect(screen.getByText('Test-knap')).toBeInTheDocument();
});
