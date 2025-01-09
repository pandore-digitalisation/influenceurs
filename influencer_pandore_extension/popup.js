const BASE_URL = "https://influenceurs.onrender.com";
let tokenGlobal;

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
  const exportButton = document.getElementById("exportCsvBtn");
  const selectAllCheckbox = document.getElementById("selectAll");

  let data = [];
  let filteredData = [];

  loader.style.display = "block";

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
    dataContainer.innerHTML = ""; // Vider le tableau
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
      const followersValue = followers.replace(/[^\dKM.,]/g, "");
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

  // Charger les données initiales
  data = await fetchData();
  filteredData = data; // Par défaut, toutes les données
  displayData(data);

  // Ajouter des écouteurs pour les filtres
  searchInput.addEventListener("input", updateFilters);
  platformSelect.addEventListener("change", updateFilters);

  // Activer l'exportation des données
  exportButton.addEventListener("click", () => exportToCsv(data));

  async function updateFilters() {
    const searchValue = searchInput.value.toLowerCase();
    const platformValue = platformSelect.value;

    filteredData = data.filter((item) => {
      const matchesSearch =
        !searchValue || item.name.toLowerCase().includes(searchValue);
      const matchesPlatform =
        !platformValue ||
        item.plateform.toLowerCase() === platformValue.toLowerCase();
      return matchesSearch && matchesPlatform;
    });

    displayData(filteredData);
  }
});

// Login
document.getElementById("loginBtn").addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:3001/login" });
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

    const container = document.getElementById("auth");
    const createList = document.getElementById("createList");
    const listForm = document.getElementById("createListForm");

    if (!container || !createList) {
      console.error("Les éléments nécessaires n'ont pas été trouvés.");
      return;
    }

    createList.disabled = false;
    container.innerHTML = `
  <span>${user?.data.userId}</span>

  <div id="profileDropdown" style="position: relative; display: inline-block;">
    <img
      id="profileImage"
      src="${user?.data.picture}"
      title="${user?.data.name}"
      style="background-color: #9CA3AF; width: 25px; border-radius: 50%; align-items: center; cursor: pointe;"
    />
  </div>
`;
    console.log("Profil injecté avec succès :", user?.data);
    createList.addEventListener("click", () => {
      // createListForUser(user?.data.userId);
      listForm.style.display = "flex";
      createList.disabled = true;
      // Gestion de la soumission du formulaire
      listForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        const listName = document.getElementById("listName").value; // Récupère le nom de la liste
        createListForUser(user?.data.userId, listName);
      });
    });
  }

  // Create list
  function createListForUser(userId, listName) {
    const listData = { name: listName };
    console.log("Données envoyées :", { ...listData, userId });
    console.log("token use", tokenGlobal);

    fetch("http://localhost:3000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenGlobal}`,
      },
      body: JSON.stringify({ ...listData, userId }),
    })
      .then((response) => {
        console.log("Statut de la réponse :", response.status);
        if (!response.ok) {
          return response.json().then((err) => {
            console.error("Erreur renvoyée par le backend :", err);
            throw new Error("Erreur lors de la création de la liste");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Liste créée avec succès :", data);
        alert("Liste créée avec succès !");
      })
      .catch((error) => {
        console.error("Erreur de création :", error.message);
        alert("Une erreur est survenue lors de la création de la liste.");
      });
  }
});

// document.getElementById("logoutBtn").addEventListener("click", () => {
//   // Fonction pour envoyer un message à la page web lors de la déconnexion dans l'extension
//   function logoutFromExtension() {
//     // Envoie le message à la page web pour déconnecter l'utilisateur
//     window.postMessage({ action: "logout" }, window.location.origin);
//   }
//   logoutFromExtension()
// });

// document.addEventListener("DOMContentLoaded", async () => {
//   console.log("Popup chargé !");

//   chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
//     if (chrome.runtime.lastError) {
//       console.error(
//         "Erreur lors de la récupération des données utilisateur:",
//         chrome.runtime.lastError.message
//       );
//       return;
//     }

