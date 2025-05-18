import Dropdown from "@Presentation/Components/Shared/Dropdown/Dropdown";

/**
 * Dropdown-komponent til download af alle eksperimenter i JSON eller CSV-format.
 */
export default function DropdownDownload({ onJSON, onCSV }) {
  return (
    <Dropdown
      label="Download"
      options={[
        { label: "JSON (alle)", onClick: onJSON },
        { label: "CSV (alle)", onClick: onCSV },
      ]}
    />
  );
}
