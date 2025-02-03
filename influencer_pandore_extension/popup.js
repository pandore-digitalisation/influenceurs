const BASE_URL = "https://influenceur-list.onrender.com";
const FRONT_BASE_URL = "https://pandoreinfluencerfrontend.vercel.app";
// const FRONT_BASE_URL = "http://localhost:3001";

// const BASE_URL = "http://localhost:3000";
let tokenGlobal;
let globalUserId;

// Bouton Scraper
document.getElementById("scrapeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);

    // Détecter la plateforme actuelle
    let scriptFile;
    if (url.hostname.includes("x.com")) {
      scriptFile = "scripts/content_x.js";
    } else if (url.hostname.includes("instagram.com")) {
      scriptFile = "scripts/content_instagram.js";
    } else if (url.hostname.includes("facebook.com")) {
      scriptFile = "scripts/content_facebook.js";
    } else if (url.hostname.includes("linkedin.com")) {
      scriptFile = "scripts/content_linkedin.js";
    } else if (url.hostname.includes("tiktok.com")) {
      scriptFile = "scripts/content_tiktok.js";
    } else {
      alert("This platform is not supported.");
      window.location.reload();
    }

    // Injecter et exécuter le script correspondant
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: [scriptFile],
    });
  });

  document.getElementById("scrapeBtn").textContent = "Getting...";
});

// Écouter les messages envoyés par le content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.success) {
    document.getElementById("scrapeBtn").style.display = "none";
    document.getElementById("status").style.display = "block";
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } else {
    alert("Timeout reached, please reload the page and trying again");
    window.location.href = window.location.href;
    // window.location.reload();
  }
});

// // Bouton Télécharger CSV
// document.getElementById("downloadBtn").addEventListener("click", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: downloadCSV,
//     });
//   });
// });

// function downloadCSV() {
//   const storedData = JSON.parse(localStorage.getItem("exportedData") || "[]");

//   if (!storedData.length || storedData.length === 0) {
//     alert("Aucune donnée disponible pour téléchargement.");
//     return;
//   }

//   const headers = Object.keys(storedData[0]);
//   const csvContent =
//     headers.join(",") +
//     "\n" +
//     storedData
//       .map((row) =>
//         headers
//           .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
//           .join(",")
//       )
//       .join("\n");

//   try {
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);

//     // Téléchargement du fichier
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `data_export_${new Date().toISOString().slice(0, 10)}.csv`;
//     link.click();

//     // Nettoyage de l'URL blob
//     URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Erreur lors de l'exportation des données en CSV :", error);
//     alert("Une erreur s'est produite lors de l'exportation des données.");
//   }
// }

