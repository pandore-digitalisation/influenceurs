let lists = [];
let filteredListData = [];
const listFilter = document.getElementById("listFilter");
const loader = document.getElementById("loader"); // Assurez-vous que cet élément existe dans votre HTML
const exportBtn = document.getElementById("exportBtn");

// Fonction pour récupérer les listes depuis l'API
async function fetchProfiles(userId, token) {
  try {
    const response = await fetch(`${BASE_URL}/lists/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }

    const data = await response.json();
    // console.log("Listes récupérées :", data);

    lists = data;
    populateListFilter();
    // Affichage par défaut : tous les profils de toutes les listes
    displayProfiles(lists.flatMap((list) => list.profiles));
  } catch (error) {
    console.error("Erreur lors de la récupération des listes :", error);
    return [];
  } finally {
    loader.style.display = "none";
  }
}

// Fonction pour remplir le menu déroulant
function populateListFilter() {
  // console.log("Listes pour le filtre :", lists);
  listFilter.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Toutes les listes";
  listFilter.appendChild(defaultOption);

  lists.forEach((list) => {
    const option = document.createElement("option");
    option.value = list._id;
    option.textContent = list.name;
    listFilter.appendChild(option);
  });
}

listFilter.addEventListener("change", () => {
  const selectedListId = listFilter.value;
  if (!selectedListId) {
    displayProfiles(lists.flatMap((list) => list.profiles));
  } else {
    const selectedList = lists.find((list) => list._id === selectedListId);
    if (selectedList) {
      displayProfiles(selectedList.profiles);
    } else {
      displayProfiles([]);
    }
  }
});

async function displayProfiles(profiles) {
  const userListsProfiles = document.querySelector("#userListsProfiles tbody");
  const profileListDataBlock = document.getElementById("profileListData");
  const listPrevBtn = document.getElementById("listPrevBtn");
  const listNextBtn = document.getElementById("listNextBtn");
  const listPageInfo = document.getElementById("listPageInfo");
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");

  if (profiles.length === 0) {
    const noProfileListData = document.getElementById("noProfileListData");
    if (noProfileListData) {
      noProfileListData.style.display = "block";
    }
    if (profileListDataBlock) {
      profileListDataBlock.style.display = "none";
    }
    if (userListsProfiles) {
      userListsProfiles.innerHTML = "";
    }
    // On désactive le bouton d'export si aucune donnée n'est affichée
    if (exportBtn) exportBtn.disabled = true;
    return;
  } else {
    const noProfileListData = document.getElementById("noProfileListData");
    if (noProfileListData) {
      noProfileListData.style.display = "none";
    }
    if (profileListDataBlock) {
      profileListDataBlock.style.display = "block";
    }
  }

  const rowsPerPage = 5;
  let currentPage = 1;

  profiles.sort((a, b) => a.name.localeCompare(b.name));

  function displayPage(page) {
    userListsProfiles.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = profiles.slice(start, end);

    function truncateName(name) {
      return name.length > 8 ? name.slice(0, 8) + "..." : name;
    }

    paginatedData.forEach((item, index) => {
      const row = document.createElement("tr");
      const name = truncateName(item.name);
      const followers = item.followers;
      const followingOrConnection = item.following || item.connection || " ";
      const profileUrl = item.profileUrl;
      const plateform = item.plateform;

      row.innerHTML = `
        <td>
          <div class="ui checkbox">
            <input type="checkbox" class="profileCheckbox" data-index="${index}">
            <label>${index + 1}</label>
          </div>
        </td>
        <td>
          <a href="${profileUrl}" target="_blank" style="text-decoration: none;" title="${item.name}">
            ${name}
          </a>
        </td>
        <td>${followers}</td>
        <td>${followingOrConnection}</td>
        <td>${plateform}</td>
      `;
      userListsProfiles.appendChild(row);
    });

    listPageInfo.textContent = `${currentPage}/${Math.ceil(
      profiles.length / rowsPerPage
    )}`;

    listPrevBtn.disabled = currentPage === 1;
    listNextBtn.disabled = currentPage === Math.ceil(profiles.length / rowsPerPage);

    // Réinitialiser la case "Select All" après le rendu de la page
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = false;
    }
    
    // Attacher un écouteur à chaque case pour mettre à jour l'état du bouton d'export
    const checkboxes = userListsProfiles.querySelectorAll("input.profileCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", updateExportButtonState);
    });
    
    // Mise à jour de l'état du bouton d'export (aucune case cochée donc désactivé)
    updateExportButtonState();
  }

  listPrevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });

  listNextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(profiles.length / rowsPerPage)) {
      currentPage++;
      displayPage(currentPage);
    }
  });

  displayPage(currentPage);
}

// Fonction qui met à jour l'état du bouton d'export
function updateExportButtonState() {
  const table = document.getElementById("userListsProfiles");
  if (!table) return;
  const checkboxes = table.querySelectorAll("input.profileCheckbox");
  let isAnyChecked = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isAnyChecked = true;
    }
  });
  // Le bouton d'export est activé uniquement si au moins une case est cochée
  if (exportBtn) {
    exportBtn.disabled = !isAnyChecked;
  }
}

// Fonction d'export vers Excel en fonction de la sélection
function exportToExcel() {
  // On récupère le tableau affiché
  const table = document.getElementById("userListsProfiles");
  if (!table) {
    console.error("Le tableau avec l'ID 'userListsProfiles' est introuvable.");
    return;
  }

  // Récupérer toutes les cases à cocher
  const checkboxes = table.querySelectorAll("input.profileCheckbox");
  let selectedRows = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const row = checkbox.closest("tr");
      if (row) {
        // Cloner la ligne pour l'export
        selectedRows.push(row.cloneNode(true));
      }
    }
  });

  let exportTable;

  if (selectedRows.length > 0) {
    // Créer une table temporaire pour l'export
    exportTable = document.createElement("table");

    // Cloner et ajouter l'en-tête du tableau original
    const thead = table.querySelector("thead");
    if (thead) {
      exportTable.appendChild(thead.cloneNode(true));
    }

    // Créer un tbody et y ajouter les lignes sélectionnées
    const newTbody = document.createElement("tbody");
    selectedRows.forEach((row) => {
      newTbody.appendChild(row);
    });
    exportTable.appendChild(newTbody);
  } else {
    // Aucune case cochée : exporter l'ensemble du tableau affiché
    exportTable = table;
  }

  // Créer le workbook à partir de la table exportée et déclencher le téléchargement
  const workbook = XLSX.utils.table_to_book(exportTable, { sheet: "Profils" });
  XLSX.writeFile(workbook, "export_profiles.xlsx");
}

// Gestion du "Select All" dans l'en-tête
const selectAllCheckbox = document.getElementById("selectAllCheckbox");
if (selectAllCheckbox) {
  selectAllCheckbox.addEventListener("change", () => {
    const table = document.getElementById("userListsProfiles");
    if (!table) return;
    // Sélectionne ou désélectionne toutes les cases à cocher visibles
    const checkboxes = table.querySelectorAll("input.profileCheckbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
    // Mettre à jour l'état du bouton d'export après changement de "Select All"
    updateExportButtonState();
  });
} else {
  console.error("La case 'Select All' (selectAllCheckbox) est introuvable.");
}

// Attacher l'événement sur le bouton d'export
if (exportBtn) {
  exportBtn.addEventListener("click", exportToExcel);
} else {
  console.error("Le bouton d'export avec l'ID 'exportBtn' est introuvable.");
}
