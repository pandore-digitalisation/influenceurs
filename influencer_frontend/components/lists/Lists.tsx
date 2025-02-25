"use client";

import { Loader } from "@/components/loaders/Loader";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Info, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ProfilesList from "./ProfilesList";

const BASE_URL = "http://localhost:3000";
const ITEMS_PER_PAGE = 8;

export default function Lists() {
  const [selectedListId, setSelectedListId] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const fetchUserLists = async () => {
    const response = await fetch(`${BASE_URL}/lists/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur de récupération des listes");
    }

    const data = await response.json();
    return data.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const {
    data: lists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userLists", userId],
    queryFn: fetchUserLists,
    enabled: !!userId, // Exécuter seulement si userId est défini
  });

  const [formVisible, setFormVisible] = useState(false);
  const [isUpdateListDialogOpen, setIsUpdateListDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [listNameRequired, setlistNameRequired] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
const [isSaving, setIsSaving] = useState(false);
  const [listCreated, setListCreated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listName, setListName] = useState("");
  const [profiles, setProfiles] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLists = lists.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(lists.length / ITEMS_PER_PAGE);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const openProfileDialog = (listId: any) => {
    setSelectedListId(listId);
    setIsProfileDialogOpen(true);
  };

  const closeProfileDialog = () => {
    setSelectedListId(null);
    setIsProfileDialogOpen(false);
  };

  const openUpdateListDialog = (listId: any, listName: string) => {
    setSelectedListId(listId);
    setUpdatedName(listName);
    setIsUpdateListDialogOpen(true);
  };

  const closeUpdateListDialog = () => {
    setSelectedListId(null);
    setIsProfileDialogOpen(false);
  };

  const updateList = async () => {
    if (!selectedListId || !updatedName.trim()) return;

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

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      await refetch();
      setIsUpdateListDialogOpen(false);
      setUpdatedName("");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Échec de la mise à jour de la liste.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteList = async () => {
    if (!selectedListId) {
      // console.error("Aucune liste sélectionnée pour la suppression.");
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

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      await refetch();
      setIsUpdateListDialogOpen(false);
      // console.log(`Liste ${selectedListId} supprimée avec succès.`);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Échec de la mise à jour de la liste.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!listName.trim()) {
      setlistNameRequired(true);
      setTimeout(() => {
        setlistNameRequired(false);
      }, 3000);
      return;
    }
    const token = localStorage.getItem("token");
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userId = userData?.data.userId || null;

    if (!token || !userId) {
      alert("Utilisateur non authentifié. Veuillez vous reconnecter.");
      return;
    }

    let profileObjects = [];
    if (profiles.trim()) {
      try {
        profileObjects = JSON.parse(profiles);
        if (!Array.isArray(profileObjects)) {
          throw new Error("Les profils doivent être sous forme de tableau.");
        }
      } catch (error) {
        console.error("Erreur lors du parsing des profils:", error);
        alert("Le format des profils est invalide.");
        return;
      }
    }

    const newList = {
      name: listName,
      userId: userId,
      profiles: profileObjects.length > 0 ? profileObjects : undefined,
      // profiles: profiles ? profiles.split(",").map((p) => p.trim()) : undefined,
    };

    try {
      const response = await fetch(`${BASE_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la liste.");
      }
      setListCreated(true);
      refetch();
      setListName("");
      setProfiles("");
      setTimeout(() => {
        closeForm();
        setListCreated(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <nav className="flex h-12 shrink-0 items-center gap-2 border-b sticky top-12 bg-white z-40">
          <div className="flex items-center gap-2 px-3"></div>
          <div className="ml-auto pr-5">
            {/* Card dialog */}
            <span className="dioalog">
              <Dialog open={formVisible} onOpenChange={setFormVisible}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    onClick={openForm}
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded"
                  >
                    Créer une nouvelle liste +
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-5">
                      Créez votre liste
                    </DialogTitle>
                    {listCreated && (
                      <span className="text-green-800">
                        Liste créée avec succès !
                      </span>
                    )}
                    {listNameRequired && (
                      <span className="text-red-800">
                        Le nom de la liste est obligatoire.
                      </span>
                    )}
                    <Alert variant="default">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Définissez un nom de liste pour y stocker vos données.
                        Vous pourrez ensuite gérer toutes vos listes depuis "Mes
                        listes".
                      </AlertDescription>
                    </Alert>
                  </DialogHeader>

                  <form onSubmit={handleCreateList}>
                    <div className="grid gap-4 py-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5 mb-10">
                        <Label>Nom de la liste*</Label>
                        <Input
                          type="text"
                          id="listname"
                          value={listName}
                          onChange={(e) => setListName(e.target.value)}
                          placeholder="Ex: Ma liste"
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex justify-between w-ful">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary" className="">
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button type="submit" className="">
                        Créer une liste
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </span>
          </div>
        </nav>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div>Nombre total de listes : {lists.length}</div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader />
            </div>
          ) : lists.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              Vous n'avez pas de liste.
            </div>
          ) : (
            <span>
              <div className="grid auto-rows-min gap-4 md:grid-cols-4 grid-cols-1">
                {paginatedLists.map((list: any) => (
                  <Card className="aspect-video rounded-xl p-3" key={list._id}>
                    <CardHeader className="p-0 min-h-[50px]">
                      <span>{list.name}</span>
                    </CardHeader>
                    <CardContent className="h-1/2 p-0 min-h-[80px]">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <span className="gap-2 pr-3 flex">
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                          </svg>
                          {list.profiles.length}{" "}
                        </span>
                        <span className="flex">
                          <span className="flex -space-x-4 rtl:space-x-reverse">
                            {list.profiles.slice(0, 3).map((profile: any) => (
                              <img
                                key={profile._id}
                                className="w-7 h-7 border-2 rounded-full border-white"
                                src={`${BASE_URL}/proxy?url=${encodeURIComponent(
                                  profile.profileImage
                                )}`}
                                alt={profile.name}
                              />
                            ))}

                            {list.profiles.length > 3 && (
                              <span className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600">
                                +
                              </span>
                            )}
                          </span>
                        </span>
                      </span>
                    </CardContent>
                    <CardFooter className="h-1/4 p-0 gap-2">
                    
                      <button
                        type="button"
                        onClick={() => openProfileDialog(list._id)}
                        className="w-full py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 flex items-center gap-2 justify-center"
                      >
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                            className="w-4 h-4"
                          >
                            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
                          </svg>
                        </span>
                        <span>Voir les profils</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openUpdateListDialog(list._id, list.name)
                        }
                        className="w-50 py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="w-4 h-4 text-red-800"
                        >
                          <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                        </svg>
                      </button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </span>
          )}

          <nav className="flex justify-end">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {currentPage} / {totalPages}
                </span>
              </li>
              <li>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>

          {/* Popup of get lprofile data by list id */}
          <Dialog
            open={isProfileDialogOpen}
            onOpenChange={setIsProfileDialogOpen}
          >
            <DialogContent className="w-full max-w-[90vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl h-[80vh] sm:h-[600px] md:h-[700px] lg:h-[800px] flex flex-col">
              <div className="flex-1 overflow-y-auto">
                {selectedListId ? (
                  <ProfilesList listId={selectedListId} />
                ) : (
                  <p>Chargement des profils...</p>
                )}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary" onClick={closeProfileDialog}>
                    Fermer
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* List update dialog */}

          <Dialog
            open={isUpdateListDialogOpen}
            onOpenChange={setIsUpdateListDialogOpen}
          >
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
                <Button type="button" variant="destructive" onClick={deleteList} disabled={isDeleting}>
                  {isDeleting ? (
                     <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Suppression...
                   </>
                  ) : (
                    "Supprimer"
                  )}
                </Button>
                <Button type="submit" variant="outline" onClick={updateList} disabled={isSaving}>
                  {isSaving ? (
                      <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sauvegarde...
                    </>
                  ) : (
                    "Sauvegarder"
                  )}
                </Button>

                <DialogClose asChild onClick={closeUpdateListDialog}>
                  <Button variant="secondary">Annuler</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* {selectedListId && <ProfilesList listId={selectedListId} />} */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
