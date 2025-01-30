// Fonction pour détecter la plateforme actuelle
function detectPlatform() {
  const url = window.location.href;
  if (url.includes("x.com")) return "X";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("facebook.com")) return "Facebook";
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("tiktok.com")) return "TikTok";
  return null;
}

// Fonction pour trouver un élément avec XPath
function getElementByXPath(xpath) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

// Fonction pour injecter un bouton
function injectButton(platform) {
  let targetElement = null;

  try {
    if (platform === "Facebook") {
      const facebookXPath =
        "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]";
      targetElement = getElementByXPath(facebookXPath);
    } else if (platform === "Instagram") {
      const instagramXPath =
        "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[4]/div";
      targetElement = getElementByXPath(instagramXPath);
    } else if (platform === "X") {
      const xXPath =
        "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]";
      targetElement = getElementByXPath(xXPath);
    } else if (platform === "LinkedIn") {
      const linkedinXPath =
        "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]";
      targetElement = getElementByXPath(linkedinXPath);
    } else if (platform === "TikTok") {
      const tiktokXPath =
        "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/div[3]/h2";
      targetElement = getElementByXPath(tiktokXPath);
    }

    // Si l'élément cible existe, on ajoute le bouton
    if (targetElement && !document.getElementById("getData")) {
      const button = document.createElement("button");
      button.id = "getData";
      button.textContent = `Get ${platform} Data`;
      button.style.padding = "10px 15px";
      button.style.backgroundColor =
        platform === "X"
          ? "#1da1f2"
          : platform === "Instagram"
          ? "#E1306C"
          : platform === "Facebook"
          ? "#1877F2"
          : platform === "LinkedIn"
          ? "#0077B5"
          : platform === "TikTok"
          ? "#FE2C55"
          : "#000";
      button.style.width = platform === "TikTok" ? "150px" : "";
      button.style.display = "block";
      button.style.color = "#fff";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.style.marginTop = "10px";

      button.addEventListener("mouseenter", () => {
        button.style.backgroundColor =
          platform === "X"
            ? "#1a91da"
            : platform === "Instagram"
            ? "#c82357"
            : platform === "Facebook"
            ? "#155cbd"
            : platform === "LinkedIn"
            ? "#005f8e"
            : platform === "TikTok"
            ? "#EA284E"
            : "#333";
      });

      button.addEventListener("mouseleave", () => {
        button.style.backgroundColor =
          platform === "X"
            ? "#1da1f2"
            : platform === "Instagram"
            ? "#E1306C"
            : platform === "Facebook"
            ? "#1877F2"
            : platform === "LinkedIn"
            ? "#0077B5"
            : platform === "TikTok"
            ? "#FE2C55"
            : "#000";
      });

      button.addEventListener("click", () => {
        console.log(`Fetching ${platform} data...`);
        chrome.runtime.sendMessage(
          { action: "fetchData", platform: platform },
          (response) => {
            console.log(response.message);
          }
        );
        button.textContent = "Getting...";
      });

      targetElement.appendChild(button);
    }
  } catch (error) {
    console.error(`Error injecting button for ${platform}: `, error);
  }
}

// Écoute les messages envoyés par l'extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scriptInjected") {
    alert(`Data for ${message.platform} fetched successfully!`);
    window.location.reload();
  } else if (message.action === "scriptInjetedFailed") {
    alert("Data not ready to scrape, please reload the page and try again.");
    setTimeout(() => window.location.reload(), 3000);
  } else {
    console.log("Timeout reached, please reload the page and try again.");
    // alert("Timeout reached, please reload the page and try again.");
    // window.location.reload();
  }
});

// Observer les changements dans le DOM pour injecter le bouton après mutation
function observeDOM(platform) {
  const observer = new MutationObserver(() => {
    injectButton(platform);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Injecte initialement
  injectButton(platform);
}

// Exécution principale
const platform = detectPlatform();
if (platform) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => observeDOM(platform));
  } else {
    observeDOM(platform);
  }
}

