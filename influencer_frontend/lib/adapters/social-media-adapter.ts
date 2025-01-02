import { Influencer, SearchFilters } from '@/lib/types/influencer';

export interface SocialMediaAdapter {
  searchInfluencers(query: string, filters: SearchFilters): Promise<Influencer[]>;
  getInfluencerDetails(id: string): Promise<Influencer>;
  getMetrics(id: string): Promise<any>;
}

export class MockSocialMediaAdapter implements SocialMediaAdapter {
  private platform: string;

  constructor(platform: string) {
    this.platform = platform;
  }

  async searchInfluencers(query: string, filters: SearchFilters): Promise<Influencer[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockInfluencers.filter(inf => {
      if (filters.platform && !filters.platform.includes(inf.platform)) return false;
      if (filters.minFollowers && inf.metrics.followers < filters.minFollowers) return false;
      if (filters.maxFollowers && inf.metrics.followers > filters.maxFollowers) return false;
      if (filters.category && !inf.category.some(cat => filters.category?.includes(cat))) return false;
      if (filters.verified && !inf.verified) return false;
      
      return inf.name.toLowerCase().includes(query.toLowerCase()) ||
             inf.username.toLowerCase().includes(query.toLowerCase());
    });
  }

  async getInfluencerDetails(id: string): Promise<Influencer> {
    const influencer = mockInfluencers.find(inf => inf.id === id);
    if (!influencer) throw new Error('Influencer not found');
    return influencer;
  }

  async getMetrics(id: string): Promise<any> {
    const influencer = await this.getInfluencerDetails(id);
    return influencer.metrics;
  }
}

const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj_digital',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Digital Marketing Expert | Content Creator',
    location: 'New York, USA',
    category: ['Technology', 'Marketing'],
    metrics: {
      followers: 150000,
      engagement: 3.5,
      posts: 892,
      averageLikes: 5200,
      averageComments: 128
    },
    platform: 'instagram',
    verified: true,
    lastUpdated: '2024-03-20'
  },
  {
    id: '2',
    name: 'Alex Chen',
    username: 'alexchentech',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    bio: 'Tech Reviewer | Software Engineer',
    location: 'San Francisco, USA',
    category: ['Technology', 'Programming'],
    metrics: {
      followers: 89000,
      engagement: 4.2,
      posts: 445,
      averageLikes: 3800,
      averageComments: 220
    },
    platform: 'linkedin',
    verified: true,
    lastUpdated: '2024-03-19'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    username: 'emmawilson_official',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    bio: 'Lifestyle & Fashion Influencer',
    location: 'London, UK',
    category: ['Fashion', 'Lifestyle'],
    metrics: {
      followers: 220000,
      engagement: 5.1,
      posts: 1243,
      averageLikes: 12000,
      averageComments: 450
    },
    platform: 'facebook',
    verified: true,
    lastUpdated: '2024-03-20'
  }
];