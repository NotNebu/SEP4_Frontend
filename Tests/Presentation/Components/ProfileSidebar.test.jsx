import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import ProfileSidebar from "@/Presentation/Components/Profile/ProfileSidebar";
import { MemoryRouter } from "react-router-dom";

beforeAll(() => {
  globalThis.URL.createObjectURL = vi.fn(() => "mock-url");
});

describe("ProfileSidebar component", () => {
  it("renders profile title and all buttons", () => {
    render(
      <MemoryRouter>
        <ProfileSidebar onSave={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText("Profil")).toBeInTheDocument();
    expect(screen.getByText("Upload billede")).toBeInTheDocument();
    expect(screen.getByText("Ændre kodeord")).toBeInTheDocument();
    expect(screen.getByText("Gem ændringer")).toBeInTheDocument();
  });

  it('opens modal when "Ændre kodeord" is clicked', () => {
    render(
      <MemoryRouter>
        <ProfileSidebar onSave={() => {}} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Ændre kodeord"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("handles image file selection", () => {
    render(
      <MemoryRouter>
        <ProfileSidebar onSave={() => {}} />
      </MemoryRouter>
    );

    const fileInput = screen.getByLabelText("Vælg billede");
    const file = new File(["image"], "profile.jpg", { type: "image/jpeg" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });
});
