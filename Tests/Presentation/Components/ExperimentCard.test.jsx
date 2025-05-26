import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ExperimentCard from "@/Presentation/Components/Experiments/ExperimentCard";

describe("ExperimentCard component", () => {
  const mockExperiment = {
    id: 1,
    title: "Test Experiment",
    description: "This is a test experiment.",
    createdAt: "2022-01-01",
    dataJson: '[{"temp": 22}, {"humidity": 50}]',
  };

  it("renders title and description", () => {
    render(
      <ExperimentCard
        exp={mockExperiment}
        expanded={null}
        setExpanded={() => {}}
        onDelete={() => {}}
        onDownloadJSON={() => {}}
        onDownloadCSV={() => {}}
      />,
      { renderMode: "csr" }
    );
    expect(screen.getByText("Test Experiment")).toBeInTheDocument();
    expect(screen.getByText("This is a test experiment.")).toBeInTheDocument();
    expect(screen.getByText(/Oprettet:/)).toBeInTheDocument();
  });

  it("shows parsed data when expanded", () => {
    render(
      <ExperimentCard
        exp={mockExperiment}
        expanded={1}
        setExpanded={() => {}}
        onDelete={() => {}}
        onDownloadJSON={() => {}}
        onDownloadCSV={() => {}}
      />,
      { renderMode: "csr" }
    );

    expect(screen.getByText("Måling 1")).toBeInTheDocument();
    expect(screen.getByText("temp:")).toBeInTheDocument();
    expect(screen.getByText("22")).toBeInTheDocument();

    expect(screen.getByText("Måling 2")).toBeInTheDocument();
    expect(screen.getByText("humidity:")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("calls onDelete when delete button clicked", () => {
    const onDelete = vi.fn();
    render(
      <ExperimentCard
        exp={mockExperiment}
        expanded={null}
        setExpanded={() => {}}
        onDelete={onDelete}
        onDownloadJSON={() => {}}
        onDownloadCSV={() => {}}
      />,
      { renderMode: "csr" }
    );
    fireEvent.click(screen.getByText("Slet"));
    expect(onDelete).toHaveBeenCalledWith(mockExperiment.id);
  });

  it("calls onDownloadJSON and onDownloadCSV", () => {
    const onDownloadJSON = vi.fn();
    const onDownloadCSV = vi.fn();
    render(
      <ExperimentCard
        exp={mockExperiment}
        expanded={null}
        setExpanded={() => {}}
        onDelete={() => {}}
        onDownloadJSON={onDownloadJSON}
        onDownloadCSV={onDownloadCSV}
      />,
      { renderMode: "csr" }
    );

    fireEvent.click(screen.getByText("Download JSON"));
    expect(onDownloadJSON).toHaveBeenCalledWith(mockExperiment);

    fireEvent.click(screen.getByText("Download CSV"));
    expect(onDownloadCSV).toHaveBeenCalledWith(mockExperiment);
  });

  it("toggles expand with toggle button", () => {
    const setExpanded = vi.fn();
    render(
      <ExperimentCard
        exp={mockExperiment}
        expanded={null}
        setExpanded={setExpanded}
        onDelete={() => {}}
        onDownloadJSON={() => {}}
        onDownloadCSV={() => {}}
      />,
      { renderMode: "csr" }
    );
    fireEvent.click(screen.getByText("Se mere"));
    expect(setExpanded).toHaveBeenCalledWith(1);
  });
});
