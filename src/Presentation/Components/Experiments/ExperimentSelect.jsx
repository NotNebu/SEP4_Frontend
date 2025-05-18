import DropdownSelect from "@Presentation/Components/Shared/Dropdown/DropdownSelect";

/**
 * Dropdown-komponent til valg af eksperiment.
 * Genbruger den fælles DropdownSelect-komponent.
 */
export default function ExperimentSelect({ selected, options, onSelect }) {
  return (
    <DropdownSelect
      label="Vælg eksperiment"
      value={selected}
      onChange={onSelect}
      options={options.map((item) => ({
        label: item.experiment,
        value: item.experiment,
      }))}
    />
  );
}
