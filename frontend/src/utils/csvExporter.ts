import { unparse } from "papaparse";

interface CsvData {
  [key: string]: string | number | boolean | null; // Ajuste les types selon tes données
}

export const exportToCSV = (data: CsvData[], filename: string) => {
  const csv = unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// import { unparse } from "papaparse";

// export const exportToCSV = (data: any[], filename: string) => {
//   const csv = unparse(data);
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const link = document.createElement("a");
//   const url = URL.createObjectURL(blob);

//   link.setAttribute("href", url);
//   link.setAttribute("download", filename);
//   link.style.visibility = "hidden";

//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };