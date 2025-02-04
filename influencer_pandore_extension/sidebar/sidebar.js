console.log("sidebar.js chargé avec succès !");
// const BASE_URL = "https://influenceur-list.onrender.com";
// const FRONT_BASE_URL = "https://pandoreinfluencerfrontend.vercel.app";
const FRONT_BASE_URL = "http://localhost:3001";
const BASE_URL = "http://localhost:3000";

let tokenGlobal;
let userData;
let userId;
const loader = document.getElementById("loader");

//-------------  UI SIDEBAR  -------------//

// Fermer le sidebar proprement
document.getElementById("close-sidebar-btn").addEventListener("click", () => {
  window.parent.postMessage("close-sidebar", "*");
});

// Écouter les changements dans chrome.storage.sync
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.auth_token) {
    console.log("Token modifié, rafraîchissement du sidebar...");
    refreshSidebar();
    fetchOtherSidebarData(tokenGlobal);
  }
});

// Rafraîchir tout le contenu du sidebar à chaque ouverture
document.addEventListener("DOMContentLoaded", refreshSidebar);

function refreshSidebar() {
  console.log("Rafraîchissement du sidebar...");

  chrome.storage.sync.get(["auth_token", "userData"], (result) => {
    if (result.auth_token) {
      tokenGlobal = result.auth_token;
      userData = result.userData;
      userId = userData.data.userId;
      console.log("Token récupéré :", tokenGlobal);
      showMainContent();
      fetchAllSidebarData(tokenGlobal);
      fetchProfiles(userId, tokenGlobal);
      fetchScrappedProfiles(userId);
    } else {
      console.warn("Aucun token trouvé, utilisateur déconnecté.");
      displayLoggedOutState();
      showWelcomeScreen();
    }
  });
}

// Récupérer toutes les données nécessaires au sidebar
function fetchAllSidebarData(token) {
  Promise.all([
    fetchUserData(token),
    fetchOtherSidebarData(token), // Ajoute ici d'autres appels API si nécessaire
  ])
    .then(() => console.log("Toutes les données ont été chargées."))
    .catch((error) =>
      console.error("Erreur lors du chargement des données :", error)
    );
}

// Récupération des données utilisateur
async function fetchUserData(token) {
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!response.ok)
      throw new Error(
        "Erreur lors de la récupération des données utilisateur."
      );
    const data = await response.json();
    chrome.storage.sync.set({ userData: data }, () => {
      console.log("Données utilisateur sauvegardé dans l'extension.");
    });
    displayUserData(data);
  } catch (error) {
    showWelcomeScreen();
    return console.error("Erreur récupération utilisateur :", error);
  }
}

