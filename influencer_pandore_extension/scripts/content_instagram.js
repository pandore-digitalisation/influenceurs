
(async () => {
  console.log("Running script for Instagram...");
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
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[2]/div/div/div[1]/div/a/h2/span";
  const postXPath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[1]/div/span/span";
  const followersXPath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[2]/div/a/span/span";
  const followingXpath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[3]/div/a/span/span";
  const profileImageXPath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[1]/div/div/span/img";

  // Extract data
  const nameElements = evaluateXPath(nameXPath);
  const postElements = evaluateXPath(postXPath);
  const followersElements = evaluateXPath(followersXPath);
  const followingElements = evaluateXPath(followingXpath);
  const profileImageElements = evaluateXPath(profileImageXPath);

  const name =
    nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
  const posts =
    postElements.length > 0 ? postElements[0].textContent.trim() : "0";
  const followers =
    followersElements.length > 0
      ? followersElements[0].textContent.trim()
      : "0";
  const following =
    followingElements.length > 0
      ? followingElements[0].textContent.trim()
      : "0";
  const profileImage =
    profileImageElements.length > 0 ? profileImageElements[0].src : " ";

  // Get the profile URL
  const profileUrl = window.location.href;

  const extractedData = {
    name,
    posts,
    followers,
    following,
    plateform: "Instagram",
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
      const response = await fetch(`${BASE_URL}/instagram`, {
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




// (async () => {
//   console.log("Running script for Instagram...");
//   // Helper function to evaluate an XPath expression and return nodes
//   function evaluateXPath(xpath, context = document) {
//     const iterator = document.evaluate(
//       xpath,
//       context,
//       null,
//       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
//       null
//     );
//     const nodes = [];
//     for (let i = 0; i < iterator.snapshotLength; i++) {
//       nodes.push(iterator.snapshotItem(i));
//     }

//     return nodes;
//   }

//   async function waitForElement(xpath, timeout = 10000) {
//     return new Promise((resolve, reject) => {
//       const interval = 100;
//       let elapsed = 0;

//       const check = () => {
//         const elements = evaluateXPath(xpath);
//         if (elements.length > 0) {
//           resolve(elements);
//         } else if (elapsed >= timeout) {
//           console.log(
//             "Timeout reached. Data not fully loaded. please reload the page and trying again"
//           );
//           reject(new Error("Timeout waiting for element"));
//           const failed =
//             "Timeout reached. Data not fully loaded. please reload the page and trying again";
//           chrome.runtime.sendMessage({ failed });
//         } else {
//           elapsed += interval;
//           setTimeout(check, interval);
//         }
//       };

//       check();
//     });
//   }

//   const BASE_URL = "https://influenceurs.onrender.com";

//   // Define the XPaths
//   const nameXPath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[2]/div/div/div[1]/div/a/h2/span";
//   const postXPath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[1]/div/span/span";
//   const followersXPath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[2]/div/a/span/span";
//   const followingXpath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[3]/div/a/span/span";
//   const profileImageXPath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[1]/div/div/span/img";

//   // Attendre que les éléments soient disponibles
//   await waitForElement(nameXPath);
//   await waitForElement(followersXPath);
//   await waitForElement(followingXpath);
//   await waitForElement(postElements)

//   // Extract data
//   const nameElements = evaluateXPath(nameXPath);
//   const postElements = evaluateXPath(postXPath);
//   const followersElements = evaluateXPath(followersXPath);
//   const followingElements = evaluateXPath(followingXpath);
//   const profileImageElements = evaluateXPath(profileImageXPath);

//   const name =
//     nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
//   const posts =
//     postElements.length > 0 ? postElements[0].textContent.trim() : "0";
//   const followers =
//     followersElements.length > 0
//       ? followersElements[0].textContent.trim()
//       : "0";
//   const following =
//     followingElements.length > 0
//       ? followingElements[0].textContent.trim()
//       : "0";
//   const profileImage =
//     profileImageElements.length > 0 ? profileImageElements[0].src : "Not found";

//   // Get the profile URL
//   const profileUrl = window.location.href;

//   const extractedData = {
//     name,
//     posts,
//     followers,
//     following,
//     plateform: "Instagram",
//     profileImage,
//     profileUrl,
//   };

//   console.log("Extracted Data:", extractedData);

//   // // Combine new data with previously stored data, replacing existing entries if the name matches
//   // let storedData = [];
//   // if (localStorage.getItem("exportedData")) {
//   //   storedData = JSON.parse(localStorage.getItem("exportedData"));
//   // }

//   // const existingIndex = storedData.findIndex(
//   //   (entry) => entry.name === extractedData.name
//   // );

//   // if (existingIndex > -1) {
//   //   // Replace existing entry if the name matches
//   //   storedData[existingIndex] = extractedData;
//   // } else {
//   //   // Add new entry if no match is found
//   //   storedData.push(extractedData);
//   // }

//   // localStorage.setItem("exportedData", JSON.stringify(storedData));

//   function areDataValid(data) {
//     return (
//       data.name !== "None" &&
//       data.followers !== "0" &&
//       data.profileImage !== " "
//     );
//   }

//   if (areDataValid(extractedData)) {
//     const success = await sendToBackend(extractedData);
//     console.log("Success:", success);
//     chrome.runtime.sendMessage({ success });
//   } else {
//     console.warn("Data is incomplete or invalid. Skipping POST request.");
//   }

//   // Send data to the backend
//   async function sendToBackend(data) {
//     try {
//       const response = await fetch(`${BASE_URL}/instagram`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         console.log("Data successfully sent to the backend.");
//         return true;
//       } else {
//         console.error("Error sending data to the backend.");
//         return false;
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       return false;
//     }
//   }

//   //Post the data to the backend
//   // const success = await sendToBackend(extractedData);
//   // console.log("success", success);
//   // // Communiquez l'état au popup.js
//   // chrome.runtime.sendMessage({ success });
// })();
