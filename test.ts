//   // function cleanNumber(value) {
//   //   if (!value) return " ";
  
//   //   let cleanedValue = value.replace(/[^\d.KM]/g, "");
  
//   //   if (cleanedValue.endsWith("M")) {
//   //     return Math.round(parseFloat(cleanedValue.replace("M", "")) * 1000000);
//   //   }
  
//   //   if (cleanedValue.endsWith("K")) {
//   //     return Math.round(parseFloat(cleanedValue.replace("K", "")) * 1000);
//   //   }
  
//   //   return Math.round(parseFloat(cleanedValue));
//   // }

// const [formVisible, setFormVisible] = useState(true);




<Dialog open={isUpdateListDialogOpen} onOpenChange={setIsUpdateListDialogOpen}>
  <DialogContent className="w-full max-w-sm sm:max-w-md md:max-w-lg h-[75vh] flex flex-col mx-auto sm:px-6">
    <div className="flex-1 overflow-y-auto">
      <DialogTitle className="mb-5">Modifier votre liste</DialogTitle>

      <Label>Nom de la liste*</Label>
      <Input
        type="text"
        id="listname"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        required
        disabled={isSaving}
      />
    </div>

    <DialogFooter className="mt-4 flex justify-end gap-2 w-full">
      <Button 
        type="button" 
        variant="destructive" 
        onClick={deleteList} 
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Suppression...
          </>
        ) : (
          "Supprimer"
        )}
      </Button>

      <Button 
        type="submit" 
        variant="outline" 
        onClick={updateList} 
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sauvegarde...
          </>
        ) : (
          "Sauvegarder"
        )}
      </Button>

      <DialogClose asChild onClick={closeUpdateListDialog}>
        <Button variant="secondary" disabled={isDeleting || isSaving}>Annuler</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>



const [isDeleting, setIsDeleting] = useState(false);
const [isSaving, setIsSaving] = useState(false);

const deleteList = async () => {
  if (!selectedListId) {
    console.error("Aucune liste sélectionnée pour la suppression.");
    alert("Veuillez sélectionner une liste à supprimer.");
    return;
  }

  setIsDeleting(true);
  try {
    const response = await fetch(`${BASE_URL}/lists/${selectedListId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la suppression.");
    }

    await refetch();
    setIsUpdateListDialogOpen(false);
    console.log(`Liste ${selectedListId} supprimée avec succès.`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la liste:", error);
    alert(`Échec de la suppression de la liste : ${error.message}`);
  } finally {
    setIsDeleting(false);
  }
};

const updateList = async () => {
  if (!updatedName.trim()) {
    alert("Le nom de la liste ne peut pas être vide.");
    return;
  }

  setIsSaving(true);
  try {
    const response = await fetch(`${BASE_URL}/lists/${selectedListId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: updatedName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la mise à jour.");
    }

    await refetch();
    setIsUpdateListDialogOpen(false);
    console.log("Liste mise à jour avec succès.");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la liste:", error);
    alert(`Échec de la mise à jour de la liste : ${error.message}`);
  } finally {
    setIsSaving(false);
  }
};