// Search functions
document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchInput");
  const platformSelect = document.getElementById("platformSelect");
  const dataContainer = document
    .getElementById("dataTable")
    .querySelector("tbody");

  const loader = document.getElementById("loader");
  const exportToCsvButton = document.getElementById("exportCsvBtn");
  const exportToXlsButton = document.getElementById("exportXlsBtn");
  const selectAllCheckbox = document.getElementById("selectAll");

  let data = [];
  let filteredData = [];

  loader.style.display = "block";

  function saveToLocalStorage() {
    const checkboxes = document.querySelectorAll(".dataCheckbox:checked");

    // Récupérer les lignes sélectionnées
    const selectedRows = Array.from(checkboxes).map((checkbox) => {
      const rowIndex = checkbox.getAttribute("data-index");
      return filteredData[rowIndex];
    });

    // Sauvegarder dans le localStorage
    localStorage.setItem("selectedData", JSON.stringify(selectedRows));
  }

  async function fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/platforms/all`);
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      return [];
    } finally {
      loader.style.display = "none";
    }
  }

  async function displayData(dataToShow) {
    dataContainer.innerHTML = " ";
    if (dataToShow.length === 0) {
      const noDataMessage = document.createElement("tr");
      noDataMessage.innerHTML =
        '<td colspan="6" style="text-align: center;"><div class="alert alert-danger" role="alert">Aucune donnée trouvée.</div></td>';
      dataContainer.appendChild(noDataMessage);
      return;
    }

    dataToShow.forEach((item, index) => {
      const followers = item.followers;
      const following = item.following;
      const connection = item.connection;
      const followersValue = followers
        ? followers.replace(/[^\dKM.,]/g, "")
        : "";
      const followingValue = following
        ? following.replace(/[^\dKM.,]/g, "")
        : "";
      const connectionValue = connection
        ? connection.replace(/[^\dKM.,]/g, "")
        : "";

      function expandValue(value) {
        if (value.endsWith("K")) {
          return parseFloat(value.replace("K", "").replace(",", "")) * 1000;
        } else if (value.endsWith("M")) {
          return parseFloat(value.replace("M", "").replace(",", "")) * 1000000;
        }

        return parseFloat(value.replace(",", ""));
      }

      const expandFollowersValue = expandValue(followersValue);
      const expandFollowingValue = expandValue(followingValue);
      const expandConnectionValue = expandValue(connectionValue);

      // console.log("following", followingValue);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox" class="dataCheckbox" data-index="${index}" style="margin-right: 25px;"/> ${
        index + 1
      }</td>
        <td>${item.name}</td>
        <td>${expandFollowersValue || 0}</td>
        <td>${expandFollowingValue || expandConnectionValue || 0}</td>
        <td>${item.plateform}</td>
         <td><a href="${item.profileUrl}" target="_blank" >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99999 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6024 1.66666 9.99999 1.66666C5.39762 1.66666 1.66666 5.39762 1.66666 9.99999C1.66666 14.6024 5.39762 18.3333 9.99999 18.3333Z" stroke="url(#paint0_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66667 2.5H7.5C5.875 7.36667 5.875 12.6333 7.5 17.5H6.66667" stroke="url(#paint1_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 2.5C14.125 7.36667 14.125 12.6333 12.5 17.5" stroke="url(#paint2_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.5 13.3333V12.5C7.36667 14.125 12.6333 14.125 17.5 12.5V13.3333" stroke="url(#paint3_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.5 7.49966C7.36667 5.87466 12.6333 5.87466 17.5 7.49966" stroke="url(#paint4_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="paint0_linear_105_453" x1="11.0607" y1="27.2303" x2="15.033" y2="-0.692873" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
              <linearGradient id="paint1_linear_105_453" x1="6.96819" y1="25.5073" x2="18.0101" y2="19.2007" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
              <linearGradient id="paint2_linear_105_453" x1="13.1869" y1="25.5073" x2="24.2289" y2="19.2007" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
              <linearGradient id="paint3_linear_105_453" x1="10.9547" y1="14.3693" x2="10.9787" y2="12.2864" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
              <linearGradient id="paint4_linear_105_453" x1="10.9547" y1="8.15026" x2="10.9787" y2="6.06733" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
            </defs>
          </svg>
          </a></td>
      `;
      dataContainer.appendChild(row);
    });

    document.querySelectorAll(".dataCheckbox").forEach((checkbox) => {
      checkbox.addEventListener("change", handleSelectionChange);
    });

    selectAllCheckbox.addEventListener("change", handleSelectAll);

    selectAllCheckbox.addEventListener("change", () => {
      const isChecked = selectAllCheckbox.checked;
      document.querySelectorAll(".dataCheckbox").forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
      handleSelectionChange();
    });
  }

  function handleSelectAll() {
    const isChecked = selectAllCheckbox.checked;
    const checkboxes = document.querySelectorAll(".dataCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    updateExportButtonState();
    saveToLocalStorage();
  }

  function handleSelectionChange() {
    const checkboxes = document.querySelectorAll(".dataCheckbox");
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );
    selectAllCheckbox.checked = allChecked;
    updateExportButtonState();
    saveToLocalStorage();
  }

  function updateExportButtonState() {
    const selected =
      document.querySelectorAll(".dataCheckbox:checked").length > 0;

    if (exportToCsvButton) {
      exportToCsvButton.disabled = !selected;
    }

    if (exportToXlsButton) {
      exportToXlsButton.disabled = !selected;
    }
  }

  // Exporter les données sélectionnées en CSV
  function exportToCsv() {
    // Sélectionner uniquement les cases cochées
    const checkboxes = document.querySelectorAll(".dataCheckbox:checked");

    // Vérifier s'il y a des cases cochées
    if (checkboxes.length === 0) {
      alert("Aucune donnée sélectionnée pour l'exportation.");
      return;
    }

    // Récupérer les lignes sélectionnées à partir des cases cochées
    const selectedRows = Array.from(checkboxes).map((checkbox) => {
      const rowIndex = checkbox.getAttribute("data-index"); // Récupère l'index associé
      return filteredData[rowIndex]; // Utilise cet index pour accéder à la donnée correspondante
    });

    // Exclure des champs spécifiques si nécessaire
    const cleanedRows = selectedRows.map(
      ({ userId, __v, _id, profileImage, createdAt, updatedAt, ...rest }) =>
        rest
    );

    // Générer les en-têtes dynamiquement à partir du premier objet
    const headers = Object.keys(cleanedRows[0]);
    const csvContent =
      headers.join(",") +
      "\n" +
      cleanedRows
        .map((row) =>
          headers
            .map(
              (header) =>
                `"${(row[header] || "").toString().replace(/"/g, '""')}"`
            )
            .join(",")
        )
        .join("\n");

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

  // Export to EXCEL
  function exportToExcel() {
    console.log("Exporting selected data to Excel...");

    // Sélectionner uniquement les cases cochées
    const checkboxes = document.querySelectorAll(".dataCheckbox:checked");

    // Vérifier s'il y a des cases cochées
    if (checkboxes.length === 0) {
      alert("Aucune donnée sélectionnée pour l'exportation.");
      return;
    }

    // Récupérer les lignes sélectionnées à partir des cases cochées
    const selectedRows = Array.from(checkboxes).map((checkbox) => {
      const rowIndex = checkbox.getAttribute("data-index"); // Récupère l'index associé
      return filteredData[rowIndex]; // Utilise cet index pour accéder à la donnée correspondante
    });

    // Exclure des champs spécifiques si nécessaire
    const cleanedRows = selectedRows.map(
      ({ userId, __v, _id, profileImage, createdAt, updatedAt, ...rest }) =>
        rest
    );

    console.log("Selected rows:", cleanedRows);

    // Vérifier s'il y a des données à exporter
    if (cleanedRows.length === 0) {
      alert("Aucune donnée valide à exporter.");
      return;
    }

    // Générer les en-têtes du fichier Excel
    const headers = Object.keys(cleanedRows[0]);

    // Construire le contenu HTML du fichier Excel
    let excelContent = `
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${cleanedRows
          .map(
            (row) =>
              `<tr>${headers
                .map(
                  (header) =>
                    `<td>${row[header] !== undefined ? row[header] : ""}</td>`
                )
                .join("")}</tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

    // Créer un Blob contenant les données Excel
    const blob = new Blob([excelContent], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    // Créer un lien pour télécharger le fichier
    const link = document.createElement("a");
    link.href = url;
    link.download = "selected_data.xls"; // Nom du fichier exporté
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Excel file created and download initiated.");
  }

  // Charger les données initiales
  data = await fetchData();
  // console.log(data);
  filteredData = data;
  displayData(filteredData);

  // Ajouter des écouteurs pour les filtres
  searchInput.addEventListener("input", updateFilters);
  platformSelect.addEventListener("change", updateFilters);

  // Activer l'exportation des données
  // exportToCsvButton.addEventListener("click", exportToCsv);
  // exportToXlsButton.addEventListener("click", exportToExcel);

  async function updateFilters() {
    const searchValue = searchInput.value.toLowerCase();
    const platformValue = platformSelect.value;

    filteredData = data.filter((item) => {
      const matchesSearch =
        !searchValue || item.name?.toLowerCase().includes(searchValue);
      const matchesPlatform =
        !platformValue ||
        item.plateform?.toLowerCase() === platformValue.toLowerCase();
      return matchesSearch && matchesPlatform;
    });

    displayData(filteredData);
  }
});

