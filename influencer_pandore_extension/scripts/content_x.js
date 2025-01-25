(async () => {
  console.log("Running script for X...");
  // const BASE_URL = "https://influenceur-list.onrender.com";
  const BASE_URL = "http://localhost:3000";

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

  async function waitForElement(xpath, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const interval = 100;
      let elapsed = 0;

      const check = () => {
        const elements = evaluateXPath(xpath);
        if (elements.length > 0) {
          resolve(elements);
        } else if (elapsed >= timeout) {
          console.log(
            "Timeout reached. Data not fully loaded. please reload the page and trying"
          );
          reject(new Error("Timeout waiting for element"));
          const failed =
            "Timeout reached. Data not fully loaded. please reload the page and trying again";
          chrome.runtime.sendMessage({ failed });
        } else {
          elapsed += interval;
          setTimeout(check, interval);
        }
      };

      check();
    });
  }

  // Define the XPaths
  const nameXPath =
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[2]/div/div/div/div[1]/div/div/span/span[1]";
  const descriptionXPath =
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]";
  const followersXPath =
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[2]/a/span[1]/span";
  const followingXpath =
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[1]/a/span[1]/span";
  const profileImageXPath =
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/div/div/div/div[1]/div[1]/div[2]/div/div[2]/div/a";

  // Attendre que les éléments soient disponibles
  await waitForElement(nameXPath);
  await waitForElement(followersXPath);
  await waitForElement(followingXpath);

  // Extract data
  const nameElements = evaluateXPath(nameXPath);
  const descriptionElements = evaluateXPath(descriptionXPath);
  const followersElements = evaluateXPath(followersXPath);
  const followingElements = evaluateXPath(followingXpath);
  const profileImageElements = evaluateXPath(profileImageXPath);

  const name =
    nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
  const description =
    descriptionElements.length > 0
      ? descriptionElements[0].textContent.trim()
      : "Not found";
  const followers =
    followersElements.length > 0
      ? followersElements[0].textContent.trim()
      : "0";
  const following =
    followingElements.length > 0
      ? followingElements[0].textContent.trim()
      : "0";
  const profileImage =
    profileImageElements.length > 0
      ? profileImageElements[0].getAttribute("href") ||
        profileImageElements[0].getAttribute("src")
      : " ";

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

  // Fonction pour récupérer les données existantes du profil depuis le backend
  async function getExistingProfile(profileUrl) {
    try {
      const response = await fetch(
        `${BASE_URL}/x/${encodeURIComponent(profileUrl)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.warn("Profil non trouvé, un nouveau sera créé.");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      return null;
    }
  }

  // Get user data and add it to the extracted data
  let userData = null;
  try {
    userData = await getUserData();
  } catch (error) {
    console.error(error);
  }

  console.log("user data 2", userData);
  //  If user data is not found, handle accordingly (e.g., not sending userId)
  if (!userData || !userData.data.userId) {
    console.error(
      "Utilisateur non connecté ou données utilisateur manquantes."
    );
  }

  const profileUrl = window.location.href;
  console.log("url", profileUrl);
  const encodeUrl = encodeURIComponent(profileUrl);
  console.log("encode", encodeUrl);

  const existingProfile = await getExistingProfile(profileUrl);
  console.log("existing", existingProfile);

  // Préparer le champ userId
  const currentUserId = userData?.data?.userId || null;
  const existingUserIds = existingProfile?.userId || [];

  // Ajouter uniquement si l'userId actuel n'est pas déjà présent
  const updatedUserIds = existingUserIds.includes(currentUserId)
    ? existingUserIds
    : [...existingUserIds, currentUserId];

  // Préparer les données à envoyer
  const extractedData = {
    name,
    description,
    followers,
    following,
    plateform: "X",
    profileImage: `https://x.com${profileImage}`,
    profileUrl,
    userId: updatedUserIds,
  };

  console.log("Données extraites :", extractedData);

  function areDataValid(data) {
    return data.name !== "None" && data.followers !== "0";
  }

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
  if (areDataValid(extractedData)) {
    const success = await sendToBackend(extractedData);
    console.log("Success:", success);
    chrome.runtime.sendMessage({ success });
  } else {
    console.warn("Data is incomplete or invalid. Skipping POST request.");
    alert("Data is incomplete or invalid, please reload and try again!");
  }
})();
