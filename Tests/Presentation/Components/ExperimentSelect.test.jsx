import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExperimentSelect from '@/Presentation/Components/Experiments/ExperimentSelect';

describe('ExperimentSelect component', () => {
  const options = [
    { experiment: 'Experiment 1', value: '1' },
    { experiment: 'Experiment 2', value: '2' }
  ];

  it('should render the dropdown with correct options', () => {
    render(<ExperimentSelect selected="1" options={options} onSelect={() => {}} />);
    expect(screen.getByText('Vælg eksperiment')).toBeInTheDocument();
    expect(screen.getByText('Experiment 1')).toBeInTheDocument();
    expect(screen.getByText('Experiment 2')).toBeInTheDocument();
  });

  it('should call onSelect when an option is selected', () => {
    const onSelect = vi.fn();
    render(<ExperimentSelect selected="1" options={options} onSelect={onSelect} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });

    expect(onSelect).toHaveBeenCalledWith('2');
  });
});
