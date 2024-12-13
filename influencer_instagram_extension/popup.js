document.getElementById("scrapeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });
  document.getElementById("scrapeBtn").textContent = "In process...";
});

// Écouter les messages envoyés par content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.success) {
    // document.getElementById("downloadBtn").style.display = "block";
    document.getElementById("scrapeBtn").style.display = "none";
    document.getElementById("status").style.display = "block";
    setTimeout(() => {
      window.location.reload();
      // document.getElementById("downloadBtn").style.display = "block";
    }, 1000);
  } else {
    alert("Please connect to Instagram profile");
  }
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: downloadCSV,
    });
  });
});

function downloadCSV() {
  const storedData = JSON.parse(localStorage.getItem("exportedData") || "[]");

  if (storedData.length === 0) {
    alert("No data available for download.");
    return;
  }

  const headers = Object.keys(storedData[0]);
  const csvContent =
    headers.join(",") +
    "\n" +
    storedData
      .map((row) =>
        headers
          .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data.csv";
  link.click();

  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", async () => {
  const dataContainer = document
    .getElementById("dataTable")
    .querySelector("tbody");
  const exportButton = document.getElementById("exportCsvBtn");

  let data = [];


  // Récupérer les données (localStorage ou backend)
  async function fetchData() {
    try {
      const response = await fetch(
        "https://influenceurs.onrender.com/instagram"
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Afficher les données dans la table
  async function displayData() {
    data = await fetchData();

    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox" class="dataCheckbox" data-index="${index}" /></td>
        <td>${item.name}</td>
        <td>${item.posts}</td>
        <td>${item.followers}</td>
        <td>${item.following}</td>
        <td><a href="${item.profileUrl}" target="_blank">View Profile</a></td>
      `;
      dataContainer.appendChild(row);
    });

    // Activer le bouton d'exportation si des lignes sont sélectionnées
    document.querySelectorAll(".dataCheckbox").forEach((checkbox) => {
      checkbox.addEventListener("change", handleSelectionChange);
    });
  }

  // Mettre à jour l'état du bouton Export
  function handleSelectionChange() {
    const selected =
      document.querySelectorAll(".dataCheckbox:checked").length > 0;
    exportButton.disabled = !selected;
  }

  // Exporter les données sélectionnées en CSV
  function exportToCsv() {
    const selectedRows = [];
    const checkboxes = document.querySelectorAll(".dataCheckbox:checked");

    checkboxes.forEach((checkbox) => {
      const rowIndex = checkbox.getAttribute("data-index");
      selectedRows.push(data[rowIndex]);
    });

    // Générer le CSV
    const headers = Object.keys(selectedRows[0]);
    const csvContent =
      headers.join(",") +
      "\n" +
      selectedRows
        .map((row) =>
          headers
            .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    // Créer un blob pour téléchargement
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "selected_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Associer l'action d'exportation au bouton
  exportButton.addEventListener("click", exportToCsv);

  // Charger et afficher les données
  displayData();
});

// document.addEventListener("DOMContentLoaded", async () => {
//   const dataContainer = document
//     .getElementById("dataTable")
//     .querySelector("tbody");
//   const exportButton = document.getElementById("exportCsvBtn");

//   try {
//     // Récupérer les données depuis le backend
//     const response = await fetch("https://influenceurs.onrender.com/instagram");
//     const data = await response.json();

//     // Insérer les données dans la table
//     data.forEach((item, index) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td><input type="checkbox" class="dataCheckbox" data-index="${index}" /></td>
//         <td>${item.name}</td>
//         <td>${item.posts}</td>
//         <td>${item.followers}</td>
//         <td>${item.following}</td>
//         <td><a href="${item.profileUrl}" target="_blank">View Profile</a></td>
//       `;
//       dataContainer.appendChild(row);
//     });

//   } catch (error) {
//     console.error("Error fetching data from backend:", error);
//   }

// });
