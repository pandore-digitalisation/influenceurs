interface Profile {
  followers: string;
  posts: string;
  // id: string;
  name: string;
  profilePicture: string;
  platform: string;
  // [key: string]: any;
}

export default function ProfileCard({ profile }: { profile: Profile }) {
    return (
      <div className="border rounded p-4 shadow">
        <h2 className="text-lg font-bold">{profile.name || "Nom inconnu"}</h2>
        <p>Plateforme : {profile.platform}</p>
        <p>Suiveurs : {profile.followers || "N/A"}</p>
        <p>Posts : {profile.posts || "N/A"}</p>
      </div>
    );
  }  