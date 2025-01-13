(async () => {
    console.log("Running script for X...");
  
    // Helper function to evaluate an XPath expression and return nodes
    function evaluateXPath(xpath, context = document) {
      const iterator = document.evaluate(
        xpath,
        context,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      const nodes = [];
      for (let i = 0; i < iterator.snapshotLength; i++) {
        nodes.push(iterator.snapshotItem(i));
      }
  
      return nodes;
    }
  
    const BASE_URL = "http://localhost:3000";
  
    // Define the XPaths
    const nameXPath = "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[2]/div/div/div/div[1]/div/div/span/span[1]";
    const descriptionXPath = "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]";
    const followersXPath = "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[2]/a/span[1]/span";
    const followingXpath = "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[1]/a/span[1]/span";
    const profileImageXPath = "/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/div/div/div/div[1]/div[1]/div[2]/div/div[2]/div/a";
  
    // Extract data
    const nameElements = evaluateXPath(nameXPath);
    const descriptionElements = evaluateXPath(descriptionXPath);
    const followersElements = evaluateXPath(followersXPath);
    const followingElements = evaluateXPath(followingXpath);
    const profileImageElements = evaluateXPath(profileImageXPath);
  
    const name = nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
    const description = descriptionElements.length > 0 ? descriptionElements[0].textContent.trim() : "Données incomplètes ou manquantes";
    const followers = followersElements.length > 0 ? followersElements[0].textContent.trim() : "0";
    const following = followingElements.length > 0 ? followingElements[0].textContent.trim() : "0";
    const profileImage = profileImageElements.length > 0 ? profileImageElements[0].getAttribute("href") || profileImageElements[0].getAttribute("src") : " ";
  
    // Get data before sending to backend
    if (!name || !followers || !following) {
      console.error("Données incomplètes ou manquantes. Requête annulée.");
      return;
    }
  
    // Fonction asynchrone pour récupérer les données utilisateur depuis le chrome storage
    async function getUserData() {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get("userData", (result) => {
          if (chrome.runtime.lastError) {
            reject(
              new Error("Erreur lors de la récupération des données : " + chrome.runtime.lastError)
            );
          } else {
            resolve(result.userData);
          }
        });
      });
    }
  
    // Get user data and add it to the extracted data
    let userData = null;
    try {
      userData = await getUserData();
      console.log("userData", userData)
    } catch (error) {
      console.error(error);
    }
  
    console.log("user data 2", userData)
    // If user data is not found, handle accordingly (e.g., not sending userId)
    if (!userData || !userData.data.userId) {
      console.error("Utilisateur non connecté ou données utilisateur manquantes.");
    }
  
    // Get the profile URL
    const profileUrl = window.location.href;
    const base = "https://x.com";
  
    // Prepare the extracted data and add userId
    const extractedData = {
      name,
      description,
      followers,
      following,
      plateform: "X",
      profileImage: `${base}${profileImage}`,
      profileUrl,
      userId: userData.data.userId // Add userId to the data
    };
  
    console.log("Extracted Data:", extractedData);
  
    // Send data to the backend
    async function sendToBackend(data) {
      try {
        const response = await fetch(`${BASE_URL}/x`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log("Data successfully sent to the backend.");
          return true;
        } else {
          console.error("Error sending data to the backend.");
          return false;
        }
      } catch (error) {
        console.error("Network error:", error);
        return false;
      }
    }
  
    // Post the data to the backend
    const success = await sendToBackend(extractedData);
    console.log("success", success);
  
    // Communicate the status to popup.js
    chrome.runtime.sendMessage({ success });
  })();
  