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
// function injectButton(platform) {
//   let targetElement = null;

//   try {
//     if (platform === "Facebook") {
//       const facebookXPath =
//         "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]";
//       targetElement = getElementByXPath(facebookXPath);
//     } else if (platform === "Instagram") {
//       const instagramXPath =
//         "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[4]/div";
//       targetElement = getElementByXPath(instagramXPath);
//     } else if (platform === "X") {
//       const xXPath =
//         "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]";
//       targetElement = getElementByXPath(xXPath);
//     } else if (platform === "LinkedIn") {
//       const linkedinXPath =
//         "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]";
//       targetElement = getElementByXPath(linkedinXPath);
//     } else if (platform === "TikTok") {
//       const tiktokXPath =
//         "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/div[3]/h2";
//       targetElement = getElementByXPath(tiktokXPath);
//     }

//     // Si l'élément cible existe, on ajoute le bouton
//     if (targetElement && !document.getElementById("getData")) {
//       const button = document.createElement("button");
//       button.id = "getData";
//       button.textContent = `Get ${platform} Data`;
//       button.style.padding = "10px 15px";
//       button.style.backgroundColor =
//         platform === "X"
//           ? "#1da1f2"
//           : platform === "Instagram"
//           ? "#E1306C"
//           : platform === "Facebook"
//           ? "#1877F2"
//           : platform === "LinkedIn"
//           ? "#0077B5"
//           : platform === "TikTok"
//           ? "#FE2C55"
//           : "#000";
//       button.style.width = platform === "TikTok" ? "150px" : "";
//       button.style.display = "block";
//       button.style.color = "#fff";
//       button.style.border = "none";
//       button.style.borderRadius = "5px";
//       button.style.cursor = "pointer";
//       button.style.marginTop = "10px";

//       button.addEventListener("mouseenter", () => {
//         button.style.backgroundColor =
//           platform === "X"
//             ? "#1a91da"
//             : platform === "Instagram"
//             ? "#c82357"
//             : platform === "Facebook"
//             ? "#155cbd"
//             : platform === "LinkedIn"
//             ? "#005f8e"
//             : platform === "TikTok"
//             ? "#EA284E"
//             : "#333";
//       });

//       button.addEventListener("mouseleave", () => {
//         button.style.backgroundColor =
//           platform === "X"
//             ? "#1da1f2"
//             : platform === "Instagram"
//             ? "#E1306C"
//             : platform === "Facebook"
//             ? "#1877F2"
//             : platform === "LinkedIn"
//             ? "#0077B5"
//             : platform === "TikTok"
//             ? "#FE2C55"
//             : "#000";
//       });

//       button.addEventListener("click", () => {
//         console.log(`Fetching ${platform} data...`);
//         button.textContent = "Getting...";
//         chrome.runtime.sendMessage(
//           { action: "fetchData", platform: platform },
//           (response) => {
//             if (response && response.message) {
//               console.log(response.message);
//               button.textContent = `Get ${platform} Data`;
//             } else {
//               console.log("No response received or message is undefined.");
//               button.textContent = "Retry";
//             }
//           }
//         );
//       });

//       targetElement.appendChild(button);
//     }
//   } catch (error) {
//     console.error(`Error injecting button for ${platform}: `, error);
//   }
// }

// Écoute les messages envoyés par le bacground.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scriptInjected") {
    alert(`Data for ${message.platform} fetched successfully!`);
    window.location.reload();
  } else if (message.action === "scriptInjetedFailed") {
    alert("Data not ready to scrape, please reload the page and try again.");
    setTimeout(() => window.location.reload(), 3000);
  } else {
    // console.log("Timeout reached, please reload the page and try again.");
    // alert("Timeout reached, please reload the page and try again.");
    // window.location.reload();
  }
});

// Observer les changements dans le DOM pour injecter le bouton après mutation
// function observeDOM(platform) {
//   const observer = new MutationObserver(() => {
//     injectButton(platform);
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });

//   // Injecte initialement
//   injectButton(platform);
// }

// Exécution principale
// const platform = detectPlatform();
// if (platform) {
//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", () => observeDOM(platform));
//   } else {
//     observeDOM(platform);
//   }
// }

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

