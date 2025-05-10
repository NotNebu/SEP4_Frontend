import { render, screen, fireEvent } from '@testing-library/react';
import ProfileSidebar from '@/Presentation/Features/Profile/ProfileSidebar';
import React from 'react';

// Mock ChangePasswordModal for at fokusere på sidebar-test
vi.mock('@/Presentation/Modals/ChangePasswordModal', () => ({
  default: ({ isOpen }) => isOpen ? <div>Modal er åben</div> : null
}));

describe('ProfileSidebar component', () => {
  // Tjekker at overskrift og knapper vises
  test('renders profile title and all buttons', () => {
    render(<ProfileSidebar />);
    expect(screen.getByText('Profil')).toBeInTheDocument();
    expect(screen.getByText('Upload billede')).toBeInTheDocument();
    expect(screen.getByText('Ændre password')).toBeInTheDocument();
    expect(screen.getByText('Gem ændringer')).toBeInTheDocument();
  });

  // Tester at modal vises efter klik
  test('opens modal when "Ændre password" is clicked', () => {
    render(<ProfileSidebar />);
    expect(screen.queryByText('Modal er åben')).not.toBeInTheDocument();
    const button = screen.getByText('Ændre password');
    fireEvent.click(button);
    expect(screen.getByText('Modal er åben')).toBeInTheDocument();
  });
});
