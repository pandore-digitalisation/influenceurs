document.getElementById("scrapeBtn").addEventListener("click", async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const pageUrl = tabs[0].url;

    if (pageUrl.includes("tiktok.com")) {
      try {
        const response = await fetch(
          `http://localhost:5001/profile?profile_url=${pageUrl}`
        );

        alert(response)

        const scrapedData = await response.json();
        alert(scrapedData)

        if (scrapedData.error) {
          alert("Erreur API : " + scrapedData.error);
          return;
        }

        alert("Données récupérées : " + JSON.stringify(scrapedData, null, 2));

        // Charger les données existantes
        const existingData = loadDataFromLocalStorage();

        // Ajouter les nouvelles données
        existingData.push(scrapedData);

        // Sauvegarder les données mises à jour
        saveDataToLocalStorage(existingData);

        // Afficher le bouton de téléchargement
        toggleUIForDownload();

        // Configurer le bouton de téléchargement
        document
          .getElementById("downloadBtn")
          .addEventListener("click", () => downloadCSV(existingData), {
            once: true,
          });
      } catch (error) {
        alert("Erreur lors du scraping : " + error.message);
      }
    } else {
      alert("Veuillez ouvrir un profil TikTok.");
    }
  });
});

// Fonction pour afficher le bouton de téléchargement
function toggleUIForDownload() {
  document.getElementById("scrapeBtn").style.display = "none";
  document.getElementById("status").style.display = "none";
  document.getElementById("status-download").style.display = "block";
  document.getElementById("downloadBtn").style.display = "block";
}

// Fonction pour charger les données depuis localStorage
function loadDataFromLocalStorage() {
  const data = localStorage.getItem("tiktokScraperData");
  return data ? JSON.parse(data) : [];
}

// Fonction pour sauvegarder les données dans localStorage
function saveDataToLocalStorage(data) {
  localStorage.setItem("tiktokScraperData", JSON.stringify(data));
}

// Convertir JSON en CSV
function jsonToCSV(data) {
  if (!data.length) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((header) => JSON.stringify(row[header] || "")).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

// Télécharger les données au format CSV
function downloadCSV(data) {
  const csvData = jsonToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `tiktok_data_${timestamp}.csv`;

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}


// document.getElementById("scrapeBtn").addEventListener("click", async () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
//     const pageUrl = tabs[0].url;

//     if (pageUrl.includes("tiktok.com")) {
//       try {
//         const response = await fetch(
//           `http://localhost:5001/profile?profile_url=${pageUrl}`
//         );

//         const scrapedData = await response.json();
//         alert("Scraped Data:" + " " + JSON.stringify(scrapedData, null, 2));

//         // Afficher le bouton de téléchargement
//         if (scrapedData) {
//           const existingData = loadDataFromLocalStorage();
//           alert("Existing Data:" + " " + JSON.stringify(existingData, null, 2)); // Vérifiez les données existantes

//           // Fusionner les nouvelles données avec les anciennes
//           //   const updatedData = [existingData, scrapedData];

//           // Ajout des nouvelles données à les anciennes
//           existingData.push(scrapedData);
//           //   alert("Updated Data:" + " " + JSON.stringify(updatedData));
//           alert("Updated Data:" + " " + JSON.stringify(existingData, null, 2));

//           // Sauvegarder les données mises à jour
//           saveDataToLocalStorage(existingData);

//           // Afficher le bouton de téléchargement
//           toggleUIForDownload();

//           // Assurez-vous que le bouton "Download" télécharge toujours les données cumulées
//           document
//             .getElementById("downloadBtn")
//             .addEventListener("click", () => downloadCSV(existingData), {
//               once: true,
//             });
//         }
//       } catch (error) {
//         alert("Error scraping data: " + error);
//       }
//     } else {
//       alert("This is not a TikTok page.");
//     }
//   });
// });

// // Fonction pour afficher le bouton de téléchargement
// function toggleUIForDownload() {
//   document.getElementById("scrapeBtn").style.display = "none";
//   document.getElementById("status").style.display = "none";
//   document.getElementById("status-download").style.display = "block";
//   document.getElementById("downloadBtn").style.display = "block";
// }

// // Fonction pour charger les données depuis localStorage
// function loadDataFromLocalStorage() {
//   const data = localStorage.getItem("facebookPagesData");
//   return data ? JSON.parse(data) : [];
// }

// // Fonction pour sauvegarder les données dans localStorage
// function saveDataToLocalStorage(data) {
//   localStorage.setItem("facebookPagesData", JSON.stringify(data));
// }

// function jsonToCSV(data) {
//   const rows = [];
//   const headers = Object.keys(data[0]);
//   rows.push(headers.join(","));

//   data.forEach((row) => {
//     const values = headers.map((header) => JSON.stringify(row[header] || ""));
//     rows.push(values.join(","));
//   });

//   return rows.join("\n");
// }

// function downloadCSV(data) {
//   const csvData = jsonToCSV(data);
//   const blob = new Blob([csvData], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);

//   const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//   const fileName = `facebook_data_${timestamp}.csv`;

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = fileName;
//   link.click();

//   URL.revokeObjectURL(url);
// }