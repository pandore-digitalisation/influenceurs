let latestUserData = null;
let logoutTimer = null;
let token = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message reçu :", message);

  // Action pour récupérer les données utilisateur
  if (message.action === "sendDataToPopup") {
    latestUserData = message.data;
    token = message.token;
    console.log("Données utilisateur mises à jour :", latestUserData, token);
    sendResponse({ success: true });
    return;  // Assurer qu'on ne fait pas d'autres réponses
  }

  // Action pour récupérer les données utilisateur
  if (message.action === "getUserData") {
    console.log("Demande de données utilisateur reçue.");
    // Renvoie les données utilisateur
    sendResponse({ userData: latestUserData, token: token });
    return true;  // Indiquer que la réponse est envoyée de manière asynchrone
  }

  // Action pour déconnecter l'utilisateur
  if (message.action === "logoutUser") {
    console.log("Déconnexion de l'utilisateur.");
    latestUserData = null;
    token = null;
    sendResponse({ success: true });
    return;
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