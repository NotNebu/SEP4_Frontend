import { render, screen } from '@testing-library/react';
import DashboardBox from '@/Presentation/Components/DashboardBox';

describe('DashboardBox component', () => {
  // Tester at komponenten viser children korrekt
  test('renders children inside the box', () => {
    render(
        <DashboardBox>
          <p>Dette er dashboard-indhold</p>
        </DashboardBox>
      );
    expect(screen.getByText('Dette er dashboard-indhold')).toBeInTheDocument();
  });

  // Tester at boksen har de forventede styling-klasser
  test('has correct default styling classes', () => {
    const { container } = render(
      <DashboardBox>
        <p>Indhold</p>
      </DashboardBox>
    );
    const div = container.firstChild;
    expect(div).toHaveClass('bg-white', 'dark:bg-gray-800', 'p-4', 'rounded-2xl', 'shadow-md');
  });
});
