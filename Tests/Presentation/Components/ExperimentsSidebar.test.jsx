import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ExperimentsSidebar from "@/Presentation/Components/Experiments/ExperimentsSidebar";

describe("ExperimentsSidebar component", () => {
  it("should render sidebar with button", () => {
    render(
      <MemoryRouter>
        {" "}
        {/* Wrap in MemoryRouter */}
        <ExperimentsSidebar open={true} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText("Vis mine eksperimenter")).toBeInTheDocument();
  });

  it("should open modal when button is clicked", () => {
    render(
      <MemoryRouter>
        <ExperimentsSidebar open={true} onClose={() => {}} />
      </MemoryRouter>
    );
    const button = screen.getByText("Vis mine eksperimenter");
    fireEvent.click(button);
    expect(screen.getByText("Eksperimenter")).toBeInTheDocument();
  });
});
