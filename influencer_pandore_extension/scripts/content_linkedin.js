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

  // async function waitForElement(xpath, timeout = 10000) {
  //   return new Promise((resolve, reject) => {
  //     const interval = 100;
  //     let elapsed = 0;

  //     const check = () => {
  //       const elements = evaluateXPath(xpath);
  //       if (elements.length > 0) {
  //         resolve(elements);
  //       } else if (elapsed >= timeout) {
  //         console.log(
  //           "Timeout reached. Data not fully loaded. please reload the page and trying"
  //         );
        
  //         reject(new Error("Timeout waiting for element"));
  //         const failed =
  //           "Timeout reached. Data not fully loaded. please reload the page and trying again";
  //         chrome.runtime.sendMessage({ failed });
  //       } else {
  //         elapsed += interval;
  //         setTimeout(check, interval);
  //       }
  //     };

  //     check();
  //   });
  // }

  // const BASE_URL ="https://influenceurs.onrender.com"
  const BASE_URL = "http://localhost:3000";

  // Define the XPaths
  const nameXPath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/span[1]/a/h1";
  const descriptionXPath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]";
  const locationXPath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]";
  const followersXPath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[1]/span";
  const connectionXpath =
    "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/span/span";
  const profileImageXPath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[1]/div/div/span/img";

  // Attendre que les éléments soient disponibles
  // await waitForElement(nameXPath);
  // await waitForElement(followersXPath);
  // await waitForElement(connectionXpath);

  // Extract data
  const nameElements = evaluateXPath(nameXPath);
  const descriptionElements = evaluateXPath(descriptionXPath);
  const locationElements = evaluateXPath(locationXPath);
  const followersElements = evaluateXPath(followersXPath);
  const connectionElements = evaluateXPath(connectionXpath);
  const profileImageElements = evaluateXPath(profileImageXPath);

  const name =
    nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
  const description =
    descriptionElements.length > 0
      ? descriptionElements[0].textContent.trim()
      : "None";
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
    location,
    followers,
    connection,
    plateform: "Linkedin",
    profileImage,
    profileUrl,
  };

  console.log("Extracted Data:", extractedData);

  // function areDataValid(data) {
  //   return (
  //     (data.name !== "None" &&
  //       data.followers !== "0" &&
  //       data.profileImage !== " ") ||
  //     data.profileImage == " "
  //   );
  // }

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
  // if (areDataValid(extractedData)) {
  //   const success = await sendToBackend(extractedData);
  //   console.log("Success:", success);
  //   chrome.runtime.sendMessage({ success });
  // } else {
  //   console.warn("Data is incomplete or invalid. Skipping POST request.");
  // }
  const success = await sendToBackend(extractedData);
  console.log("success", success);
  // Communiquez l'état au popup.js
  chrome.runtime.sendMessage({ success });
})();
