  // function cleanNumber(value) {
  //   if (!value) return " ";
  
  //   let cleanedValue = value.replace(/[^\d.KM]/g, "");
  
  //   if (cleanedValue.endsWith("M")) {
  //     return Math.round(parseFloat(cleanedValue.replace("M", "")) * 1000000);
  //   }
  
  //   if (cleanedValue.endsWith("K")) {
  //     return Math.round(parseFloat(cleanedValue.replace("K", "")) * 1000);
  //   }
  
  //   return Math.round(parseFloat(cleanedValue));
  // }
  

  const CONFIG = {
    BASE_URL: "https://influenceur-list.onrender.com",
    FRONT_BASE_URL: "https://pandoreinfluencerfrontend.vercel.app",
    PAGE_SIZE: 5
  };
  
  let authState = {
    token: null,
    user: null,
    userId: null
  };
  
  const DOM = {
    loader: document.getElementById("loader"),
    elements: {}
  };
  
  // Cache des éléments DOM fréquemment utilisés
  function cacheDomElements() {
    const elements = [
      'scrapeButton', 'openContainer', 'listSelection', 'statusMessage',
      'getDataContainer', 'close-sidebar-btn', 'auth', 'scrappedDataTable',
      'userListsProfiles', 'listFilter', 'exportBtn', 'createListBtn', 'popup'
    ];
    
    elements.forEach(id => {
      DOM.elements[id] = document.getElementById(id);
    });
  }
  
  // Gestionnaire d'erreurs centralisé
  function handleError(error, context) {
    console.error(`[${context}] Erreur:`, error);
    // Ajouter ici la logique d'affichage des erreurs à l'utilisateur
  }
  
  // Helpers de pagination
  const paginationHelper = {
    createPaginator: (data, pageSize) => {
      let currentPage = 1;
      
      return {
        getPage: (page) => {
          currentPage = page;
          const start = (page - 1) * pageSize;
          return data.slice(start, start + pageSize);
        },
        getTotalPages: () => Math.ceil(data.length / pageSize),
        currentPage: () => currentPage
      };
    }
  };
  
  // Gestionnaire de données utilisateur
  const authService = {
    async fetchUserData() {
      try {
        const response = await fetch(`${CONFIG.BASE_URL}/auth/user`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Erreur de récupération des données utilisateur');
        return await response.json();
      } catch (error) {
        handleError(error, 'authService');
        return null;
      }
    },
  
    async refreshAuthState() {
      const { auth_token, userData } = await chrome.storage.sync.get(['auth_token', 'userData']);
      authState = {
        token: auth_token,
        user: userData,
        userId: userData?.data?.userId
      };
    }
  };
  
  // Service de gestion des listes
  const listService = {
    async fetchLists() {
      try {
        const response = await fetch(`${CONFIG.BASE_URL}/lists/user/${authState.userId}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
            'Content-Type': 'application/json'
          }
        });
        return await response.json();
      } catch (error) {
        handleError(error, 'listService');
        return [];
      }
    },
  
    async createList(listData) {
      try {
        const response = await fetch(`${CONFIG.BASE_URL}/lists/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authState.token}`
          },
          body: JSON.stringify(listData)
        });
        return response.ok;
      } catch (error) {
        handleError(error, 'listService');
        return false;
      }
    }
  };
  
  // Gestionnaire d'UI
  const UIHelper = {
    toggleElement(element, show) {
      element.style.display = show ? 'block' : 'none';
    },
  
    populateDropdown(dropdown, items, emptyMessage) {
      dropdown.innerHTML = '';
      
      if (items.length === 0) {
        dropdown.innerHTML = `<option>${emptyMessage}</option>`;
        return;
      }
      
      items.forEach(item => {
        const option = document.createElement('option');
        option.value = item._id;
        option.textContent = item.name;
        dropdown.appendChild(option);
      });
    }
  };
  
  // Initialisation
  async function init() {
    await cacheDomElements();
    await authService.refreshAuthState();
    
    if (!authState.token) {
      UIHelper.toggleElement(DOM.elements.welcomeScreen, true);
      return;
    }
    
    setupEventListeners();
    loadInitialData();
  }
  
  function setupEventListeners() {
    DOM.elements.openContainer.addEventListener('click', toggleDataContainer);
    DOM.elements.scrapeButton.addEventListener('click', handleScrape);
    DOM.elements.closeSidebarBtn.addEventListener('click', () => window.parent.postMessage("close-sidebar", "*"));
    // Ajouter ici les autres écouteurs d'événements
  }
  
  async function loadInitialData() {
    try {
      const [lists, profiles] = await Promise.all([
        listService.fetchLists(),
        profileService.fetchScrappedProfiles()
      ]);
      
      UIHelper.populateDropdown(DOM.elements.listSelection, lists, "Vous n'avez pas de liste");
      updateProfileUI(profiles);
    } catch (error) {
      handleError(error, 'loadInitialData');
    }
  }
  
  // Fonction de scraping
  async function handleScrape() {
    const { value: selectedList } = DOM.elements.listSelection;
    
    if (!selectedList) {
      DOM.elements.statusMessage.textContent = "Veuillez sélectionner une liste.";
      return;
    }
    
    try {
      await chrome.storage.sync.set({ selectedList });
      const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      const platformScripts = {
        'x.com': 'x.js',
        'instagram.com': 'instagram.js',
        // ... autres plateformes
      };
      
      const hostname = new URL(currentTab.url).hostname;
      const scriptFile = platformScripts[hostname];
      
      if (!scriptFile) {
        UIHelper.toggleElement(DOM.elements.notSupportedMessage, true);
        return;
      }
      
      await chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files: [`./scripts/${scriptFile}`]
      });
      
      DOM.elements.scrapeButton.textContent = "En cours...";
    } catch (error) {
      handleError(error, 'handleScrape');
    }
  }
  
  // Gestion des données de profil
  const profileService = {
    async fetchScrappedProfiles() {
      try {
        const response = await fetch(`${CONFIG.BASE_URL}/platforms/all`);
        return response.json();
      } catch (error) {
        handleError(error, 'profileService');
        return [];
      }
    },
  
    async exportProfiles(profiles) {
      const dataToExport = [
        ['Nom Complet', 'Followers', 'Following', 'Plateforme', 'URL du Profil'],
        ...profiles.map(p => [p.name, p.followers, p.following, p.plateform, p.profileUrl])
      ];
      
      const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Profils");
      XLSX.writeFile(workbook, 'export_profiles.xlsx');
    }
  };
  
  // Initialisation de l'application
  document.addEventListener('DOMContentLoaded', init);
  




  //-------------  GET SCRAPPED DATA AND ADD TO LIST -------------//

const scrapeButton = document.getElementById("scrapeButton");
const openContainer = document.getElementById("openContainer");
const listDropdown = document.getElementById("listSelection");
const statusMessage = document.getElementById("statusMessage");
const getDataContainer = document.querySelector(".getDataContainer");

// Toggle du conteneur d'affichage
openContainer.addEventListener("click", () => {
  getDataContainer.style.display = getDataContainer.style.display === "block" ? "none" : "block";
});

// Récupérer les listes utilisateur
async function fetchUserLists(userId, token) {
  try {
    const response = await fetch(`${BASE_URL}/lists/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Erreur lors de la récupération des listes");

    const lists = await response.json();
    updateListDropdown(lists);
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Erreur de récupération des listes.";
  }
}

// Mettre à jour le menu déroulant des listes
function updateListDropdown(lists) {
  listDropdown.innerHTML = "";
  scrapeButton.disabled = lists.length === 0;

  if (lists.length === 0) {
    listDropdown.innerHTML = '<option>Vous n\'avez pas de liste</option>';
    return;
  }

  lists.forEach(({ _id, name }) => {
    const option = document.createElement("option");
    option.value = _id;
    option.textContent = name;
    listDropdown.appendChild(option);
  });
}

// Gestion du clic sur le bouton de scraping
scrapeButton.addEventListener("click", () => {
  const selectedList = listDropdown.value;
  if (!selectedList) {
    statusMessage.textContent = "Veuillez sélectionner une liste.";
    return;
  }

  chrome.storage.sync.set({ selectedList });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;

    const url = new URL(tabs[0].url);
    const scriptMapping = {
      "x.com": "content_x.js",
      "instagram.com": "content_instagram.js",
      "facebook.com": "content_facebook.js",
      "linkedin.com": "content_linkedin.js",
      "tiktok.com": "content_tiktok.js",
    };

    const scriptFile = Object.entries(scriptMapping).find(([domain]) =>
      url.hostname.includes(domain)
    )?.[1];

    if (!scriptFile) {
      handleUnsupportedPlatform();
      return;
    }

    injectScript(tabs[0].id, scriptFile);
  });

  scrapeButton.textContent = "En cours...";
});

// Injection du script de scraping
function injectScript(tabId, scriptFile) {
  chrome.scripting.executeScript({
    target: { tabId },
    files: [`./scripts/${scriptFile}`],
  });
}

// Gestion des plateformes non supportées
function handleUnsupportedPlatform() {
  const notSupportedMessage = document.getElementById("notSupportedMessage");
  const notSupportedMessageClose = document.getElementById("notSupportedMessageClose");

  notSupportedMessage.style.display = "block";
  scrapeButton.textContent = "Enregistré";

  notSupportedMessageClose.addEventListener("click", () => {
    notSupportedMessage.style.display = "none";
    scrapeButton.style.display = "flex";
    scrapeButton.textContent = "Obtenir";
  });
}

//-------------  END OF GET SCRAPPED DATA AND ADD TO LIST -------------//
