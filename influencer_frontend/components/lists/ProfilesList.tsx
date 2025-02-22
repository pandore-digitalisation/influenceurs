import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000";

// Typage de la réponse et des profils
type Profile = {
  _id: string;
  name: string;
  email: string;
  profileUrl: string;
  followers: string;

};

const fetchProfiles = async (listId: string): Promise<Profile[]> => {
  try {
    const res = await fetch(`${BASE_URL}/lists/${listId}`);
    if (!res.ok) throw new Error("Erreur lors du chargement des profils");
    const data = await res.json();
    console.log("data", data)
    return Array.isArray(data.profiles) ? data.profiles : []; // Assurer que la réponse est bien sous forme de tableau de profils
  } catch (error) {
    console.error("Erreur lors de la récupération des profils", error);
    throw error;
  }
};

const ProfilesList = ({ listId }: { listId: string }) => {
  const { data: profiles, isLoading, error } = useQuery({
    queryKey: ["profiles", listId],
    queryFn: () => fetchProfiles(listId),
    enabled: !!listId, // Exécuter la requête seulement si listId est défini
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Une erreur est survenue : {error.message}</p>;

  return (
    <div className="mt-4 p-4 border">
      <h3>Profils de la liste {listId}</h3>
      <ul>
        {profiles?.length === 0 ? (
          <p>Aucun profil trouvé</p>
        ) : (
          profiles?.map((profile) => (
            <li key={profile.name} className="border p-2 my-2">
              <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                {profile.name}
              </a> - {profile?.followers} followers
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProfilesList;
