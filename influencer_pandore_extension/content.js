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
  } else if (platform === "TikTok") {
    const tiktokXPatch =
      "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/div[3]/h2";
    targetElement = getElementByXPath(tiktokXPatch);
  }

  // if (!targetElement) {
  //   console.error(`Target element not found for ${platform}`);
  // } else {
  //   console.log(`Target element found for ${platform}:`, targetElement);
  // }

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
        ? "#005f8e"
        : platform === "TikTok"
        ? "#EA284E" // Couleur plus sombre pour LinkedIn
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
        : platform === "TikTok"
        ? "#FE2C55"
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

window.addEventListener("message", function (event) {
  if (event.origin !== window.location.origin) {
    return;
  }

  if (event.data && event.data.action === "sendData") {
    console.log("Données reçues dans l'extension:", event.data.data);

    chrome.runtime.sendMessage({
      action: "sendDataToPopup",
      data: event.data.data,
    });
  }

});