//     if (response && response.userData) {
//       // Si des données utilisateur existent, mettez à jour l'interface
//       console.log(
//         "Données utilisateur récupérées dans popup.js:",
//         response.userData,
//         response.token
//       );

//       localStorage.setItem("userData", JSON.stringify(response.userData));
//       localStorage.setItem("token", response.token);

//       console.log(
//         "Données utilisateur stockées :",
//         response.userData,
//         response.token
//       );

//       // Récupérer les données depuis localStorage
//       const storedUserData = localStorage.getItem("userData");
//       const storedToken = localStorage.getItem("token");
//       console.log("storage:", storedUserData, storedToken);

//       try {
//         const token = storedToken;
//         if (!token) {
//           console.log("no token stored");
//           return;
//         } else {
//           console.log("ok");
//         }
//       } catch (error) {
//         console.log("good");
//       }

//       // if (storedUserData && storedToken) {
//       //   const userData = JSON.parse(storedUserData);
//       //   const token = storedToken;

//       //   console.log("Données utilisateur :", userData, token);

//       //   console.log("Données utilisateur récupérées :", userData, token);

//       //   // Mettre à jour l'interface utilisateur
//       //   // profil(userData, token);
//       //   console.log("ok", userData, token)
//       // } else {
//       //   console.log("Aucune donnée utilisateur trouvée.");
//       // }
//       profil(response.userData, response.token);
//     }
//     // const authStaus = document.getElementById("authStatus");

//     // authStaus.style.display = "block";
//     // Définir un délai de 30 secondes (30000 ms) pour le cacher
//     setTimeout(() => {
//       authStatus.style.display = "none";
//     }, 10000); // 10 secondes
//   });

//   function profil(user, token) {
//     tokenGlobal = token;

//     const container = document.getElementById("auth");
//     const createList = document.getElementById("createList");
//     const listForm = document.getElementById("createListForm");
//     console.log("btn", createList);
//     console.log("New token :", tokenGlobal);

//     createList.disabled = false;
//     // Injecter le HTML dynamique
//     container.innerHTML = `
//   <span>${user?.data.userId}</span>

//   <div>
//     <img
//       src="${user?.data.picture}"
//       title="${user?.data.name}"
//       style="background-color: #9CA3AF; width: 25px; border-radius: 50%; align-items: center; cursor: pointe;"
//     />
//   </div>
// `;
//     createList.addEventListener("click", () => {
//       // createListForUser(user?.data.userId);
//       listForm.style.display = "flex";
//       createList.disabled = true;
//       // Gestion de la soumission du formulaire
//       listForm.addEventListener("submit", (event) => {
//         event.preventDefault(); // Empêche le rechargement de la page
//         const listName = document.getElementById("listName").value; // Récupère le nom de la liste
//         createListForUser(user?.data.userId, listName);
//       });
//     });
//   }
//   // Create list
//   function createListForUser(userId, listName) {
//     const listData = { name: listName };
//     console.log("Données envoyées :", { ...listData, userId });
//     console.log("token use", tokenGlobal);

//     fetch("http://localhost:3000/lists", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${tokenGlobal}`,
//       },
//       body: JSON.stringify({ ...listData, userId }),
//     })
//       .then((response) => {
//         console.log("Statut de la réponse :", response.status);
//         if (!response.ok) {
//           return response.json().then((err) => {
//             console.error("Erreur renvoyée par le backend :", err);
//             throw new Error("Erreur lors de la création de la liste");
//           });
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Liste créée avec succès :", data);
//         alert("Liste créée avec succès !");
//       })
//       .catch((error) => {
//         console.error("Erreur de création :", error.message);
//         alert("Une erreur est survenue lors de la création de la liste.");
//       });
//   }

//   // const createList = document.getElementById("createList");
//   // const listForm = document.getElementById("createListForm");

//   // createList.addEventListener("click", () => {
//   //   listForm.style.display = "flex";
//   //   createList.disabled = true;
//   // });
// });
