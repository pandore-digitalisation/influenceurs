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
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[1]/div/span/span";
  const followersXPath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[2]/div/a/span/span";
  const followingXpath =
    "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[3]/div/a/span/span";

  // Extract data
  const nameElements = evaluateXPath(nameXPath);
  const postElements = evaluateXPath(postXPath);
  const followersElements = evaluateXPath(followersXPath);
  const followingElements = evaluateXPath(followingXpath);

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
      ? followingElements[0].textContent.trim() : "0";

  // Get the profile URL
  const profileUrl = window.location.href;

  const extractedData = {
    name,
    posts,
    followers,
    following,
    plateform: "Instagram",
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
      const response = await fetch("http://localhost:3000/instagram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data successfully sent to the backend.");
      } else {
        console.error("Error sending data to the backend.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  // Convert the combined data to CSV format
  if (storedData.length > 0) {
    const headers = Object.keys(storedData[0]);
    const csvContent =
      headers.join(",") +
      "\n" +
      storedData
        .map((row) =>
          headers
            .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    try {
      // Save file locally
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

      // Post the data to the backend
      await sendToBackend(extractedData);
    } catch (error) {
      console.error("Error during export or backend request:", error);
    }
  } else {
    console.log("No data extracted.");
  }
})();


// (async () => {
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
//   const nameXPath = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[2]/div/div/div[1]/div/a/h2/span";
//   const postXPath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[1]/div/span/span";
//   const followersXPath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[2]/div/a/span/span";
//   const followingXpath =
//     "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[3]/div/a/span/span";

//   // Extract data
//   const nameElements = evaluateXPath(nameXPath);
//   const postElements = evaluateXPath(postXPath);
//   const followersElements = evaluateXPath(followersXPath);
//   const followingElements = evaluateXPath(followingXpath);

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

//   // Get the profile URL
//   const profileUrl = window.location.href;

//   const extractedData = {
//     name,
//     posts,
//     followers,
//     following,
//     plateform: "Instagram",
//     profileUrl,
//   };

//   console.log("Extracted Data:", extractedData);

//   // Combine new data with previously stored data
//   let storedData = [];
//   if (localStorage.getItem("exportedData")) {
//     storedData = JSON.parse(localStorage.getItem("exportedData"));
//   }
//   const combinedData = [...storedData, extractedData];
//   localStorage.setItem("exportedData", JSON.stringify(combinedData));

//   // Send data to the backend
//   async function sendToBackend(data) {
//     try {
//       const response = await fetch("http://localhost:3000/instagram", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         console.log("Data successfully sent to the backend.");
//       } else {
//         console.error("Error sending data to the backend.");
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//     }
//   }

//   // Convert the combined data to CSV format
//   if (combinedData.length > 0) {
//     const headers = Object.keys(combinedData[0]);
//     const csvContent =
//       headers.join(",") +
//       "\n" +
//       combinedData
//         .map((row) =>
//           headers
//             .map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`)
//             .join(",")
//         )
//         .join("\n");

//     try {
//       // Save file locally
//       const fileHandle = await window.showSaveFilePicker({
//         suggestedName: "data.csv",
//         types: [
//           {
//             description: "CSV Files",
//             accept: { "text/csv": [".csv"] },
//           },
//         ],
//       });

//       // Write the CSV content to the file
//       const writable = await fileHandle.createWritable();
//       await writable.write(csvContent);
//       await writable.close();

//       console.log("File successfully saved locally.");

//       // Post the data to the backend
//       await sendToBackend(extractedData);
//     } catch (error) {
//       console.error("Error during export or backend request:", error);
//     }
//   } else {
//     console.log("No data extracted.");
//   }
// })();