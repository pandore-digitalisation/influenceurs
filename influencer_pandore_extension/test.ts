let latestUserData = null; // Stocke les données utilisateur
let token = null; // Stocke le token utilisateur

// Écouteur des messages envoyés depuis l'extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserData") {
    console.log("Demande de données utilisateur reçue.");

    // Vérifiez si les données utilisateur sont disponibles
    if (latestUserData && token) {
      console.log("Données utilisateur disponibles, réponse immédiate.");
      sendResponse({ userData: latestUserData, token: token });
    } else {
      console.log("Aucune donnée utilisateur, récupération en cours...");
      // Simulez une récupération des données (par exemple, depuis une API)
      fetchUserData()
        .then((data) => {
          latestUserData = data.userData;
          token = data.token;

          sendResponse({ userData: latestUserData, token: token });
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
          sendResponse(null); // Réponse avec des données nulles en cas d'erreur
        });
    }

    // Indiquez que la réponse sera envoyée de manière asynchrone
    return true;
  }
});

// Simule la récupération des données utilisateur depuis une API
function fetchUserData() {
  return new Promise((resolve, reject) => {
    // Remplacez cette partie par votre logique réelle (exemple avec une API simulée)
    setTimeout(() => {
      resolve({
        userData: {
          data: {
            userId: "12345",
            name: "John Doe",
            picture: "https://example.com/profile.jpg",
          },
        },
        token: "your-jwt-token",
      });
    }, 500); // Simule un délai de 500ms pour la récupération
  });
}
