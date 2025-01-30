console.log("sidebar.js chargé avec succès !");

// const FRONT_BASE_URL = "https://pandoreinfluencerfrontend.vercel.app";
const FRONT_BASE_URL = "http://localhost:3001";
const BASE_URL = "http://localhost:3000";

let tokenGlobal;

// Fermer le sidebar proprement
document.getElementById("close-sidebar-btn").addEventListener("click", () => {
  window.parent.postMessage("close-sidebar", "*");
});

// Écouter les changements dans chrome.storage.sync
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.auth_token) {
    console.log("Token modifié, rafraîchissement du sidebar...");
    refreshSidebar();
    fetchOtherSidebarData(tokenGlobal);
  }
});

// Rafraîchir tout le contenu du sidebar à chaque ouverture
document.addEventListener("DOMContentLoaded", refreshSidebar);

function refreshSidebar() {
  console.log("Rafraîchissement du sidebar...");

  chrome.storage.sync.get(["auth_token"], (result) => {
    if (result.auth_token) {
      tokenGlobal = result.auth_token;
      console.log("Token récupéré :", tokenGlobal);
      showMainContent();
      fetchAllSidebarData(tokenGlobal);
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
    .catch((error) => console.error("Erreur lors du chargement des données :", error));
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
    if (!response.ok) throw new Error("Erreur lors de la récupération des données utilisateur.");
    const data = await response.json();
    console.log("Données utilisateur :", data);
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
    <span style="font-weight: bold; text-transform: uppercase; font-size:10px">
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

  sidebarContent.innerHTML = `<p>Données supplémentaires : ${JSON.stringify(data)}</p>`;
}

// Affichage de l'état déconnecté
function displayLoggedOutState() {
  const userProfil = document.getElementById("loginBtn");
  // if (userProfil) userProfil.innerHTML = `<p>🔒 Utilisateur déconnecté.</p>`;
  if(userProfil) {
    userProfil.style.display ="inline";
    userProfil.addEventListener("click", () => {
    chrome.tabs.create({url : `${FRONT_BASE_URL}/login`})
    })
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




// console.log("sidebar.js est bien chargé !");

// // // const BASE_URL = "https://influenceur-list.onrender.com";
// // const FRONT_BASE_URL = "https://pandoreinfluencerfrontend.vercel.app";
// // // const FRONT_BASE_URL = "http://localhost:3001";

// const BASE_URL = "http://localhost:3000";

// let tokenGlobal;


// document.getElementById("close-sidebar-btn").addEventListener("click", () => {
//   window.parent.postMessage("close-sidebar", "*");
// });

// chrome.storage.sync.get(["auth_token"], (result) => {
//   if (result.auth_token) {
//     tokenGlobal = result.auth_token;

//     console.log("Token récupéré dans sidebar.js :", tokenGlobal);

//     fetchUserData(tokenGlobal);
//   } else {
//     console.warn("Aucun token trouvé dans chrome.storage.sync, utilisateur deconnecté");
//   }
// });

// const fetchUserData = (token) => {
//   fetch(`${BASE_URL}/auth/user`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     credentials: "include",
//   })
//     .then((response) => {
//       if (!response.ok) throw new Error("Erreur de récupération des données.");
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Données utilisateur :", data);
//       displayUserData(data);
//     })
//     .catch((error) => console.error("Erreur :", error));
// };

// const displayUserData = (user) => {
//   const userProfil = document.getElementById("auth");

//   if (!userProfil) {
//     console.error("Élément #sidebar-content non trouvé !");
//     return;
//   }

//   userProfil.innerHTML = `<img id="profileImage" src="${user?.data.picture}" title="${user?.data.name}" style="background-color: #9CA3AF; width: 25px; border-radius: 50%; align-items: center; cursor: pointe;" /> <span style="font-weight: bold; text-transform: uppercase; font-size:10px">${user?.data.name}</span>
//   <!--<button id="logout-btn" style="
//         background-color: red; color: white; border: none; 
//         padding: 8px 12px; cursor: pointer; border-radius: 5px;
//       ">Déconnexion</button> -->
//   </div>`;

//   document.getElementById("logout-btn").addEventListener("click", handleLogoutUser);
// };

// // Logout via sidebar
// const handleLogoutUser = () => {
//     chrome.storage.sync.remove("auth_token", () => {
//       console.log("Déconnexion confirmée.");
//       window.postMessage({ action: "logoutUser" }, "*");
//       location.reload();
//     });
// };
