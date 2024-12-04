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
  page_name: string,
  page_likes: string,
  page_followers: string,
  page_category: string,
  page_website: string
  // [key: string]: any;
}

export default function ProfileCard({ profile }: { profile: Profile }) {
    return (
      <div className="border rounded p-4 shadow">
        <h2 className="text-lg font-bold">{profile.name || profile.page_name}</h2>
        <p>Plateforme : {profile.platform ?  profile.platform : "Facebook"}</p>
        {profile.page_likes ? (<p> Pages likes: {profile.page_likes}</p>): ("")}
        {/* <p>Verified : {profile.is_verified}</p> */}
        {profile.is_verified ? (<p>Verified : { profile.is_verified}</p>) : ("")}
        {profile.bio ? (<p>Bio : { profile.bio}</p>) : ("")}
        {profile.posts_count ? (<p>Posts : { profile.posts_count}</p>) : ("")}
        {profile.following_count ? (<p>Following : { profile.following_count}</p>) : ("")}
        {profile.page_category ? (<p>Page category : { profile.page_category}</p>) : ("")}
        <p>Followers : {profile.page_followers || profile.followers_count || "N/A"}</p>
        <p>Url : {profile.profile_url || profile.page_website || "N/A"}</p>
      </div>
    );
  }  



// import { Profile } from '../lib/types/profile';
// import { Card, CardContent, CardHeader } from 'ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '/ui/avatar';
// import { Badge } from '../../components/ui/badge';
// import { CheckCircle, Users, Share2, Bookmark } from 'lucide-react';

// interface ProfileCardProps {
//   profile: Profile;
// }

// export function ProfileCard({ profile }: ProfileCardProps) {
//   return (
//     <Card className="hover:shadow-lg transition-shadow">
//       <CardHeader className="flex flex-row items-center gap-4">
//         <Avatar className="h-16 w-16">
//           <AvatarImage src={profile.profilePicture} alt={profile.name} />
//           <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
//         </Avatar>
//         <div className="flex flex-col">
//           <div className="flex items-center gap-2">
//             <h3 className="font-semibold text-lg">{profile.name || profile.page_name}</h3>
//             {profile.is_verified === 'true' && (
//               <CheckCircle className="h-4 w-4 text-blue-500" />
//             )}
//           </div>
//           <p className="text-sm text-muted-foreground">{profile.page_name || profile.platform}</p>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {profile.bio && <p className="text-sm">{profile.bio}</p>}

//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center gap-2">
//               <Users className="h-4 w-4 text-muted-foreground" />
//               <span className="text-sm font-medium">
//                 {profile.page_followers || profile.followers_count} followers
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Bookmark className="h-4 w-4 text-muted-foreground" />
//               <span className="text-sm font-medium">{profile.posts_count} posts</span>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {profile.page_category && (
//               <Badge variant="secondary">{profile.page_category}</Badge>
//             )}
//             {profile.page_likes && (
//               <Badge variant="secondary">Likes: {profile.page_likes}</Badge>
//             )}
//           </div>

//           <div className="space-y-2">
//             {profile.page_website && (
//               <div className="flex items-center gap-2">
//                 <Share2 className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm font-medium">{profile.page_website}</span>
//               </div>
//             )}
//             {profile.profile_url && (
//               <div className="flex items-center gap-2">
//                 <Share2 className="h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm font-medium">{profile.profile_url}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

