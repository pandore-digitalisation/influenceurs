
(async () => {
  console.log("Running script for X...");

  function evaluateXPath(xpath, context = document) {
    const iterator = document.evaluate(
      xpath,
      context,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    const nodes = [];
    for (let i = 0; i < iterator.snapshotLength; i++) {
      nodes.push(iterator.snapshotItem(i));
    }
    return nodes;
  }

  async function waitForElement(xpath, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const interval = 100;
      let elapsed = 0;

      const check = () => {
        const elements = evaluateXPath(xpath);
        if (elements.length > 0) {
          resolve(elements);
        } else if (elapsed >= timeout) {
          console.log(
            "Timeout reached. Data not fully loaded. Please reload the page and try again."
          );
          reject(new Error("Timeout waiting for element"));
          const failed =
            "Timeout reached. Data not fully loaded. Please reload the page and try again.";
          chrome.runtime.sendMessage({ failed });
        } else {
          elapsed += interval;
          setTimeout(check, interval);
        }
      };

      check();
    });
  }

  const BASE_URL = "https://influenceurs.onrender.com";

  const nameXPath =
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[2]/div/div/div/div[1]/div/div/span/span[1]";
  const descriptionXPath =
    "/html/body/div[1]/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]";
  const followersXPath =
    "/html/body/div[1]/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[2]/a/span[1]/span";
  const followingXpath =
    "/html/body/div[1]/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[1]/a/span[1]/span";
  const profileImageXPath =
    "/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/div/div/div/div[1]/div[1]/div[2]/div/div[2]/div/a";

  await waitForElement(nameXPath);
  await waitForElement(followersXPath);
  await waitForElement(followingXpath);

  const nameElements = evaluateXPath(nameXPath);
  const descriptionElements = evaluateXPath(descriptionXPath);
  const followersElements = evaluateXPath(followersXPath);
  const followingElements = evaluateXPath(followingXpath);
  const profileImageElements = evaluateXPath(profileImageXPath);

  const name =
    nameElements.length > 0 ? nameElements[0].textContent.trim() : "None";
  const description =
    descriptionElements.length > 0
      ? descriptionElements[0].textContent.trim()
      : "Not found";
  const followers =
    followersElements.length > 0
      ? followersElements[0].textContent.trim()
      : "0";
  const following =
    followingElements.length > 0
      ? followingElements[0].textContent.trim()
      : "0";
  const profileImage =
    profileImageElements.length > 0
      ? profileImageElements[0].getAttribute("href") ||
        profileImageElements[0].getAttribute("src")
      : "";

  const profileUrl = window.location.href;
  const base = "https://x.com";

  async function getUserData() {
    return new Promise((resolve) => {
      chrome.storage.local.get("userData", (result) => {
        resolve(result.userData || null);
      });
    });
  }

  let userData = null;
  try {
    userData = await getUserData();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  const extractedData = {
    name,
    description,
    followers,
    following,
    plateform: "X",
    profileImage: `${base}${profileImage}`,
    profileUrl,
    userId: userData?.data?.userId || "", // User ID is empty if not connected
  };

  console.log("Extracted Data:", extractedData);

  async function sendToBackend(data) {
    try {
      const response = await fetch(`${BASE_URL}/x`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data successfully sent to the backend.");
        return true;
      } else {
        console.error("Error sending data to the backend.");
        return false;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  }

  const success = await sendToBackend(extractedData);
  console.log("Success:", success);

  chrome.runtime.sendMessage({ success });
})();







// Get the profile URL
const profileUrl = window.location.href;
const base = "https://x.com";

const userId = userData?.data?.userId || null;

// Function to fetch existing profile data
async function getExistingProfile(profileUrl) {
  try {
    const response = await fetch(`${BASE_URL}/x?profileUrl=${encodeURIComponent(profileUrl)}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching existing profile:", await response.text());
      return null;
    }
  } catch (error) {
    console.error("Network error fetching existing profile:", error);
    return null;
  }
}

// Function to send data to the backend
async function sendToBackend(data) {
  try {
    const response = await fetch(`${BASE_URL}/x`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Data successfully sent to the backend.");
      return true;
    } else {
      console.error("Error sending data to the backend.");
      return false;
    }
  } catch (error) {
    console.error("Network error:", error);
    return false;
  }
}

// Main process
(async () => {
  // Step 1: Fetch existing profile data
  const existingProfile = await getExistingProfile(profileUrl);

  // Step 2: Prepare the updated userId list
  let userIdList = existingProfile?.userId || [];
  if (userId && !userIdList.includes(userId)) {
    userIdList.push(userId);
  }

  // Step 3: Prepare the data payload
  const extractedData = {
    name,
    description,
    followers,
    following,
    plateform: "X",
    profileImage: `${base}${profileImage}`,
    profileUrl,
    userId: userIdList, // Updated userId list
  };

  console.log("Extracted Data:", extractedData);

  // Step 4: Send the updated data to the backend
  const success = await sendToBackend(extractedData);
  console.log("success", success);

  // Step 5: Communicate the status to popup.js
  chrome.runtime.sendMessage({ success });
})();





(async () => {
  // Fonction pour récupérer les données utilisateur
  async function getUserData() {
    try {
      const response = await fetch(`${BASE_URL}/user-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  // Récupérer les données utilisateur
  let userData = null;
  try {
    userData = await getUserData();
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }

  // Extraire l'ID utilisateur ou définir à `null` si non disponible
  const userId = userData?.data?.userId || null;

  if (!userId) {
    console.warn("Utilisateur non connecté ou données utilisateur manquantes.");
  }

  // Récupérer l'ID du profil existant, si il y en a (par exemple, via une requête GET)
  async function getProfileData(profileUrl) {
    try {
      const response = await fetch(`${BASE_URL}/x?profileUrl=${encodeURIComponent(profileUrl)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return await response.json(); // retourne les données du profil existant
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      return null;
    }
  }

  // URL du profil actuel
  const profileUrl = window.location.href;

  // Récupérer les données du profil existant depuis le backend
  let existingProfile = await getProfileData(profileUrl);

  // Si le profil existe, récupérer les userId existants
  let existingUserIds = [];
  if (existingProfile && existingProfile.userId) {
    existingUserIds = existingProfile.userId;
  }

  // Si un userId est trouvé, on l'ajoute à la liste existante sans la remplacer
  if (userId && !existingUserIds.includes(userId)) {
    existingUserIds.push(userId);
  }

  // Préparer les données extraites pour l'envoi au backend
  const extractedData = {
    name,
    description,
    followers,
    following,
    plateform: "X",
    profileImage: `${base}${profileImage}`,
    profileUrl,
    userId: existingUserIds, // Utilise la liste complète des userId
  };

  console.log("Données extraites :", extractedData);

  // Fonction pour envoyer les données au backend
  async function sendToBackend(data) {
    try {
      const response = await fetch(`${BASE_URL}/x`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Données envoyées avec succès au backend.");
        return true;
      } else {
        console.error("Erreur lors de l'envoi des données au backend.");
        return false;
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      return false;
    }
  }

  // Envoyer les données au backend
  const success = await sendToBackend(extractedData);
  console.log("Envoi réussi :", success);

  // Communiquer le statut à `popup.js`
  chrome.runtime.sendMessage({ success });
})();









(async () => {
  // Fonction pour récupérer les données utilisateur
  async function getUserData() {
    try {
      const response = await fetch(`${BASE_URL}/user-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  // Fonction pour récupérer le profil existant depuis le backend
  async function getExistingProfile(profileUrl) {
    try {
      const response = await fetch(`${BASE_URL}/x?profileUrl=${encodeURIComponent(profileUrl)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return await response.json(); // Retourne les données du profil existant
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      return null;
    }
  }

  // Récupérer les données utilisateur
  let userData = null;
  try {
    userData = await getUserData();
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur :", error);
  }

  // Vérifier si les données utilisateur sont disponibles
  const currentUserId = userData?.data?.userId || null;
  if (!currentUserId) {
    console.error("Utilisateur non connecté ou données utilisateur manquantes.");
    return; // Ne continue pas si les données utilisateur ne sont pas valides
  }

  // Récupérer l'URL du profil actuel
  const profileUrl = window.location.href;

  // Récupérer le profil existant
  const existingProfile = await getExistingProfile(profileUrl);

  // Si un profil existe, récupérer les userId existants
  const existingUserIds = existingProfile?.userId || [];

  // Ajouter l'actuel userId au tableau si il n'est pas déjà présent
  const updatedUserIds = existingUserIds.includes(currentUserId)
    ? existingUserIds // Ne rien changer si l'userId existe déjà
    : [...existingUserIds, currentUserId]; // Ajouter l'userId actuel s'il n'est pas présent

  // Préparer les données à envoyer au backend
  const extractedData = {
    name, // Assurez-vous d'avoir ces données définies quelque part dans votre code
    description,
    followers,
    following,
    platform: "X", // "plateform" corrigé en "platform"
    profileImage: `https://x.com${profileImage}`,
    profileUrl,
    userId: updatedUserIds, // Utiliser le tableau des userIds mis à jour
  };

  console.log("Données extraites :", extractedData);

  // Fonction pour envoyer les données au backend
  async function sendToBackend(data) {
    try {
      const response = await fetch(`${BASE_URL}/x`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Données envoyées avec succès au backend.");
        return true;
      } else {
        console.error("Erreur lors de l'envoi des données au backend.");
        return false;
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      return false;
    }
  }

  // Post the data to the backend
  const success = await sendToBackend(extractedData);
  console.log("Envoi réussi :", success);

  // Communiquer le statut à popup.js (si nécessaire)
  chrome.runtime.sendMessage({ success });
})();


import React from 'react';

const ListDisplay = ({ lists }) => {
  return (
    <div>
      <h1>Listes et Profils</h1>
      {lists.map(list => (
        <div key={list._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>{list.name}</h2>
          <p>Propriétaire : {list.userId}</p>
          <h3>Profils :</h3>
          <ul>
            {list.profiles.map(profile => (
              <li key={profile._id} style={{ marginBottom: '10px' }}>
                <p><strong>Nom :</strong> {profile.name}</p>
                <p><strong>Plateforme :</strong> {profile.plateform}</p>
                <p><strong>Abonnés :</strong> {profile.followers}</p>
                <p><strong>Publications :</strong> {profile.posts || 'N/A'}</p>
                <p><strong>URL :</strong> <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">{profile.profileUrl}</a></p>
                {profile.profileImage && profile.profileImage !== 'Not found' && (
                  <img src={profile.profileImage} alt={profile.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListDisplay;



<DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>


      