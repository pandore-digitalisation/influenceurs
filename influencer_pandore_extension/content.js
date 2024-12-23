// Fonction pour détecter la plateforme actuelle
function detectPlatform() {
  const url = window.location.href;
  if (url.includes("x.com")) return "X";
  if (url.includes("instagram.com")) return "Instagram";
  if (url.includes("facebook.com")) return "Facebook";
  if (url.includes("linkedin.com")) return "LinkedIn";
  return null; // Autres sites non supportés
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

  if (platform === "Facebook") {
    // targetElement = document.body;
    const facebookXPath =
      "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[3]";
    targetElement = getElementByXPath(facebookXPath);
  } else if (platform === "Instagram") {
    const instagramXPath =
      "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[4]/div";
    targetElement = getElementByXPath(instagramXPath);
  } else if (platform === "X") {
    const xXPatch =
      "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]";
    targetElement = getElementByXPath(xXPatch);
  } else if (platform === "LinkedIn") {
    const linkedinXPatch =
      "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]";
    targetElement = getElementByXPath(linkedinXPatch);
  }

  if (!targetElement) return;

  // const scrapeBtn = document.getElementById("getData");
  //   console.log("scrape btn: ", scrapeBtn);

  // Éviter d'injecter plusieurs fois
  if (document.getElementById("getData")) return;

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
      : "#000";
  button.style.color = "#fff";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.marginTop = "10px";

  // if(platform === "Facebook") {
  //   button.style.position = "fixed";
  //   button.style.zIndex = "9999";
  //   button.style.bottom = "65px";
  //   button.style.right = "20px";

  // }

  // Ajouter les styles hover
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor =
      platform === "X"
        ? "#1a91da" // Couleur plus sombre pour X
        : platform === "Instagram"
        ? "#c82357" // Couleur plus sombre pour Instagram
        : platform === "Facebook"
        ? "#155cbd" // Couleur plus sombre pour Facebook
        : platform === "LinkedIn"
        ? "#005f8e" // Couleur plus sombre pour LinkedIn
        : "#333"; // Couleur plus sombre par défaut
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
        : "#000";
  });

  // Ajouter le bouton au bon endroit
  targetElement.appendChild(button);

  // Ajouter une action au clic
  button.addEventListener("click", () => {
    console.log(`Fetching ${platform} data...`);

    // Envoyer un message au background script pour qu'il utilise chrome.tabs
    chrome.runtime.sendMessage(
      { action: "fetchData", platform: platform },
      (response) => {
        console.log(response.message);
      }
    );

    // Modifier le texte du bouton pendant l'exécution
    button.textContent = "Getting...";
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scriptInjected") {
    alert(`Data for ${message.platform} getted successfully!`);
    window.location.reload();
  } else if (message.action === "scriptInjetedFailed") {
    alert("Data not ready to scrape, Please reload the page and trying again");
    window.location.reload();
  }
});

