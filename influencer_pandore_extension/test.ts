// Fonction qui envoie un message à l'extension pour signaler la connexion
function onLogin(token, userData) {
  // Envoie le message de connexion à l'extension
  window.postMessage({ action: 'login', token: token, userData: userData }, window.location.origin);
}

// Lorsque l'utilisateur se déconnecte
function onLogout() {
  // Envoie le message de déconnexion à l'extension
  window.postMessage({ action: 'logout' }, window.location.origin);
}
