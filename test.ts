function updateExportButtonState() {
    const selected = document.querySelectorAll(".dataCheckbox:checked").length > 0;
  
    // Vérifier si les boutons existent avant de les désactiver/activer
    if (exportToCsvButton) {
      exportToCsvButton.disabled = !selected;
    }
    if (exportToXlsButton) {
      exportToXlsButton.disabled = !selected;
    }
  }