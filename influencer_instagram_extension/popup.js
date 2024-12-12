document.getElementById("scrapeBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      });
    });

    // const downloadBtn =  document.getElementById("downloadBtn").style.display = "block";
    // document.getElementById("scrapeBtn").style.display = "none"

    // downloadBtn.addEventListener("click", () => {
    //   console.log("cliked")
    // })

  });



  document.getElementById("downloadBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: downloadCSV,
        });
    });
});


function downloadCSV() {
  const storedData = JSON.parse(localStorage.getItem("exportedData") || "[]");

  if (storedData.length === 0) {
      alert("No data available for download.");
      return;
  }

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

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data.csv";
  link.click();

  URL.revokeObjectURL(url);
}