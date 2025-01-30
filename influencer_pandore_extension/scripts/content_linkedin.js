(async () => {
  // const BASE_URL = "https://influenceur-list.onrender.com";
  const BASE_URL = "http://localhost:3000";

  // Helper function to evaluate XPath and return text or attributes
  function getXPathText(xpath, attr = "textContent") {
    const node = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    return node ? (attr === "textContent" ? node.textContent.trim() : node[attr]) : null;
  }

  // Define the XPaths
  const xPaths = {
    name: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/span[1]/a/h1",
    description: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]",
    location: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]",
    followers: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[1]/span",
    connection: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/span/span",
    profileImage: "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[1]/div/div/span/img"
  };

  // Extract data
  const extractedData = {
    name: getXPathText(xPaths.name) || "None",
    description: getXPathText(xPaths.description) || "None",
    location: getXPathText(xPaths.location) || "0",
    followers: getXPathText(xPaths.followers) || "0",
    connection: getXPathText(xPaths.connection) || "0",
    profileImage: getXPathText(xPaths.profileImage, "src") || " ",
    profileUrl: window.location.href,
    plateform: "Linkedin"
  };

  console.log("Extracted Data:", extractedData);

  // Function to fetch user data from Chrome storage
  const getUserData = () =>
    new Promise((resolve, reject) => {
      chrome.storage.sync.get("userData", (result) =>
        chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError)) : resolve(result.userData)
      );
    });

  // Function to fetch existing profile
  const getExistingProfile = async (profileUrl) => {
    try {
      const response = await fetch(`${BASE_URL}/linkedin/${encodeURIComponent(profileUrl)}`);
      return response.ok ? response.json() : null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  // Fetch user data
  let userData;
  try {
    userData = await getUserData();
  } catch (error) {
    console.error(error);
    return;
  }

  if (!userData?.data?.userId) {
    console.error("User not logged in or missing data.");
    return;
  }

  const currentUserId = userData.data.userId;
  const existingProfile = await getExistingProfile(extractedData.profileUrl);

  extractedData.userId = existingProfile?.userId?.includes(currentUserId)
    ? existingProfile.userId
    : [...(existingProfile?.userId || []), currentUserId];

  // Validate extracted data
  const isValidData = ({ name, followers, connection }) => name !== "None" && followers !== "0" && connection !== " ";

  // Send data to the backend
  if (isValidData(extractedData)) {
    try {
      const response = await fetch(`${BASE_URL}/linkedin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extractedData)
      });

      const success = response.ok;
      console.log("Success:", success);
      chrome.runtime.sendMessage({ success });
    } catch (error) {
      console.error("Network error:", error);
    }
  } else {
    console.warn("Invalid data. Skipping POST request.");
    // alert("Data is incomplete or invalid, please reload and try again!");
  }
})();


// (async () => {
//   // const BASE_URL = "https://influenceur-list.onrender.com";
//   const BASE_URL = "http://localhost:3000";

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

//   // Define the XPaths
//   const nameXPath =
//     "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/span[1]/a/h1";
//   const descriptionXPath =
//     "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]";
//   const locationXPath =
//     "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]";
//   const followersXPath =
//     "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[1]/span";
//   const connectionXpath =
//     "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/span/span";
//   const profileImageXPath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[1]/div/div/span/img";

//   // Extract data
//   const nameElements = evaluateXPath(nameXPath);
//   const descriptionElements = evaluateXPath(descriptionXPath);
//   const locationElements = evaluateXPath(locationXPath);
//   const followersElements = evaluateXPath(followersXPath);
//   const connectionElements = evaluateXPath(connectionXpath);
//   const profileImageElements = evaluateXPath(profileImageXPath);

//   const name =
//     nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
//   const description =
//     descriptionElements.length > 0
//       ? descriptionElements[0].textContent.trim()
//       : "None";
//   const location =
//     locationElements.length > 0 ? locationElements[0].textContent.trim() : "0";
//   const followers =
//     followersElements.length > 0
//       ? followersElements[0].textContent.trim()
//       : "0";
//   const connection =
//     connectionElements.length > 0
//       ? connectionElements[0].textContent.trim()
//       : "0";
//   const profileImage =
//     profileImageElements.length > 0 ? profileImageElements[0].src : " ";

//   // Fonction asynchrone pour récupérer les données utilisateur depuis le chrome storage
//   async function getUserData() {
//     return new Promise((resolve, reject) => {
//       chrome.storage.sync.get("userData", (result) => {
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

//   // Fonction pour récupérer les données existantes du profil depuis le backend
//   async function getExistingProfile(profileUrl) {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/linkedin/${encodeURIComponent(profileUrl)}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         console.warn("Profil non trouvé, un nouveau sera créé.");
//         return null;
//       }
//     } catch (error) {
//       console.error("Erreur lors de la récupération du profil :", error);
//       return null;
//     }
//   }

//   // Get user data and add it to the extracted data
//   let userData = null;
//   try {
//     userData = await getUserData();
//     // console.log("userData", userData);
//   } catch (error) {
//     console.error(error);
//   }

//   console.log("user data 2", userData);
//   // If user data is not found, handle accordingly (e.g., not sending userId)
//   if (!userData || !userData.data.userId) {
//     console.error(
//       "Utilisateur non connecté ou données utilisateur manquantes."
//     );
//   }

//   const profileUrl = window.location.href;
//   console.log("url", profileUrl);
//   const encodeUrl = encodeURIComponent(profileUrl);
//   console.log("encode", encodeUrl);

//   const existingProfile = await getExistingProfile(profileUrl);
//   console.log("existing", existingProfile);

//   // Préparer le champ userId
//   const currentUserId = userData?.data?.userId || null;
//   const existingUserIds = existingProfile?.userId || [];

//   // Ajouter uniquement si l'userId actuel n'est pas déjà présent
//   const updatedUserIds = existingUserIds.includes(currentUserId)
//     ? existingUserIds
//     : [...existingUserIds, currentUserId];

//   // const userId = userData.data.userId;

//   const extractedData = {
//     userId: updatedUserIds,
//     name,
//     description,
//     location,
//     followers,
//     connection,
//     plateform: "Linkedin",
//     profileImage,
//     profileUrl,
//   };

//   console.log("Extracted Data:", extractedData);

//   function areDataValid(data) {
//     return (
//       data.name !== "None" &&
//       data.followers !== "0" &&
//       data.connection !== "0"
//     );
//   }

//   // Send data to the backend
//   async function sendToBackend(data) {
//     try {
//       const response = await fetch(`${BASE_URL}/linkedin`, {
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

//   if (areDataValid(extractedData)) {
//     const success = await sendToBackend(extractedData);
//     console.log("Success:", success);
//     chrome.runtime.sendMessage({ success });
//   } else {
//     console.warn("Data is incomplete or invalid. Skipping POST request.");
//     alert("Data is incomplete or invalid, please reload and try again!");
//   }
// })();