// Fonction pour observer les modifications du DOM
function observeDOM(platform) {
  const observer = new MutationObserver(() => {
    injectButton(platform);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Injecter initialement
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


// // Fonction pour détecter la plateforme actuelle
// function detectPlatform() {
//   const url = window.location.href;
//   if (url.includes("x.com")) return "X";
//   if (url.includes("instagram.com")) return "Instagram";
//   if (url.includes("facebook.com")) return "Facebook";
//   if (url.includes("linkedin.com")) return "LinkedIn";
//   return null; // Autres sites non supportés
// }

// // Fonction pour trouver un élément avec XPath
// function getElementByXPath(xpath) {
//   return document.evaluate(
//     xpath,
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null
//   ).singleNodeValue;
// }

// // Fonction pour injecter un bouton
// function injectButton(platform) {
//   let targetElement = null;

//   if (platform === "Facebook") {
//     // Utiliser un sélecteur CSS au lieu de XPath pour Facebook
//     const facebookSelector = "#mount_0_0_V0 > div > div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x78zum5.xdt5ytf.x1t2pt76 > div > div > div:nth-child(1) > div.x9f619.x1ja2u2z.x78zum5.x2lah0s.x1n2onr6.xl56j7k.x1qjc9v5.xozqiw3.x1q0g3np.x1l90r2v.x1ve1bff > div > div > div > div.x78zum5.x15sbx0n.x5oxk1f.x1jxijyj.xym1h4x.xuy2c7u.x1ltux0g.xc9uqle > div > div"; // Exemple de sélecteur stable
//     targetElement = document.querySelector(facebookSelector);
//   } else if (platform === "Instagram") {
//     const instagramXPath =
//       "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[4]/div";
//     targetElement = getElementByXPath(instagramXPath);
//   } else if (platform === "X") {
//     const xXPatch =
//       "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]";
//     targetElement = getElementByXPath(xXPatch);
//   } else if (platform === "LinkedIn") {
//     const linkedinXPatch =
//       "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]";
//     targetElement = getElementByXPath(linkedinXPatch);
//   }

//   if (!targetElement) return;

//   // Éviter d'injecter plusieurs fois
//   if (document.getElementById("getData")) return;

//   const button = document.createElement("button");
//   button.id = "getData";
//   button.textContent = `Get ${platform} Data`;
//   button.style.padding = "10px 15px";
//   button.style.backgroundColor =
//     platform === "X"
//       ? "#1da1f2"
//       : platform === "Instagram"
//       ? "#E1306C"
//       : platform === "Facebook"
//       ? "#1877F2"
//       : platform === "LinkedIn"
//       ? "#0077B5"
//       : "#000";
//   button.style.color = "#fff";
//   button.style.border = "none";
//   button.style.borderRadius = "5px";
//   button.style.cursor = "pointer";
//   button.style.marginTop = "10px";

//   // Ajouter les styles hover
//   button.addEventListener("mouseenter", () => {
//     button.style.backgroundColor =
//       platform === "X"
//         ? "#1a91da" // Couleur plus sombre pour X
//         : platform === "Instagram"
//         ? "#c82357" // Couleur plus sombre pour Instagram
//         : platform === "Facebook"
//         ? "#155cbd" // Couleur plus sombre pour Facebook
//         : platform === "LinkedIn"
//         ? "#005f8e" // Couleur plus sombre pour LinkedIn
//         : "#333"; // Couleur plus sombre par défaut
//   });

//   button.addEventListener("mouseleave", () => {
//     button.style.backgroundColor =
//       platform === "X"
//         ? "#1da1f2"
//         : platform === "Instagram"
//         ? "#E1306C"
//         : platform === "Facebook"
//         ? "#1877F2"
//         : platform === "LinkedIn"
//         ? "#0077B5"
//         : "#000";
//   });

//   // Ajouter le bouton au bon endroit
//   targetElement.appendChild(button);

//   // Ajouter une action au clic
//   button.addEventListener("click", () => {
//     console.log(`Fetching ${platform} data...`);

//     // Envoyer un message au background script pour qu'il utilise chrome.tabs
//     chrome.runtime.sendMessage(
//       { action: "fetchData", platform: platform },
//       (response) => {
//         console.log(response.message);
//       }
//     );

//     // Modifier le texte du bouton pendant l'exécution
//     button.textContent = "Getting...";
//   });
// }

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "scriptInjected") {
//     alert(`Data for ${message.platform} getted successfully!`);
//     window.location.reload();
//   } else if (message.action === "scriptInjetedFailed") {
//     alert("Data not ready to scrape, Please reload the page and trying again");
//     window.location.reload();
//   }
// });

// // Fonction pour observer les modifications du DOM
// function observeDOM(platform) {
//   const observer = new MutationObserver(() => {
//     injectButton(platform);
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });

//   // Injecter initialement
//   injectButton(platform);
// }

// // Exécution principale
// const platform = detectPlatform();
// if (platform) {
//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", () => observeDOM(platform));
//   } else {
//     observeDOM(platform);
//   }
// }



// // Fonction pour détecter la plateforme actuelle
// function detectPlatform() {
//     const url = window.location.href;
//     if (url.includes("x.com")) return "X";
//     if (url.includes("instagram.com")) return "Instagram";
//     if (url.includes("facebook.com")) return "Facebook";
//     if (url.includes("linkedin.com")) return "LinkedIn";
//     return null; // Autres sites non supportés
//   }

//   // Fonction pour injecter un bouton
//   function injectButton(platform) {
//     const existingButton = document.getElementById("scrapeBtn");
//     if (existingButton) return; // Éviter d'injecter plusieurs fois

//     const button = document.createElement("scrapeBtn");
//     button.id = "pandore-btn";
//     button.textContent = `Get ${platform} Data`;
//     button.style.position = "fixed";
//     button.style.bottom = "20px";
//     button.style.right = "20px";
//     button.style.padding = "10px 15px";
//     button.style.backgroundColor =
//       platform === "X"
//         ? "#1da1f2"
//         : platform === "Instagram"
//         ? "#E1306C"
//         : platform === "Facebook"
//         ? "#1877F2"
//         : platform === "LinkedIn"
//         ? "#0077B5"
//         : "#000";
//     button.style.color = "#fff";
//     button.style.border = "none";
//     button.style.borderRadius = "5px";
//     button.style.cursor = "pointer";
//     button.style.zIndex = "9999";

//     document.body.appendChild(button);

//     // Ajouter une action au clic
//     button.addEventListener("click", () => {
//       console.log(`Fetching ${platform} data...`);

//       // Collecter des données spécifiques à la plateforme
//       const pageData = {
//         platform,
//         title: document.title,
//         url: window.location.href,
//         timestamp: new Date().toISOString(),
//       };

//       // Envoyer les données au backend
//       fetch("http://127.0.0.1:5001/api/collect", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(pageData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Data sent successfully:", data);
//           alert("Data collected successfully!");
//         })
//         .catch((error) => {
//           console.error("Error sending data:", error);
//           alert("Failed to send data.");
//         });
//     });
//   }

//   // Exécution principale
//   const platform = detectPlatform();
//   if (platform) {
//     if (document.readyState === "loading") {
//       document.addEventListener("DOMContentLoaded", () => injectButton(platform));
//     } else {
//       injectButton(platform);
//     }
//   }
