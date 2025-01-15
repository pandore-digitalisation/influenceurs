// // const filteredItems = items.filter(item => 
// //     item.name?.toLowerCase().includes(searchTerm.toLowerCase())
// //   );
//   // Exporter les données sélectionnées en CSV
// function exportToCsv() {
//     const selectedRows = [];
//     const checkboxes = document.querySelectorAll(".dataCheckbox:checked");
  
//     checkboxes.forEach((checkbox) => {
//       const rowIndex = checkbox.getAttribute("data-index");
//       selectedRows.push(filteredData[rowIndex]); // Utilise filteredData ici
//     });
  
//     // Générer le CSV
//     const headers = Object.keys(selectedRows[0]).filter(
//       (key) => key !== "_id" && key !== "__v" && key !== "profileImage"
//     );
//     const csvContent =
//       headers.join(",") +
//       "\n" +
//       selectedRows
//         .map((row) =>
//           headers
//             .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
//             .join(",")
//         )
//         .join("\n");
  
//     // Créer un blob pour téléchargement
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "selected_data.csv");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
  
//   // Charger les données initiales
//   data = await fetchData();
//   filteredData = data; // Par défaut, toutes les données
//   displayData(filteredData); // Passer les données filtrées
  
//   // Activer l'exportation des données
//   exportButton.addEventListener("click", exportToCsv); // Pas besoin de passer "data" ici


// function exportToCsv() {
//     const selectedRows = filteredData.map((row) => {
//       // Exclure `userId` et autres champs non nécessaires
//       const { userId, ...rest } = row;
//       return rest;
//     });
  
//     if (selectedRows.length === 0) {
//       alert("Aucune donnée à exporter.");
//       return;
//     }
  
//     // Générer les en-têtes dynamiquement à partir du premier objet
//     const headers = Object.keys(selectedRows[0]);
//     const csvContent =
//       headers.join(",") +
//       "\n" +
//       selectedRows
//         .map((row) =>
//           headers
//             .map((header) => `"${(row[header] || "").toString().replace(/"/g, '""')}"`)
//             .join(",")
//         )
//         .join("\n");
  
//     // Créer un blob pour téléchargement
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "filtered_data.csv");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
  

// Exporter les données sélectionnées en Excel
// function exportToExcel() {
//     const selectedRows = [];
//     const checkboxes = document.querySelectorAll(".dataCheckbox:checked");
  
//     checkboxes.forEach((checkbox) => {
//       const rowIndex = checkbox.getAttribute("data-index");
//       selectedRows.push(filteredData[rowIndex]);
//     });
  
//     // Préparer les données à exporter
//     const headers = Object.keys(selectedRows[0]).filter(
//       (key) => key !== "_id" && key !== "__v" && key !== "profileImage"
//     );
  
//     const excelData = selectedRows.map((row) =>
//       headers.reduce((acc, key) => {
//         acc[key] = row[key];
//         return acc;
//       }, {})
//     );
  
//     // Créer une feuille de calcul
//     const worksheet = XLSX.utils.json_to_sheet(excelData);
  
//     // Ajouter les en-têtes
//     XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
  
//     // Créer un classeur
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Données Filtrées");
  
//     // Exporter le fichier Excel
//     XLSX.writeFile(workbook, "filtered_data.xlsx");
//   }



//   function exportToExcel() {
//     // Exclure des champs non nécessaires et préparer les données
//     const selectedRows = filteredData.map((row) => {
//       const { userId, ...rest } = row; // Exclure `userId` ou autres champs
//       return rest;
//     });
  
//     if (selectedRows.length === 0) {
//       alert("Aucune donnée à exporter.");
//       return;
//     }
  
//     // Générer les en-têtes dynamiquement
//     const headers = Object.keys(selectedRows[0]);
  
//     // Préparer les données pour SheetJS
//     const excelData = selectedRows.map((row) =>
//       headers.reduce((acc, key) => {
//         acc[key] = row[key];
//         return acc;
//       }, {})
//     );
  
//     // Créer une feuille de calcul
//     const worksheet = XLSX.utils.json_to_sheet(excelData);
  
//     // Ajouter les en-têtes
//     XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });
  
//     // Créer un classeur Excel
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Données Exportées");
  
//     // Exporter le fichier Excel
//     XLSX.writeFile(workbook, "exported_data.xlsx");
//   }
  
  
// function exportToExcel(data) {
//     let excelContent = `
//       <table>
//         <thead>
//           <tr>${Object.keys(data[0]).map((key) => `<th>${key}</th>`).join('')}</tr>
//         </thead>
//         <tbody>
//           ${data.map((row) =>
//             `<tr>${Object.values(row).map((value) => `<td>${value}</td>`).join('')}</tr>`
//           ).join('')}
//         </tbody>
//       </table>
//     `;
  
//     const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
//     const url = URL.createObjectURL(blob);
  
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'data.xls';
//     link.click();
//     URL.revokeObjectURL(url);
//   }
  





  // Export to EXCEL
//   function exportToExcel() {
//     console.log("Exporting data to Excel...");
  
