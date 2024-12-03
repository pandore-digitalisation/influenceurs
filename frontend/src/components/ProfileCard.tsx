interface Profile {
  followers_count: string;
  following_count: string;
  is_verified: string,
  posts_count: string,
  posts: string;
  bio: string;
  name: string;
  profilePicture: string;
  platform: string;
  profile_url: string,
  page_name: string
  // [key: string]: any;
}

export default function ProfileCard({ profile }: { profile: Profile }) {
    return (
      <div className="border rounded p-4 shadow">
        <h2 className="text-lg font-bold">{profile.name || profile.page_name}</h2>
        <p>Plateforme : {profile.platform ?  profile.platform : "Facebook"}</p>
        <p>Verified : {profile.is_verified}</p>
        <p>Followers : {profile.followers_count || "N/A"}</p>
        <p>Following : {profile.following_count || "N/A"}</p>
        {profile.posts_count ? (<p>Posts : { profile.posts_count}</p>) : ("")}
        <p>Bio : {profile.bio || "N/A"}</p>
        <p>Url : {profile.profile_url || "N/A"}</p>
      </div>
    );
  }  