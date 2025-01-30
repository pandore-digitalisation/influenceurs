
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

const BASE_URL = "http://localhost:3000";
let tokenGlobal;

document.getElementById("close-sidebar-btn").addEventListener("click", () => {
  window.parent.postMessage("close-sidebar", "*");
});

document.addEventListener("DOMContentLoaded", refreshSidebar);

function refreshSidebar() {
  console.log("🔄 Rafraîchissement du sidebar...");

  chrome.storage.sync.get(["auth_token"], (result) => {
    if (result.auth_token) {
      tokenGlobal = result.auth_token;
      console.log("🔹 Token récupéré :", tokenGlobal);
      showMainContent();
      fetchAllSidebarData(tokenGlobal);
    } else {
      console.warn("⚠️ Aucun token trouvé, utilisateur déconnecté.");
      showWelcomeScreen();
    }
  });
}

function fetchAllSidebarData(token) {
  fetchUserData(token).catch((error) => console.error("Erreur récupération utilisateur :", error));
}

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
    if (!response.ok) throw new Error("Erreur récupération des données utilisateur.");
    const data = await response.json();
    console.log("👤 Données utilisateur :", data);
    displayUserData(data);
  } catch (error) {
    showWelcomeScreen();
  }
}

function displayUserData(user) {
  document.getElementById("auth").innerHTML = `
    <img id="profileImage" src="${user?.data.picture}" title="${user?.data.name}" 
         style="background-color: #9CA3AF; width: 25px; border-radius: 50%; cursor: pointer;" />
    <span style="font-weight: bold; text-transform: uppercase; font-size:10px">
      ${user?.data.name}
    </span>
  `;
}

function showWelcomeScreen() {
  document.getElementById("welcome-screen").style.display = "block";
  document.getElementById("main-content").style.display = "none";
}

function showMainContent() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
}


<div id="welcome-screen" style="display: none; text-align: center;">
  <h2>Bienvenue !</h2>
  <p>Veuillez vous connecter pour continuer.</p>
</div>

<div id="main-content" style="display: none;">
  <div id="auth"></div>
</div>
