// // Recevoir les données utilisateur à chaque ouverture du popup
// document.addEventListener("DOMContentLoaded", () => {
//     chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
//       if (response && response.userData) {
//         console.log("Données utilisateur récupérées :", response.userData);
//         profil(response.userData);
//         document.getElementById("loginBtn").style.display = "none"; // Masquer le bouton de login
//       } else {
//         console.log("Utilisateur non connecté.");
//         loginButton();
//       }
//     });
//   });
  
//   // Fonction de profil
//   function profil(user) {
//     const container = document.getElementById("auth");
//     container.innerHTML = `
//       <div">
//         <a href="http://localhost:3001/dashboard">
//           <img src="${user?.data.picture}" title="${user?.data.name}" style="background-color:#9CA3AF; width:25px; border-radius:50%;" />
//         </a>
//       </div>`;
//   }
  
//   // Fonction pour afficher le bouton de connexion
//   function loginButton() {
//     document.getElementById("loginBtn").style.display = "block"; // Afficher le bouton de login
//   }
  