// Autres données à charger (remplace ou ajoute d'autres appels API)
async function fetchOtherSidebarData(token) {
  try {
    const response = await fetch(`${BASE_URL}/other-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log("Autres données du sidebar :", data);
    displayOtherSidebarData(data);
  } catch (error) {
    return console.error("Erreur récupération autres données :", error);
  }
}

function displayUserData(user) {
  const userProfil = document.getElementById("auth");

  if (!userProfil) {
    console.error("⚠️ Élément #auth non trouvé !");
    return;
  }

  userProfil.innerHTML = `
    <img id="profileImage" src="${user?.data.picture}" title="${user?.data.name}" 
         style="background-color: #9CA3AF; width: 25px; border-radius: 50%; cursor: pointer;" />
    <span style="font-weight: bold; color: white; text-transform: uppercase; font-size:10px">
      ${user?.data.name}
    </span>
    <!---<button id="logout-btn" style="
      background-color: red; color: white; border: none; 
      padding: 8px 12px; cursor: pointer; border-radius: 5px;
    ">Déconnexion</button>--->
  `;

  // document.getElementById("logout-btn").addEventListener("click", handleLogoutUser);
}

// Affichage des autres données
function displayOtherSidebarData(data) {
  const sidebarContent = document.getElementById("other-data");

  if (!sidebarContent) return;

  sidebarContent.innerHTML = `<p>Données supplémentaires : ${JSON.stringify(
    data
  )}</p>`;
}

// Affichage de l'état déconnecté
function displayLoggedOutState() {
  const loginBtn = document.getElementById("loginBtn");
  const createAccountBtn = document.getElementById("createAccountBtn");
  // if (userProfil) userProfil.innerHTML = `<p>🔒 Utilisateur déconnecté.</p>`;
  if (loginBtn && createAccountBtn) {
    loginBtn.style.display = "inline";
    loginBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: `${FRONT_BASE_URL}/login` });
    });
    createAccountBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: `${FRONT_BASE_URL}/login` });
    });
  }
}

function showWelcomeScreen() {
  document.getElementById("welcome-screen").style.display = "block";
  document.getElementById("main-content").style.display = "none";
}

function showMainContent() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}

// // estion de la déconnexion
// function handleLogoutUser() {
//   chrome.storage.sync.remove("auth_token", () => {
//     console.log("🚪 Déconnexion confirmée.");
//     displayLoggedOutState();
//     window.postMessage({ action: "logoutUser" }, "*");
//     location.reload();
//   });
// }

//-------------  GET SCRAPPED DATA  -------------//

// Bouton Scraper
document.getElementById("scrapeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    // Détecter la plateforme actuelle
    let scriptFile;
    if (url.hostname.includes("x.com")) {
      scriptFile = "./scripts/content_x.js";
    } else if (url.hostname.includes("instagram.com")) {
      scriptFile = "./scripts/content_instagram.js";
    } else if (url.hostname.includes("facebook.com")) {
      scriptFile = "./scripts/content_facebook.js";
    } else if (url.hostname.includes("linkedin.com")) {
      scriptFile = "./scripts/content_linkedin.js";
    } else if (url.hostname.includes("tiktok.com")) {
      scriptFile = "./scripts/content_tiktok.js";
    } else {
      const notSupportedMessage = document.getElementById(
        "notSupportedMessage"
      );
      notSupportedMessage.style.display = "block";
      document.getElementById("scrapeBtn").style.display = "none";
      const notSupportedMessageClose = document.getElementById(
        "notSupportedMessageClose"
      );
      notSupportedMessageClose.addEventListener("click", () => {
        notSupportedMessage.style.display = "none";
        document.getElementById("scrapeBtn").style.display = "flex";
        document.getElementById("scrapeBtn").textContent = "Obtenir";
        // window.location.reload();
      });
    }

    // Injecter et exécuter le script correspondant
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: [scriptFile],
    });
  });

  document.getElementById("scrapeBtn").textContent = "En cours...";
});

// Écouter les messages envoyés par le content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.success) {
    document.getElementById("dataGetSuccessMessage").style.display = "block";
    document.getElementById("scrapeBtn").style.display = "none";
    loader.style.display = "flex";
    refreshSidebar();
    document
      .getElementById("dataGetSuccessMessageCLose")
      .addEventListener("click", () => {
        document.getElementById("dataGetSuccessMessage").style.display = "none";
        document.getElementById("scrapeBtn").style.display = "flex";
        document.getElementById("scrapeBtn").textContent = "Obtenir";
      });
  } else if (message.dataNotExtracted) {
    document.getElementById("dataGetErrorsMessage").style.display = "block";
    document.getElementById("scrapeBtn").style.display = "none";
    document
      .getElementById("dataGetErrorsMessageClose")
      .addEventListener("click", () => {
        document.getElementById("dataGetErrorsMessage").style.display = "none";
        document.getElementById("scrapeBtn").style.display = "flex";
        document.getElementById("scrapeBtn").textContent = "Obtenir";
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs[0]) {
            chrome.tabs.reload(tabs[0].id);
          }
        });
      });
    // alert("Timeout reached, please reload the page and trying again");
    // window.location.href = window.location.href;
    // window.location.reload();
  } else if (message.networkError) {
    alert("Erreur de connection!");
  }
});

// Platforms use alert

document.addEventListener("DOMContentLoaded", () => {
  const usePlatformsAlert = document.getElementById("usePlatformsAlert");
  usePlatformsAlert.style.display = "block";
});

document
  .getElementById("usePlatformsAlertClose")
  .addEventListener("click", () => {
    const usePlatformsAlert = document.getElementById("usePlatformsAlert");
    usePlatformsAlert.style.display = "none";
  });

//-------------  GET SCRAPPED PROFILE DATA BY USER CONNECTED  -------------//
let scrappedData = [];
let filterdScrappedData = [];

async function fetchScrappedProfiles(userId) {
  try {
    const response = await fetch(`${BASE_URL}/platforms/all`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    const data = await response.json();

    // Filtrer les profils dont `userId` contient l'ID de l'utilisateur connecté
    const scrappedProfiles = data.filter((profile) =>
      profile.userId.includes(userId)
    );

    console.log("Profils filtrés :", scrappedProfiles);
    scrappedData = scrappedProfiles;
    displayScrappedData(scrappedData);
    return scrappedProfiles;
  } catch (error) {
    console.error("Erreur lors de la récupération des listes :", error);
    // listsLoader.style.display = "none";
    return [];
  } finally {
    loader.style.display = "none";
  }
}

async function displayScrappedData(dataToShow) {
  const scrappedData = document.querySelector("#scrappedDataTable tbody");
  const scrappedDataBlock = document.getElementById("scrappedData");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageInfo = document.getElementById("pageInfo");

  if (dataToShow.lenght === 0) {
    const noScrappedData = document.getElementById("noScrappedData");
    noScrappedData.style.display = "block";
    scrappedDataBlock.style.display = "none";
    return;
  }

  const rowsPerPage = 5;
  let currentPage = 1;

  dataToShow.sort((a, b) => a.name.localeCompare(b.name));

  function displayPage(page) {
    scrappedData.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = dataToShow.slice(start, end);

    function truncateName(name) {
      return name.length > 12 ? name.slice(0, 12) + "..." : name;
    }

    paginatedData.forEach((item) => {
      const row = document.createElement("tr");
      const name = truncateName(item.name);
      const followers = item.followers;
      const following = item.following;
      const connection = item.connection;
      const profileUrl = item.profileUrl;
      const plateform = item.plateform;

      row.innerHTML = `
        <td><a href="${profileUrl}" target="_blanc" style="text-decoration="none" title=${name}>${name}</a></td>
        <td>${followers}</td>
        <td>${following || "-" || " "}</td>
        <td>${plateform}</td>
      `;
      scrappedData.appendChild(row);
    });

    pageInfo.textContent = `${currentPage}/${Math.ceil(
      dataToShow.length / rowsPerPage
    )}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled =
      currentPage === Math.ceil(dataToShow.length / rowsPerPage);
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(dataToShow.length / rowsPerPage)) {
      currentPage++;
      displayPage(currentPage);
    }
  });

  displayPage(currentPage);
}

