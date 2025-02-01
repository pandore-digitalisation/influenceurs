(async () => {
  const BASE_URL = "http://localhost:3000";

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

  function cleanNumber(value) {
    if (!value) return " ";
    let cleanedValue = value.replace(/[^\dKM]/g, ""); // Supprime tout sauf chiffres, "K" et "M"
    if (cleanedValue.endsWith("M")) return cleanedValue.replace("M", "000000");
    if (cleanedValue.endsWith("K")) return cleanedValue.replace("K", "000");
    return cleanedValue;
  }

  const xPaths = {
    name: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/span[1]/a/h1",
    description: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]",
    location: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]",
    followers: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[1]/span",
    followers_1: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li/span",
    backFollowers: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[2]/div[2]/div/div/div/p/span[1]",
    connection: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/span/span",
    connection_1: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/a/span/span",
    profileImage: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[1]/div[1]/div/button/img"
  };

  let followers = getXPathText(xPaths.followers);
  let backFollowers = getXPathText(xPaths.backFollowers);
  let connection = getXPathText(xPaths.connection);
  let connection_1 = getXPathText(xPaths.connection_1);
  let followers_1 = getXPathText(xPaths.followers_1);

  if (!connection && !connection_1) {
    connection = followers || " ";
    followers = backFollowers || " ";
  } else if (!connection && connection_1) {
    followers = followers || " ";
    connection = connection_1;
  }

  const extractedData = {
    name: getXPathText(xPaths.name) || "None",
    description: getXPathText(xPaths.description) || "None",
    location: getXPathText(xPaths.location) || " ",
    followers: cleanNumber(followers) || "0",
    connection: cleanNumber(connection) || "0",
    profileImage: getXPathText(xPaths.profileImage, "src") || " ",
    profileUrl: window.location.href,
    plateform: "Linkedin"
  };

  console.log("Extracted Data:", extractedData);

  const getUserData = () =>
    new Promise((resolve, reject) => {
      chrome.storage.sync.get("userData", (result) =>
        chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError)) : resolve(result.userData)
      );
    });

  const getExistingProfile = async (profileUrl) => {
    try {
      const response = await fetch(`${BASE_URL}/linkedin/${encodeURIComponent(profileUrl)}`);
      return response.ok ? response.json() : null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

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

  const isValidData = ({ name, followers, connection }) =>
    name !== "None" && followers !== "0" && connection !== "None";

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
      chrome.runtime.sendMessage({ networkError });
      
    }
  } else {
    console.warn("Invalid data. Skipping POST request.");
    chrome.runtime.sendMessage({ dataNotExtrated });
  }
})();



// (async () => {
//   const BASE_URL = "http://localhost:3000";

//   function getXPathText(xpath, attr = "textContent") {
//     const node = document.evaluate(
//       xpath,
//       document,
//       null,
//       XPathResult.FIRST_ORDERED_NODE_TYPE,
//       null
//     ).singleNodeValue;
//     return node ? (attr === "textContent" ? node.textContent.trim() : node[attr]) : null;
//   }

//   const xPaths = {
//     name: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/span[1]/a/h1",
//     description: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]",
//     location: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]",
//     followers: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[1]/span",
//     backFollowers: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[2]/div[2]/div/div/div/p/span[1]",
//     connection: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/span/span",
//     connection_1: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/a/span/span",
//     profileImage: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[1]/div[1]/div/button/img"
//   };

//   // Récupération initiale des données XPath
//   let followers = getXPathText(xPaths.followers);
//   let backFollowers = getXPathText(xPaths.backFollowers);
//   let connection = getXPathText(xPaths.connection);
//   let connection_1 = getXPathText(xPaths.connection_1);

//   // Vérification et fallback pour "connection"
//   if (!connection && !connection_1) {
//     connection = followers || " "; // Prendre followers comme connection si non défini
//     followers = backFollowers || " "; // Changer followers si backFollowers est défini
//   } else if(!connection && connection_1) {
//     followers = followers || " ";
//     connection = connection_1;
//   }

//   // Extraction des données
//   const extractedData = {
//     name: getXPathText(xPaths.name) || "None",
//     description: getXPathText(xPaths.description) || "None",
//     location: getXPathText(xPaths.location) || " ",
//     followers: followers || " ",
//     connection: connection || getXPathText(xPaths.connection_1) || " ",
//     profileImage: getXPathText(xPaths.profileImage, "src") || " ",
//     profileUrl: window.location.href,
//     plateform: "Linkedin"
//   };

//   console.log("Extracted Data:", extractedData);

//   // Function to fetch user data from Chrome storage
//   const getUserData = () =>
//     new Promise((resolve, reject) => {
//       chrome.storage.sync.get("userData", (result) =>
//         chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError)) : resolve(result.userData)
//       );
//     });

