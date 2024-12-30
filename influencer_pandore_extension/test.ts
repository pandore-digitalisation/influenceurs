// document.getElementById("loginBtn").addEventListener("click", () => {
//     const backendUrl = "https://your-backend-url.com/auth/google";
  
//     // Ouvre la page d'authentification Google
//     chrome.tabs.create({ url: backendUrl }, (tab) => {
//       // Écoute le message envoyé une fois l'authentification réussie
//       chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//         if (message.type === "authSuccess") {
//           const token = message.token;
//           console.log("JWT reçu :", token);
  
//           // Sauvegarde le JWT dans le stockage local de l'extension
//           chrome.storage.local.set({ jwt: token }, () => {
//             console.log("JWT enregistré avec succès.");
//             document.getElementById("status").innerText =
//               "Connexion réussie ! Vous êtes authentifié.";
//           });
  
//           sendResponse({ success: true });
//         }
//       });
//     });
//   });
  