// Login
document.getElementById("loginBtn").addEventListener("click", () => {
  chrome.tabs.create({ url: `${FRONT_BASE_URL}/login` });
});

// Get user connected data
document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Erreur lors de la récupération des données utilisateur");
    } else if (response && response.userData) {
      localStorage.setItem("userData", JSON.stringify(response.userData));
      localStorage.setItem("token", response.token);
      profil(response.userData, response.token);

      chrome.storage.local.set(
        { userData: response.userData, token: response.token },
        () => {
          if (chrome.runtime.lastError) {
            console.error(
              "Erreur lors de la sauvegarde des données :",
              chrome.runtime.lastError
            );
          } else {
            console.log("Données utilisateur sauvegardées avec succès.");
          }
        }
      );
    } else {
      console.log("Pas de données utilisateur");

      // Nettoyer les données locales si l'utilisateur n'est pas connecté
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
          console.error(
            "Erreur lors du nettoyage des données :",
            chrome.runtime.lastError
          );
        } else {
          console.log("Toutes les données utilisateur ont été nettoyées.");
        }
      });
    }
  });

  function profil(user, token) {
    tokenGlobal = token;
    globalUserId = user?.data.userId;
    // console.log("global userid", globalUserId);

    const container = document.getElementById("auth");
    const createList = document.getElementById("createList");
    // const listForm = document.getElementById("createListForm");

    if (!container || !createList) {
      console.error("Les éléments nécessaires n'ont pas été trouvés.");
      return;
    }

    createList.disabled = false;
    // createProfileList.disabled = false;

    // console.log("token", token);

    container.innerHTML = `<span style="font-weight: bold; text-transform: uppercase; font-size:10px">${user?.data.name}</span>

      <div id="profileDropdown" style="position: relative; display: inline-block;">
        <img
          id="profileImage"
          src="${user?.data.picture}"
          title="${user?.data.name}"
          style="background-color: #9CA3AF; width: 25px; border-radius: 50%; align-items: center; cursor: pointe;"
        />
      </div>`;
    // console.log("Profil injecté avec succès :", user?.data);
  }

  // Create list
  const createList = document.getElementById("createList");

  createList.addEventListener("click", () => {
    const createListForm = document.getElementById("createListForm");
    const dataTableVisible = document.getElementById("dataTable");
    const profilesTableVisile = document.getElementById("profilesTable");
    const searchInputVisible = document.getElementById("searchInput");
    const platformSelectVisible = document.getElementById("platformSelect");
    const listFilterVisible = document.getElementById("listFilter");
    createListForm.style.display =
      createListForm.style.display === "none" ? "flex" : "none";
    dataTableVisible.style.display =
      dataTableVisible.style.display === "none" ? "table" : "none";
    profilesTableVisile.style.display =
      profilesTableVisile.style.display === "none" ? "table" : "none";
    searchInputVisible.disabled =
      searchInputVisible.disabled === true ? false : true;
    platformSelectVisible.disabled = platformSelectVisible.disabled === true ? false : true;
    listFilterVisible.disabled = listFilterVisible.disabled == true ? false: true;
  });

  document
    .getElementById("createListSubmit")
    .addEventListener("click", async () => {
      const listName = document.getElementById("listName").value.trim();
      if (!listName) {
        alert("Veuillez entrer un nom pour la liste.");
        return;
      }

      // Récupérer les données sélectionnées depuis localStorage
      const selectedData =
        JSON.parse(localStorage.getItem("selectedData")) || [];
      const userData = JSON.parse(localStorage.getItem("userData"));

      // console.log("user data", userData);
      // console.log("selected data", selectedData);

      if (selectedData.length === 0) {
        alert("Aucune donnée sélectionnée pour créer une liste.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/lists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenGlobal}`,
          },
          body: JSON.stringify({
            name: listName,
            profiles: selectedData,
            userId: userData.data.userId,
          }),
        });

        if (response.ok) {
          alert("Liste créée avec succès.");
          // Vider les données sélectionnées
          localStorage.removeItem("selectedData");
          window.location.reload();
        } else {
          const error = await response.json();
          alert(`Erreur : ${error.message}`);
        }
      } catch (err) {
        console.error("Erreur lors de la création de la liste :", err);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });

  // GEt token from localstorage
  const token = localStorage.getItem("token");
  // console.log("tokeeeee", token);
  const connectedUserData = localStorage.getItem("userData");
  const listsLoader = document.getElementById("listsLoader");
  const profilesTableBody = document.querySelector("#profilesTable tbody");

  const connectedData = JSON.parse(connectedUserData);

  if (connectedData == null) {
    console.log("user not connected")
    listsLoader.style.display = "none";
    const userNotConnected = document.createElement("tr");
    profilesTableBody.innerHTML = '<td colspan="6" style="text-align: center;"><div class="alert alert-warning" role="alert">Veuillez-vous connecter pour voir vos listes.</div></td>';
    userNotConnected.appendChild(userNotConnected);
    return;

  }

  const connectedUserId = connectedData.data.userId;

  const listFilter = document.getElementById("listFilter");

  const exportListToCsvButton = document.getElementById("exportListCsvBtn");
  const exportListToXlsButton = document.getElementById("exportListXlsBtn");
  const selectAllListCheckbox = document.getElementById("selectListAll");

  let lists = [];
  let filteredListData = [];

  listsLoader.style.display = "block";

  // Fonction pour récupérer les listes depuis l'API
  function fetchProfiles() {
    fetch(`${BASE_URL}/lists/user/${connectedUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Listes récupérées :", data);
        listsLoader.style.display = "none";

        lists = data; // Stocker les données récupérées
        populateListFilter(); // Remplir le menu déroulant
        displayProfiles(lists.flatMap((list) => list.profiles));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des listes :", error);
        listsLoader.style.display = "none";
      });
  }

  // Fonction pour remplir le menu déroulant
  function populateListFilter() {
    console.log("Listes pour le filtre :", lists);
    lists.forEach((list) => {
      const option = document.createElement("option");
      option.value = list._id;
      option.textContent = list.name;
      listFilter.appendChild(option);
    });
  }

  // Fonction pour afficher les profils associés
  function displayProfiles(profiles) {
    profilesTableBody.innerHTML = "";
    if (profiles.length === 0) {
      const noDataMessage = document.createElement("tr");
      profilesTableBody.innerHTML = '<td colspan="6" style="text-align: center;"><div class="alert alert-danger" role="alert">Aucune donnée trouvée.</div></td>';
      noDataMessage.appendChild(noDataMessage);
      return;
    }
    console.log("Profils à afficher :", profiles);
    profiles.forEach((profile, key) => {
      const followersList = profile.followers;
      const followingList = profile.following;
      const connectionList = profile.connection;
      const followersListValue = followersList
        ? followersList.replace(/[^\dKM.,]/g, "")
        : "";
      const followingListValue = followingList
        ? followingList.replace(/[^\dKM.,]/g, "")
        : "";
      const connectionListValue = connectionList
        ? connectionList.replace(/[^\dKM.,]/g, "")
        : "";

      function expandListValue(value) {
        if (value.endsWith("K")) {
          return parseFloat(value.replace("K", "").replace(",", "")) * 1000;
        } else if (value.endsWith("M")) {
          return parseFloat(value.replace("M", "").replace(",", "")) * 1000000;
        }

        return parseFloat(value.replace(",", ""));
      }

      const expandFollowersListValue = expandListValue(followersListValue);
      const expandFollowingListValue = expandListValue(followingListValue);
      const expandConnectionListValue = expandListValue(connectionListValue);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox" class="listDataCheckbox" data-index="${key}" style="margin-right: 25px;"/> ${
        key + 1
      }</td>
        <td>${profile.name}</td>
        <td>${expandFollowersListValue || 0}</td>
        <td>${expandFollowingListValue || expandConnectionListValue || 0}</td>
        <td>${profile.plateform}</td>
         <td><a href="${profile.profileUrl}" target="_blank" >
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99999 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6024 1.66666 9.99999 1.66666C5.39762 1.66666 1.66666 5.39762 1.66666 9.99999C1.66666 14.6024 5.39762 18.3333 9.99999 18.3333Z" stroke="url(#paint0_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66667 2.5H7.5C5.875 7.36667 5.875 12.6333 7.5 17.5H6.66667" stroke="url(#paint1_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 2.5C14.125 7.36667 14.125 12.6333 12.5 17.5" stroke="url(#paint2_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.5 13.3333V12.5C7.36667 14.125 12.6333 14.125 17.5 12.5V13.3333" stroke="url(#paint3_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.5 7.49966C7.36667 5.87466 12.6333 5.87466 17.5 7.49966" stroke="url(#paint4_linear_105_453)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="paint0_linear_105_453" x1="11.0607" y1="27.2303" x2="15.033" y2="-0.692873" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
              <linearGradient id="paint1_linear_105_453" x1="6.96819" y1="25.5073" x2="18.0101" y2="19.2007" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
              <linearGradient id="paint2_linear_105_453" x1="13.1869" y1="25.5073" x2="24.2289" y2="19.2007" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
              <linearGradient id="paint3_linear_105_453" x1="10.9547" y1="14.3693" x2="10.9787" y2="12.2864" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
              <linearGradient id="paint4_linear_105_453" x1="10.9547" y1="8.15026" x2="10.9787" y2="6.06733" gradientUnits="userSpaceOnUse">
                <stop offset="0.175" stop-color="#7739DC"/>
                <stop offset="0.605" stop-color="#FF6086"/>
              </linearGradient>
            </defs>
          </svg>
          </a></td>
      `;
      profilesTableBody.appendChild(row);

      // const row = document.createElement("tr");
      // row.innerHTML = `
      //   <td>${profile._id}</td>
      //   <td>${profile.name}</td>
      // `;
      // profilesTableBody.appendChild(row);
    });
    document.querySelectorAll(".listDataCheckbox").forEach((checkbox) => {
      checkbox.addEventListener("change", handleListSelectionChange);
    });

    selectAllListCheckbox.addEventListener("change", handleListSelectAll);

    selectAllListCheckbox.addEventListener("change", () => {
      const isChecked = selectAllListCheckbox.checked;
      document.querySelectorAll(".listDataCheckbox").forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
      handleListSelectionChange();
    });
  }

  function handleListSelectAll() {
    const isListChecked = selectAllListCheckbox.checked;
    const checkboxesList = document.querySelectorAll(".listDataCheckbox");
    checkboxesList.forEach((checkbox) => {
      checkbox.checked = isListChecked;
    });
    updateListExportButtonState();
    // saveToLocalStorage();
  }

  // / Fonction pour gérer la sélection et filtrer les données exportées
  function handleListSelectionChange() {
    const selectedCheckboxes = Array.from(
      document.querySelectorAll(".listDataCheckbox:checked")
    );

    filteredListData = selectedCheckboxes.map((checkbox) => {
      const index = parseInt(checkbox.getAttribute("data-index"), 10);
      return filteredListData[index];
      // return lists.flatMap((list) => list.profiles)[index];
    });
    updateListExportButtonState();
  }

  function updateListExportButtonState() {
    const selectedList =
      document.querySelectorAll(".listDataCheckbox:checked").length > 0;

    if (exportListToCsvButton) {
      exportListToCsvButton.disabled = !selectedList;
    }

    if (exportListToXlsButton) {
      exportListToXlsButton.disabled = !selectedList;
    }
  }

  // // Exporter les données sélectionnées en CSV
  function convertToCSV(data) {
    const headers = ["Nom", "Followers", "Following", "Plateforme", "URL"];
    console.log("data", data);
    const rows = data.map((profile) => [
      profile.name,
      profile.followers || 0,
      profile.following || profile.connection || 0,
      profile.plateform,
      profile.profileUrl,
    ]);

    // Construire le contenu CSV
    const csvContent = [headers, ...rows]
      .map((row) => row.map((item) => `"${item}"`).join(","))
      .join("\n");
    return csvContent;
  }

  function downloadCSV(filename, data) {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Fonction utilitaire pour convertir les données en Excel (XLSX)
  function convertToExcel(data) {
    const headers = ["Nom", "Followers", "Following", "Plateforme", "URL"];
    const rows = data.map((profile) => [
      profile.name,
      profile.followers || 0,
      profile.following || profile.connection || 0,
      profile.plateform,
      profile.profileUrl,
    ]);

    // Ajouter les données à une feuille Excel
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profiles");

    return XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  }

  // Fonction pour télécharger le fichier Excel
  function downloadExcel(filename, data) {
    const blob = new Blob([data], { type: "application/octet-stream" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportListToCsvButton.addEventListener("click", () => {
    const csvData = convertToCSV(filteredListData);
    downloadCSV("profiles_list.csv", csvData);
  });

  exportListToXlsButton.addEventListener("click", () => {
    const excelData = convertToExcel(filteredListData);
    downloadExcel("profiles_list.xlsx", excelData);
  });

  // Gestion du changement de filtre
  listFilter.addEventListener("change", () => {
    const selectedListId = listFilter.value; // Récupère l'ID sélectionné (string ou number)
    console.log("ID de la liste sélectionnée :", selectedListId); // Vérification de l'ID sélectionné

    if (selectedListId) {
      // Trouver la liste sélectionnée et afficher ses profils
      const selectedList = lists.find((list) => list._id === selectedListId); // Comparez correctement les types
      if (selectedList) {
        console.log("Liste sélectionnée :", selectedList); // Vérification de la liste
        displayProfiles(selectedList.profiles || []);
        filteredListData = selectedList.profiles || [];
      }
    } else {
      // Afficher tous les profils si aucune liste n'est sélectionnée
      const allProfiles = lists.flatMap((list) => list.profiles || []);
      displayProfiles(allProfiles);
      filteredListData = allProfiles;
    }
  });

  // Appel initial pour récupérer les données et initialiser le filtre
  fetchProfiles();
});