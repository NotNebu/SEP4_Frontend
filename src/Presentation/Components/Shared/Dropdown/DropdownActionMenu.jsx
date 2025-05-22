<DropdownActionMenu
  label="⋯" // Knapikon til handlinger (tre prikker)
  options={[
    { label: "Download CSV", onClick: downloadCSV },       // Henter data som CSV
    { label: "Slet", onClick: () => deleteItem(id) }       // Sletter elementet
  ]}
/>
