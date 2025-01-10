// chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
//   if (chrome.runtime.lastError) {
//     console.error("Erreur lors de la récupération des données utilisateur:", chrome.runtime.lastError.message);
//     fallbackToLocalStorage();
//   } else if (response && response.userData) {
//     console.log("Données utilisateur reçues:", response.userData);
//     localStorage.setItem("userData", JSON.stringify(response.userData));
//     localStorage.setItem("token", response.token);
//     profil(response.userData, response.token);
//   } else {
//     console.log("Pas de données utilisateur, fallback.");
//     fallbackToLocalStorage();
//   }
// });
