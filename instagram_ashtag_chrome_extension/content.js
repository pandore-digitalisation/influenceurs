// // Helper function to evaluate an XPath expression and return nodes
// function evaluateXPath(xpath, context = document) {
//   const iterator = document.evaluate(
//     xpath,
//     context,
//     null,
//     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
//     null
//   );
//   const nodes = [];
//   for (let i = 0; i < iterator.snapshotLength; i++) {
//     nodes.push(iterator.snapshotItem(i));
//   }
//   return nodes;
// }

// // Define the XPaths for the name and post
// const nameXPath = "./a[1]/div[1]/div/div/div[2]/div/div/span[1]/span";
// const postXPath = "./a[1]/div[1]/div/div/div[2]/div/div/span[2]/span";

// // Define the XPath for the parent container of the data block
// const parentXPath = "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div";

// // Extract data
// const parentElements = evaluateXPath(parentXPath);

// if (parentElements.length === 0) {
// console.log("No elements found using the parent XPath.");
// } else {
// const data = [];

// parentElements.forEach((parent) => {
//   const childElements = parent.children;

//   Array.from(childElements).forEach((child) => {
//     // Get the name using the relative XPath
//     const nameElements = evaluateXPath(nameXPath, child);
//     const name = nameElements.length > 0 ? nameElements[0].textContent.trim() : null;

//     // Get the post using the relative XPath
//     const postElements = evaluateXPath(postXPath, child);
//     const post = postElements.length > 0 ? postElements[0].textContent.trim() : null;

//     // Get the URL from the anchor tag within the child
//     const urlElement = child.querySelector("a");
//     const url = urlElement ? urlElement.href : null;

//     data.push({
//       url,
//       name,
//       post,
//       relevantData: child.textContent.trim().replace(/\n|\r/g, " "),
//     });
//   });
// });

// // Log the extracted data
// console.log("Extracted Data:", data);

// // Convert data to CSV format
// if (data.length > 0) {
//   const headers = Object.keys(data[0]);
//   const csvContent =
//     headers.join(",") +
//     "\n" +
//     data.map((row) => headers.map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`).join(",")).join("\n");

//   // Create a downloadable CSV file
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const link = document.createElement("a");
//   const url = URL.createObjectURL(blob);
//   link.setAttribute("href", url);
//   link.setAttribute("download", "data.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// } else {
//   console.log("No data extracted.");
// }
// }

// Helper function to evaluate an XPath expression and return nodes
// function evaluateXPath(xpath, context = document) {
//   const iterator = document.evaluate(
//       xpath,
//       context,
//       null,
//       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
//       null
//   );
//   const nodes = [];
//   for (let i = 0; i < iterator.snapshotLength; i++) {
//       nodes.push(iterator.snapshotItem(i));
//   }
//   return nodes;
// }

// // Define the XPaths for the name and post
// const nameXPath = "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/a[1]/div[1]/div/div/div[2]/div/div/div/span";
// const postXPath = "./a[1]/div[1]/div/div/div[2]/div/div/span[2]/span"; // Assuming this remains relative

// // Define the XPath for the parent container of the data block
// const parentXPath = "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div";

// // Extract data
// const parentElements = evaluateXPath(parentXPath);

// if (parentElements.length === 0) {
//   console.log("No elements found using the parent XPath.");
// } else {
//   const data = [];

//   parentElements.forEach((parent) => {
//       const childElements = parent.children;

//       Array.from(childElements).forEach((child) => {
//           // Get the name using the absolute XPath
//           const nameElements = evaluateXPath(nameXPath, document);
//           const name = nameElements.length > 0 ? nameElements[0].textContent.trim() : null;

//           // Get the post using the relative XPath
//           const postElements = evaluateXPath(postXPath, child);
//           const post = postElements.length > 0 ? postElements[0].textContent.trim() : null;

//           // Get the URL from the anchor tag within the child
//           const urlElement = child.querySelector("a");
//           const url = urlElement ? urlElement.href : null;

//           data.push({
//               url,
//               name,
//               post,
//               relevantData: child.textContent.trim().replace(/\n|\r/g, " "),
//           });
//       });
//   });

//   // Log the extracted data
//   console.log("Extracted Data:", data);

//   // Convert data to CSV format
//   if (data.length > 0) {
//       const headers = Object.keys(data[0]);
//       const csvContent =
//           headers.join(",") +
//           "\n" +
//           data.map((row) => headers.map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`).join(",")).join("\n");

//       // Create a downloadable CSV file
//       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//       const link = document.createElement("a");
//       const url = URL.createObjectURL(blob);
//       link.setAttribute("href", url);
//       link.setAttribute("download", "data.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//   } else {
//       console.log("No data extracted.");
//   }
// }

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

// Define the XPaths for the name and post
const nameXPath = "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div/a[1]/div[1]/div/div/div[2]/div/div/div/span";
const postXPath = "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/header/section[3]/ul/li[1]/div";

// Define the XPath for the parent container of the data block
const parentXPath = "/html/body/div[1]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div[2]/div/div/div[2]/div";

// Extract data
const parentElements = evaluateXPath(parentXPath);

if (parentElements.length === 0) {
  console.log("No elements found using the parent XPath.");
} else {
  const data = [];

  parentElements.forEach((parent) => {
      const childElements = parent.children;

      Array.from(childElements).forEach((child) => {
          // Get the name using the absolute XPath
          const nameElements = evaluateXPath(nameXPath, document);
          const name = nameElements.length > 0 ? nameElements[0].textContent.trim() : null;

          // Get the post using the new absolute XPath
          const postElements = evaluateXPath(postXPath, document);
          const post = postElements.length > 0 ? postElements[0].textContent.trim() : null;

          // Get the URL from the anchor tag within the child
          const urlElement = child.querySelector("a");
          const url = urlElement ? urlElement.href : null;

          data.push({
              url,
              name,
              // post,
              relevantData: child.textContent.trim().replace(/\n|\r/g, " "),
          });
      });
  });

  // Log the extracted data
  console.log("Extracted Data:", data);

  // Convert data to CSV format
  if (data.length > 0) {
      const headers = Object.keys(data[0]);
      const csvContent =
          headers.join(",") +
          "\n" +
          data.map((row) => headers.map((header) => `"${(row[header] || "").replace(/"/g, '""')}"`).join(",")).join("\n");

      // Create a downloadable CSV file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } else {
      console.log("No data extracted.");
  }
}
