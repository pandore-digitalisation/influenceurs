  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.success) {
        console.log("Data sent successfully.");
    } else {
        console.log("Failed to send data.");
    }
});