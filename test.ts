function handleListSelectionChange() {
  const selectedCheckboxes = Array.from(
    document.querySelectorAll(".listDataCheckbox:checked")
  );

  filteredListData = selectedCheckboxes.map((checkbox) => {
    const index = parseInt(checkbox.getAttribute("data-index"), 10);
    return filteredListData[index]; // Utilise `filteredListData` au lieu de recalculer depuis `lists`
  });

  console.log("Profils sélectionnés pour exportation :", filteredListData);
  // updateListExportButtonState(); // Si nécessaire
}
