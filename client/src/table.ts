export function generateTable(
  data: Record<string, string | number>[]
): HTMLTableElement | HTMLParagraphElement {
  if (data.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Empty";
    return p;
  }
  // Create the table element
  const table: HTMLTableElement = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = "30%";
  table.style.border = "1px solid #ddd";

  // Create the table header
  const thead: HTMLTableSectionElement = document.createElement("thead");
  const headers: string[] = Object.keys(data[0]);
  const headerRow: HTMLTableRowElement = document.createElement("tr");

  headers.forEach((header: string) => {
    const th = document.createElement("th");
    th.textContent = header;
    th.style.padding = "8px";
    th.style.textAlign = "left";
    th.style.borderBottom = "1px solid #ddd";
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  const tbody: HTMLTableSectionElement = document.createElement("tbody");

  data.forEach((item, index) => {
    const row: HTMLTableRowElement = document.createElement("tr");
    row.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "transparent";

    headers.forEach((header: string) => {
      const cell: HTMLTableCellElement = document.createElement("td");
      cell.textContent = item[header].toString();
      cell.style.padding = "8px";
      cell.style.textAlign = "left";
      cell.style.borderBottom = "1px solid #ddd";
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  // Return the generated table
  return table;
}
