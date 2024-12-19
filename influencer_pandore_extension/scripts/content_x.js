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

  const BASE_URL = "https://influenceurs.onrender.com";

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
      : "Données incomplètes ou manquantes";
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

  // Get data before send to backend
  if (!name || !followers || !following) {
    console.error("Données incomplètes ou manquantes. Requête annulée.");
    return;
  }

  // Get the profile URL
  const profileUrl = window.location.href;
  const base = "https://x.com";

  const extractedData = {
    name,
    description,
    followers,
    following,
    plateform: "X",
    profileImage: `${base}${profileImage}`,
    profileUrl,
  };

  console.log("Extracted Data:", extractedData);

  // Combine new data with previously stored data, replacing existing entries if the name matches
  let storedData = [];
  if (localStorage.getItem("exportedData")) {
    storedData = JSON.parse(localStorage.getItem("exportedData"));
  }

  const existingIndex = storedData.findIndex(
    (entry) => entry.name === extractedData.name
  );

  if (existingIndex > -1) {
    // Replace existing entry if the name matches
    storedData[existingIndex] = extractedData;
  } else {
    // Add new entry if no match is found
    storedData.push(extractedData);
  }

  localStorage.setItem("exportedData", JSON.stringify(storedData));

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

  //Post the data to the backend
  const success = await sendToBackend(extractedData);
  console.log("success", success);
  // Communiquez l'état au popup.js
  chrome.runtime.sendMessage({ success });
})();
