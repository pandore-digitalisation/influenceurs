let latestUserData = null;
let logoutTimer = null;
let token = null;

// Intervalle pour vérifier la validité de la session toutes les 30 secondes
setInterval(() => {
  const storedToken = localStorage.getItem("auth_token");
  if (storedToken) {
    console.log("Vérification périodique : utilisateur toujours connecté.");
    // Re-fetch les données utilisateur si nécessaire
    chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
      if (response && response.userData) {
        console.log(
          "Données utilisateur récupérées périodiquement :",
          response.userData,
          response.token
        );
        latestUserData = response.userData;
        token = response.token;
      }
    });
  }
}, 30000); // Toutes les 30 secondes

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message reçu :", message);

  // Action pour récupérer les données utilisateur
  if (message.action === "sendDataToPopup") {
    latestUserData = message.data;
    token = message.token;
    console.log("Données utilisateur mises à jour :", latestUserData, token);
    sendResponse({ success: true });
  }

  if (message.action === "getUserData") {
    console.log("Demande de données utilisateur reçue.");
    // setTimeout(() => {
    //   sendResponse({ userData: latestUserData, token: token });
    // }, 2000);
    // return true;
    sendResponse({ userData: latestUserData, token: token });
    return true;
  }

  // Action pour déconnecter l'utilisateur
  if (message.action === "logoutUser") {
    console.log("Déconnexion de l'utilisateur.");
    latestUserData = null;
    token = null;
    sendResponse({ success: true });
  }

  // Traitement de l'injection des scripts en fonction de la plateforme
  if (message.action === "fetchData") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let pageScriptFile;

      // Déterminer quel script injecter en fonction de la plateforme
      if (message.platform === "Facebook") {
        pageScriptFile = "scripts/content_facebook.js";
      } else if (message.platform === "Instagram") {
        pageScriptFile = "scripts/content_instagram.js";
      } else if (message.platform === "X") {
        pageScriptFile = "scripts/content_x.js";
      } else if (message.platform === "LinkedIn") {
        pageScriptFile = "scripts/content_linkedin.js";
      } else if (message.platform === "TikTok") {
        pageScriptFile = "scripts/content_tiktok.js";
      }

      // Injecter le script correspondant
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: [pageScriptFile],
        },
        () => {
          // Vérifier les erreurs potentielles
          if (chrome.runtime.lastError) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "scriptInjectionFailed",
            });
            console.error(chrome.runtime.lastError.message);
            sendResponse({ message: "Script injection failed" });
          } else {
            // Envoyer une alerte au contenu
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "scriptInjected",
              platform: message.platform,
            });
            sendResponse({ message: "Script injected successfully" });
            console.log("success");
          }
        }
      );
    });
    return true;
  }
});

// let latestUserData = null;
// let logoutTimer = null;
// let token = null;

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "fetchData") {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       let pageScriptFile;

//       // Déterminer quel script injecter en fonction de la plateforme
//       if (message.platform === "Facebook") {
//         pageScriptFile = "scripts/content_facebook.js";
//       } else if (message.platform === "Instagram") {
//         pageScriptFile = "scripts/content_instagram.js";
//       } else if (message.platform === "X") {
//         pageScriptFile = "scripts/content_x.js";
//       } else if (message.platform === "LinkedIn") {
//         pageScriptFile = "scripts/content_linkedin.js";
//       } else if (message.platform === "TikTok") {
//         pageScriptFile = "scripts/content_tiktok.js";
//       }

//       // Injecter le script correspondant
//       chrome.scripting.executeScript(
//         {
//           target: { tabId: tabs[0].id },
//           files: [pageScriptFile],
//         },
//         () => {
//           // Vérifier les erreurs potentielles
//           if (chrome.runtime.lastError) {
//             chrome.tabs.sendMessage(tabs[0].id, {
//               action: "scriptInjetedFailed",
//             });
//             console.error(chrome.runtime.lastError.message);
//             sendResponse({ message: "Script injection failed" });
//           } else {
//             // Envoyer une alerte au contenu
//             chrome.tabs.sendMessage(tabs[0].id, {
//               action: "scriptInjected",
//               platform: message.platform,
//             });
//             sendResponse({ message: "Script injected successfully" });
//             console.log("success");
//           }
//         }
//       );
//     });
//     return true;
//   }

//   // Get connected user data from content.js
//   console.log("Message reçu :", message);

//   if (message.action === "sendDataToPopup") {
//     latestUserData = message.data;
//     token = message.token;
//     console.log("Données utilisateur mises à jour :", latestUserData, token);
//     sendResponse({ success: true });
//   }

//   if (message.action === "getUserData") {
//     console.log("Demande de données utilisateur reçue.");
//     sendResponse({ userData: latestUserData, token: token });
//     return true;
//   }

//   if (message.action === "logoutUser") {
//     console.log("Déconnexion de l'utilisateur.");
//     latestUserData = null;
//     sendResponse({ success: true });
//   }

//   setInterval(() => {
//     const token = localStorage.getItem("auth_token");
//     if (token) {
//       // Re-fetch les données utilisateur si nécessaire
//       console.log("Vérification périodique : utilisateur toujours connecté.");
//       sendResponse({ userData: latestUserData, token: token });
//     }
//   }, 30000); // Toutes les 30 secondes
// });
