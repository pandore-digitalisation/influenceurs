let latestUserData;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
              action: "scriptInjetedFailed",
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

  if (message.action === "sendDataToPopup") {
    latestUserData = message.data; // Stocker les données reçues
    console.log("Données reçues dans background.js :", latestUserData);
    sendResponse({ success: true });
  }

  // Écouter l'ouverture du popup
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "popup") {
      console.log("Connexion au popup établie");

      // Envoyer les données stockées au popup
      if (latestUserData) {
        port.postMessage({ action: "updateUserData", data: latestUserData });
      }

      // Écouter les messages depuis le popup (si nécessaire)
      port.onMessage.addListener((message) => {
        console.log("Message reçu depuis le popup :", message);
      });
    }
  });

  if (message.action === "getUserData") {
    // Renvoyer les données utilisateur au popup
    sendResponse({ userData: latestUserData });
  }

  if (message.action === "logoutUser") {
    latestUserData = null; // Réinitialiser les données utilisateur
    sendResponse({ success: true });
  }

  // Important : Retourner `true` pour garder la promesse ouverte si nécessaire
  return true;
});
