(async () => {
  // const BASE_URL = "https://influenceur-list.onrender.com";
  const BASE_URL = "http://localhost:3000";

  function getXPathText(xpath, attr = "textContent") {
    const node = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    return node
      ? attr === "textContent"
        ? node.textContent.trim()
        : node[attr]
      : null;
  }

  function cleanNumber(value) {
    if (!value) return " ";
  
    // Retirer tous les caractères non numériques, sauf 'K' et 'M'
    let cleanedValue = value.replace(/[^\d.KM]/g, "");
  
    // Si la valeur se termine par "M"
    if (cleanedValue.endsWith("M")) {
      return Math.round(parseFloat(cleanedValue.replace("M", "")) * 1000000);
    }
  
    // Si la valeur se termine par "K"
    if (cleanedValue.endsWith("K")) {
      return Math.round(parseFloat(cleanedValue.replace("K", "")) * 1000);
    }
  
    // Si la valeur n'a ni "M" ni "K", retour du nombre tel quel
    return Math.round(parseFloat(cleanedValue));
  }
  
  // function cleanNumber(value) {
  //   if (!value) return "None";

  //   let cleanedValue = value.replace(/[^\dKM.]/g, "");
  //   let suffix = "";

  //   if (cleanedValue.endsWith("M") || cleanedValue.endsWith("K")) {
  //     suffix = cleanedValue.slice(-1);
  //     cleanedValue = cleanedValue.slice(0, -1);
  //   }

  //   if (cleanedValue.includes(".")) {
  //     cleanedValue = cleanedValue.split(".")[0];
  //   }

  //   cleanedValue = cleanedValue + suffix;

  //   if (suffix === "M") {
  //     return (
  //       parseFloat(cleanedValue.replace("M", "").replace(",", "")) * 1000000
  //     );
  //   }
  //   if (suffix === "K") {
  //     return parseFloat(cleanedValue.replace("K", "").replace(",", "")) * 1000;
  //   }

  //   return parseFloat(cleanedValue) || cleanedValue;
  // }

  // function cleanNumber(value) {
  //   if (!value) return "None";
  //   let cleanedValue = value.replace(/[^\dKM]/g, "");

  //   if (cleanedValue.endsWith("M"))
  //     return parseFloat(
  //       cleanedValue.replace("M", "").replace(",", "") * 100000
  //     );
  //   if (cleanedValue.endsWith("K"))
  //     return parseFloat(cleanedValue.replace("K", "").replace(",", "") * 100);
  //   return cleanedValue;
  // }

  const xPaths = {
    name: "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[2]/div/div/div/div[1]/div/div/span/span[1]",
    description:
      "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]",
    followers:
      "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[2]/a/span[1]/span",
    following:
      "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[1]/a/span[1]/span",
    profileImage:
      "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div[1]/div[2]/div[1]/div[1]/div[2]/div/div[2]/div/a/div[4]/div",
  };

  let followers = getXPathText(xPaths.followers);
  let following = getXPathText(xPaths.following);

  const extractedData = {
    name: getXPathText(xPaths.name) || "None",
    description: getXPathText(xPaths.description) || "None",
    followers: cleanNumber(followers) || "0",
    following: cleanNumber(following) || "0",
    profileImage: getXPathText(xPaths.profileImage, "src") || "",
    profileUrl: window.location.href,
    plateform: "X",
  };

  console.log("Extracted Data:", extractedData);

  const getUserData = () =>
    new Promise((resolve, reject) => {
      chrome.storage.sync.get("userData", (result) =>
        chrome.runtime.lastError
          ? reject(new Error(chrome.runtime.lastError))
          : resolve(result.userData)
      );
    });

  const getExistingProfile = async (profileUrl) => {
    try {
      const response = await fetch(
        `${BASE_URL}/x/${encodeURIComponent(profileUrl)}`
      );
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

  // Fonction pour récupérer selectedList de manière asynchrone
  const getSelectedList = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(["selectedList"], function (result) {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError));
        } else {
          resolve(result.selectedList);
        }
      });
    });
  };

  let selectedList;

  try {
    selectedList = await getSelectedList(); // Attends que selectedList soit récupéré
    console.log("selectedList récupéré:", selectedList);
  } catch (error) {
    console.error("Erreur lors de la récupération de selectedList:", error);
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

  const isValidData = ({ name, followers, following }) =>
    name !== "None" && followers !== "None" && following !== "None";

  if (isValidData(extractedData)) {
    try {
      const response = await fetch(`${BASE_URL}/x`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extractedData),
      });

      const data = await response.json();

      console.log("data to send to list", data);

      if (selectedList) {
        const profilesUpdate = {
          profiles: {
            add: [data],
          },
        };

        await fetch(`${BASE_URL}/lists/${selectedList}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profilesUpdate),
        });
        console.log("List update");
      } else {
        console.log("List not update");
      }

      const success = response.ok;
      console.log("Success:", success);
      chrome.runtime.sendMessage({ success });
    } catch (error) {
      console.error("Network error:", error);
      chrome.runtime.sendMessage({ networkError });
    }
  } else {
    console.warn("Invalid data. Skipping POST request.");
    chrome.runtime.sendMessage({ dataNotExtracted: true });
  }
})();
