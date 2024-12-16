  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.success) {
        console.log("Please connect to Instagram profile.");
    } else {
        console.log("Failed to send data.");
    }
});