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
  const nameXPath =
    "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/a[1]/div[1]/div/div/div[2]/div/div/div/span";
  const postXPath =
    "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[1]/div";
  const parentXPath =
    "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div";

  // Extract parent elements
  const parentElements = evaluateXPath(parentXPath);

  if (parentElements.length === 0) {
    console.log("No elements found using the parent XPath.");
    return;
  }

  const newData = [];

  // Iterate through each parent element
  parentElements.forEach((parent) => {
    const childElements = Array.from(parent.children);

    childElements.forEach((child) => {
      // Extract the name using the name XPath
      const nameElements = evaluateXPath(nameXPath, document);
      const name =
        nameElements.length > 0 ? nameElements[0].textContent.trim() : null;

      // Extract the post using the post XPath
      const postElements = evaluateXPath(postXPath, document);
      const post =
        postElements.length > 0 ? postElements[0].textContent.trim() : null;

      // Extract the URL from the anchor tag within the child
      const urlElement = child.querySelector("a");
      const url = urlElement ? urlElement.href : null;

      const followers = child.textContent.trim().replace(/\n|\r/g, " ");

      const followers_strip = followers.split(" ")

      const followers_split = followers_strip[2]

      console.log("Followers count: ", followers_split)

      console.log("followers: ", followers)


      // Push the data into the array
      newData.push({
        url,
        name,
        post,
        followers
      });
    });
  });
  console.log("My new data: ", newData);
  // Retrieve previously stored data
  let storedData = [];
  if (localStorage.getItem("exportedData")) {
    storedData = JSON.parse(localStorage.getItem("exportedData"));
  }

  // Combine new data with stored data
  const combinedData = [...storedData, ...newData];

  // Save the combined data back to localStorage
  localStorage.setItem("exportedData", JSON.stringify(combinedData));

  // Log the combined data
  console.log("Combined Extracted Data:", combinedData);

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
