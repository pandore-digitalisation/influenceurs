console.log("sidebar.js chargé avec succès !");
// const BASE_URL = "https://influenceur-list.onrender.com";
// const FRONT_BASE_URL = "https://pandoreinfluencerfrontend.vercel.app";
const FRONT_BASE_URL = "http://localhost:3001";
const BASE_URL = "http://localhost:3000";

let tokenGlobal;
let userData;
let userId;

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
      userData = result.userData
      userId = userData.data.userId
      console.log("Token récupéré :", tokenGlobal);
      console.log("user data", userData)
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

// Exemple : Autres données à charger (remplace ou ajoute d'autres appels API)
async function fetchOtherSidebarData(token) {
  try {
    const response = await fetch(`${BASE_URL}/other-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("Autres données du sidebar :", data);
    displayOtherSidebarData(data);
  } catch (error) {
    return console.error("Erreur récupération autres données :", error);
  }
}

// Affichage des données utilisateur dans le sidebar
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

// Exemple : Affichage des autres données (personnalise selon tes besoins)
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
    document
      .getElementById("dataGetSuccessMessageCLose")
      .addEventListener("click", () => {
        document.getElementById("dataGetSuccessMessage").style.display = "none";
        document.getElementById("scrapeBtn").style.display = "flex";
        document.getElementById("scrapeBtn").textContent = "Obtenir";
      });
  } else if (message.dataNotExtrated) {
    document.getElementById("dataGetErrorsMessage").style.display = "block";
    document.getElementById("scrapeBtn").style.display = "none";
    document
      .getElementById("dataGetErrorsMessage")
      .addEventListener("click", () => {
        document.getElementById("dataGetErrorsMessage").style.display = "none";
        document.getElementById("scrapeBtn").style.display = "flex";
        document.getElementById("scrapeBtn").textContent = "Obtenir";
      });
    // alert("Timeout reached, please reload the page and trying again");
    // window.location.href = window.location.href;
    // window.location.reload();
  } else if (message.networkError) {
    alert("Erreur de connection!");
  }
});

//-------------  GET PROFILE DATA BY USER CONNECTED  -------------//

async function fetchScrappedProfiles(userId) {
  try {
    const response = await fetch(`${BASE_URL}/platforms/all`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    const data = await response.json();

    // Filtrer les profils dont `userId` contient l'ID de l'utilisateur connecté
    const filteredProfiles = data.filter(profile => profile.userId.includes(userId));

    console.log("Profils filtrés :", filteredProfiles);

  } catch (error) {
    console.error("Erreur lors de la récupération des listes :", error);
    listsLoader.style.display = "none";
  }
}

//-------------  GET LIST DATA  -------------//
let lists = [];
let filteredListData = [];

const listFilter = document.getElementById("listFilter");

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
    console.log("Listes récupérées :", data);

    // listsLoader.style.display = "none";
    lists = data;
    populateListFilter();
    // displayProfiles(lists.flatMap((list) => list.profiles));
  } catch (error) {
    console.error("Erreur lors de la récupération des listes :", error);
    listsLoader.style.display = "none";
  }
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