//     // Filtrer les données pour exclure des champs comme userId
//     const selectedRows = filteredData.map((row) => {
//       const { userId, __v, _id, profileImage, ...rest } = row;
//       return rest;
//     });
  
//     if (selectedRows.length === 0) {
//       alert("Aucune donnée à exporter.");
//       return;
//     }
  
//     console.log("Selected rows:", selectedRows);
  
//     // Générer les en-têtes du fichier Excel
//     const headers = Object.keys(selectedRows[0]);
  
//     // Construire le contenu HTML du fichier Excel
//     let excelContent = `
//       <table>
//         <thead>
//           <tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr>
//         </thead>
//         <tbody>
//           ${selectedRows
//             .map((row) =>
//               `<tr>${headers
//                 .map((header) => `<td>${row[header] !== undefined ? row[header] : ''}</td>`)
//                 .join('')}</tr>`
//             )
//             .join('')}
//         </tbody>
//       </table>
//     `;
  
//     // Créer un Blob contenant les données Excel
//     const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
  
//     // Créer un lien pour télécharger le fichier
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'exported_data.xls'; // Nom du fichier exporté
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
  
//     console.log("Excel file created and download initiated.");
//   }




//  function exportToCsv() {
//     const selectedRows = [];
//     const checkboxes = document.querySelectorAll(".dataCheckbox:checked");

//     checkboxes.forEach((checkbox) => {
//       const rowIndex = checkbox.getAttribute("data-index");
//       selectedRows.push(filteredData[rowIndex]);
//     });

//     // Générer le CSV
//     // const headers = Object.keys(selectedRows[0]);
//     const headers = Object.keys(selectedRows[0]).filter(
//       (key) => key !== "_id" && key !== "__v" && key !== "profileImage"
//     );
//     const csvContent =
//       headers.join(",") +
//       "\n" +
//       selectedRows
//         .map((row) =>
//           headers
//             .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
//             .join(",")
//         )
//         .join("\n");

//     // Créer un blob pour téléchargement
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "selected_data.csv");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }



// async function createListFromSelected() {
//   // Récupérer les lignes sélectionnées
//   const checkboxes = document.querySelectorAll(".dataCheckbox:checked");
//   const selectedRows = [];

//   checkboxes.forEach((checkbox) => {
//     const rowIndex = checkbox.getAttribute("data-index");
//     selectedRows.push(filteredData[rowIndex]);
//   });

//   // Vérifier si des données ont été sélectionnées
//   if (selectedRows.length === 0) {
//     alert("Veuillez sélectionner au moins une ligne pour créer une liste.");
//     return;
//   }

//   // API endpoint pour la création de liste
//   const apiEndpoint = "http://localhost:3000/lists";

//   // Préparer les données pour l'API
//   const payload = {
//     name: "Nouvelle Liste", // Optionnel : Peut être ajouté via un formulaire
//     items: selectedRows,
//   };

//   try {
//     // Envoyer une requête POST à l'API
//     const response = await fetch(apiEndpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     // Vérifier la réponse
//     if (response.ok) {
//       const data = await response.json();
//       alert(`Liste créée avec succès ! ID de la liste : ${data.id}`);
//     } else {
//       const error = await response.json();
//       alert(`Erreur lors de la création de la liste : ${error.message}`);
//     }
//   } catch (err) {
//     console.error("Erreur lors de l'appel API :", err);
//     alert("Une erreur est survenue. Veuillez réessayer.");
//   }
// }


// let filteredData = []; // Initialisation globale

// document.addEventListener("DOMContentLoaded", () => {
//   loadData(); // Charge les données filtrées

//   function loadData() {
//     fetch("http://localhost:3000/data")
//       .then((response) => response.json())
//       .then((data) => {
//         filteredData = data.filter((item) => item.isActive); // Exemple de filtrage
//         console.log("Données filtrées chargées :", filteredData);
//       })
//       .catch((error) => console.error("Erreur de récupération des données :", error));
//   }

//   function profil(user, token) {
//     const createList = document.getElementById("createList");
//     const listForm = document.getElementById("createListForm");

//     createList.addEventListener("click", () => {
//       listForm.style.display = "flex";

//       listForm.addEventListener("submit", (event) => {
//         event.preventDefault();

//         if (!filteredData || !Array.isArray(filteredData) || filteredData.length === 0) {
//           alert("Aucune donnée disponible pour créer une liste.");
//           return;
//         }

//         const listName = document.getElementById("listName").value;
//         const checkboxes = document.querySelectorAll(".dataCheckbox:checked");
//         const selectedProfiles = [];

//         checkboxes.forEach((checkbox) => {
//           const rowIndex = checkbox.getAttribute("data-index");
//           selectedProfiles.push(filteredData[rowIndex]);
//         });

//         if (selectedProfiles.length === 0) {
//           alert("Veuillez sélectionner au moins une donnée pour créer une liste.");
//           return;
//         }

//         createListForUser(user?.data.userId, listName, selectedProfiles);
//       });
//     });
//   }
// });
