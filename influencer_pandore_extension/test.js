// Fonction pour détecter la plateforme actuelle
function detectPlatform() {
    const url = window.location.href;
    if (url.includes("x.com")) return "X";
    if (url.includes("instagram.com")) return "Instagram";
    if (url.includes("facebook.com")) return "Facebook";
    if (url.includes("linkedin.com")) return "LinkedIn";
    return null; // Autres sites non supportés
  }

  // Fonction pour injecter un bouton
  function injectButton(platform) {
    const existingButton = document.getElementById("scrapeBtn");
    if (existingButton) return; // Éviter d'injecter plusieurs fois

    const button = document.createElement("scrapeBtn");
    button.id = "pandore-btn";
    button.textContent = `Get ${platform} Data`;
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.padding = "10px 15px";
    button.style.backgroundColor =
      platform === "X"
        ? "#1da1f2"
        : platform === "Instagram"
        ? "#E1306C"
        : platform === "Facebook"
        ? "#1877F2"
        : platform === "LinkedIn"
        ? "#0077B5"
        : "#000";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.zIndex = "9999";

    document.body.appendChild(button);

    // Ajouter une action au clic
    button.addEventListener("click", () => {
      console.log(`Fetching ${platform} data...`);

      // Collecter des données spécifiques à la plateforme
      const pageData = {
        platform,
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      // Envoyer les données au backend
      fetch("http://127.0.0.1:5001/api/collect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pageData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data sent successfully:", data);
          alert("Data collected successfully!");
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          alert("Failed to send data.");
        });
    });
  }

  // Exécution principale
  const platform = detectPlatform();
  if (platform) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => injectButton(platform));
    } else {
      injectButton(platform);
    }
  }
