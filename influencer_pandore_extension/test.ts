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

 // function expandValue(value) {
      //   if (value.endsWith('K')) {
      //     // Supprime 'K' et multiplie par 1 000
      //     return parseFloat(value.replace('K', '')) + " 000";
      //   } else if (value.endsWith('M')) {
      //     // Supprime 'M' et multiplie par 1 000 000
      //     return parseFloat(value.replace('M', '')) + " 000 000";
      //   }
      //   // Retourne la valeur d'origine si aucun suffixe
      //   return parseFloat(value);
      // }

  