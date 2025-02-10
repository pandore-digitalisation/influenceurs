function cleanNumber(value) {
    if (!value) return " ";
  
    // Retirer tous les caractères non numériques, sauf 'K' et 'M'
    let cleanedValue = value.replace(/[^\d.KM]/g, "");
  
    // Si la valeur se termine par "M"
    if (cleanedValue.endsWith("M")) {
      return parseFloat(cleanedValue.replace("M", "")) * 1000000;
    }
  
    // Si la valeur se termine par "K"
    if (cleanedValue.endsWith("K")) {
      return parseFloat(cleanedValue.replace("K", "")) * 1000;
    }
  
    // Si la valeur n'a ni "M" ni "K", retour du nombre tel quel
    return parseFloat(cleanedValue);
  }
  