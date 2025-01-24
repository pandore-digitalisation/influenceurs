<div className="flex bg-[#000000] h-screen">
  <aside
    className={`text-[#000000] bg-[#F4F4F5] transition-all duration-300 ${
      sidebarExpanded ? "w-64" : "w-16"
    }`}
  >
    <div className="p-4 flex items-center justify-between">
      <span
        className={`${
          !sidebarExpanded ? "hidden" : "block"
        } text-lg font-semibold`}
      >
        Mes Listes
      </span>
      <button
        onClick={toggleSidebar}
        className="text-[#D9E4FF] focus:outline-none hover:bg-gray-700 p-2 rounded"
      >
        {sidebarExpanded ? "←" : "→"}
      </button>
    </div>
    <ul className="space-y-2 p-4">
      {lists.length > 0 ? (
        lists.map((list) => (
          <li
            key={list._id}
            className={`p-2 cursor-pointer hover:bg-[#F4F4F5] rounded ${
              selectedListId === list._id ? "bg-[#E5E5E5]" : ""
            }`}
            onClick={() => handleSelectList(list)}
          >
            {sidebarExpanded ? list.name : list.name[0]}
          </li>
        ))
      ) : (
        <li>Aucune liste disponible.</li>
      )}
    </ul>
  </aside>
  {/* Main Content */}
  <main className="flex-1 overflow-y-auto p-4 pt-0">
    <h2 className="text-2xl font-bold mb-4">Profils sélectionnés</h2>
    {selectedProfiles.length > 0 ? (
      <div className="relative overflow-x-auto border sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="checkbox-all-search"
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Followers
              </th>
              <th scope="col" className="px-6 py-3">
                Following
              </th>
              <th scope="col" className="px-6 py-3">
                Plateform
              </th>
              <th scope="col" className="px-6 py-3">
                Url
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedProfiles.map(
              (profile) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {profile.name}
                  </th>
                  <td className="px-6 py-4">{profile.followers}</td>
                  <td className="px-6 py-4">{profile.following}</td>
                  <td className="px-6 py-4">{profile.plateform}</td>
                  <td className="px-6 py-4">
                    <a
                      href={profile.profileUrl}
                      target="_blank"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      v
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Sélectionnez une liste pour afficher les profils associés.</p>
    )}
  </main>
</div>

const BASE_URL = "https://example.com/api"; // Remplacez par votre URL
const connectedUserId = 123; // ID de l'utilisateur connecté
const token = "your-auth-token"; // Remplacez par votre jeton d'authentification

const listFilter = document.getElementById("listFilter");
const profilesTableBody = document.querySelector("#profilesTable tbody");
let lists = []; // Contiendra les données des listes récupérées depuis l'API

// Fonction pour récupérer les listes depuis l'API
function fetchProfiles() {
  fetch(`${BASE_URL}/lists/user/${connectedUserId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Authentification si nécessaire
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Listes récupérées :", data);
      lists = data; // Stocker les données récupérées
      populateListFilter(); // Remplir le menu déroulant
      displayProfiles(lists.flatMap((list) => list.profiles)); // Afficher tous les profils par défaut
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des listes :", error);
      const profilesList = document.getElementById("api-profiles-list");
      profilesList.innerHTML = `<p style="color: red;">Erreur lors du chargement des listes.</p>`;
    });
}

// Fonction pour remplir le menu déroulant
function populateListFilter() {
  listFilter.innerHTML = '<option value="">-- Toutes les listes --</option>'; // Option par défaut
  console.log("Listes pour le filtre :", lists); // Vérification des données
  lists.forEach((list) => {
    const option = document.createElement("option");
    option.value = list.id; // Assurez-vous que `list.id` est correct
    option.textContent = list.name; // Assurez-vous que `list.name` est correct
    listFilter.appendChild(option);
  });
}

// Fonction pour afficher les profils associés
function displayProfiles(profiles) {
  profilesTableBody.innerHTML = ""; // Réinitialise les lignes du tableau
  if (profiles.length === 0) {
    profilesTableBody.innerHTML = '<tr><td colspan="2">Aucun profil trouvé.</td></tr>';
    return;
  }
  console.log("Profils à afficher :", profiles); // Vérification des profils affichés
  profiles.forEach((profile) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${profile.id}</td>
      <td>${profile.name}</td>
    `;
    profilesTableBody.appendChild(row);
  });
}

// Gestion du changement de filtre
listFilter.addEventListener("change", () => {
  const selectedListId = listFilter.value; // Récupère l'ID sélectionné (string ou number)
  console.log("ID de la liste sélectionnée :", selectedListId); // Vérification de l'ID sélectionné

  if (selectedListId) {
    // Trouver la liste sélectionnée et afficher ses profils
    const selectedList = lists.find((list) => list.id === selectedListId); // Comparez correctement les types
    if (selectedList) {
      console.log("Liste sélectionnée :", selectedList); // Vérification de la liste
      displayProfiles(selectedList.profiles || []);
    }
  } else {
    // Afficher tous les profils si aucune liste n'est sélectionnée
    const allProfiles = lists.flatMap((list) => list.profiles || []);
    displayProfiles(allProfiles);
  }
});

// Appel initial pour récupérer les données et initialiser le filtre
fetchProfiles();

