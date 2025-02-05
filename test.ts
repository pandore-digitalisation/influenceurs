const openPopupBtn = document.getElementById("createListBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const profilesCheckboxContainer = document.getElementById("profilesCheckboxContainer");
const createListSubmitBtn = document.getElementById("createListSubmitBtn");
const dropdownBtn = document.getElementById("dropdownBtn");
const profilesDropdown = document.getElementById("profilesDropdown");
const userId = "ID_UTILISATEUR_CONNECTÉ"; // Remplacer par l'ID de l'utilisateur connecté

let allProfiles = []; // Stockage des profils récupérés

// Ouvrir le popup et charger les profils
openPopupBtn.addEventListener("click", async () => {
  popup.style.display = "block";
  overlay.style.display = "block";
  await loadProfilesForDropdown();
});

// Fermer le popup
closePopupBtn.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);

function closePopup() {
  popup.style.display = "none";
  overlay.style.display = "none";
  profilesCheckboxContainer.innerHTML = ""; // Nettoyer les cases à cocher
  profilesDropdown.style.display = "none";  // Fermer le dropdown si ouvert
}

// Gestion du dropdown
dropdownBtn.addEventListener("click", () => {
  profilesDropdown.style.display = profilesDropdown.style.display === "block" ? "none" : "block";
});

// Charger les profils dans le dropdown
async function loadProfilesForDropdown() {
  const profiles = await fetchScrappedProfiles(userId);
  allProfiles = profiles; // Stocker pour un accès facile plus tard
  profilesCheckboxContainer.innerHTML = ""; 

  profiles.forEach(profile => {
    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.classList.add("checkbox-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `profile-${profile.id}`;
    checkbox.value = profile.id;

    const label = document.createElement("label");
    label.htmlFor = `profile-${profile.id}`;
    label.textContent = profile.name; 

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);
    profilesCheckboxContainer.appendChild(checkboxWrapper);
  });
}

// Créer la liste
createListSubmitBtn.addEventListener("click", async () => {
  const listName = document.getElementById("listName").value;

  const selectedProfileIds = Array.from(profilesCheckboxContainer.querySelectorAll("input[type='checkbox']:checked"))
    .map(checkbox => checkbox.value);

  if (!listName || selectedProfileIds.length === 0) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // Obtenir les données complètes des profils sélectionnés
  const selectedProfiles = allProfiles.filter(profile => selectedProfileIds.includes(profile.id));

  const profilesData = selectedProfiles.map(profile => ({
    id: profile.id,
    name: profile.name,
    followers: profile.followers,
    following: profile.following,
    platform: profile.platform,
    url: profile.url
  }));

  try {
    const response = await fetch(`${BASE_URL}/lists/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: listName,
        profiles: profilesData,
        userId: userId,
      }),
    });

    if (response.ok) {
      alert("Liste créée avec succès !");
      closePopup();
    } else {
      throw new Error("Erreur lors de la création de la liste.");
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur s'est produite.");
  }
});


<!-- Popup pour la création de liste -->
<div id="popup" class="popup" style="display: none;">
  <div class="popup-content">
    <span id="closePopupBtn" class="close-btn">&times;</span>
    <h2>Créer une nouvelle liste</h2>
    
    <label for="listName">Nom de la liste :</label>
    <input type="text" id="listName" placeholder="Entrez le nom de la liste" />

    <label>Profils associés :</label>
    <div class="dropdown">
      <button id="dropdownBtn">Sélectionner des profils ▼</button>
      <div id="profilesDropdown" class="dropdown-content" style="display: none;">
        <div id="profilesCheckboxContainer"></div>
      </div>
    </div>

    <button id="createListSubmitBtn">Créer la liste</button>
  </div>
</div>

<div id="overlay" class="overlay" style="display: none;"></div>




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "userLoggedIn" && message.token) {
    chrome.storage.sync.set({ auth_token: message.token }, () => {
      console.log("Token sauvegardé :", message.token);
      sendResponse({ status: "success" });
    });

    // Permet de répondre de manière asynchrone
    return true;
  }
});







