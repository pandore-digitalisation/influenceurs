document.getElementById("scrapeBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      });
    });
  });
  
  
  
  
  // document.getElementById("scrapeBtn").addEventListener("click", async () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  //     const pageUrl = tabs[0].url;
  
  //     if (pageUrl.includes("tiktok.com")) {
  //       try {
  //         const statusDiv = document.getElementById("status");
  //         statusDiv.textContent = "Starting scraping...";
  //         const response = await fetch(
  //           `http://localhost:5001/profile?profile_url=${pageUrl}`
  //         );
  //         statusDiv.textContent = "Starting scraping...";
  
  //         alert(response);
  
  //         const scrapedData = await response.json();
  //         alert(scrapedData);
  
  //         if (scrapedData.error) {
  //           alert("Erreur API : " + scrapedData.error);
  //           return;
  //         }
  
  //         alert("Données récupérées : " + JSON.stringify(scrapedData, null, 2));
  
  //         // Charger les données existantes
  //         const existingData = loadDataFromLocalStorage();
  
  //         // Ajouter les nouvelles données
  //         existingData.push(scrapedData);
  
  //         // Sauvegarder les données mises à jour
  //         saveDataToLocalStorage(existingData);
  
  //         // Afficher le bouton de téléchargement
  //         toggleUIForDownload();
  
  //         // Configurer le bouton de téléchargement
  //         document
  //           .getElementById("downloadBtn")
  //           .addEventListener("click", () => downloadCSV(existingData), {
  //             once: true,
  //           });
  //       } catch (error) {
  //         alert("Erreur lors du scraping : " + error.message);
  //       }
  //     } else {
  //       alert("Veuillez ouvrir un profil TikTok.");
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
  //   const data = localStorage.getItem("tiktokScraperData");
  //   return data ? JSON.parse(data) : [];
  // }
  
  // // Fonction pour sauvegarder les données dans localStorage
  // function saveDataToLocalStorage(data) {
  //   localStorage.setItem("tiktokScraperData", JSON.stringify(data));
  // }
  
  // // Convertir JSON en CSV
  // function jsonToCSV(data) {
  //   if (!data.length) return "";
  
  //   const headers = Object.keys(data[0]);
  //   const rows = data.map((row) =>
  //     headers.map((header) => JSON.stringify(row[header] || "")).join(",")
  //   );
  
  //   return [headers.join(","), ...rows].join("\n");
  // }
  
  // // Télécharger les données au format CSV
  // function downloadCSV(data) {
  //   const csvData = jsonToCSV(data);
  //   const blob = new Blob([csvData], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);
  
  //   const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  //   const fileName = `tiktok_data_${timestamp}.csv`;
  
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = fileName;
  //   link.click();
  
  //   URL.revokeObjectURL(url);
  // }