// Styles réutilisables
const buttonStyles = {
  position: "fixed",
  top: "9%",
  right: "0",
  zIndex: "100000000000",
  padding: "10px 8px",
  backgroundImage: "linear-gradient(to bottom, #E98A0D, #F4B731)",
  color: "#fff",
  border: "none",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background 0.3s ease, opacity 0.3s ease",
};

const sidebarStyles = {
  borderTopLeftRadius: "15px",
  position: "fixed",
  top: "0",
  right: "-460px", // Cachée initialement
  width: "460px",
  height: "100%",
  backgroundColor: "#fff",
  zIndex: "1000000000001",
  border: "none",
  transition: "right 1s ease",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
};

// Styles du bouton de fermeture
const closeButtonStyles = {
  position: "fixed",
  top: "9%",
  right: "0",
  zIndex: "100000000000",
  padding: "10px 8px",
  backgroundImage: "linear-gradient(to bottom, #E98A0D, #F4B731)",
  color: "#fff",
  border: "none",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  transition: "background 0.3s ease, opacity 0.3s ease",
};

// Fonction pour créer le bouton de la sidebar
function createSidebarButton() {
  const button = document.createElement("button");
  button.id = "sidebar-toggle-btn";
  button.textContent = "AQ";
  Object.assign(button.style, buttonStyles);
  document.body.appendChild(button);
  return button;
}

// Fonction pour créer la sidebar (iframe)
function createSidebar() {
  const sidebar = document.createElement("iframe");
  sidebar.src = chrome.runtime.getURL("sidebar/sidebar.html");
  sidebar.id = "extension-sidebar";
  Object.assign(sidebar.style, sidebarStyles);

  // Créer le bouton de fermeture et l'ajouter à la sidebar
  const closeButton = document.createElement("button");
  closeButton.textContent = "CLOSE";
  closeButton.id = "sidebar-close-button";
  Object.assign(closeButton.style, closeButtonStyles);

  // Ajouter le bouton de fermeture à la sidebar
  sidebar.appendChild(closeButton);

  // Gestion de la fermeture de la sidebar
  closeButton.addEventListener("click", () => closeSidebar(sidebar));

  document.body.appendChild(sidebar);
  return sidebar;
}

// Fonction pour gérer l'ouverture de la sidebar
function openSidebar(sidebar) {
  sidebar.style.right = "0"; // Slide-in
}

// Fonction pour gérer la fermeture de la sidebar
function closeSidebar(sidebar) {
  sidebar.style.right = "-470px"; // Slide-out
}

// Gestion des événements hover pour le bouton
function handleButtonHover(button) {
  button.addEventListener("mouseover", () => {
    button.style.opacity = "0.98";
  });

  button.addEventListener("mouseout", () => {
    button.style.opacity = "1";
  });
}

// Fonction pour écouter les messages du côté du parent et du background
function listenForMessages(sidebar) {
  // Écouter les messages envoyés par la sidebar pour le fermer
  window.addEventListener("message", (event) => {
    if (event.data === "close-sidebar") {
      closeSidebar(sidebar);
    }

    if (event.data.action === "userLoggedIn") {
      const { token, userData } = event.data;
      localStorage.setItem("auth_token", token);

      if (token) {
        chrome.storage.sync.set(
          { auth_token: token, userData: userData },
          () => {
            console.log("Token sauvegardé dans l'extension.", token);
          }
        );
      }
    }

    if (event.data.action === "logoutUser") {
      chrome.storage.sync.remove("auth_token");
      localStorage.removeItem("auth_token");
    }
  });

  // Toggle sidebar avec le background script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggle-sidebar") {
      if (sidebar.style.right === "0px") {
        closeSidebar(sidebar); // Ferme la sidebar
      } else {
        openSidebar(sidebar); // Ouvre la sidebar
      }
    }
  });
}

// Initialisation
function initSidebar() {
  const button = createSidebarButton();
  const sidebar = createSidebar();

  // Ajouter les événements
  button.addEventListener("click", () => openSidebar(sidebar));
  handleButtonHover(button);
  listenForMessages(sidebar);
}

// Lancer l'initialisation de la sidebar
initSidebar();
