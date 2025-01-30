
// // Fonction pour récupérer les données utilisateur via l'API
// const fetchUserData = async (token) => {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/user`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Erreur lors de la récupération des données.");
//     }

//     const data = await response.json();
//     console.log("Utilisateur récupéré dans le sidebar : ", data);
//     // Afficher les données utilisateur dans le sidebar
//     displayUserData(data);
//   } catch (error) {
//     console.error("Erreur de récupération des données utilisateur dans le sidebar", error);
//   }
// };

// // Fonction pour afficher les données utilisateur dans le sidebar
// const displayUserData = (data) => {
//   const sidebar = document.getElementById("sidebar");

//   if (sidebar) {
//     // Créer un élément pour afficher les informations utilisateur
//     const userElement = document.createElement("div");
//     userElement.id = "user-info";
//     userElement.innerHTML = `
//       <h3>Bienvenue, ${data.name}</h3>
//       <p>Email : ${data.email}</p>
//       <p>Nom d'utilisateur : ${data.username}</p>
//       <p>ID : ${data.userId}</p>
//     `;

//     // Ajouter l'élément au sidebar
//     sidebar.appendChild(userElement);
//   } else {
//     console.error("Le sidebar n'a pas été trouvé.");
//   }
// };



console.log("✅ sidebar.js chargé avec succès !");

const FRONT_BASE_URL = "https://pandoreinfluencerfrontend.vercel.app";
const BASE_URL = "http://localhost:3000";

let tokenGlobal;

// Fermer le sidebar proprement
document.getElementById("close-sidebar-btn").addEventListener("click", () => {
  window.parent.postMessage("close-sidebar", "*");
});

// Rafraîchir tout le contenu du sidebar à chaque ouverture
document.addEventListener("DOMContentLoaded", refreshSidebar);

// Écouter les changements dans chrome.storage.sync
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.auth_token) {
    console.log("Token modifié, rafraîchissement du sidebar...");
    refreshSidebar();
  }
});

function refreshSidebar() {
  console.log("Rafraîchissement du sidebar...");

  chrome.storage.sync.get(["auth_token"], (result) => {
    if (result.auth_token) {
      tokenGlobal = result.auth_token;
      console.log("🔹 Token récupéré :", tokenGlobal);
      fetchAllSidebarData(tokenGlobal);
    } else {
      console.warn("⚠️ Aucun token trouvé, utilisateur déconnecté.");
      displayLoggedOutState();
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
    console.log("👤 Données utilisateur :", data);
    displayUserData(data);
  } catch (error) {
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
  `;
}

// Exemple : Affichage des autres données (personnalise selon tes besoins)
function displayOtherSidebarData(data) {
  const sidebarContent = document.getElementById("other-data");

  if (!sidebarContent) return;

  sidebarContent.innerHTML = `<p>Données supplémentaires : ${JSON.stringify(data)}</p>`;
}

// Affichage de l'état déconnecté
function displayLoggedOutState() {
  const userProfil = document.getElementById("auth");
  if(userProfil) {
    userProfil.style.display ="none";
  }
}
