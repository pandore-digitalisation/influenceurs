  function cleanNumber(value) {
    if (!value) return " ";
  
    let cleanedValue = value.replace(/[^\d.KM]/g, "");
  
    if (cleanedValue.endsWith("M")) {
      return Math.round(parseFloat(cleanedValue.replace("M", "")) * 1000000);
    }
  
    if (cleanedValue.endsWith("K")) {
      return Math.round(parseFloat(cleanedValue.replace("K", "")) * 1000);
    }
  
    return Math.round(parseFloat(cleanedValue));
  }
  
  