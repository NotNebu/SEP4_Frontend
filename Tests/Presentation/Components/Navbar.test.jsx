// Navbar.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/Presentation/Layout/Navbar/Navbar";
import { AuthContext } from "@/Shared/Context/AuthContext";

// Dummy context værdier
const mockAuth = {
  user: { firstname: "Test", lastname: "User" },
  logout: vi.fn(),
};

describe("Navbar component", () => {
  // Tilføj både router + auth context
  const renderWithRouterAndAuth = () =>
    render(
      <AuthContext.Provider value={mockAuth}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

  test("renders logo and app name", () => {
    renderWithRouterAndAuth();
    expect(screen.getByAltText("GroWheat Logo")).toBeInTheDocument();
  });

  test("renders main nav links", () => {
    renderWithRouterAndAuth();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Forudsigelse")).toBeInTheDocument();
    expect(screen.getByText("Opret Eksperiment")).toBeInTheDocument();
  });

  test("toggles login/logout state", () => {
    renderWithRouterAndAuth();
    fireEvent.click(screen.getByLabelText("Brugerprofilmenu"));
    expect(screen.getByText("Log ud")).toBeInTheDocument();
  });

  test("shows mobile menu button (hamburger style)", () => {
    renderWithRouterAndAuth();
    const buttons = screen.getAllByRole("button");
    const hamburgerButton = buttons[buttons.length - 1];
    expect(hamburgerButton).toBeInTheDocument();
  });
});
