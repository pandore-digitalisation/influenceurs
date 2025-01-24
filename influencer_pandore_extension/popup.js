// const BASE_URL = "https://influenceur-list.onrender.com";
const BASE_URL = "http://localhost:3000";
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
// Bouton Télécharger CSV
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

  if (!storedData.length || storedData.length === 0) {
    alert("Aucune donnée disponible pour téléchargement.");
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

  try {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Téléchargement du fichier
    const link = document.createElement("a");
    link.href = url;
    link.download = `data_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    // Nettoyage de l'URL blob
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur lors de l'exportation des données en CSV :", error);
    alert("Une erreur s'est produite lors de l'exportation des données.");
  }
}

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
    dataContainer.innerHTML = " "; // Vider le tableau
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
      handleSelectionChange(); // Mettez à jour la sélection globale
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
    exportToCsvButton.disabled = !selected;
    exportToXlsButton.disabled = !selected;
  }

  // // Exporter les données sélectionnées en CSV
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
  console.log(data);
  filteredData = data; // Par défaut, toutes les données
  displayData(filteredData);

  // Ajouter des écouteurs pour les filtres
  searchInput.addEventListener("input", updateFilters);
  platformSelect.addEventListener("change", updateFilters);

  // Activer l'exportation des données
  exportToCsvButton.addEventListener("click", exportToCsv);
  exportToXlsButton.addEventListener("click", exportToExcel);

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
  chrome.tabs.create({ url: `${BASE_URL}/login` });
});

// Get user connected data
document.addEventListener("DOMContentLoaded", () => {
  let messageHandled = false;

  chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        chrome.runtime.lastError.message
      );
      messageHandled = true;
      fallbackToLocalStorage();
    } else if (response && response.userData) {
      console.log("Données utilisateur récupérées :", response.userData);
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

      profil(response.userData, response.token);
    } else {
      console.log("Pas de données utilisateur, fallback activé");
      fallbackToLocalStorage();
    }

    // if (response && response.userData) {
    //   messageHandled = true;
    //   console.log("Données utilisateur récupérées :", response.userData);
    //   localStorage.setItem("userData", JSON.stringify(response.userData));
    //   localStorage.setItem("token", response.token);
    //   profil(response.userData, response.token);
    // } else {
    //   console.warn("Aucune donnée utilisateur reçue, fallback activé.");
    //   fallbackToLocalStorage();
    // }
  });

  // Si aucune réponse n'est reçue dans un délai raisonnable, fallback
  // setTimeout(() => {
  //   if (!messageHandled) {
  //     console.warn(
  //       "Aucune réponse reçue de `chrome.runtime.sendMessage`. Utilisation du fallback."
  //     );
  //     fallbackToLocalStorage();
  //   }
  // }, 2000);

  function fallbackToLocalStorage() {
    const storedUserData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");

    if (storedUserData && storedToken) {
      const userData = JSON.parse(storedUserData);
      console.log("Fallback - Données utilisateur récupérées :", userData);
      profil(userData, storedToken);
    } else {
      console.log("Aucune donnée utilisateur trouvée en fallback.");
    }
  }

  // Vérifiez après un délai si le message a été traité
  // setTimeout(() => {
  //   if (!messageHandled) {
  //     console.warn(
  //       "Aucune réponse de `chrome.runtime.sendMessage`. Utilisation du fallback."
  //     );
  //     fallbackToLocalStorage();
  //   }
  // }, 1000);

  // function fallbackToLocalStorage() {
  //   const storedUserData = localStorage.getItem("userData");
  //   const storedToken = localStorage.getItem("token");

  //   if (storedUserData && storedToken) {
  //     const userData = JSON.parse(storedUserData);
  //     console.log("Fallback - Données utilisateur :", userData);
  //     profil(userData, storedToken);
  //   } else {
  //     console.log("Aucune donnée utilisateur trouvée en fallback.");
  //   }
  // }

  function profil(user, token) {
    tokenGlobal = token;
    globalUserId = user?.data.userId;
    console.log("global userid", globalUserId);

    const container = document.getElementById("auth");
    const createList = document.getElementById("createList");
    // const listForm = document.getElementById("createListForm");

    if (!container || !createList) {
      console.error("Les éléments nécessaires n'ont pas été trouvés.");
      return;
    }

    createList.disabled = false;
    // createProfileList.disabled = false;

    console.log("token", token);

    container.innerHTML = `<span>${user?.data.userId}</span>

      <div id="profileDropdown" style="position: relative; display: inline-block;">
        <img
          id="profileImage"
          src="${user?.data.picture}"
          title="${user?.data.name}"
          style="background-color: #9CA3AF; width: 25px; border-radius: 50%; align-items: center; cursor: pointe;"
        />
      </div>`;
    console.log("Profil injecté avec succès :", user?.data);
  }

  // Create list
  const createList = document.getElementById("createList");

  createList.addEventListener("click", () => {
    const createListForm = document.getElementById("createListForm");
    createListForm.style.display =
      createListForm.style.display === "none" ? "flex" : "none";
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

      console.log("user data", userData);
      console.log("selected data", selectedData);

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
  console.log("tokeeeee", token);
  const connectedUserData = localStorage.getItem("userData");
  const data = JSON.parse(connectedUserData);

  const connectedUserId = data.data.userId;
  console.log("ii", data.data.userId);

  const listFilter = document.getElementById("listFilter");
  const profilesTableBody = document.querySelector("#profilesTable tbody");
  let lists = []; // Contiendra les données des listes récupérées depuis l'API

  // Fonction pour récupérer les listes depuis l'API
  function fetchProfiles() {
    fetch(`${BASE_URL}/lists/user/${connectedUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Authentification si nécessaire
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
        lists = data; // Stocker les données récupérées
        populateListFilter(); // Remplir le menu déroulant
        displayProfiles(lists.flatMap((list) => list.profiles)); // Afficher tous les profils par défaut
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des listes :", error);
        const profilesList = document.getElementById("api-profiles-list");
        profilesList.innerHTML = `<p style="color: red;">Erreur lors du chargement des listes.</p>`;
      });
  }

  // Fonction pour remplir le menu déroulant
  function populateListFilter() {
    console.log("Listes pour le filtre :", lists); // Vérification des données
    lists.forEach((list) => {
      const option = document.createElement("option");
      option.value = list._id; // Assurez-vous que `list.id` est correct
      option.textContent = list.name; // Assurez-vous que `list.name` est correct
      listFilter.appendChild(option);
    });
  }

  // Fonction pour afficher les profils associés
  function displayProfiles(profiles) {
    profilesTableBody.innerHTML = ""; // Réinitialise les lignes du tableau
    if (profiles.length === 0) {
      profilesTableBody.innerHTML =
        '<tr><td colspan="2">Aucun profil trouvé.</td></tr>';
      return;
    }
    console.log("Profils à afficher :", profiles); // Vérification des profils affichés
    profiles.forEach((profile) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${profile._id}</td>
        <td>${profile.name}</td>
      `;
      profilesTableBody.appendChild(row);
    });
  }

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
      }
    } else {
      // Afficher tous les profils si aucune liste n'est sélectionnée
      const allProfiles = lists.flatMap((list) => list.profiles || []);
      displayProfiles(allProfiles);
    }
  });

  // Appel initial pour récupérer les données et initialiser le filtre
  fetchProfiles();

  //   // Fonction pour récupérer les listes depuis l'API
  //   function fetchProfiles() {
  //     fetch(`${BASE_URL}/lists/user/${connectedUserId}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Ajoute cette ligne si l'authentification est nécessaire
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         console.log("list data", response.json)
  //         return response.json();
  //       })
  //       .then((data) => {
  //         displayProfiles(data); // Affiche les profils récupérés
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching lists:", error);
  //         const profilesList = document.getElementById("api-profiles-list");
  //         profilesList.innerHTML = `<p style="color: red;">Erreur lors du chargement des listes.</p>`;
  //       });
  //   }

  //   // Fonction pour afficher les profils dans le DOM
  //   function displayProfiles(data) {
  //     const profilesList = document.getElementById("api-profiles-list");
  //     profilesList.innerHTML = ""; // Réinitialise le contenu

  //     if (data.length === 0) {
  //       profilesList.innerHTML = "<p>Aucune liste trouvée.</p>";
  //       return;
  //     }

  //     data.forEach((profile) => {
  //       const listItem = document.createElement("div");console.log("profile", profile)

  //       listItem.textContent = `${profile.name} - ${profile.profileUrl}`;
  //       profilesList.appendChild(listItem);
  //     });
  //   }
  //   fetchProfiles();

  //   // Filter list fonction

  // const listFilter = document.getElementById("listFilter");
  // const profilesTableBody = document.querySelector("#profilesTable tbody");

  // // Fonction pour remplir le menu déroulant
  // function populateListFilter() {
  //   lists.forEach(list => {
  //     const option = document.createElement("option");
  //     option.value = list.id;
  //     option.textContent = list.name;
  //     listFilter.appendChild(option);
  //   });
  // }

  // // Fonction pour afficher les profils associés
  // function displayProfiles(profiles) {
  //   profilesTableBody.innerHTML = ""; // Nettoyer les lignes existantes
  //   profiles.forEach(profile => {
  //     const row = document.createElement("tr");
  //     row.innerHTML = `
  //       <td>${profile.id}</td>
  //       <td>${profile.name}</td>
  //     `;
  //     profilesTableBody.appendChild(row);
  //   });
  // }

  // // Gestion du changement de filtre
  // listFilter.addEventListener("change", () => {
  //   const selectedListId = Number(listFilter.value); // Récupérer l'ID sélectionné
  //   if (selectedListId) {
  //     // Filtrer la liste sélectionnée
  //     const selectedList = lists.find(list => list.id === selectedListId);
  //     if (selectedList) displayProfiles(selectedList.profiles);
  //   } else {
  //     // Afficher tous les profils si aucune liste n'est sélectionnée
  //     const allProfiles = lists.flatMap(list => list.profiles);
  //     displayProfiles(allProfiles);
  //   }
  // });

  // // Initialisation
  // populateListFilter();
  // displayProfiles(lists.flatMap(list => list.profiles)); // Afficher tous les profils au départ
});
