chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "userLoggedOut") {
    console.log("L'utilisateur a été déconnecté. Mise à jour de l'interface.");

    // Nettoyer les données locales
    localStorage.removeItem("userData");
    localStorage.removeItem("token");

    // Mettre à jour l'interface utilisateur
    document.getElementById("auth").innerHTML =
      "<p>Vous êtes déconnecté. Veuillez vous reconnecter.</p>";

    // Désactiver d'autres fonctionnalités si nécessaire
    const createList = document.getElementById("createList");
    if (createList) {
      createList.disabled = true;
    }
  }
});
