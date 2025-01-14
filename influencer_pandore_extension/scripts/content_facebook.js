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

  // const BASE_URL = "https://influenceurs.onrender.com";
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

  // const userData = chrome.storage.local.get(["userData"]);
  // console.log("userData", userData);
  // console.log("userId",)

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

  // let userId;
  // chrome.storage.local.get("userData", (result) => {
  //   if (chrome.runtime.lastError) {
  //     console.error(
  //       "Erreur lors de la récupération des données :",
  //       chrome.runtime.lastError
  //     );
  //   } else {
  //     // Accéder à userData ici
  //     const userData = result.userData;
  //     userId = userData.data.userId;
  //     console.log("User ID:", userData.data.userId); // Affiche l'ID de l'utilisateur
  //   }
  // });

  const extractedData = {
    userId,
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

  if (areDataValid(extractedData)) {
    const success = await sendToBackend(extractedData);
    console.log("Success:", success);
    chrome.runtime.sendMessage({ success });
  } else {
    console.warn("Data is incomplete or invalid. Skipping POST request.");
  }
})();

// (async () => {
//   console.log("Running script for Facebook...");

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
//             "Timeout reached. Data not fully loaded. please reload the page and trying"
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

//   // const BASE_URL = "https://influenceurs.onrender.com";
//   const BASE_URL = "https://influenceurs.onrender.com";

//   const nameXPath =
//     "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[1]/div/div/span/h1/text()[1]";
//   const followersXPath =
//     "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[1]/text()[1]";
//   const followingXpath =
//     "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[2]/text()[1]";
//   const profileImageXPath =
//     "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[1]/div/a/div/svg";

//   // Attendre que les éléments soient disponibles
//   await waitForElement(nameXPath);
//   await waitForElement(followersXPath);
//   await waitForElement(followingXpath);

//   const nameElements = evaluateXPath(nameXPath);
//   const followersElements = evaluateXPath(followersXPath);
//   const followingElements = evaluateXPath(followingXpath);
//   const profileImageElements = evaluateXPath(profileImageXPath);

//   const name =
//     nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
//   const followers =
//     followersElements.length > 0
//       ? followersElements[0].textContent.trim()
//       : "0";
//   const following =
//     followingElements.length > 0
//       ? followingElements[0].textContent.trim()
//       : "0";
//   const profileImage =
//     profileImageElements.length > 0
//       ? profileImageElements[0].getAttribute("href") ||
//         profileImageElements[0].getAttribute("xlink:href")
//       : "Not found";

//   // Fonction asynchrone pour récupérer les données utilisateur depuis le chrome storage
//   async function getUserData() {
//     return new Promise((resolve, reject) => {
//       chrome.storage.local.get("userData", (result) => {
//         if (chrome.runtime.lastError) {
//           reject(
//             new Error(
//               "Erreur lors de la récupération des données : " +
//                 chrome.runtime.lastError
//             )
//           );
//         } else {
//           resolve(result.userData);
//         }
//       });
//     });
//   }

//   try {
//     // Récupérer les données utilisateur
//     const userData = await getUserData();
//     const userId = userData?.data?.userId || null;

//     if (!userId) {
//       console.log("User is not logged in");
//     } else {
//       console.log("User ID:", userId);
//     }

//     // Créer les données extraites
//     const extractedData = {
//       userId,
//       name,
//       followers,
//       following,
//       plateform: "Facebook",
//       profileImage,
//       profileUrl: window.location.href,
//     };

//     console.log("Extracted Data:", extractedData);

//     // Fonction pour vérifier si les données sont valides
//     function areDataValid(data) {
//       return (
//         data.name !== "None" &&
//         data.followers !== "0" &&
//         data.profileImage !== " "
//       );
//     }

//     // Si les données sont valides, envoie les à l'API
//     if (areDataValid(extractedData)) {
//       const success = await sendToBackend(extractedData);
//       console.log("Success:", success);
//       chrome.runtime.sendMessage({ success });
//     } else {
//       console.warn("Data is incomplete or invalid. Skipping POST request.");
//     }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }

//   // Fonction pour envoyer les données à l'API backend
//   async function sendToBackend(data) {
//     try {
//       const response = await fetch(`${BASE_URL}/facebook`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       return response.ok;
//     } catch (error) {
//       console.error("Network error:", error);
//       return false;
//     }
//   }
// })();
