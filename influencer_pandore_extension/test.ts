// if (response && response.userData) {
//     // Si des données utilisateur existent, mettez à jour l'interface
//     console.log(
//       "Données utilisateur récupérées dans popup.js:",
//       response.userData,
//       response.token
//     );

//     localStorage.setItem("userData", JSON.stringify(response.userData));
//     localStorage.setItem("token", response.token);

//     console.log(
//       "Données utilisateur stockées :",
//       response.userData,
//       response.token
//     );

//     // Récupérer les données depuis localStorage
//     setTimeout(() => {
//       const storedUserData = localStorage.getItem("userData");
//       const storedToken = localStorage.getItem("token");

//       if (storedUserData && storedToken) {
//         const userData = JSON.parse(storedUserData);
//         const token = storedToken;

//         console.log("Données utilisateur :", userData, token);

//         console.log("Données utilisateur récupérées :", userData, token);

//         // Mettre à jour l'interface utilisateur
//         profil(userData, token);
//         console.log("ok", userData, token)
//       } else {
//         console.log("Aucune donnée utilisateur trouvée.");
//       }
//     },1000);
//     // profil(response.userData, response.token);
//   }


// localStorage.setItem("userData", JSON.stringify(response.userData));
// localStorage.setItem("token", response.token);




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
  