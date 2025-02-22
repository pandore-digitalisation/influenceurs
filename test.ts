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

import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000";

// Typage de la réponse et des profils
type Profile = {
  profileUrl: string;
  name: string;
  followers: string;
  following: string;
  posts?: string;
};

const fetchProfiles = async (listId: string): Promise<Profile[]> => {
  try {
    const res = await fetch(`${BASE_URL}/lists/${listId}`);
    if (!res.ok) throw new Error("Erreur lors du chargement des profils");
    const data = await res.json();
    console.log("Données de l'API:", data); // Ajout d'un log pour afficher les données
    // Vérifier que 'profiles' est bien un tableau et que ce tableau contient des éléments
    if (Array.isArray(data.profiles) && data.profiles.length > 0) {
      return data.profiles;
    }
    console.log("Aucun profil trouvé");
    return []; // Retourner un tableau vide si aucun profil n'est trouvé
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

  // Vérifier si profils est bien un tableau et qu'il contient des données
  if (!Array.isArray(profiles) || profiles.length === 0) {
    return <p>Aucun profil trouvé</p>;
  }

  return (
    <div className="mt-4 p-4 border">
      <h3>Profils de la liste {listId}</h3>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.name} className="border p-2 my-2">
            <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
              {profile.name}
            </a> - {profile.followers} followers
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilesList;

