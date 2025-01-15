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


function exportToCsv() {
    const selectedRows = filteredData.map((row) => {
      // Exclure `userId` et autres champs non nécessaires
      const { userId, ...rest } = row;
      return rest;
    });
  
    if (selectedRows.length === 0) {
      alert("Aucune donnée à exporter.");
      return;
    }
  
    // Générer les en-têtes dynamiquement à partir du premier objet
    const headers = Object.keys(selectedRows[0]);
    const csvContent =
      headers.join(",") +
      "\n" +
      selectedRows
        .map((row) =>
          headers
            .map((header) => `"${(row[header] || "").toString().replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");
  
    // Créer un blob pour téléchargement
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "filtered_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  