//   // Function to fetch existing profile
//   const getExistingProfile = async (profileUrl) => {
//     try {
//       const response = await fetch(`${BASE_URL}/linkedin/${encodeURIComponent(profileUrl)}`);
//       return response.ok ? response.json() : null;
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       return null;
//     }
//   };

//   // Fetch user data
//   let userData;
//   try {
//     userData = await getUserData();
//   } catch (error) {
//     console.error(error);
//     return;
//   }

//   if (!userData?.data?.userId) {
//     console.error("User not logged in or missing data.");
//     return;
//   }

//   const currentUserId = userData.data.userId;
//   const existingProfile = await getExistingProfile(extractedData.profileUrl);

//   extractedData.userId = existingProfile?.userId?.includes(currentUserId)
//     ? existingProfile.userId
//     : [...(existingProfile?.userId || []), currentUserId];

//   // Validate extracted data
//   const isValidData = ({ name, followers, connection }) =>
//     name !== "None" && followers !== "0" && connection !== "None";

//   // Send data to the backend
//   if (isValidData(extractedData)) {
//     try {
//       const response = await fetch(`${BASE_URL}/linkedin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(extractedData)
//       });

//       const success = response.ok;
//       console.log("Success:", success);
//       chrome.runtime.sendMessage({ success });
//     } catch (error) {
//       console.error("Network error:", error);
//     }
//   } else {
//     console.warn("Invalid data. Skipping POST request.");
//   }
// })();

// (async () => {
//   // const BASE_URL = "https://influenceur-list.onrender.com";
//   const BASE_URL = "http://localhost:3000";

//   // Helper function to evaluate XPath and return text or attributes
//   function getXPathText(xpath, attr = "textContent") {
//     const node = document.evaluate(
//       xpath,
//       document,
//       null,
//       XPathResult.FIRST_ORDERED_NODE_TYPE,
//       null
//     ).singleNodeValue;
//     return node ? (attr === "textContent" ? node.textContent.trim() : node[attr]) : null;
//   }

//   // Define the XPaths
//   const xPaths = {
//     name: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/span[1]/a/h1",
//     description: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]",
//     location: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[1]",
//     followers: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[1]/span",
//     backFollowers: "/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[3]/div[2]/div/div/div/p/span[1]",
//     connection: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/span/span",
//     connection_1: "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/ul/li[2]/a/span/span",
//     profileImage: "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[1]/div/div/span/img"
//   };

  
//   // Extract data
//   const extractedData = {
//     name: getXPathText(xPaths.name) || "None",
//     description: getXPathText(xPaths.description) || "None",
//     location: getXPathText(xPaths.location) || " ",
//     followers: getXPathText(xPaths.followers) || " ",
//     connection: getXPathText(xPaths.connection) || getXPathText(xPaths.connection_1) || " ",
//     profileImage: getXPathText(xPaths.profileImage, "src") || " ",
//     profileUrl: window.location.href,
//     plateform: "Linkedin"
//   };

//   console.log("Extracted Data:", extractedData);

//   // Function to fetch user data from Chrome storage
//   const getUserData = () =>
//     new Promise((resolve, reject) => {
//       chrome.storage.sync.get("userData", (result) =>
//         chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError)) : resolve(result.userData)
//       );
//     });

//   // Function to fetch existing profile
//   const getExistingProfile = async (profileUrl) => {
//     try {
//       const response = await fetch(`${BASE_URL}/linkedin/${encodeURIComponent(profileUrl)}`);
//       return response.ok ? response.json() : null;
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       return null;
//     }
//   };

//   // Fetch user data
//   let userData;
//   try {
//     userData = await getUserData();
//   } catch (error) {
//     console.error(error);
//     return;
//   }

//   if (!userData?.data?.userId) {
//     console.error("User not logged in or missing data.");
//     return;
//   }

//   const currentUserId = userData.data.userId;
//   const existingProfile = await getExistingProfile(extractedData.profileUrl);

//   extractedData.userId = existingProfile?.userId?.includes(currentUserId)
//     ? existingProfile.userId
//     : [...(existingProfile?.userId || []), currentUserId];

//   // Validate extracted data
//   const isValidData = ({ name, followers, connection }) => name !== "None" && followers !== "0" && connection !== "None";

//   // Send data to the backend
//   if (isValidData(extractedData)) {
//     try {
//       const response = await fetch(`${BASE_URL}/linkedin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(extractedData)
//       });

//       const success = response.ok;
//       console.log("Success:", success);
//       chrome.runtime.sendMessage({ success });
//     } catch (error) {
//       console.error("Network error:", error);
//     }
//   } else {
//     console.warn("Invalid data. Skipping POST request.");
//     // alert("Data is incomplete or invalid, please reload and try again!");
//   }
// })();