(async () => {
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

  // const BASE_URL = "https://influenceurs.onrender.com";
  const BASE_URL = "http://localhost:3000";


  // Define the XPaths
  const nameXPath =
    "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/div[1]/div/div/h1";
  const descriptionXPath =
    "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/div[3]/h2";
  const followersXPath =
    "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/div[3]/h3/div[2]/strong";
  const followingXpath =
    "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/div[3]/h3/div[1]/strong";
  const likesXpath =
    "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/div[3]/h3/div[3]/strong";
  const profileImageXPath =
    "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[1]/span/img";

  // Extract data
  const nameElements = evaluateXPath(nameXPath);
  const descriptionElements = evaluateXPath(descriptionXPath);
  const followersElements = evaluateXPath(followersXPath);
  const followingElements = evaluateXPath(followingXpath);
  const likesElements = evaluateXPath(likesXpath);
  const profileImageElements = evaluateXPath(profileImageXPath);

  const name =
    nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
  const description =
    descriptionElements.length > 0
      ? descriptionElements[0].textContent.trim()
      : "None";
  const followers =
    followersElements.length > 0
      ? followersElements[0].textContent.trim()
      : "0";
  const following =
    followingElements.length > 0
      ? followingElements[0].textContent.trim()
      : "0";
  const likes =
    likesElements.length > 0
      ? likesElements[0].textContent.trim()
      : "0";
  const profileImage =
    profileImageElements.length > 0 ? profileImageElements[0].src : " ";

    // Fonction asynchrone pour récupérer les données utilisateur depuis le chrome storage
    async function getUserData() {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get("userData", (result) => {
          if (chrome.runtime.lastError) {
            reject(
              new Error(
                "Erreur lors de la récupération des données : " +
                  chrome.runtime.lastError
              )
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
    console.log("userData", userData);
  } catch (error) {
    console.error(error);
  }

  console.log("user data 2", userData);
  // If user data is not found, handle accordingly (e.g., not sending userId)
  if (!userData || !userData.data.userId) {
    console.error(
      "Utilisateur non connecté ou données utilisateur manquantes."
    );
  }

  const userId = userData.data.userId;

  // Get the profile URL
  const profileUrl = window.location.href;

  const extractedData = {
    userId,
    name,
    description,
    likes,
    followers,
    following,
    plateform: "TikTok",
    profileImage,
    profileUrl,
  };

  console.log("Extracted Data:", extractedData);

  // // Combine new data with previously stored data, replacing existing entries if the name matches
  // let storedData = [];
  // if (localStorage.getItem("exportedData")) {
  //   storedData = JSON.parse(localStorage.getItem("exportedData"));
  // }

  // const existingIndex = storedData.findIndex(
  //   (entry) => entry.name === extractedData.name
  // );

  // if (existingIndex > -1) {
  //   // Replace existing entry if the name matches
  //   storedData[existingIndex] = extractedData;
  // } else {
  //   // Add new entry if no match is found
  //   storedData.push(extractedData);
  // }

  // localStorage.setItem("exportedData", JSON.stringify(storedData));

  // Send data to the backend
  async function sendToBackend(data) {
    try {
      const response = await fetch(`${BASE_URL}/tiktok`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        userId: extractedData.userId,
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

  //Post the data to the backend
  const success = await sendToBackend(extractedData);
  console.log("success", success);
  // Communiquez l'état au popup.js
  chrome.runtime.sendMessage({ success });
})();
