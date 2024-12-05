// Helper function to evaluate an XPath expression and return nodes
function evaluateXPath(xpath, context = document) {
  const iterator = document.evaluate(
    xpath,
    context,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  const nodes = [];
  for (let i = 0; i < iterator.snapshotLength; i++) {
    nodes.push(iterator.snapshotItem(i));
  }
  return nodes;
}

// Define the XPaths for the name and post
const nameXPath = "./a[1]/div[1]/div/div/div[2]/div/div/span[1]/span";
const postXPath = "./a[1]/div[1]/div/div/div[2]/div/div/span[2]/span";

// Define the XPath for the parent container of the data block
const parentXPath = "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div";

// Extract data
const parentElements = evaluateXPath(parentXPath);

if (parentElements.length === 0) {
console.log("No elements found using the parent XPath.");
} else {
const data = [];

parentElements.forEach((parent) => {
  const childElements = parent.children;

  Array.from(childElements).forEach((child) => {
    // Get the name using the relative XPath
    const nameElements = evaluateXPath(nameXPath, child);
    const name = nameElements.length > 0 ? nameElements[0].textContent.trim() : null;

    // Get the post using the relative XPath
    const postElements = evaluateXPath(postXPath, child);
    const post = postElements.length > 0 ? postElements[0].textContent.trim() : null;

    // Get the URL from the anchor tag within the child
    const urlElement = child.querySelector("a");
    const url = urlElement ? urlElement.href : null;

    data.push({
      url,
      name,
      post,
      relevantData: child.textContent.trim().replace(/\n|\r/g, " "),
    });
  });
});

// Log the extracted data
console.log("Extracted Data:", data);

// Convert data to CSV format
if (data.length > 0) {
  const headers = Object.keys(data[0]);
  const csvContent =
    headers.join(",") +
    "\n" +
    data.map((row) => headers.map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`).join(",")).join("\n");

  // Create a downloadable CSV file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} else {
  console.log("No data extracted.");
}
}

  
  
  
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