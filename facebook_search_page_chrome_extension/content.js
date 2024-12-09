(async () => {
    // Helper function to evaluate XPath
    function evaluateXPath(xpath, context = document) {
        const iterator = document.evaluate(
            xpath,
            context,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        console.log("Nombre d'éléments trouvés :", iterator.snapshotLength)


        const nodes = [];
        for (let i = 0; i < iterator.snapshotLength; i++) {
            nodes.push(iterator.snapshotItem(i));
        }
        return nodes;
    }

    // Define the parent XPath and sub-XPaths
    const parentXPath = "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div"; // À adapter selon votre structure
    const nameXPath = ".//div/div/div[1]/span/div/a/span";
    const followersXPath = ".//div/div/div[2]/span/span";
    const descriptionXPath = ".//div/div/div[3]/span/span";

    const allSearches = [];

    // Wait for the page to load or observe dynamically
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Extract data
    function extractData() {
        const parentElements = evaluateXPath(parentXPath);

        console.log("Nombre d'éléments trouvés :", parentElements.length);

        if (parentElements.length === 0) {
            console.warn("Aucun résultat trouvé. Vérifiez le XPath.");
            return;
        }

        parentElements.forEach((parent, index) => {
            try {
                const nameNode = evaluateXPath(nameXPath, parent)[0];
                const followersNode = evaluateXPath(followersXPath, parent)[0];
                const descriptionNode = evaluateXPath(descriptionXPath, parent)[0];

                const name = nameNode?.textContent?.trim() || "Nom introuvable";
                const followers = followersNode?.textContent?.trim() || "Followers introuvables";
                const description = descriptionNode?.textContent?.trim() || "Description introuvable";
                const url = parent.querySelector("a")?.href || "URL introuvable";

                console.log(`Résultat ${index + 1}:`, { name, followers, description, url });

                allSearches.push({ url, name, followers, description });
            } catch (error) {
                console.error(`Erreur lors de l'extraction du résultat ${index + 1}:`, error);
            }
        });
    }

    console.log("Extraction en cours...");
    extractData();

    console.log("Données extraites :", allSearches);

    // Save data to localStorage
    if (allSearches.length > 0) {
        localStorage.setItem("facebookSearches", JSON.stringify(allSearches));
        console.log("Données sauvegardées dans localStorage.");
    } else {
        console.warn("Aucune donnée à sauvegarder.");
    }
})();


// (async () => {
//     // Helper function to evaluate an XPath expression and return nodes
//     function evaluateXPath(xpath, context = document) {
//         const iterator = document.evaluate(
//             xpath,
//             context,
//             null,
//             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
//             null
//         );
//         console.log("Nombre d'éléments trouvés :", iterator.snapshotLength)

//         const nodes = [];
//         for (let i = 0; i < iterator.snapshotLength; i++) {
//             nodes.push(iterator.snapshotItem(i));
//         }
//         return nodes;
//     }

//     // Define the parent XPath to target each search result item
//     const parentXPath =
//         "/html/body/div[1]/div/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div"; // XPath pour chaque élément de résultat de recherche
//     const nameXPath = ".//div/div/div[1]/span/div/a/span"; // XPath pour le nom
//     const followersXPath = ".//div/div/div[2]/span/span"; // XPath pour les abonnés
//     const descriptionXPath = ".//div/div/div[3]/span/span"; // XPath pour la description

//     // Array to store all extracted searches
//     const allSearches = [];

//     // Function to extract data from the current page
//     function extractData() {
//         // Get all parent elements for the search results
//         const parentElements = evaluateXPath(parentXPath);

//         if (parentElements.length === 0) {
//             console.warn("Aucun résultat trouvé avec le XPath spécifié.");
//             return;
//         }

//         // Iterate through each parent element and extract data
//         parentElements.forEach((parent) => {
//             const nameElements = evaluateXPath(nameXPath, parent);
//             const name = nameElements.length > 0 ? nameElements[0].textContent.trim() : null;

//             const followersElements = evaluateXPath(followersXPath, parent);
//             const followers = followersElements.length > 0 ? followersElements[0].textContent.trim() : null;

//             const descriptionElements = evaluateXPath(descriptionXPath, parent);
//             const description = descriptionElements.length > 0 ? descriptionElements[0].textContent.trim() : null;

//             // Extract the URL
//             const urlElement = parent.querySelector("a");
//             const url = urlElement ? urlElement.href : null;

//             allSearches.push({
//                 url,
//                 name,
//                 followers,
//                 description,
//             });
//         });
//     }

//     // Extract data from the current page
//     console.log("Extracting data from the current page...");
//     extractData();

//     // Log all extracted searches
//     console.log("Extracted Searches:", allSearches);

//     // Optionally, store the searches in localStorage
//     localStorage.setItem("facebookSearches", JSON.stringify(allSearches));
    
// })();
