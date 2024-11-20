export interface SocialMetrics {
  followers: number;
  engagement: number;
  posts: number;
  averageLikes: number;
  averageComments: number;
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  bio: string;
  location?: string;
  category: string[];
  metrics: SocialMetrics;
  platform: 'facebook' | 'instagram' | 'linkedin';
  verified: boolean;
  lastUpdated: string;
}

export interface SearchFilters {
  platform?: string[];
  minFollowers?: number;
  maxFollowers?: number;
  category?: string[];
  location?: string;
  verified?: boolean;
  engagementRate?: number;
}