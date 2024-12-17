const BASE_URL ="http://localhost:3000"

document.getElementById("scrapeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });
  document.getElementById("scrapeBtn").textContent = "Getting...";
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
    window.location.reload();

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
  const loader = document.getElementById("loader");
  const selectAllCheckbox = document.getElementById("selectAll");

  let data = [];

  // Afficher le loader
  loader.style.display = "block";

  // Récupérer les données (localStorage ou backend)
  async function fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/linkedin`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    } finally {
      // Masquer le loader après le chargement
      loader.style.display = "none";
    }
  }

  // Afficher les données dans la table
  async function displayData() {
    data = await fetchData();
    console.log("data log:", data);

    if (data.length === 0) {
      const noDataMessage = document.createElement("tr");
      noDataMessage.innerHTML =
        '<td colspan="6" style="text-align: center;"><div class="alert alert-danger" role="alert">No data available.</div></td>';
      dataContainer.appendChild(noDataMessage);
      return;
    }

    data.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><input type="checkbox" class="dataCheckbox" data-index="${index}" style="margin-right: 25px;"/> ${index + 1} </td>
        <td>${item.name}</td>
        <td>${item.location}</td>
        <td>${item.followers}</td>
        <td>${item.connection}</td>
        <td><a href="${item.profileUrl}" target="_blank" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clip-path="url(#clip0_2104_123)">
          <path d="M21.3995 2.59791L21.3995 7.79435M21.3995 2.59791H16.2031M21.3995 2.59791L17.2856 6.71176L15.2287 8.76868L13.1718 10.8256" stroke="url(#paint0_linear_2104_123)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M12.7067 5H9.29333C6.72873 5 5.44642 5 4.534 5.63061C4.1808 5.87473 3.87473 6.1808 3.63061 6.534C3 7.44642 3 8.72873 3 11.2933V14.7067C3 17.2713 3 18.5536 3.63061 19.466C3.87473 19.8192 4.1808 20.1253 4.534 20.3694C5.44642 21 6.72873 21 9.29333 21H12.7067C15.2713 21 16.5536 21 17.466 20.3694C17.8192 20.1253 18.1253 19.8192 18.3694 19.466C19 18.5536 19 17.2713 19 14.7067V11.2933" stroke="url(#paint1_linear_2104_123)" stroke-width="1.5" stroke-linecap="round"/>
        </g>
        <defs>
          <linearGradient id="paint0_linear_2104_123" x1="12.4371" y1="0.815925" x2="22.0399" y2="8.83541" gradientUnits="userSpaceOnUse">
            <stop offset="0.175" stop-color="#7739DC"/>
            <stop offset="0.605" stop-color="#FF6086"/>
          </linearGradient>
          <linearGradient id="paint1_linear_2104_123" x1="12.0183" y1="29.5411" x2="15.8317" y2="2.73485" gradientUnits="userSpaceOnUse">
            <stop offset="0.175" stop-color="#7739DC"/>
            <stop offset="0.605" stop-color="#FF6086"/>
          </linearGradient>
          <clipPath id="clip0_2104_123">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg></a></td>
      `;
      dataContainer.appendChild(row);
    });

    // Activer le bouton d'exportation si des lignes sont sélectionnées
    document.querySelectorAll(".dataCheckbox").forEach((checkbox) => {
      checkbox.addEventListener("change", handleSelectionChange);
    });

    selectAllCheckbox.addEventListener("change", handleSelectAll);
  }

  function handleSelectAll() {
    const isChecked = selectAllCheckbox.checked;
    const checkboxes = document.querySelectorAll(".dataCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    updateExportButtonState();
  }

  function handleSelectionChange() {
    const checkboxes = document.querySelectorAll(".dataCheckbox");
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );
    selectAllCheckbox.checked = allChecked;
    updateExportButtonState();
  }

  // Mettre à jour l'état du bouton Export
  function updateExportButtonState() {
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
    // const headers = Object.keys(selectedRows[0]);

    const headers = Object.keys(selectedRows[0]).filter(
      (key) => key !== "_id" && key !== "__v" && key !== "profileImage"
    );
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