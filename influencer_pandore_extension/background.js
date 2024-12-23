// Ajout d'un écouteur pour les messages venant du content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchData') {
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
              action: "scriptInjetedFailed"
            })
            console.error(chrome.runtime.lastError.message);
            sendResponse({ message: "Script injection failed" });
          } else {
            // Envoyer une alerte au contenu
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "scriptInjected",
              platform: message.platform,
            });
            sendResponse({ message: "Script injected successfully" });
            console.log("success")
          }
        }
      );
    });
    return true; // Indique que la réponse sera envoyée de manière asynchrone
  }
});


// // Ajout d'un écouteur pour les messages venant du content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'fetchData') {
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
//       }

//       // Injecter le script correspondant
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         files: [pageScriptFile],
//       });
//       sendResponse({ message: `Script injected successfully` });
//     });
//     return true;  // Indique que la réponse sera envoyée de manière asynchrone
//   }
// });