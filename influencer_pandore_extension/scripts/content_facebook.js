(async () => {
  console.log("Running script for Facebook...");

  // const BASE_URL = "https://influenceurs.onrender.com";
  const BASE_URL = "http://localhost:3000";

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

  const nameXPath =
  "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[1]/div/div/span/h1/text()[1]"
    // "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[1]/div/div/span/h1/text()[1]";
  const followersXPath =
  "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[1]/text()[1]"
    // "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[1]/text()[1]";
  const followingXpath =
  "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[2]/text()[1]"
    // "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[2]/text()[1]";
  const profileImageXPath =
  "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[1]/div/div/div/svg/g/image"
    // "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[1]/div/a/div/svg";


  const nameElements = evaluateXPath(nameXPath);
  const followersElements = evaluateXPath(followersXPath);
  const followingElements = evaluateXPath(followingXpath);
  const profileImageElements = evaluateXPath(profileImageXPath);

  const name =
    nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
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
        profileImageElements[0].getAttribute("xlink:href")
      : "Not found";

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
                chrome.runtime
                .lastError
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
        `${BASE_URL}/facebook/${encodeURIComponent(profileUrl)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data)
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

  // const userId = userData.data.userId;

  const extractedData = {
    userId: updatedUserIds,
    name,
    followers,
    following,
    plateform: "Facebook",
    profileImage,
    profileUrl,
  };

  console.log("Extracted Data:", extractedData);

  function areDataValid(data) {
    return (
      data.name !== "None" &&
      data.followers !== "0"    );
  }

  async function sendToBackend(data) {
    try {
      const response = await fetch(`${BASE_URL}/facebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // sendToBackend(extractedData);

  if (areDataValid(extractedData)) {
    const success = await sendToBackend(extractedData);
    console.log("Success:", success);
    chrome.runtime.sendMessage({ success });
  } else {
    console.warn("Data is incomplete or invalid. Skipping POST request.");
    // alert("Data is incomplete or invalid, please reload and try again!");

  }
})();