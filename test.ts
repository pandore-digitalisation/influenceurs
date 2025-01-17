// Déclarez une variable globale pour userId
// let userIdGlobal;

// document.addEventListener("DOMContentLoaded", () => {
//   chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
//     if (chrome.runtime.lastError) {
//       console.error(
//         "Erreur lors de la récupération des données utilisateur:",
//         chrome.runtime.lastError.message
//       );
//       fallbackToLocalStorage();
//     } else if (response && response.userData) {
//       console.log("Données utilisateur récupérées :", response.userData);
//       localStorage.setItem("userData", JSON.stringify(response.userData));
//       localStorage.setItem("token", response.token);

//       // Mettre à jour la variable globale avec l'userId
//       userIdGlobal = response.userData.data.userId;
//       console.log("userId global défini :", userIdGlobal);

//       profil(response.userData, response.token);

//       chrome.storage.local.set(
//         { userData: response.userData, token: response.token },
//         () => {
//           if (chrome.runtime.lastError) {
//             console.error(
//               "Erreur lors de la sauvegarde des données :",
//               chrome.runtime.lastError
//             );
//           } else {
//             console.log("Données utilisateur sauvegardées avec succès.");
//           }
//         }
//       );
//     } else {
//       console.log("Pas de données utilisateur, fallback activé");
//       fallbackToLocalStorage();
//     }
//   });

//   function fallbackToLocalStorage() {
//     const storedUserData = localStorage.getItem("userData");
//     const storedToken = localStorage.getItem("token");

//     if (storedUserData && storedToken) {
//       const userData = JSON.parse(storedUserData);

//       // Mettre à jour la variable globale avec l'userId
//       userIdGlobal = userData.data.userId;
//       console.log("Fallback - userId global défini :", userIdGlobal);

//       profil(userData, storedToken);
//     } else {
//       console.log("Aucune donnée utilisateur trouvée en fallback.");
//     }
//   }

//   function profil(user) {
//     const container = document.getElementById("auth");
//     const createProfileList = document.getElementById("createProfileList");

//     if (!container || !createProfileList) {
//       console.error("Les éléments nécessaires n'ont pas été trouvés.");
//       return;
//     }

//     createProfileList.disabled = false;

//     container.innerHTML = `
//       <span>${user?.data.userId}</span>
//       <div id="profileDropdown" style="position: relative; display: inline-block;">
//         <img
//           id="profileImage"
//           src="${user?.data.picture}"
//           title="${user?.data.name}"
//           style="background-color: #9CA3AF; width: 25px; border-radius: 50%; align-items: center; cursor: pointer;"
//         />
//       </div>
//     `;
//     console.log("Profil injecté avec succès :", user?.data);
//   }
// });


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
  

  function handleSelectionChange() {
    const checkboxes = document.querySelectorAll(".dataCheckbox");
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );
    selectAllCheckbox.checked = allChecked;
    updateExportButtonState();
    saveToLocalStorage(); // Sauvegarder dans le localStorage
  }
  
  function handleSelectAll() {
    const isChecked = selectAllCheckbox.checked;
    const checkboxes = document.querySelectorAll(".dataCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    updateExportButtonState();
    saveToLocalStorage(); // Sauvegarder dans le localStorage
  }
  

  // Test of create list //

// // document.getElementById('toggle-create-list').addEventListener('click', () => {
// //   const section = document.getElementById('create-list-section');
// //   section.style.display = section.style.display === 'none' ? 'block' : 'none';
// // });

// document.getElementById('create-list-btn').addEventListener('click', async () => {
//   const listName = document.getElementById('list-name').value.trim();
//   if (!listName) {
//     alert('Veuillez entrer un nom pour la liste.');
//     return;
//   }

//   // Récupérer les données sélectionnées depuis localStorage
//   const selectedData = JSON.parse(localStorage.getItem('selectedData')) || [];
//   if (selectedData.length === 0) {
//     alert('Aucune donnée sélectionnée pour créer une liste.');
//     return;
//   }

//   try {
//     const response = await fetch('http://localhost:3000/lists', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name: listName, data: selectedData }),
//     });

//     if (response.ok) {
//       alert('Liste créée avec succès.');
//       // Vider les données sélectionnées
//       localStorage.removeItem('selectedData');
//     } else {
//       const error = await response.json();
//       alert(`Erreur : ${error.message}`);
//     }
//   } catch (err) {
//     console.error('Erreur lors de la création de la liste :', err);
//     alert('Une erreur est survenue. Veuillez réessayer.');
//   }
// });