// Envoie des données utilisateur à background.js
window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;

  if (event.data && event.data.action === "sendData") {
    console.log(
      "Données reçues dans l'extension:",
      event.data.data,
      event.data.token
    );
    chrome.runtime.sendMessage({
      action: "sendDataToPopup",
      data: event.data.data,
      token: event.data.token,
    });
  }

  if (event.data && event.data.action === "logoutUser") {
    console.log("Déconnexion de l'utilisateur dans l'extension");
    chrome.runtime.sendMessage({ action: "logoutUser" });
  }
});

// ---------------  SIDE BAR ---------------//

// Création et style du bouton pour ouvrir la sidebar
const button = document.createElement("button");
button.id = "sidebar-toggle-btn";
button.textContent = "AQ";
button.style.position = "fixed";
button.style.top = "9%"; // Ajusté pour un positionnement adaptatif
button.style.right = "0";
button.style.zIndex = "3047483647";
button.style.padding = "10px 8px";
button.style.backgroundImage = "linear-gradient(to bottom, #E98A0D, #F4B731)";
button.style.color = "#fff";
button.style.border = "none";
button.style.borderTopLeftRadius = "8px";
button.style.borderBottomLeftRadius = "8px";
button.style.cursor = "pointer";
button.style.fontSize = "14px";
button.style.transition = "background 0.3s ease, opacity 0.3s ease"

// Ajout du bouton au DOM
document.body.appendChild(button);

// Injecter le sidebar dans la page
const sidebar = document.createElement("iframe");
sidebar.src = chrome.runtime.getURL("sidebar/sidebar.html");
sidebar.id = "extension-sidebar";
sidebar.style.borderTopLeftRadius = "15px";
sidebar.style.position = "fixed";
sidebar.style.top = "0";
sidebar.style.right = "-460px"; // Cachée initialement
sidebar.style.width = "460px";
sidebar.style.height = "100vh";
sidebar.style.backgroundColor = "#fff";
sidebar.style.zIndex = "3147483647";
sidebar.style.border = "none";
sidebar.style.transition = "right 1s ease";
sidebar.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";

// Ajout de la sidebar au DOM
document.body.appendChild(sidebar);

// Fonction pour ouvrir la sidebar
button.addEventListener("click", () => {
  sidebar.style.right = "0"; // Slide-in
});

// Gestionnaire d'événements hover pour le bouton open sidebar
button.addEventListener("mouseover", () => {
  button.style.opacity = "0.98";
});

button.addEventListener("mouseout", () => {
  button.style.opacity = "1"
});

// Écouter les messages envoyés par le sidebar pour le fermer
window.addEventListener("message", (event) => {
  if (event.data === "close-sidebar") {
    sidebar.style.right = "-470px"; // Slide-out
  }
});

//Écoute les messages du background script pour fermer ou ouvrir le sidebar via le click sur l'icon de l'extension
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggle-sidebar") {
    if (sidebar.style.right === "0px") {
      sidebar.style.right = "-460px"; // Ferme la sidebar
    } else {
      sidebar.style.right = "0px"; // Ouvre la sidebar
    }
  }
});

// Message de connexion
window.addEventListener("message", (event) => {
  // Vérifier que le message provient du bon domaine
  if (event.origin !== window.location.origin) return;

  if (event.data.action === "userLoggedIn") {
    const { token } = event.data;
    localStorage.setItem("auth_token", token);

    if (token) {
      // Sauvegarder le token dans chrome.storage.sync
      chrome.storage.sync.set({ auth_token: token }, () => {
        console.log("Token sauvegardé dans l'extension.", token);
      });
    }
  }
});

// Message de deconnexion
window.addEventListener("message", (event) => {
  // Vérifier que le message provient du bon domaine
  if (event.origin !== window.location.origin) return;

  if (event.data.action === "logoutUser") {
    chrome.storage.sync.remove("auth_token")
    localStorage.removeItem("auth_token");
  }
});