//-------------  GET LIST DATA  -------------//
let lists = [];
let filteredListData = [];
const listFilter = document.getElementById("listFilter");
const exportBtn = document.getElementById("exportBtn");
const selectAllProfilesLists = document.getElementById("selectAllProfilesLists");

// Fonction pour récupérer les listes depuis l'API
async function fetchProfiles(userId, token) {
  try {
    const response = await fetch(`${BASE_URL}/lists/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    const data = await response.json();
    // console.log("Listes récupérées :", data);

    lists = data;
    populateListFilter();
    // Affichage par défaut : tous les profils de toutes les listes
    displayProfiles(lists.flatMap((list) => list.profiles));
  } catch (error) {
    console.error("Erreur lors de la récupération des listes :", error);
    return [];
  } finally {
    loader.style.display = "none";
  }
}

// Fonction pour remplir le menu déroulant de listes
function populateListFilter() {
  listFilter.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Toutes les listes";
  listFilter.appendChild(defaultOption);

  lists.forEach((list) => {
    const option = document.createElement("option");
    option.value = list._id;
    option.textContent = list.name;
    listFilter.appendChild(option);
  });
}

// Écouteur sur le select pour filtrer les profils par liste
listFilter.addEventListener("change", () => {
  const selectedListId = listFilter.value;
  if (!selectedListId) {
    displayProfiles(lists.flatMap((list) => list.profiles));
  } else {
    const selectedList = lists.find((list) => list._id === selectedListId);
    if (selectedList) {
      displayProfiles(selectedList.profiles);
    } else {
      displayProfiles([]);
    }
  }
});

// Fonction pour mettre à jour l'état du bouton d'export
function updateExportButtonState() {
  const table = document.getElementById("userListsProfiles");
  if (!table) return;
  const checkboxes = table.querySelectorAll("input.profileCheckbox");
  let isAnyChecked = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isAnyChecked = true;
    }
  });
  // Le bouton d'export est activé uniquement s'il y a au moins une case cochée
  exportBtn.disabled = !isAnyChecked;
}

// Fonction pour afficher les profils avec pagination
async function displayProfiles(profiles) {
  const userListsProfiles = document.querySelector("#userListsProfiles tbody");
  const profileListDataBlock = document.getElementById("profileListData");
  const listPrevBtn = document.getElementById("listPrevBtn");
  const listNextBtn = document.getElementById("listNextBtn");
  const listPageInfo = document.getElementById("listPageInfo");

  if (profiles.length === 0) {
    const noProfileListData = document.getElementById("noProfileListData");
    if (noProfileListData) {
      noProfileListData.style.display = "block";
    }
    if (profileListDataBlock) {
      profileListDataBlock.style.display = "none";
    }
    if (userListsProfiles) {
      userListsProfiles.innerHTML = "";
    }
    // Désactiver le bouton d'export s'il n'y a aucune donnée
    exportBtn.disabled = true;
    return;
  } else {
    const noProfileListData = document.getElementById("noProfileListData");
    if (noProfileListData) {
      noProfileListData.style.display = "none";
    }
    if (profileListDataBlock) {
      profileListDataBlock.style.display = "block";
    }
  }

  const rowsPerPage = 5;
  let currentPage = 1;

  // Tri des profils par nom
  profiles.sort((a, b) => a.name.localeCompare(b.name));

  // Fonction d'affichage d'une page donnée
  function displayPage(page) {
    userListsProfiles.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = profiles.slice(start, end);

    // Fonction pour tronquer un nom si trop long
    function truncateName(name) {
      return name.length > 8 ? name.slice(0, 8) + "..." : name;
    }

    // Création des lignes du tableau
    paginatedData.forEach((item, index) => {
      const row = document.createElement("tr");
      const name = truncateName(item.name);
      const followers = item.followers;
      const followingOrConnection = item.following || "-" || " ";
      const profileUrl = item.profileUrl;
      const plateform = item.plateform;

      row.innerHTML = `
        <td>
          <div class="ui checkbox">
            <input type="checkbox" class="profileCheckbox" data-index="${index}">
            <label></label>
          </div>
        </td>
        <td>
          <a href="${profileUrl}" target="_blank" style="text-decoration: none;" title="${item.name}">
            ${name}
          </a>
        </td>
        <td>${followers}</td>
        <td>${followingOrConnection}</td>
        <td>${plateform}</td>
      `;
      userListsProfiles.appendChild(row);
    });

    // Mise à jour de l'information de pagination
    listPageInfo.textContent = `${currentPage}/${Math.ceil(profiles.length / rowsPerPage)}`;
    listPrevBtn.disabled = currentPage === 1;
    listNextBtn.disabled = currentPage === Math.ceil(profiles.length / rowsPerPage);

    // Réinitialiser la case "Select All" à chaque changement de page
    if (selectAllProfilesLists) {
      selectAllProfilesLists.checked = false;
    }

    // Ajouter les écouteurs de changement sur les cases pour mettre à jour le bouton d'export
    const checkboxes = userListsProfiles.querySelectorAll("input.profileCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateExportButtonState);
    });
    // Mise à jour initiale de l'état du bouton d'export
    updateExportButtonState();
  }

  // Gestion de la pagination
  listPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });

  listNextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(profiles.length / rowsPerPage)) {
      currentPage++;
      displayPage(currentPage);
    }
  });

  displayPage(currentPage);
}

// Fonction d'export vers Excel en fonction de la sélection
function exportToExcel() {
  // Récupérer le tableau affiché
  const table = document.getElementById("userListsProfiles");
  if (!table) {
    console.error("Le tableau avec l'ID 'userListsProfiles' est introuvable.");
    return;
  }

  // Récupérer les lignes dont les cases à cocher sont sélectionnées
  const checkboxes = table.querySelectorAll("input.profileCheckbox");
  let selectedRows = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const row = checkbox.closest("tr");
      if (row) {
        // Cloner la ligne pour l'export
        selectedRows.push(row.cloneNode(true));
      }
    }
  });

  let exportTable;
  if (selectedRows.length > 0) {
    // Créer une table temporaire pour l'export avec l'en-tête et les lignes sélectionnées
    exportTable = document.createElement("table");
    const thead = table.querySelector("thead");
    if (thead) {
      exportTable.appendChild(thead.cloneNode(true));
    }
    const newTbody = document.createElement("tbody");
    selectedRows.forEach((row) => {
      newTbody.appendChild(row);
    });
    exportTable.appendChild(newTbody);
  } else {
    // Si aucune case n'est cochée, ne devrait pas être possible (bouton désactivé),
    // mais on prévoit l'export de l'intégralité du tableau
    exportTable = table;
  }

  // Création du workbook et déclenchement du téléchargement
  const workbook = XLSX.utils.table_to_book(exportTable, { sheet: "Profils" });
  XLSX.writeFile(workbook, "export_profiles.xlsx");
}

// Gestion du "Select All" dans l'en-tête
if (selectAllProfilesLists) {
  selectAllProfilesLists.addEventListener("change", () => {
    const table = document.getElementById("userListsProfiles");
    if (!table) return;
    const checkboxes = table.querySelectorAll("input.profileCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllProfilesLists.checked;
    });
    // Met à jour l'état du bouton d'export
    updateExportButtonState();
  });
} else {
  console.error("La case 'Select All' (selectAllProfilesLists) est introuvable.");
}

// Attacher l'événement sur le bouton d'export
if (exportBtn) {
  exportBtn.addEventListener("click", exportToExcel);
} else {
  console.error("Le bouton d'export avec l'ID 'exportBtn' est introuvable.");
}


//-------------  CREATE LIST  -------------//

const openPopupBtn = document.getElementById("createListBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

// Ouvrir le popup
openPopupBtn.addEventListener("click", () => {
  popup.style.display = "block";
  overlay.style.display = "block";
});

// Fermer le popup en cliquant sur l'overlay
overlay.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});

// Fermer le popup
closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});






{/* <button id="openPopupBtn">Ouvrir le Popup</button>

<div id="popup"
  style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000;">
  <p>Ceci est un popup !</p>
  <button id="closePopupBtn">Fermer</button>
</div>

<!-- Arrière-plan sombre pour le popup -->
<div id="overlay" style="display: none; position: fixed; top: 0; left: 0; 
width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 999;"></div> */}
