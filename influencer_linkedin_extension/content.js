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

  const BASE_URL ="https://influenceurs.onrender.com"


  // Define the XPaths
  const nameXPath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/span[1]/a/h1";
  const descriptionXPath = "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]";
  const locationXPath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]";
  const followersXPath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[1]/span";
  const connectionXpath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/span/span";
  const profileImageXPath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[1]/div/div/span/img";

  // Extract data
  const nameElements = evaluateXPath(nameXPath);
  const descriptionElements = evaluateXPath(descriptionXPath)
  const locationElements = evaluateXPath(locationXPath);
  const followersElements = evaluateXPath(followersXPath);
  const connectionElements = evaluateXPath(connectionXpath);
  const profileImageElements = evaluateXPath(profileImageXPath);

  const name =
    nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
  const description =
    descriptionElements.length > 0 ? descriptionElements[0].textContent.trim() : "None";
  const location =
    locationElements.length > 0 ? locationElements[0].textContent.trim() : "0";
  const followers =
    followersElements.length > 0
      ? followersElements[0].textContent.trim()
      : "0";
  const connection =
    connectionElements.length > 0
      ? connectionElements[0].textContent.trim()
      : "0";
  const profileImage =
    profileImageElements.length > 0
      ? profileImageElements[0].src
      : " ";

  // Get the profile URL
  const profileUrl = window.location.href;

  const extractedData = {
    name,
    description,
    location,
    followers,
    connection,
    plateform: "Linkedin",
    profileImage,
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
      const response = await fetch(`${BASE_URL}/linkedin`, {
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
