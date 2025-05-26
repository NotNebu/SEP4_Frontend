// @Shared/Utils/csvUtils.js

export const parseCSV = (text) => {
  const rows = [];
  let row = [],
    cell = "",
    inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i],
      next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if (
      (char === "\n" || (char === "\r" && next === "\n")) &&
      !inQuotes
    ) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      if (char === "\r") i++;
    } else {
      cell += char;
    }
  }

  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
};

export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
