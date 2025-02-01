(async () => {
  //const BASE_URL = "https://influenceur-list.onrender.com";
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
    if (!value) return "0";
    let cleanedValue = value.replace(/[^\dKM.]/g, "");

    if (cleanedValue.endsWith("M")) return parseFloat(cleanedValue.replace("M", "").replace(",", "") * 1000000);
    if (cleanedValue.endsWith("K")) return parseFloat(cleanedValue.replace("K", "").replace(",", "") * 1000);
    return cleanedValue;
  }

  const xPaths = {
    name: "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[1]/div/div/span/h1/text()[1]",
    followers:
      "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[1]/text()[1]",
    following:
      "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[2]/text()[1]",
    profileImage: "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[1]/div/a/div/svg",
  };

  let followers = getXPathText(xPaths.followers);
  let following = getXPathText(xPaths.following);

  const extractedData = {
    name: getXPathText(xPaths.name) || "None",
    followers: cleanNumber(followers) || "0",
    following: cleanNumber(following) || "0",
    profileImage: getXPathText(xPaths.profileImage, "src") || " ",
    profileUrl: window.location.href,
    plateform: "Facebook",
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
        `${BASE_URL}/facebook/${encodeURIComponent(profileUrl)}`
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
      const response = await fetch(`${BASE_URL}/facebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extractedData),
      });

      const success = response.ok;
      console.log("Success:", success);
      chrome.runtime.sendMessage({ success });
    } catch (error) {
      console.error("Network error:", error);
      chrome.runtime.sendMessage({ networkError });
    }
  } else {
    chrome.runtime.sendMessage({ dataNotExtracted });
    console.warn("Invalid data. Skipping POST request.");
  }
})();
