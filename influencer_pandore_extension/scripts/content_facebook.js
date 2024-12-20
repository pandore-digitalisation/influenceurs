(async () => {
  console.log("Running script for Facebook...");

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

  const BASE_URL = "https://influenceurs.onrender.com";

  const nameXPath =
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[1]/div/div/span/h1/text()[1]";
  const followersXPath =
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[1]/text()[1]";
  const followingXpath =
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[2]/text()[1]";
  const profileImageXPath =
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[1]/div/a/div/svg";

  // Attendre que les éléments soient disponibles
  await waitForElement(nameXPath);
  await waitForElement(followersXPath);
  await waitForElement(followingXpath);

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

  const extractedData = {
    name,
    followers,
    following,
    plateform: "Facebook",
    profileImage,
    profileUrl: window.location.href,
  };

  console.log("Extracted Data:", extractedData);

  function areDataValid(data) {
    return (
      data.name !== "None" &&
      data.followers !== "0" &&
      data.profileImage !== " "
    );
  }

  if (areDataValid(extractedData)) {
    const success = await sendToBackend(extractedData);
    console.log("Success:", success);
    chrome.runtime.sendMessage({ success });
  } else {
    console.warn("Data is incomplete or invalid. Skipping POST request.");
  }

  async function sendToBackend(data) {
    try {
      const response = await fetch(`${BASE_URL}/facebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  }
})();

// (async () => {
//     function evaluateXPath(xpath, context = document) {
//       const iterator = document.evaluate(
//         xpath,
//         context,
//         null,
//         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
//         null
//       );
//       const nodes = [];
//       for (let i = 0; i < iterator.snapshotLength; i++) {
//         nodes.push(iterator.snapshotItem(i));
//       }

//       return nodes;
//     }

//     const BASE_URL ="https://influenceurs.onrender.com"

//     // Define the XPaths
//     const nameXPath =
//       "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[1]/div/div/span/h1/text()[1]";
//     const followersXPath =
//       "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[1]/text()[1]";
//     const followingXpath =
//       "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[2]/text()[1]";
//     const profileImageXPath =
//       "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[1]/div/a/div/svg";

//     // Extract data
//     const nameElements = evaluateXPath(nameXPath);
//     const followersElements = evaluateXPath(followersXPath);
//     const followingElements = evaluateXPath(followingXpath);
//     const profileImageElements = evaluateXPath(profileImageXPath);

//     const name =
//       nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
//     const followers =
//       followersElements.length > 0
//         ? followersElements[0].textContent.trim()
//         : "0";
//     const following =
//       followingElements.length > 0
//         ? followingElements[0].textContent.trim()
//         : "0";
//     const profileImage = profileImageElements.length > 0
//         ? profileImageElements.getAttribute("href") || profileImageElements.getAttribute("xlink:href")
//         : "Not found";

//     console.log("profile image: ", profileImage)

//     // Get the profile URL
//     const profileUrl = window.location.href;

//     const extractedData = {
//       name,
//       followers,
//       following,
//       plateform: "Facebook",
//       profileImage,
//       profileUrl,
//     };

//     console.log("Extracted Data:", extractedData);

//     // Combine new data with previously stored data, replacing existing entries if the name matches
//     let storedData = [];
//     if (localStorage.getItem("exportedData")) {
//       storedData = JSON.parse(localStorage.getItem("exportedData"));
//     }

//     const existingIndex = storedData.findIndex(
//       (entry) => entry.name === extractedData.name
//     );

//     if (existingIndex > -1) {
//       // Replace existing entry if the name matches
//       storedData[existingIndex] = extractedData;
//     } else {
//       // Add new entry if no match is found
//       storedData.push(extractedData);
//     }

//     localStorage.setItem("exportedData", JSON.stringify(storedData));

//     // Send data to the backend
//     async function sendToBackend(data) {
//       try {
//         const response = await fetch(`${BASE_URL}/facebook`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });

//         if (response.ok) {
//           console.log("Data successfully sent to the backend.");
//           return true;
//         } else {
//           console.error("Error sending data to the backend.");
//           return false;
//         }
//       } catch (error) {
//         console.error("Network error:", error);
//         return false;
//       }
//     }

//     //Post the data to the backend
//     const success = await sendToBackend(extractedData);
//     console.log("success", success);
//     // Communiquez l'état au popup.js
//     chrome.runtime.sendMessage({ success });
//   })();
