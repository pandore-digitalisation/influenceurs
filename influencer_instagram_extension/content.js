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

  // Define the XPaths
  const nameXPath = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[2]/div/div/div[1]/div/a/h2/span";
  const postXPath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[1]/div";
  const followersXPath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[2]/div/a";
  const followingXpath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[3]/div/a";
  const isVerifiedXpath = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[2]/div/div/div[1]/div/div/svg"

  // Extract data
  const nameElements = evaluateXPath(nameXPath);
  const postElements = evaluateXPath(postXPath);
  const followersElements = evaluateXPath(followersXPath);
  const followingElements = evaluateXPath(followingXpath);
  const isVerifiedElements = evaluateXPath(isVerifiedXpath);

  const name =
    nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
  const posts =
    postElements.length > 0 ? postElements[0].textContent.trim() : "0";
  const followers =
    followersElements.length > 0
      ? followersElements[0].textContent.trim()
      : "0 followers";
  const following =
    followingElements.length > 0
      ? followingElements[0].textContent.trim()
      : "0 following";

    // const status = isVerifiedElements.textContent.trim()


      // if (isVerifiedElements > 0){
      //   console.log("ok")
      // }else{
      //   console.log("Not ok")
      // }


  console.log("is verified: ", status)

    // Get the profile URL
  const profileUrl = window.location.href;

  const extractedData = {
    name,
    posts,
    followers,
    following,
    plateform: "Instagram",
    profileUrl
  };

  console.log("Extracted Data:", extractedData);

  // Retrieve previously stored data
  let storedData = [];
  if (localStorage.getItem("exportedData")) {
    storedData = JSON.parse(localStorage.getItem("exportedData"));
  }

  // Combine new data with stored data
  const combinedData = [...storedData, extractedData];

  // Save the combined data back to localStorage
  localStorage.setItem("exportedData", JSON.stringify(combinedData));

  // Convert the combined data to CSV format
  if (combinedData.length > 0) {
    const headers = Object.keys(combinedData[0]);
    const csvContent =
      headers.join(",") +
      "\n" +
      combinedData
        .map((row) =>
          headers
            .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    try {
      // Request access to save the file locally
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "data.csv",
        types: [
          {
            description: "CSV Files",
            accept: { "text/csv": [".csv"] },
          },
        ],
      });

      // Write the CSV content to the file
      const writable = await fileHandle.createWritable();
      await writable.write(csvContent);
      await writable.close();

      console.log("File successfully saved locally.");
    } catch (error) {
      console.error("Error saving file:", error);
    }
  } else {
    console.log("No data extracted.");
  }
})();