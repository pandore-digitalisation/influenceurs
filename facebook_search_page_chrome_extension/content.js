(async () => {
  // Helper function to evaluate XPath
  function evaluateXPath(xpath, context = document) {
    const iterator = document.evaluate(
      xpath,
      context,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    console.log("Nombre d'éléments trouvés :", iterator.snapshotLength);

    const nodes = [];
    for (let i = 0; i < iterator.snapshotLength; i++) {
      nodes.push(iterator.snapshotItem(i));
    }
    console.log("nodes: ", nodes);

    return nodes;
  }

  // Define the parent XPath and sub-XPaths
  const parentXPath =
    "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div"; // This should be the correct XPath for each result
  const nameXPath = ".//div/div/div[1]/span/div/a/span";
  const followersXPath = ".//div/div/div[2]/span/span";
  const descriptionXPath = ".//div/div/div[3]/span/span";

  const allSearches = [];

  // Wait for the page to load completely
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Extract data
  function extractData() {
    const parentElements = evaluateXPath(parentXPath);

    console.log("Nombre d'éléments trouvés :", parentElements.length);

    if (parentElements.length === 0) {
      console.warn("Aucun résultat trouvé. Vérifiez le XPath.");
      return;
    }

    // Extract data for each result
    parentElements.forEach((parent, index) => {
      try {
        const nameNode = evaluateXPath(nameXPath, parent)[0];
        const followersNode = evaluateXPath(followersXPath, parent)[0];
        const descriptionNode = evaluateXPath(descriptionXPath, parent)[0];

        const name = nameNode?.textContent?.trim() || "Nom introuvable";
        const followers =
          followersNode?.textContent?.trim() || "Followers introuvables";
        const description =
          descriptionNode?.textContent?.trim() || "Description introuvable";
        const url = parent.querySelector("a")?.href || "URL introuvable";

        console.log(`Résultat ${index + 1}:`, {
          name,
          followers,
          description,
          url,
        });

        allSearches.push({ url, name, followers, description });
      } catch (error) {
        console.error(
          `Erreur lors de l'extraction du résultat ${index + 1}:`,
          error
        );
      }
    });
  }

  console.log("Extraction en cours...");
  extractData();

  console.log("Données extraites :", allSearches);

  // Retrieve previously stored data
  let storedData = [];
  if (localStorage.getItem("exportedData")) {
    storedData = JSON.parse(localStorage.getItem("exportedData"));
  }

  // Combine new data with stored data
  const combinedData = [...storedData, ...allSearches];

  // Save the combined data back to localStorage
  localStorage.setItem("exportedData", JSON.stringify(combinedData));

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
