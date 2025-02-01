let latestUserData = null;
let token = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log("Message reçu :", message);

  if (message.action === "getUserData") {
    chrome.storage.local.get(["userData", "token"], (result) => {
      sendResponse({ userData: result.userData || null, token: result.token || null });
    });
    return true;
  }

  if (message.action === "sendDataToPopup") {
    latestUserData = message.data;
    token = message.token;
    chrome.storage.local.set({ userData: latestUserData, token: token }, () => {
      console.log("Données utilisateur mises à jour :", latestUserData, token);
    });
    sendResponse({ success: true });
    return true;
  }

  if (message.action === "logoutUser") {
    console.log("Déconnexion de l'utilisateur demandée.");
    latestUserData = null;
    token = null;
    chrome.storage.local.clear(() => {
      console.log("Utilisateur déconnecté.");
    });
    sendResponse({ success: true });
    return true;
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(["userData", "token"], (result) => {
    latestUserData = result.userData || null;
    token = result.token || null;
    console.log("Données utilisateur rechargées :", latestUserData, token);
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "toggle-sidebar" });
});


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "userLoggedIn") {
//     console.log("Token reçu :", message.token);

//     chrome.storage.local.set({ token: message.token }, () => {
//       console.log("Token enregistré dans chrome.storage");
//     });

//     sendResponse({ status: "OK" });
//   }
// });
